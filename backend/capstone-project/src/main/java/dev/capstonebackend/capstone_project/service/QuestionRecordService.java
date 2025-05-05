package dev.capstonebackend.capstone_project.service;


import dev.capstonebackend.capstone_project.bo.SurveyBO;
import dev.capstonebackend.capstone_project.dao.QuestionRecordDao;
import dev.capstonebackend.capstone_project.dao.SurveyDetailDao;
import dev.capstonebackend.capstone_project.dao.UserDao;
import dev.capstonebackend.capstone_project.domain.QuestionRecord;
import dev.capstonebackend.capstone_project.domain.SurveyDetail;
import dev.capstonebackend.capstone_project.domain.User;
import dev.capstonebackend.capstone_project.dto.SurveyDetailDTO;
import dev.capstonebackend.capstone_project.enums.ApiMessage;
import dev.capstonebackend.capstone_project.exception.ApiException;
import dev.capstonebackend.capstone_project.request.QuestionRecordReqBody;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-02-16 00:44
 **/
@Slf4j
@Service
public class QuestionRecordService {

    @Autowired
    private QuestionRecordDao questionRecordDao;

    @Autowired
    private SurveyDetailDao surveyDetailDao;

    @Autowired
    private UserDao userDao;

    public int insertQuestionRecord(QuestionRecordReqBody recordReqBody) {
        Long userId = recordReqBody.getUserId();
        Integer score = recordReqBody.getScore();
        List<SurveyDetailDTO> dtoList = recordReqBody.getDetailList();
        User existUser = userDao.selectUserById(userId);
        if (existUser == null) {
            log.info("User with id {} does not exist", userId);
            throw new ApiException(ApiMessage.INVALID_USER_ID);
        }
        QuestionRecord questionRecord = QuestionRecord.builder().userId(userId).score(score).build();
        int questionRecordSaveResult = questionRecordDao.insertQuestionRecord(questionRecord);
        if (questionRecordSaveResult != 1) {
            log.error("Insert question record failed, userId={}, score={}", userId, score);
            throw new ApiException(ApiMessage.QUESTION_RECORD_SAVE_FAILED);
        }
        Long surveyId = questionRecord.getId();
        List<SurveyDetail> detailList = new ArrayList<>(List.of());

        for (SurveyDetailDTO dto : dtoList) {
            SurveyDetail detail = SurveyDetail.builder()
                    .userId(userId)
                    .surveyId(surveyId)
                    .questionNumber(dto.getQuestionNumber())
                    .answerIndex(dto.getAnswerIndex())
                    .build();
            detailList.add(detail);
        }
        return surveyDetailDao.batchInsertDetail(detailList);
    }

    public List<SurveyBO> getRecordListByUserId(Long userId) {
        List<QuestionRecord> recordList = questionRecordDao.selectUserRecord(userId);
        if (recordList.isEmpty()) {
            log.error("User does not take survey, id = {}", userId);
            return null;
        }
        Map<Long, QuestionRecord> recordMap = recordList.stream()
                .collect(Collectors.toMap(
                        QuestionRecord::getId,
                        Function.identity()
                ));
        List<Long> surveyIdList = recordList.stream().map(QuestionRecord::getId).toList();
        List<SurveyDetail> detailList = surveyDetailDao.selectBySurveyIdList(surveyIdList);
        Map<Long, List<SurveyDetail>> detailMap = detailList.stream()
                .collect(Collectors.groupingBy(
                        SurveyDetail::getSurveyId,
                        Collectors.collectingAndThen(
                                Collectors.toList(),
                                list -> list.stream()
                                        // 题号按照从小到大排序
                                        .sorted(Comparator.comparing(SurveyDetail::getQuestionNumber))
                                        .collect(Collectors.toList())
                        )
                ));
        List<SurveyBO> boList = new ArrayList<>(List.of());
        for (Map.Entry<Long, List<SurveyDetail>> entry : detailMap.entrySet()) {
            Long surveyId = entry.getKey();
            QuestionRecord record = recordMap.get(surveyId);
            if (Objects.isNull(record)) {
                log.error("");
                continue;
            }
            List<SurveyDetail> surveyDetailList = entry.getValue();
            SurveyBO bo = SurveyBO.builder()
                    .surveyId(surveyId)
                    .userId(record.getUserId())
                    .score(Optional.ofNullable(record.getScore()).orElse(0))
                    .detailList(surveyDetailList)
                    .createdAt(record.getCreatedAt())
                    .build();
            boList.add(bo);
        }
        return boList;



    }
}
