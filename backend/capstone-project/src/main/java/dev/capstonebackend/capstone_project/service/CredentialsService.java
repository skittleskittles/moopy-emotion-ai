package dev.capstonebackend.capstone_project.service;

import dev.capstonebackend.capstone_project.dao.CredentialsDao;
import dev.capstonebackend.capstone_project.dao.UserDao;
import dev.capstonebackend.capstone_project.domain.Credentials;
import dev.capstonebackend.capstone_project.domain.User;
import dev.capstonebackend.capstone_project.enums.ApiMessage;
import dev.capstonebackend.capstone_project.exception.ApiException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@Slf4j
public class CredentialsService {

    @Autowired
    private CredentialsDao credentialsDao;

    @Autowired
    private UserDao userDao;

    public int insertCredential(Long userId,
                                String fullName,
                                String licenseType,
                                String licenseNumber,
                                String issuingState,
                                String licenseExpirationDateStr) {
        Credentials credential = new Credentials();
        credential.setUserId(userId);
        credential.setFullName(fullName);
        credential.setLicenseType(licenseType);
        credential.setLicenseNumber(licenseNumber);
        credential.setIssuingState(issuingState);

        try {
            SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
            Date expirationDate = sdf.parse(licenseExpirationDateStr);
            credential.setLicenseExpirationDate(expirationDate);
        } catch (ParseException e) {
            e.printStackTrace();
            throw new ApiException(ApiMessage.CREDENTIAL_ERROR);
        }

        credential.setCreatedAt(new Date());
        User user = userDao.selectUserById(userId);
        user.setFullName(fullName);
        userDao.updateUser(user);
        return credentialsDao.insertCredential(credential);
    }
}
