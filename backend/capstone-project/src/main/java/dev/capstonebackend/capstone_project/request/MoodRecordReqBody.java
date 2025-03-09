package dev.capstonebackend.capstone_project.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-03-04 01:37
 **/
@Data
@Getter
@Setter
@ApiModel(value = "MoodRecordReqBody", description =  "Mood tracking request body")
public class MoodRecordReqBody {

    @ApiModelProperty(example = "123124", value = "userId", required = true)
    @NotEmpty(message = "用户unique Id")
    private Long userId;

    @ApiModelProperty(example = "1", value = "moodType", required = true)
    @NotEmpty(message = "心情类型，1-开心，2-伤心")
    private Integer moodType;

    @ApiModelProperty(example = "sad", value = "moodDesc", required = true)
    @NotEmpty(message = "心情类型描述，对应moodType，1-开心，2-伤心")
    private String moodDesc;

    @ApiModelProperty(example = "烦", value = "moodDiary", required = true)
    @NotEmpty(message = "心情日记")
    private String moodDiary;

}
