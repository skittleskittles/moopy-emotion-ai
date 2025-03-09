package dev.capstonebackend.capstone_project.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-03-08 22:56
 **/
@Data
@Getter
@Setter
@ApiModel(value = "MoodRecordListReqBody", description =  "Mood tracking request body")
public class MoodRecordListReqBody {

    @ApiModelProperty(example = "123124", value = "userId", required = true)
    private Long moodId;

    @ApiModelProperty(example = "123124", value = "userId", required = true)
    @NotEmpty(message = "用户unique Id")
    private Long userId;

    @ApiModelProperty(example = "123124", value = "userId", required = true)
    @NotEmpty(message = "用户unique Id")
    private Integer queryType;

    @ApiModelProperty(example = "123124", value = "userId", required = true)
    private Integer month;

    @ApiModelProperty(example = "123124", value = "userId", required = true)
    private Integer year;

}
