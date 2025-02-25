package dev.capstonebackend.capstone_project.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import dev.capstonebackend.capstone_project.config.OpenApi;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class OpenApiService {
    @Autowired
    private OpenApi openAIConfig;

    private final OkHttpClient httpClient = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();


    public OpenApi callGPT() {
        String apiKey = openAIConfig.getApiKey();
        String url = openAIConfig.getUrl();
        return null;
    }

    public String chatWithGPT(String prompt) {
        try {
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
                return jsonNode.get("choices").get(0).get("message").get("content").asText();
            }
        } catch (Exception e) {
            throw new RuntimeException("调用OpenAI API异常：" + e.getMessage(), e);
        }
    }
}


