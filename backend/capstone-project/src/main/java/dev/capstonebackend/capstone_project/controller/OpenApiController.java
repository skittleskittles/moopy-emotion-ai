package dev.capstonebackend.capstone_project.controller;

import dev.capstonebackend.capstone_project.domain.Result;
import dev.capstonebackend.capstone_project.request.OpenApiReqBody;
import dev.capstonebackend.capstone_project.service.OpenApiService;
import dev.capstonebackend.capstone_project.util.ResultUtil;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(tags = {"OpenApi Module"})
@RequestMapping("/api/chat")
@CrossOrigin // allow frontend running on different port
public class OpenApiController {

    @Autowired
    private OpenApiService openApiService;

    @PostMapping
    public Result<?> chat(@RequestBody OpenApiReqBody apiReqBody) {
        String prompt = apiReqBody.getMessage();
        return ResultUtil.success(openApiService.chatWithGPT(prompt));
    }

}
