package dev.capstonebackend.capstone_project.bo;


import dev.capstonebackend.capstone_project.domain.SurveyDetail;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;
import java.util.List;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-05-05 00:13
 **/
@Builder
@Getter
public class SurveyBO {

    private Long userId;

    private Integer score;

    /**
     * = QuestionRecord.id
     */
    private Long surveyId;

    private List<SurveyDetail> detailList;

    private Date createdAt;

}
