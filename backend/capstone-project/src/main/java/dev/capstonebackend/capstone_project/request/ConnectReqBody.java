package dev.capstonebackend.capstone_project.request;


import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-04-20 21:06
 **/
@Data
@Getter
@Setter
@ApiModel(value = "ConnectReqBody", description =  "Mood tracking request body")
public class ConnectReqBody {

    private String currentUserCode;

    private String connectCode;

    private String clientName;

    private Integer connectType;

}
