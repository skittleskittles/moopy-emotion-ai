package dev.capstonebackend.capstone_project.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-04-19 23:35
 **/
@Data
@Getter
@Setter
@ApiModel(value = "UpdateRoleReqBody", description =  "update user role request body")
public class UpdateRoleReqBody {

    @ApiModelProperty(example = "1", value = "userId", required = true)
    private Long userId;

    @ApiModelProperty(example = "1-therapist, 2-client", value = "role", required = true)
    private Integer role;

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.JSON_STYLE);
    }

}
