package dev.capstonebackend.capstone_project.dao;

import dev.capstonebackend.capstone_project.domain.QuestionRecord;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface QuestionRecordDao {

    int insertQuestionRecord(QuestionRecord questionRecord);


}
