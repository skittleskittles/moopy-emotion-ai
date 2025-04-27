package dev.capstonebackend.capstone_project.vo;


import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-04-26 23:40
 **/
@Data
@Getter
@Setter
@ApiModel(value = "ClientDetailVo", description = "Clients Activities Aggregation")
public class ClientDetailVo {

    private Long userId;

    private String username;

    private String fullName;

    private Integer score;

    private Date connectedDate;

    private Date lastLoginDate;

    private List<ConversationVo> conversationList;

    private List<MoodRecordVo> moodRecordList;

}
