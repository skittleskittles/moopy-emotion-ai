package dev.capstonebackend.capstone_project.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import dev.capstonebackend.capstone_project.domain.User;

import java.util.List;

@Repository
public interface UserDao {

    int insertUser(User record);
    User selectUserById(@Param("id") Long userId);
    User selectUserByUserName(@Param("username") String username);
    int updateUser(User record);
    int deleteUserByUserName(@Param("username") String username);
    User selectUserByToken(@Param("token") String token);
    User selectUserByCode(@Param("userCode") String userCode);

    List<User> selectUserByIdList(@Param("idList") List<Long> idList);


}

