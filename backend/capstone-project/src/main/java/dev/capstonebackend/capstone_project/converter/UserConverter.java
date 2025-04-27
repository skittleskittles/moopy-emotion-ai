package dev.capstonebackend.capstone_project.converter;


import dev.capstonebackend.capstone_project.bo.ClientDetailBo;
import dev.capstonebackend.capstone_project.bo.UserConnectionBo;
import dev.capstonebackend.capstone_project.domain.QuestionRecord;
import dev.capstonebackend.capstone_project.domain.User;
import dev.capstonebackend.capstone_project.domain.UserConnection;
import dev.capstonebackend.capstone_project.vo.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-04-21 21:58
 **/
public class UserConverter {

    public static List<ConnectionVo> connectionBoToVo(List<UserConnectionBo> connectionBoList) {
        List<ConnectionVo> connectionVoList = new ArrayList<>();
        for (UserConnectionBo connectionBo : connectionBoList) {
            ConnectionVo connectionVo = ConnectionVo.builder()
                    .therapistId(connectionBo.getTherapistId())
                    .therapistCode(connectionBo.getTherapistCode())
                    .therapistName(connectionBo.getTherapistName())
                    .clientId(connectionBo.getClientId())
                    .clientName(connectionBo.getClientName())
                    .clientId(connectionBo.getClientId())
                    .clientCode(connectionBo.getClientCode())
                    .connectDate(connectionBo.getConnectDate())
                    .lastActiveDate(connectionBo.getLastLoginDate())
                    .build();
            connectionVoList.add(connectionVo);
        }
        return connectionVoList;
    }

    public static ClientDetailVo clientDetailBoToVo(ClientDetailBo clientDetailBo) {
        ClientDetailVo clientDetailVo = new ClientDetailVo();
        clientDetailVo.setUserId(clientDetailBo.getUser().getId());
        clientDetailVo.setUsername(clientDetailBo.getUser().getUsername());
        clientDetailVo.setFullName(clientDetailBo.getUser().getFullName());
        clientDetailVo.setScore(Optional.ofNullable(clientDetailBo.getLatestRecord())
                .map(QuestionRecord::getScore).orElse(0));
        clientDetailVo.setConnectedDate(clientDetailBo.getConnection().getConnectDate());
        clientDetailVo.setLastLoginDate(clientDetailBo.getUser().getLastLoginAt());
        List<ChatVo> voList = Optional.ofNullable(clientDetailBo.getMessageRecordList()).orElse(Collections.emptyList())
                .stream().map(ChatConverter::messageRecordToVo).toList();
        List<ConversationVo> conversationVoList = ChatConverter.messageVoToConversationVo(voList);
        clientDetailVo.setConversationList(conversationVoList);
        List<MoodRecordVo> recordVoList = Optional.ofNullable(clientDetailBo.getMoodRecordList())
                .orElse(Collections.emptyList()).stream().map(MoodRecordConverter::moodRecordToVo).toList();
        clientDetailVo.setMoodRecordList(recordVoList);
        return clientDetailVo;
    }
}
