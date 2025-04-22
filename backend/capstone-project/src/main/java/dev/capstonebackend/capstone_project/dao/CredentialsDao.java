package dev.capstonebackend.capstone_project.dao;

import dev.capstonebackend.capstone_project.domain.Credentials;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CredentialsDao {

    int insertCredential(Credentials credentials);

    Credentials selectById(Long id);

    Credentials selectByUserId(String userId);
}
