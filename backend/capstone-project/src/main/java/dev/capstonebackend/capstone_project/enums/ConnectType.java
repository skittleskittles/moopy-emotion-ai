package dev.capstonebackend.capstone_project.enums;

import lombok.Getter;

@Getter
public enum ConnectType {

    CLIENT_CONNECT_WITH_THERAPIST(1, "client connect therapist"),
    THERAPIST_CONNECT_WITH_CLIENT(2, "therapist connect client");

    private Integer type;

    private String desc;

    ConnectType(Integer type, String desc) {
        this.type = type;
        this.desc = desc;
    }

    public static ConnectType getConnectType(Integer type) {
        for (ConnectType connectType : ConnectType.values()) {
            if (connectType.type.equals(type)) {
                return connectType;
            }
        }
        return null;
    }
}
