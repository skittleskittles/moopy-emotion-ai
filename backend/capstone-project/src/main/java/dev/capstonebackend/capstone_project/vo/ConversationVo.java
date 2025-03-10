package dev.capstonebackend.capstone_project.vo;


import lombok.Builder;
import lombok.Getter;

import java.util.List;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-03-10 13:56
 **/
@Builder
@Getter
public class ConversationVo {

    private Long conversationId;

    private List<ChatVo> messageList;
}
