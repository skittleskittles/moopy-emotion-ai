package dev.capstonebackend.capstone_project.dao;

import dev.capstonebackend.capstone_project.domain.SurveyDetail;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SurveyDetailDao {

    int batchInsertDetail(@Param("surveyDetailList") List<SurveyDetail> surveyDetailList);

    List<SurveyDetail> selectBySurveyIdList(@Param("surveyIdList") List<Long> surveyIdList);
}
