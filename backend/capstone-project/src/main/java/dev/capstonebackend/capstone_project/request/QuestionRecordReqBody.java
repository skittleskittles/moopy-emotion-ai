package dev.capstonebackend.capstone_project.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@ApiModel(value = "QuestionRecordReqBody", description = "Questionnaire Record Request Body")
public class QuestionRecordReqBody {

    @ApiModelProperty(example = "123012", value = "id", required = true)
    private Long userId;

    @ApiModelProperty(example = "95", value = "score", required = true)
    private Integer score;

    @Override
    public String toString() {
        return "QuestionRecordReqBody{" +
                "userId=" + userId +
                ", score=" + score +
                '}';
    }
}
