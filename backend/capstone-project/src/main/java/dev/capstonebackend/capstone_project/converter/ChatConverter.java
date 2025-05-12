package dev.capstonebackend.capstone_project.converter;


import dev.capstonebackend.capstone_project.bo.ChatBo;
import dev.capstonebackend.capstone_project.domain.MessageRecord;
import dev.capstonebackend.capstone_project.request.OpenApiReqBody;
import dev.capstonebackend.capstone_project.vo.ChatVo;
import dev.capstonebackend.capstone_project.vo.ConversationVo;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-03-09 19:45
 **/
public class ChatConverter {

    public static ChatBo openApiReqBodyToBo(OpenApiReqBody openApiReqBody) {
        return ChatBo.builder()
                .conversationId(openApiReqBody.getConversationId())
                .message(openApiReqBody.getMessage())
                .userId(openApiReqBody.getUserId())
                .sender(openApiReqBody.getSender())
                .build();
    }

    public static ChatVo messageRecordToVo(MessageRecord messageRecord) {
        return ChatVo.builder()
                .conversationId(messageRecord.getConversationId())
                .messageId(messageRecord.getId())
                .message(messageRecord.getMessage())
                .sensitiveFlag(messageRecord.getSensitiveFlag())
                .createdAt(messageRecord.getCreatedAt())
                .modifiedAt(messageRecord.getModifiedAt())
                .userId(messageRecord.getUserId())
                .sender(messageRecord.getSender())
                .build();

    }

    public static List<ConversationVo> messageVoToConversationVo(List<ChatVo> messageList) {
        return messageList.stream()
                .collect(Collectors.groupingBy(ChatVo::getConversationId)) // Group by conversationId
                .entrySet().stream()
                .sorted((e1, e2) -> e2.getKey().compareTo(e1.getKey()))
                .map(entry -> {
                    List<ChatVo> messages = entry.getValue();
                    // 判断是否存在 sensitiveFlag 为 1 的消息
                    boolean hasSensitive = messages.stream()
                            .anyMatch(m -> m.getSensitiveFlag() == 1);

                    return ConversationVo.builder()
                            .conversationId(entry.getKey())
                            .messageList(messages)
                            .sensitiveFlag(hasSensitive ? 1 : 0)
                            .build();
                })
                .collect(Collectors.toList());
    }


}
