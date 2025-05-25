package dev.capstonebackend.capstone_project.vo;


import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-03-08 22:53
 **/
@Builder
@Getter
@Setter
@ApiModel(value = "useerVo", description = "Basic info of the user")
public class MoodRecordVo {

    private Long moodId;

    private Long userId;

    private Integer moodType;

    private String moodDiary;

    private Integer year;

    private Integer month;

    private Integer day;

    private Date createdAt;

    private Date modifiedAt;

}
