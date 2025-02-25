package dev.capstonebackend.capstone_project.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@ApiModel(value = "OpenApiReqBody", description =  "open api request body")
public class OpenApiReqBody {

    @ApiModelProperty(example = "What color is your Mclaren 600lt", value = "message", required = true)
    private String message;

}
