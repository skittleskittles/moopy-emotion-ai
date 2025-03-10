package dev.capstonebackend.capstone_project.dao;

import dev.capstonebackend.capstone_project.domain.MessageRecord;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface MessageRecordDao {

    int batchInsert(@Param("messageList")List<MessageRecord> messageList);

    List<MessageRecord> selectByConversationId(@Param("conversationId") Long conversationId);

    int insertMessage(MessageRecord messageRecord);

    List<MessageRecord> selectMessagesByConversationIds(@Param("list") List<Long> conversationIdList);

    List<MessageRecord> selectRecentMessages(@Param("list") List<Long> conversationIdList);

}
