package dev.capstonebackend.capstone_project.converter;


import dev.capstonebackend.capstone_project.bo.SurveyBO;
import dev.capstonebackend.capstone_project.domain.SurveyDetail;
import dev.capstonebackend.capstone_project.vo.SurveyVO;
import dev.capstonebackend.capstone_project.vo.SurveyDetailVO;

import java.util.List;
import java.util.Optional;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-05-05 00:36
 **/
public class SurveyConverter {

    private static final int MAX_SCORE = 75;

    public static SurveyDetailVO surveyDetailToVO(SurveyDetail surveyDetail) {
        return SurveyDetailVO.builder()
                .surveyId(surveyDetail.getSurveyId())
                .answerIndex(surveyDetail.getAnswerIndex())
                .userId(surveyDetail.getUserId())
                .questionNumber(surveyDetail.getQuestionNumber())
                .createdAt(surveyDetail.getCreatedAt())
                .modifiedAt(surveyDetail.getModifiedAt())
                .build();
    }

    public static List<SurveyVO> surveyBOToVO(List<SurveyBO> surveyBOList) {
        List<SurveyVO> surveyVOList = new java.util.ArrayList<>(List.of());
        for (SurveyBO surveyBO : surveyBOList) {
            SurveyVO vo = SurveyVO.builder()
                    .originalScore(surveyBO.getScore())
                    .scaledScore(surveyBO.getScore() * 100 / MAX_SCORE)
                    .userId(surveyBO.getUserId())
                    .surveyId(surveyBO.getSurveyId())
                    .detailList(surveyBO.getDetailList().stream()
                            .map(SurveyConverter::surveyDetailToVO).toList())
                    .createdAt(surveyBO.getCreatedAt())
                    .build();
            surveyVOList.add(vo);
        }
        return surveyVOList;
    }
}
