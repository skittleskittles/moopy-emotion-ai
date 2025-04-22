package dev.capstonebackend.capstone_project.controller;

import dev.capstonebackend.capstone_project.domain.Result;
import dev.capstonebackend.capstone_project.domain.Credentials;
import dev.capstonebackend.capstone_project.request.CredentialsReqBody;
import dev.capstonebackend.capstone_project.service.CredentialsService;
import dev.capstonebackend.capstone_project.service.CredentialsService;
import dev.capstonebackend.capstone_project.util.ResultUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = {"Credential Module"})
@RequestMapping("/credential")
@CrossOrigin
@Slf4j
public class CredentialsController {

    @Autowired
    private CredentialsService credentialsService;

    @ApiOperation(value = "Insert a new credential record")
    @PostMapping("/insert")
    public Result<?> insert(@RequestBody CredentialsReqBody credential) {
        int result = credentialsService.insertCredential(
                credential.getUserId(),
                credential.getFullName(),
                credential.getLicenseType(),
                credential.getLicenseNumber(),
                credential.getIssuingState(),
                credential.getLicenseExpirationDate()
        );
        return ResultUtil.success(result);
    }
}
