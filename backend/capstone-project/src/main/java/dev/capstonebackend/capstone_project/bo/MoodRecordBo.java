package dev.capstonebackend.capstone_project.bo;


import dev.capstonebackend.capstone_project.enums.MoodRecordQueryType;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Date;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-03-04 01:58
 **/
@Builder
@Getter
public class MoodRecordBo {

    private Long userId;

    private Long moodId;

    private Integer moodType;

    private String moodDiary;

    private Integer month;

    private Integer year;

    private MoodRecordQueryType queryType;

    private LocalDate recordDate;



}
