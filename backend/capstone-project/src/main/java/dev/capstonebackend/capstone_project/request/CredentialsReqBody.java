package dev.capstonebackend.capstone_project.request;

import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@Data
@Getter
@Setter
@ApiModel(value = "CredentialsReqBody", description = "Request body for inserting credential info")
public class CredentialsReqBody {

    private String fullName;

    private String licenseType;

    private String licenseNumber;

    private String issuingState;

    private String licenseExpirationDate; // 格式应为 MM/dd/yyyy
}
