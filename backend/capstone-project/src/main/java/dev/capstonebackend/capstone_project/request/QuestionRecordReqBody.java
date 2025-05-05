package dev.capstonebackend.capstone_project.request;

import dev.capstonebackend.capstone_project.dto.SurveyDetailDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
@ApiModel(value = "QuestionRecordReqBody", description = "Questionnaire Record Request Body")
public class QuestionRecordReqBody {

    @ApiModelProperty(example = "123012", value = "id", required = true)
    private Long userId;

    @ApiModelProperty(example = "95", value = "score", required = true)
    private Integer score;

    @ApiModelProperty(example = "", value = "", required = true)
    private List<SurveyDetailDTO> detailList;

    @Override
    public String toString() {
        return "QuestionRecordReqBody{" +
                "userId=" + userId +
                ", score=" + score +
                ", detailList=" + detailList +
                '}';
    }
}
