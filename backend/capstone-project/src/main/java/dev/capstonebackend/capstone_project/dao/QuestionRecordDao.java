package dev.capstonebackend.capstone_project.dao;

import dev.capstonebackend.capstone_project.domain.QuestionRecord;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface QuestionRecordDao {

    int insertQuestionRecord(QuestionRecord questionRecord);

    List<QuestionRecord> selectUserRecord(@Param("userId") Long userId);


}
