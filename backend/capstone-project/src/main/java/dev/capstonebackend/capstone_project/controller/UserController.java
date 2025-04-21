package dev.capstonebackend.capstone_project.controller;

import dev.capstonebackend.capstone_project.enums.ApiMessage;
import dev.capstonebackend.capstone_project.enums.ConnectType;
import dev.capstonebackend.capstone_project.request.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import dev.capstonebackend.capstone_project.domain.Result;
import dev.capstonebackend.capstone_project.service.UserService;
import dev.capstonebackend.capstone_project.util.ResultUtil;

import java.util.Objects;

@RestController
@Api(tags = {"User Module"})
@RequestMapping(value = "/user")
@CrossOrigin // allow frontend running on different port
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @ApiOperation(value = "user register")
    @PostMapping("/register")
    public Result<?> register(@RequestBody RegisterReqBody reqBody) {
        String password = reqBody.getPassword();
        String name = reqBody.getName();
        //System.out.println(password + email + name);
        return ResultUtil.success(userService.registerUser(password, name));
    }

    @ApiOperation(value = "user login")
    @PostMapping("/login")
    public Result<?> login(@RequestBody LoginReqBody reqBody) {
        String password = reqBody.getPassword();
        String name = reqBody.getUsername();
        //System.out.println(password + email);
        return ResultUtil.success(userService.login(name, password));
    }

    @ApiOperation(value = "delete user by username")
    @PostMapping("/delete-by-username")
    public Result<?> delete(@RequestParam String username) {
        return ResultUtil.success(userService.deleteUserByUserName(username));
    }

    @ApiOperation(value = "update user's role")
    @PostMapping("/updateRole")
    public Result<?> updateRole(@RequestBody UpdateRoleReqBody reqBody) {
        if (Objects.isNull(reqBody.getUserId()) || Objects.isNull(reqBody.getRole())) {
            log.info("Invalid request, recordReqBody={}", reqBody.toString());
            return ResultUtil.error(ApiMessage.ILLEGAL_PARAMS);
        }
        return ResultUtil.success(userService.updateRole(reqBody.getUserId(), reqBody.getRole()));
    }

    @ApiOperation(value = "")
    @PostMapping("/connect")
    public Result<?> connectWithCode(@RequestBody ConnectReqBody connectReqBody) {
        if (!paramCheckConnect(connectReqBody)) {
            log.info("Invalid request, moodRecordReqBody={}", connectReqBody.toString());
            return ResultUtil.error(ApiMessage.ILLEGAL_PARAMS);
        }
        return ResultUtil.success(userService.connectWithCode(connectReqBody));
    }

    private Boolean paramCheckConnect(ConnectReqBody connectReqBody) {
        if (Objects.isNull(connectReqBody) || Objects.isNull(connectReqBody.getConnectType())
                || StringUtils.isEmpty(connectReqBody.getClientName())) {
            return Boolean.FALSE;
        }
        if (Objects.isNull(ConnectType.getConnectType(connectReqBody.getConnectType()))) {
            return Boolean.FALSE;
        }
        if (StringUtils.isEmpty(connectReqBody.getCurrentUserCode())
                || StringUtils.isEmpty(connectReqBody.getConnectCode())) {
            return Boolean.FALSE;
        }
        return Boolean.TRUE;
    }

    @ApiOperation(value = "")
    @PostMapping("/disconnect")
    public Result<?> deleteConnection(@RequestBody DisconnectReqBody disconnectReqBody) {
        return ResultUtil.success(userService.deleteConnection(disconnectReqBody.getTherapistId(), disconnectReqBody.getClientId()));
    }

//    @ApiOperation(value = "")
//    @PostMapping("/listConnection")
//    public Result<?> listConnection(@RequestBody DisconnectReqBody disconnectReqBody) {
//        return ResultUtil.success(userService.deleteConnection(disconnectReqBody.getTherapistId(), disconnectReqBody.getClientId()));
//    }
}

