package dev.capstonebackend.capstone_project.producer;


import com.fasterxml.jackson.databind.ObjectMapper;
import dev.capstonebackend.capstone_project.message.ContentCheckMessage;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.charset.StandardCharsets;


/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-05-05 17:17
 **/
@Component
public class MessagingService {
    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    KafkaTemplate<String, String> kafkaTemplate;

    public void sendContentCheckMessage(ContentCheckMessage message) throws IOException{
        send("sensitive_content_check", message);
    }

    private void send(String topic, Object msg) throws IOException {
        ProducerRecord<String, String> pr = new ProducerRecord<>(topic, objectMapper.writeValueAsString(msg));
        pr.headers().add("type", msg.getClass().getName().getBytes(StandardCharsets.UTF_8));
        kafkaTemplate.send(pr);
    }

}