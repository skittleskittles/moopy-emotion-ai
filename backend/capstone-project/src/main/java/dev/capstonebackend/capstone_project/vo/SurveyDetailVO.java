package dev.capstonebackend.capstone_project.vo;


import lombok.Builder;
import lombok.Data;

import java.util.Date;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-05-05 00:22
 **/
@Builder
@Data
public class SurveyDetailVO {

    private Long userId;

    private Long surveyId;

    /**
     * Range from 1 to 20
     */
    private Integer questionNumber;

    /**
     * 1-A, 2-B, 3-C, 4-D
     */
    private Integer answerIndex;

    private Date createdAt;

    private Date modifiedAt;
}
