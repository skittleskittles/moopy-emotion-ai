package dev.capstonebackend.capstone_project.bo;


import lombok.Builder;
import lombok.Getter;

import java.util.Date;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-04-21 21:48
 **/
@Builder
@Getter
public class UserConnectionBo {
    private Long therapistId;

    private String therapistName;

    private String therapistCode;

    private Long clientId;

    private String clientName;

    private String clientCode;

    private Date connectDate;

    private Date lastLoginDate;
}
