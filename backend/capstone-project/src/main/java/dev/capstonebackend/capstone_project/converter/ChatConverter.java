package dev.capstonebackend.capstone_project.converter;


import dev.capstonebackend.capstone_project.bo.ChatBo;
import dev.capstonebackend.capstone_project.domain.MessageRecord;
import dev.capstonebackend.capstone_project.request.OpenApiReqBody;
import dev.capstonebackend.capstone_project.vo.ChatVo;

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
                .build();
    }

    public static ChatVo messageRecordToVo(MessageRecord messageRecord) {
        return ChatVo.builder()
                .conversationId(messageRecord.getConversationId())
                .messageId(messageRecord.getId())
                .message(messageRecord.getMessage())
                .createdAt(messageRecord.getCreatedAt())
                .modifiedAt(messageRecord.getModifiedAt())
                .userId(messageRecord.getUserId())
                .build();

    }


}
