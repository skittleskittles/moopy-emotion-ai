package dev.capstonebackend.capstone_project.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dev.capstonebackend.capstone_project.bo.ChatBo;
import dev.capstonebackend.capstone_project.config.OpenApi;
import dev.capstonebackend.capstone_project.constant.ChatConstant;
import dev.capstonebackend.capstone_project.domain.MessageRecord;
import dev.capstonebackend.capstone_project.enums.Sender;
import dev.capstonebackend.capstone_project.vo.ChatVo;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
public class OpenApiService {
    @Autowired
    private OpenApi openAIConfig;

    @Autowired
    private ChatService chatService;

    private final OkHttpClient httpClient = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final Long CHATBOT_ID = 0L;


    public OpenApi callGPT() {
        String apiKey = openAIConfig.getApiKey();
        String url = openAIConfig.getUrl();
        return null;
    }

    public ChatVo chatWithGPT(String prompt, ChatBo chatBo) {
        try {
            List<MessageRecord> historicalMessageList = chatService.selectRecentMessages(chatBo.getConversationId());
            int promptResult = chatService.saveMessageContent(chatBo);
            if (promptResult == -1) {
                log.error("Failed to save prompt message");
            }
            String apiKey = openAIConfig.getApiKey();
            ObjectNode requestBody = objectMapper.createObjectNode();
            requestBody.put("model", "gpt-4o");
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
            ObjectNode message = objectMapper.createObjectNode();
            message.put("role", "user");
            message.put("content", prompt);
            messages.add(message);
            requestBody.set("messages", messages);
            Request request = new Request.Builder()
                    .url("https://api.openai.com/v1/chat/completions")
                    .addHeader("Authorization", "Bearer " + apiKey)
                    .addHeader("Content-Type", "application/json")
                    .post(RequestBody.create(requestBody.toString(), MediaType.parse("application/json")))
                    .build();
            if (prompt.equals(ChatConstant.FIXED_PROMPT)) {
                String reply = ChatConstant.AUTO_REPLY;
                ChatBo replyBo = ChatBo.builder()
                        // chatbot userid默认为0
                        .userId(CHATBOT_ID)
                        .conversationId(chatBo.getConversationId())
                        .message(reply)
                        .sender(Sender.CHATBOT.getSender())
                        .build();
                int replyResult = chatService.saveMessageContent(replyBo);
                if (replyResult == -1) {
                    log.error("Failed to save reply message");
                }
                try {
                    Thread.sleep(500);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                ChatVo chatVo = ChatVo.builder()
                        .message(replyBo.getMessage())
                        .userId(replyBo.getUserId())
                        .conversationId(replyBo.getConversationId())
                        .sender(chatBo.getSender())
                        .build();
                return chatVo;
            }
            try (Response response = httpClient.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    throw new RuntimeException("调用OpenAI API失败：" + response);
                }
                JsonNode jsonNode = objectMapper.readTree(response.body().string());
                String reply = jsonNode.get("choices").get(0).get("message").get("content").asText();
                ChatBo replyBo = ChatBo.builder()
                        // chatbot userid默认为0
                        .userId(CHATBOT_ID)
                        .conversationId(chatBo.getConversationId())
                        .message(reply)
                        .sender(Sender.CHATBOT.getSender())
                        .build();
                int replyResult = chatService.saveMessageContent(replyBo);
                if (replyResult == -1) {
                    log.error("Failed to save reply message");
                }
                ChatVo chatVo = ChatVo.builder()
                        .message(replyBo.getMessage())
                        .userId(replyBo.getUserId())
                        .conversationId(replyBo.getConversationId())
                        .sender(chatBo.getSender())
                        .build();
                return chatVo;
            }
        } catch (Exception e) {
            throw new RuntimeException("调用OpenAI API异常：" + e.getMessage(), e);
        }
    }
}


