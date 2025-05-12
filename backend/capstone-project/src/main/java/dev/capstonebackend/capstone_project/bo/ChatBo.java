package dev.capstonebackend.capstone_project.bo;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-03-09 19:45
 **/
@Builder
@Getter
@Setter
public class ChatBo {

    private Long userId;

    private Long conversationId;

    private Long messageId;

    private Integer sender;

    private String message;

    private Date createdAt;

    private Date modifiedAt;

}
