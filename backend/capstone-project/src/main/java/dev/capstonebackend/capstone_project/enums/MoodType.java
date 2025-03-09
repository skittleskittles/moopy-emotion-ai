package dev.capstonebackend.capstone_project.enums;

public enum MoodType {

    HAPPY(1, "happy"),
    SAD(2, "sad");


    private Integer type;

    private String desc;

    MoodType(Integer type, String desc) {
        this.type = type;
        this.desc = desc;
    }
}
