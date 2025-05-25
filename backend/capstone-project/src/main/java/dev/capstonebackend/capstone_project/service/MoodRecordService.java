package dev.capstonebackend.capstone_project.service;


import dev.capstonebackend.capstone_project.bo.MoodRecordBo;
import dev.capstonebackend.capstone_project.dao.MoodRecordDao;
import dev.capstonebackend.capstone_project.domain.MoodRecord;
import dev.capstonebackend.capstone_project.enums.ApiMessage;
import dev.capstonebackend.capstone_project.exception.ApiException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-03-04 02:05
 **/
@Service
public class MoodRecordService {

    @Autowired
    private MoodRecordDao moodRecordDao;

    public int insertMoodRecord(MoodRecordBo bo) {
        LocalDate recordDate = bo.getRecordDate();
        Integer year = recordDate.getYear();
        Integer month = recordDate.getMonthValue();
        Integer day = recordDate.getDayOfMonth();
        MoodRecord moodRecord = MoodRecord.builder()
                .userId(bo.getUserId())
                .moodType(bo.getMoodType())
                .moodDiary(bo.getMoodDiary())
                .year(year).month(month).day(day)
                .build();
        return moodRecordDao.insertMoodRecord(moodRecord);
    }

    public List<MoodRecord> listMoodRecordByType(MoodRecordBo bo) {
        List<MoodRecord> recordList = Collections.emptyList();
        switch (bo.getQueryType()) {
            case QUERY_BY_MONTH -> {
                recordList = moodRecordDao.selectRecordByMonth(bo.getUserId(), bo.getYear(), bo.getMonth());
            }
            case QUERY_BY_YEAR -> {
                recordList = moodRecordDao.selectRecordByYear(bo.getUserId(), bo.getYear());
            }
        }
        return recordList;
    }

    public List<MoodRecord> listMoodRecordByUserId(Long userId) {
        return moodRecordDao.selectRecordByUserId(userId);
    }

}
