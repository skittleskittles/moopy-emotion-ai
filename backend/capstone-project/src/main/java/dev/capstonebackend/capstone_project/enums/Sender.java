package dev.capstonebackend.capstone_project.enums;

import lombok.Getter;

@Getter
public enum Sender {

    CHATBOT(0, "机器人"),
    USER(1, "用户");

    private Integer sender;

    private String desc;

    Sender(Integer sender, String desc) {}
}
