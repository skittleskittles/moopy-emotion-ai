package dev.capstonebackend.capstone_project.request;


import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-04-26 23:21
 **/
@Data
@Getter
@Setter
@ApiModel(value = "ListConnectionReqBody", description =  "")
public class GetClientDetailReqBody {

    private Long clientId;

    private Long therapistId;

}
