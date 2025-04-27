package dev.capstonebackend.capstone_project.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * @program: Capstone_Project
 * @description:
 * @author: Yiyan Kong
 * @create: 2025-02-16 00:21
 **/
@Builder
@Data
public class QuestionRecord {

    /**
     * primary key
     */
    private Long id;

    private Long userId;

    private Integer score;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date createdAt;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date modifiedAt;
}
