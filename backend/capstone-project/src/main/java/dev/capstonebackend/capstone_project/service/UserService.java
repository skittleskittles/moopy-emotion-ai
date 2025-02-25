package dev.capstonebackend.capstone_project.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.capstonebackend.capstone_project.vo.UserVo;
import dev.capstonebackend.capstone_project.config.AuthToken;
import dev.capstonebackend.capstone_project.dao.UserDao;
import dev.capstonebackend.capstone_project.domain.User;
import dev.capstonebackend.capstone_project.enums.ApiMessage;
import dev.capstonebackend.capstone_project.exception.ApiException;

import java.util.Date;
import java.util.regex.Pattern;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private AuthService authService;

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
        return userDao.insertUser(user);
    }


    public UserVo login(String name, String password) {
        User user = userDao.selectUserByUserName(name);
        if (user == null) {
            throw new ApiException(ApiMessage.LOGIN_ERROR);
            // 加一个用户不存在
        }
        if (!authService.checkPassword(password, user.getPassword())) {
            throw new ApiException(ApiMessage.LOGIN_ERROR);
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

}

