package dev.capstonebackend.capstone_project.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import dev.capstonebackend.capstone_project.domain.Result;
import dev.capstonebackend.capstone_project.request.LoginReqBody;
import dev.capstonebackend.capstone_project.request.RegisterReqBody;
import dev.capstonebackend.capstone_project.service.UserService;
import dev.capstonebackend.capstone_project.util.ResultUtil;

@RestController
@Api(tags = {"User Module"})
@RequestMapping(value = "/user")
@CrossOrigin // allow frontend running on different port
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
}

