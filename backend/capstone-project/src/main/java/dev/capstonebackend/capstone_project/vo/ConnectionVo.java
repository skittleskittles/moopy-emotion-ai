package dev.capstonebackend.capstone_project.vo;


import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-04-21 02:06
 **/
@Builder
@Setter
@Getter
public class ConnectionVo {

    private Long therapistId;

    private String therapistName;

    private String therapistCode;

    private Long clientId;

    private String clientName;

    private String clientCode;

    private Date connectDate;

    private Date lastActiveDate;


}
