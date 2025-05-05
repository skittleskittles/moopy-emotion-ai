package dev.capstonebackend.capstone_project.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-05-04 21:04
 **/
@Getter
@Setter
@Builder
public class SurveyDetail {

    private Long id;

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

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date createdAt;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date modifiedAt;

}
