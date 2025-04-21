package dev.capstonebackend.capstone_project.dao;

import dev.capstonebackend.capstone_project.domain.UserConnection;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserConnectionDao {

    int insertUserConnection(UserConnection userConnection);

    int deleteUserConnection(@Param("therapistId") Long therapistId, @Param("clientId") Long clientId);
}
