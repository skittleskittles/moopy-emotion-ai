package dev.capstonebackend.capstone_project.dao;

import dev.capstonebackend.capstone_project.domain.MoodRecord;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface MoodRecordDao {
    int insertMoodRecord(MoodRecord moodRecord);

    List<MoodRecord> selectRecordByYear(@Param("user_id")Long userId, @Param("year")Integer year);

    List<MoodRecord> selectRecordByMonth(@Param("user_id")Long userId, @Param("year")Integer year,
                                         @Param("month")Integer month);
}
