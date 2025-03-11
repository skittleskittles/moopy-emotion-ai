package dev.capstonebackend.capstone_project.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.Date;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-03-09 18:37
 **/
@Builder
@Getter
public class MessageRecord {

    private Long id;

    private Long userId;

    private Long conversationId;

    private String message;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date createdAt;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date modifiedAt;

    private Integer sender;

}
