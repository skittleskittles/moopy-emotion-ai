package dev.capstonebackend.capstone_project.enums;

import lombok.Getter;

@Getter
public enum MoodRecordQueryType {

    QUERY_BY_MONTH(1, "按月查询"),


    QUERY_BY_YEAR(2, "按年查询");

    private Integer type;

    private String desc;

    MoodRecordQueryType(Integer type, String desc) {
        this.type = type;
        this.desc = desc;
    }

    public static MoodRecordQueryType getQueryType(Integer type) {
        for (MoodRecordQueryType queryType : MoodRecordQueryType.values()) {
            if (queryType.getType().equals(type)) {
                return queryType;
            }
        }
        return null;
    }




}
