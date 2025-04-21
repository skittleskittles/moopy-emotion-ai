package dev.capstonebackend.capstone_project.request;


import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-04-21 01:57
 **/
@Data
@Getter
@Setter
@ApiModel(value = "DisconnectReqBody", description =  "")
public class DisconnectReqBody {

    private Long therapistId;

    private Long clientId;

}
