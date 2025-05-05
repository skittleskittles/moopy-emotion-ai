package dev.capstonebackend.capstone_project.vo;

import lombok.Builder;
import lombok.Data;

import java.util.List;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-05-05 00:17
 **/
@Data
@Builder
public class SurveyVO {

    private Long userId;

    private Integer scaledScore;

    private Integer originalScore;

    private Long surveyId;

    private List<SurveyDetailVO> detailList;
}
