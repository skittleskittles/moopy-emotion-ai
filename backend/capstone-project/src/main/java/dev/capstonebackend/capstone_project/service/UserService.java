package dev.capstonebackend.capstone_project.service;

import dev.capstonebackend.capstone_project.bo.UserConnectionBo;
import dev.capstonebackend.capstone_project.dao.UserConnectionDao;
import dev.capstonebackend.capstone_project.domain.UserConnection;
import dev.capstonebackend.capstone_project.enums.ConnectType;
import dev.capstonebackend.capstone_project.request.ConnectReqBody;
import dev.capstonebackend.capstone_project.request.ListConnectionReqBody;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.capstonebackend.capstone_project.vo.UserVo;
import dev.capstonebackend.capstone_project.config.AuthToken;
import dev.capstonebackend.capstone_project.dao.UserDao;
import dev.capstonebackend.capstone_project.domain.User;
import dev.capstonebackend.capstone_project.enums.ApiMessage;
import dev.capstonebackend.capstone_project.exception.ApiException;
import org.springframework.util.CollectionUtils;

import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Slf4j
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private AuthService authService;

    @Autowired
    private UserConnectionDao userConnectionDao;

    public User selectUserById(Long id) {
        User user = userDao.selectUserById(id);
        return user;
    }

    public int registerUser(String password, String name) {
        User existUser = userDao.selectUserByUserName(name);
        if (null != existUser) {
            throw new ApiException(ApiMessage.EMAIL_ALREADY_REG);
        }

        User user = new User();
        user.setUsername(name);
        user.setPassword(authService.hashPassword(password));
        String randomCode = usingUUID();
        while (Objects.nonNull(userDao.selectUserByCode(randomCode))) {
            randomCode = usingUUID();
        }
        user.setUserCode(randomCode);
        return userDao.insertUser(user);
    }


    public UserVo login(String name, String password) {
        User user = userDao.selectUserByUserName(name);
        if (user == null) {
            throw new ApiException(ApiMessage.USER_NOT_EXIST);
            // 加一个用户不存在
        }
        if (!authService.checkPassword(password, user.getPassword())) {
            throw new ApiException(ApiMessage.PASSWORD_INCORRECT);
        }

        long expirationTime = 36000000; // 10hrs

        String token = Jwts.builder()
                .setSubject(name)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(AuthToken.key, SignatureAlgorithm.HS256)
                .compact();

        user.setToken(token);
        userDao.updateUser(user);

        UserVo userVo = new UserVo();
        userVo.setId(user.getId());
        userVo.setUsername(user.getUsername());
        userVo.setToken(user.getToken());
        userVo.setUserCode(user.getUserCode());
        userVo.setRole(user.getRole());
        return userVo;
    }

    public int deleteUserByUserName (String name) {
        User user = userDao.selectUserByUserName(name);
        if (user == null) {
            throw new ApiException(ApiMessage.DELETE_FAIL_USER_NA);
        }
        return userDao.deleteUserByUserName(name);
    }

    public User findUserByToken(String token) {
        return userDao.selectUserByToken(token);
    }

    private String usingUUID() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString().replaceAll("-", "");
    }

    public int updateRole (Long id, Integer role) {
        User user = userDao.selectUserById(id);
        if (Objects.isNull(user)) {
            throw new ApiException(ApiMessage.INVALID_USER_ID);
        }
        user.setRole(role);
        return userDao.updateUser(user);
    }

    public int connectWithCode(ConnectReqBody connectReqBody) {
        ConnectType connectType = ConnectType.getConnectType(connectReqBody.getConnectType());
        User currentUser = userDao.selectUserByCode(connectReqBody.getCurrentUserCode());
        User connectUser = userDao.selectUserByCode(connectReqBody.getConnectCode());
        if (Objects.isNull(currentUser) || Objects.isNull(connectUser)) {
            if (connectType.equals(ConnectType.CLIENT_CONNECT_WITH_THERAPIST)) {
                log.error("invalid user code, clientCode={}, therapistCode={}"
                        , connectReqBody.getCurrentUserCode(), connectReqBody.getConnectCode());
            } else {
                log.error("invalid user code, therapistCode={}, clientCode={}"
                        , connectReqBody.getCurrentUserCode(), connectReqBody.getConnectCode());
            }
            throw new ApiException(ApiMessage.INVALID_USER_CODE);
        }
        UserConnection newConnection = new UserConnection();
        if (connectType.equals(ConnectType.CLIENT_CONNECT_WITH_THERAPIST)) {
            newConnection.setClientId(currentUser.getId());
            newConnection.setTherapistId(connectUser.getId());
            currentUser.setFullName(connectReqBody.getClientName());
            userDao.updateUser(currentUser);
        } else {
            newConnection.setClientId(connectUser.getId());
            newConnection.setTherapistId(currentUser.getId());
            connectUser.setFullName(connectReqBody.getClientName());
            userDao.updateUser(connectUser);
        }
        newConnection.setClientName(connectReqBody.getClientName());
        return userConnectionDao.insertUserConnection(newConnection);
    }

    public int deleteConnection(Long therapistId, Long clientId) {
        return userConnectionDao.deleteUserConnection(therapistId, clientId);
    }

    public List<UserConnectionBo> listConnectionByCondition(ListConnectionReqBody listConnectionReqBody) {
        List<UserConnection> connectionList = userConnectionDao.selectUserConnections(listConnectionReqBody.getTherapistId(), listConnectionReqBody.getClientId());
        if (CollectionUtils.isEmpty(connectionList)) {
            log.info("empty connection list, clientId={}, therapistId={}"
                    , listConnectionReqBody.getClientId(), listConnectionReqBody.getTherapistId());
            return new ArrayList<>();
        }
        List<Long> userIdList = connectionList.stream()
                .flatMap(conn -> Stream.of(conn.getClientId(), conn.getTherapistId()))
                .collect(Collectors.toList());
        if (CollectionUtils.isEmpty(userIdList)) {
            log.error("invalid user id, clientId={}, therapistId={}"
                    , listConnectionReqBody.getClientId(), listConnectionReqBody.getTherapistId());
            return new ArrayList<>();
        }
        List<User> userList = userDao.selectUserByIdList(userIdList);

        Map<Long, User> userMap = userList.stream().collect(Collectors.toMap(User::getId, user -> user));
        List<UserConnectionBo> connectionBoList = new ArrayList<>();
        for (UserConnection connection : connectionList) {
            User client = userMap.get(connection.getClientId());
            User therapist = userMap.get(connection.getTherapistId());
            if (Objects.isNull(client) || Objects.isNull(therapist)) {
                log.error("invalid clientId or therapistId, clientId={}, therapistId={}"
                        , connection.getClientId(), connection.getTherapistId());
                continue;
            }
            UserConnectionBo bo = UserConnectionBo.builder()
                    .therapistId(therapist.getId())
                    .therapistName(therapist.getFullName())
                    .therapistCode(therapist.getUserCode())
                    .clientId(client.getId())
                    .clientName(client.getFullName())
                    .clientCode(client.getUserCode())
                    .connectDate(connection.getCreatedAt())
                    .build();
            connectionBoList.add(bo);
        }
        return connectionBoList;

    }

}

