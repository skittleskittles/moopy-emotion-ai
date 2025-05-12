package dev.capstonebackend.capstone_project.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dev.capstonebackend.capstone_project.bo.ChatBo;
import dev.capstonebackend.capstone_project.config.OpenApi;
import dev.capstonebackend.capstone_project.constant.ChatConstant;
import dev.capstonebackend.capstone_project.domain.MessageRecord;
import dev.capstonebackend.capstone_project.enums.Sender;
import dev.capstonebackend.capstone_project.gateway.OpenApiGateway;
import dev.capstonebackend.capstone_project.producer.MessagingService;
import dev.capstonebackend.capstone_project.message.ContentCheckMessage;
import dev.capstonebackend.capstone_project.vo.ChatVo;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class OpenApiService {
    @Autowired
    private OpenApi openAIConfig;

    @Autowired
    private ChatService chatService;

    @Autowired
    private MessagingService messagingService;

    @Autowired
    private OpenApiGateway openApiGateway;

    private final OkHttpClient httpClient = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public static final Long CHATBOT_ID = 0L;

    @Deprecated
    public OpenApi callGPT() {
        String apiKey = openAIConfig.getApiKey();
        String url = openAIConfig.getUrl();
        return null;
    }

    public ChatVo chatWithGPT(String prompt, ChatBo chatBo) {
        try {
            int promptResult = chatService.saveMessageContent(chatBo);
            if (promptResult == -1) {
                log.error("Failed to save prompt message");
                throw new RuntimeException("Failed to save prompt message");
            }
            List<MessageRecord> historicalMessageList = chatService.selectRecentMessages(chatBo.getConversationId());
            ArrayNode messages = buildChatArrayNode(historicalMessageList);
            Request request = buildOpenAIRequestBody(messages);
            if (prompt.equals(ChatConstant.FIXED_PROMPT)) {
                return fixedPromptHandler(chatBo.getConversationId());
            }
            String reply = openApiGateway.callOpenApi(request);
            ChatBo replyBo = ChatBo.builder()
                    .userId(CHATBOT_ID)
                    .conversationId(chatBo.getConversationId())
                    .message(reply)
                    .sender(Sender.CHATBOT.getSender())
                    .build();
            int replyResult = chatService.saveMessageContent(replyBo);
            if (replyResult == -1) {
                log.error("Failed to save reply message");
            }
            ContentCheckMessage checkMessage = ContentCheckMessage.of(chatBo.getUserId(), prompt, chatBo.getMessageId());
            messagingService.sendContentCheckMessage(checkMessage);
            return ChatVo.builder()
                    .message(replyBo.getMessage())
                    .userId(replyBo.getUserId())
                    .conversationId(replyBo.getConversationId())
                    .sender(replyBo.getSender())
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("调用OpenAI API异常：" + e.getMessage(), e);
        }
    }

    public Request buildOpenAIRequestBody(ArrayNode chatArrayNode) {
        String apiKey = openAIConfig.getApiKey();
        ObjectNode requestBody = objectMapper.createObjectNode();
        requestBody.put("model", "gpt-4o");
        requestBody.set("messages", chatArrayNode);
        return new Request.Builder()
                .url("https://api.openai.com/v1/chat/completions")
                .addHeader("Authorization", "Bearer " + apiKey)
                .addHeader("Content-Type", "application/json")
                .post(RequestBody.create(requestBody.toString(), MediaType.parse("application/json")))
                .build();
    }

    private ArrayNode buildChatArrayNode(List<MessageRecord> historicalMessageList) {
        ArrayNode messages = objectMapper.createArrayNode();
        for(MessageRecord messageRecord : historicalMessageList) {
            ObjectNode message = objectMapper.createObjectNode();
            if (messageRecord.getUserId().equals(CHATBOT_ID)) {
                message.put("role", "assistant");
            } else {
                message.put("role", "user");
            }
            message.put("content", messageRecord.getMessage());
            messages.add(message);
        }
        return messages;
    }

    private ChatVo fixedPromptHandler(Long conversationId) {
        String reply = ChatConstant.AUTO_REPLY;
        ChatBo replyBo = ChatBo.builder()
                // chatbot userid默认为0
                .userId(CHATBOT_ID)
                .conversationId(conversationId)
                .message(reply)
                .sender(Sender.CHATBOT.getSender())
                .build();
        int replyResult = chatService.saveMessageContent(replyBo);
        if (replyResult == -1) {
            log.error("Failed to save fixed reply message");
        }
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return ChatVo.builder()
                .message(replyBo.getMessage())
                .userId(replyBo.getUserId())
                .conversationId(replyBo.getConversationId())
                .sender(replyBo.getSender())
                .build();
    }
}


