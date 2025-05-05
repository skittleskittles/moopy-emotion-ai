package dev.capstonebackend.capstone_project.dto;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-05-04 21:37
 **/
@Getter
@ToString
@Data
@ApiModel(value = "QuestionRecordReqBody", description = "Questionnaire Record Request Body")
public class SurveyDetailDTO {

    @ApiModelProperty(example = "2", value = "questionNumber", required = true)
    private Integer questionNumber;

    @ApiModelProperty(example = "1", value = "answerIndex", required = true)
    private Integer answerIndex;
}
