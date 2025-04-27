package dev.capstonebackend.capstone_project.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Data
@Getter
@Setter
@ApiModel(value = "userVo", description = "Basic info of the user")
public class UserVo {

    private Long id;
    private String username;
    private String token;
    private String userCode;
    private Integer role;

}
