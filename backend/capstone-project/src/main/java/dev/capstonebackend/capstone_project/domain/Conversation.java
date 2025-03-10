package dev.capstonebackend.capstone_project.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-03-09 19:00
 **/
@Builder
@Getter
public class Conversation {

    private Long id;

    private Long userId;

    private String title;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date createdAt;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date modifiedAt;
}
