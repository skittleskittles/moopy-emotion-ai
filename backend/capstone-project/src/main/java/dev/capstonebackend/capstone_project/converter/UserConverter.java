package dev.capstonebackend.capstone_project.converter;


import dev.capstonebackend.capstone_project.bo.UserConnectionBo;
import dev.capstonebackend.capstone_project.vo.ConnectionVo;

import java.util.ArrayList;
import java.util.List;

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
                    .build();
            connectionVoList.add(connectionVo);
        }
        return connectionVoList;
    }
}
