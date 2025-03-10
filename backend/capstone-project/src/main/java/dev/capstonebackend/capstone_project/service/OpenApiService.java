package dev.capstonebackend.capstone_project.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dev.capstonebackend.capstone_project.bo.ChatBo;
import dev.capstonebackend.capstone_project.config.OpenApi;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class OpenApiService {
    @Autowired
    private OpenApi openAIConfig;

    @Autowired
    private ChatService chatService;

    private final OkHttpClient httpClient = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();


    public OpenApi callGPT() {
        String apiKey = openAIConfig.getApiKey();
        String url = openAIConfig.getUrl();
        return null;
    }

    public String chatWithGPT(String prompt, ChatBo chatBo) {
        try {
            int promptResult = chatService.saveMessageContent(chatBo);
            if (promptResult == -1) {
                log.error("Failed to save prompt message");
            }
            String apiKey = openAIConfig.getApiKey();

            ObjectNode requestBody = objectMapper.createObjectNode();
            requestBody.put("model", "gpt-4o");

            ArrayNode messages = objectMapper.createArrayNode();
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

            try (Response response = httpClient.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    throw new RuntimeException("调用OpenAI API失败：" + response);
                }
                JsonNode jsonNode = objectMapper.readTree(response.body().string());
                String reply = jsonNode.get("choices").get(0).get("message").get("content").asText();
                ChatBo replyBo = ChatBo.builder()
                        .userId(chatBo.getUserId())
                        .conversationId(chatBo.getConversationId())
                        .message(reply)
                        .build();
                int replyResult = chatService.saveMessageContent(replyBo);
                if (replyResult == -1) {
                    log.error("Failed to save reply message");
                }
                return jsonNode.get("choices").get(0).get("message").get("content").asText();
            }
        } catch (Exception e) {
            throw new RuntimeException("调用OpenAI API异常：" + e.getMessage(), e);
        }
    }
}


