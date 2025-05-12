package dev.capstonebackend.capstone_project.service;


import dev.capstonebackend.capstone_project.bo.ChatBo;
import dev.capstonebackend.capstone_project.dao.ConversationsDao;
import dev.capstonebackend.capstone_project.dao.MessageRecordDao;
import dev.capstonebackend.capstone_project.domain.Conversation;
import dev.capstonebackend.capstone_project.domain.MessageRecord;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-03-09 19:11
 **/
@Slf4j
@Service
public class ChatService {

    @Autowired
    private ConversationsDao conversationsDao;

    @Autowired
    private MessageRecordDao messageRecordDao;

    public Long saveConversation(Long userId) {
        Conversation conversation = Conversation.builder().userId(userId).build();
        int result = conversationsDao.insertNewConversation(conversation);
        if (result != 1) {
            log.error("Failed to save conversation, userId={}", userId);
            return null;
        }
        return conversation.getId();
    }

    public int saveMessageContent(ChatBo chatBo) {
        Long conversationId = chatBo.getConversationId();
        if (Objects.isNull(conversationId)) {
            conversationId = saveConversation(chatBo.getUserId());
            chatBo.setConversationId(conversationId);
        }
        MessageRecord record = MessageRecord.builder()
                .conversationId(conversationId)
                .message(chatBo.getMessage())
                .userId(chatBo.getUserId())
                .sender(chatBo.getSender())
                .build();
        int result = messageRecordDao.insertMessage(record);
        chatBo.setMessageId(record.getId());
        return result;
    }

    public List<MessageRecord> selectMessagesByUserId(Long userId) {
        List<Long> conversationIdList = Optional.ofNullable(conversationsDao.selectByUserId(userId))
                .orElse(Collections.emptyList()) // 避免 NullPointerException
                .stream()
                .map(Conversation::getId).toList(); // Java 8 兼容
        if (CollectionUtils.isEmpty(conversationIdList)) {
            log.error("selectMessagesByUserId No conversation found for userId={}", userId);
            return Collections.emptyList();
        }
        return messageRecordDao.selectMessagesByConversationIds(conversationIdList);
    }

    public List<MessageRecord> selectRecentMessages(Long conversationId) {
        if (Objects.isNull(conversationId)) {
            return Collections.emptyList();
        }
        return messageRecordDao.selectByConversationId(conversationId);

    }
}
