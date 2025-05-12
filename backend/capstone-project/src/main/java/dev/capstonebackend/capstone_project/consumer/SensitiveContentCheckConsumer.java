package dev.capstonebackend.capstone_project.consumer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dev.capstonebackend.capstone_project.constant.ChatConstant;
import dev.capstonebackend.capstone_project.dao.MessageRecordDao;
import dev.capstonebackend.capstone_project.domain.MessageRecord;
import dev.capstonebackend.capstone_project.gateway.OpenApiGateway;
import dev.capstonebackend.capstone_project.message.ContentCheckMessage;
import dev.capstonebackend.capstone_project.service.ChatService;
import dev.capstonebackend.capstone_project.service.OpenApiService;
import lombok.extern.slf4j.Slf4j;
import okhttp3.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

import static dev.capstonebackend.capstone_project.service.OpenApiService.CHATBOT_ID;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-05-06 14:02
 **/
@Component
@Slf4j
public class SensitiveContentCheckConsumer extends TopicMessageListener {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    MessageRecordDao messageRecordDao;

    @Autowired
    private ChatService chatService;

    @Autowired
    private OpenApiService openApiService;

    @Autowired
    private OpenApiGateway openApiGateway;

    @KafkaListener(topics = "sensitive_content_check", groupId = "group1")
    public Boolean ContentCheckMessageConsumer(@Payload String message, @Header("type") String type) throws Exception {
        ContentCheckMessage msg = objectMapper.readValue(message, getType(type));
        log.info("received sensitive content check message: {}", msg);
        Boolean result = contentCheck(msg);
        if (result) {
            messageRecordDao.updateSensitiveFlag(msg.getMessageId());
        }
        return Boolean.TRUE;
    }

    private Boolean contentCheck(ContentCheckMessage msg) {
        String content = msg.getCheckContent();
        String lower = content.toLowerCase();
        Optional<String> hitWord = ChatConstant.SENSITIVE_WORDS.stream()
                .filter(word -> lower.contains(word.toLowerCase()))
                .findFirst();
        if (hitWord.isPresent()) {
            log.info("Sensitive content hit word: {}, messageId = {}", hitWord.get(), msg.getMessageId());
            return Boolean.TRUE;
        }
        List<MessageRecord> messageRecordList = chatService.selectMessagesByUserId(msg.getUserId());
        ArrayNode messages = buildContentCheckArrayNode(messageRecordList, msg.getMessageId());
        Request request = openApiService.buildOpenAIRequestBody(messages);
        String reply = openApiGateway.callOpenApi(request);
        log.info("content check reply: {}, messageId={}", reply, msg.getMessageId());
        String lowerReply = reply.toLowerCase();
        if (lowerReply.contains("yes")) {
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

    private ArrayNode buildContentCheckArrayNode(List<MessageRecord> messageRecordList, Long messageId) {
        ArrayNode messages = objectMapper.createArrayNode();
        for(MessageRecord messageRecord : messageRecordList) {
            ObjectNode message = objectMapper.createObjectNode();
            if (messageRecord.getUserId().equals(CHATBOT_ID)) {
                message.put("role", "assistant");
            } else {
                message.put("role", "user");
            }
            String messageContent = messageRecord.getMessage();
            if (messageRecord.getId().equals(messageId)) {
                messageContent = "Assess whether this message contains mental health–related content " +
                        "based on other messages, and respond with 'yes' or 'no': " + messageContent;
            }
            message.put("content", messageContent);
            messages.add(message);
        }
        return messages;
    }
}
