package dev.capstonebackend.capstone_project.request;


import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-04-21 02:04
 **/
@Data
@Getter
@Setter
@ApiModel(value = "ListConnectionReqBody", description =  "")
public class ListConnectionReqBody {

    private Long therapistId;

    private Long clientId;
}
