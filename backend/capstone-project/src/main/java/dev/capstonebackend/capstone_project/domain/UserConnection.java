package dev.capstonebackend.capstone_project.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-04-20 00:18
 **/
@Getter
@Setter
public class UserConnection {
    private Long id;

    private Long therapistId;

    private Long clientId;

    private String clientName;

    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date createdAt;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date modifiedAt;
}
