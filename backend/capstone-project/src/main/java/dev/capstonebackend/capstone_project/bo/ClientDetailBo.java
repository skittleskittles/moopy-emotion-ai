package dev.capstonebackend.capstone_project.bo;


import dev.capstonebackend.capstone_project.domain.*;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-04-27 01:22
 **/
@Builder
@Getter
public class ClientDetailBo {

    private User user;

    private List<SurveyBO> surveyBOList;

    private List<MessageRecord> messageRecordList;

    private UserConnectionBo connection;

    private List<MoodRecord> moodRecordList;



}
