package dev.capstonebackend.capstone_project.controller;


import dev.capstonebackend.capstone_project.bo.MoodRecordBo;
import dev.capstonebackend.capstone_project.converter.MoodRecordConverter;
import dev.capstonebackend.capstone_project.domain.MoodRecord;
import dev.capstonebackend.capstone_project.domain.Result;
import dev.capstonebackend.capstone_project.enums.ApiMessage;
import dev.capstonebackend.capstone_project.enums.MoodRecordQueryType;
import dev.capstonebackend.capstone_project.request.MoodRecordListReqBody;
import dev.capstonebackend.capstone_project.request.MoodRecordReqBody;
import dev.capstonebackend.capstone_project.service.MoodRecordService;
import dev.capstonebackend.capstone_project.util.ResultUtil;
import dev.capstonebackend.capstone_project.vo.MoodRecordVo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-03-04 00:34
 **/
@Slf4j
@RestController
@Api(tags = {"Mood Record Module"})
@RequestMapping(value = "/track")
@CrossOrigin
public class MoodRecordController {

    @Autowired
    private MoodRecordService moodRecordService;

    @ApiOperation(value = "save mood diary")
    @PostMapping("/saveRecord")
    public Result<?> saveMoodRecord(@RequestBody MoodRecordReqBody moodRecordReqBody){
        if (!paramCheckSave(moodRecordReqBody)) {
            log.info("Invalid request, moodRecordReqBody={}", moodRecordReqBody.toString());
            return ResultUtil.error(ApiMessage.ILLEGAL_PARAMS);
        }
        MoodRecordBo bo = MoodRecordConverter.moodRecordReqToBo(moodRecordReqBody);
        return Result.success(moodRecordService.insertMoodRecord(bo));
    }

    @ApiOperation(value = "list mood diary by type")
    @PostMapping("/listRecord")
    public Result<?> listMoodRecord(@RequestBody MoodRecordListReqBody reqBody) {
        if (!paramCheckList(reqBody)) {
            log.info("Invalid request, moodRecordReqBody={}", reqBody.toString());
            return ResultUtil.error(ApiMessage.ILLEGAL_PARAMS);
        }
        MoodRecordBo bo = MoodRecordConverter.moodRecordListReqToBo(reqBody);
        List<MoodRecord> recordList = moodRecordService.listMoodRecordByType(bo);
        List<MoodRecordVo> voList = recordList.stream().map(MoodRecordConverter::moodRecordToVo).toList();
        return Result.success(voList);
    }

    private Boolean paramCheckSave(MoodRecordReqBody moodRecordReqBody){
        if (Objects.isNull(moodRecordReqBody) || Objects.isNull(moodRecordReqBody.getUserId())
                || Objects.isNull(moodRecordReqBody.getMoodType())) {
            return Boolean.FALSE;
        }
        return Boolean.TRUE;
    }

    private Boolean paramCheckList(MoodRecordListReqBody reqBody){
        if (Objects.isNull(reqBody) || Objects.isNull(reqBody.getUserId())
                || Objects.isNull(reqBody.getQueryType())) {
            return Boolean.FALSE;
        }
        if (reqBody.getQueryType().equals(MoodRecordQueryType.QUERY_BY_MONTH.getType())
                && Objects.isNull(reqBody.getMonth())) {
            return Boolean.FALSE;
        }
        if (reqBody.getQueryType().equals(MoodRecordQueryType.QUERY_BY_YEAR.getType())
                && Objects.isNull(reqBody.getYear())) {
            return Boolean.FALSE;
        }
        return Boolean.TRUE;
    }

}
