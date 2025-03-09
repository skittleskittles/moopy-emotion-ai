package dev.capstonebackend.capstone_project.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-03-04 01:24
 **/
@Builder
@Getter
public class MoodRecord {

    /**
     * primary key
     */
    private Long id;

    private Long userId;

    private Integer moodType;

    private String moodDiary;

    private Integer day;

    private Integer month;

    private Integer year;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date createdAt;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date modifiedAt;
}
