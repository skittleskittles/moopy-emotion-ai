package dev.capstonebackend.capstone_project.vo;


import lombok.Builder;
import lombok.Getter;

import java.util.Date;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-03-09 20:53
 **/
@Builder
@Getter
public class ChatVo {

    private Long messageId;

    private String message;

    private Integer sender;

    private Long userId;

    private Long conversationId;

    private Integer sensitiveFlag;

    private Date createdAt;

    private Date modifiedAt;
}
