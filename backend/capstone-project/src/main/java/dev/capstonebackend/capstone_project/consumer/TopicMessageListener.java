package dev.capstonebackend.capstone_project.consumer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-05-06 12:19
 **/
public abstract class TopicMessageListener {

    @SuppressWarnings("unchecked")
    public static <T> Class<T> getType(String type) {
        try {
            return (Class<T>) Class.forName(type);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}
