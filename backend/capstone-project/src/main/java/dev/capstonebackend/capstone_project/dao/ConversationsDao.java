package dev.capstonebackend.capstone_project.dao;

import dev.capstonebackend.capstone_project.domain.Conversation;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ConversationsDao {

    int insertNewConversation(Conversation conversation);

    List<Conversation> selectByUserId(@Param("user_id")Long userId);


}
