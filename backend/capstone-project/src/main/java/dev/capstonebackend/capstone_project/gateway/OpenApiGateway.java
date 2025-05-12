package dev.capstonebackend.capstone_project.gateway;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.capstonebackend.capstone_project.config.OpenApi;
import lombok.extern.slf4j.Slf4j;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-05-10 21:38
 **/
@Slf4j
@Service
public class OpenApiGateway {

    @Autowired
    private OpenApi openAIConfig;

    private final OkHttpClient httpClient = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String callOpenApi(Request request) {
        try{
            Response response = httpClient.newCall(request).execute();
            if (!response.isSuccessful()) {
                throw new RuntimeException("调用OpenAI API失败：" + response);
            }
            JsonNode jsonNode = objectMapper.readTree(response.body().string());
            String reply = jsonNode.get("choices").get(0).get("message").get("content").asText();
            return reply;
        } catch (Exception e) {
            log.error("Call Open AI API failed, trace:", e);
        }
        return Strings.EMPTY;
    }


}
