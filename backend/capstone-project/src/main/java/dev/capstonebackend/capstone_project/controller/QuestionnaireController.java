package dev.capstonebackend.capstone_project.controller;

import dev.capstonebackend.capstone_project.domain.Result;
import dev.capstonebackend.capstone_project.enums.ApiMessage;
import dev.capstonebackend.capstone_project.request.QuestionRecordReqBody;
import dev.capstonebackend.capstone_project.service.QuestionRecordService;
import dev.capstonebackend.capstone_project.util.ResultUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@Slf4j
@RestController
@Api(tags = {"Questionnaire Module"})
@RequestMapping(value = "/question")
@CrossOrigin
public class QuestionnaireController {

    @Autowired
    private QuestionRecordService questionRecordService;

    @ApiOperation(value = "user register")
    @PostMapping("/saveRecord")
    public Result<?> saveRecord(@RequestBody QuestionRecordReqBody recordReqBody) {
        if (!paramCheck(recordReqBody)) {
            log.info("Invalid request, recordReqBody={}", recordReqBody.toString());
            return ResultUtil.error(ApiMessage.ILLEGAL_PARAMS);
        }
        Long userId = recordReqBody.getUserId();
        Integer score = recordReqBody.getScore();
        return ResultUtil.success(questionRecordService.insertQuestionRecord(userId, score));
    }

    private Boolean paramCheck(QuestionRecordReqBody recordReqBody) {
        if (Objects.isNull(recordReqBody) || Objects.isNull(recordReqBody.getUserId())
                || Objects.isNull(recordReqBody.getScore())) {
            return Boolean.FALSE;
        }
        if (recordReqBody.getScore() < 0 || recordReqBody.getScore() > 100) {
            return Boolean.FALSE;
        }
        return Boolean.TRUE;
    }
}
