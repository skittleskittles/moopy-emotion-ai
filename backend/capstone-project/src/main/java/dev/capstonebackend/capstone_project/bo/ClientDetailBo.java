package dev.capstonebackend.capstone_project.bo;


import dev.capstonebackend.capstone_project.domain.MessageRecord;
import dev.capstonebackend.capstone_project.domain.MoodRecord;
import dev.capstonebackend.capstone_project.domain.QuestionRecord;
import dev.capstonebackend.capstone_project.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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

    private QuestionRecord latestRecord;

    private List<MessageRecord> messageRecordList;

    private UserConnectionBo connection;

    private List<MoodRecord> moodRecordList;

}
