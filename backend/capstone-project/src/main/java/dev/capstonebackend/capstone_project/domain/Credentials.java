package dev.capstonebackend.capstone_project.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Credentials {
    private Long id;
    private Long userId;
    private String fullName;
    private String licenseType;
    private String licenseNumber;
    private String issuingState;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
    private Date licenseExpirationDate;
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Date createdAt;
}
