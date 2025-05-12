package dev.capstonebackend.capstone_project.message;

import lombok.Getter;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-05-05 16:41
 **/
@Getter
public class ContentCheckMessage extends AbstractMessage{

    private Long userId;

    private Long messageId;

    private String checkContent;

    public static ContentCheckMessage of(Long userId, String checkContent, Long messageId) {
        var checkMessage = new ContentCheckMessage();
        checkMessage.checkContent = checkContent;
        checkMessage.userId = userId;
        checkMessage.messageId = messageId;
        checkMessage.timestamp = System.currentTimeMillis();
        return checkMessage;
    }

    @Override
    public String toString() {
        return String.format("[ContentCheckMessage: checkContent=%s, userId=%s, timestamp=%s]", checkContent, userId, timestamp);
    }
}
