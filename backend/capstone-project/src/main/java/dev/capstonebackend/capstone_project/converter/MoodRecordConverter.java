package dev.capstonebackend.capstone_project.converter;


import dev.capstonebackend.capstone_project.bo.MoodRecordBo;
import dev.capstonebackend.capstone_project.domain.MoodRecord;
import dev.capstonebackend.capstone_project.enums.MoodRecordQueryType;
import dev.capstonebackend.capstone_project.request.MoodRecordListReqBody;
import dev.capstonebackend.capstone_project.request.MoodRecordReqBody;
import dev.capstonebackend.capstone_project.vo.MoodRecordVo;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-03-04 01:55
 **/
public class MoodRecordConverter {

    public static MoodRecordBo moodRecordReqToBo(MoodRecordReqBody reqBody) {
        return MoodRecordBo.builder()
                .userId(reqBody.getUserId())
                .moodType(reqBody.getMoodType())
                .moodDiary(reqBody.getMoodDiary())
                .recordDate(reqBody.getRecordDate())
                .build();
    }

    public static MoodRecordBo moodRecordListReqToBo(MoodRecordListReqBody recordListReqBody) {
        return MoodRecordBo.builder()
                .userId(recordListReqBody.getUserId())
                .moodId(recordListReqBody.getMoodId())
                .queryType(MoodRecordQueryType.getQueryType(recordListReqBody.getQueryType()))
                .month(recordListReqBody.getMonth())
                .year(recordListReqBody.getYear())
                .build();
    }

    public static MoodRecordVo moodRecordToVo(MoodRecord moodRecord) {
        return MoodRecordVo.builder()
                .moodId(moodRecord.getId())
                .userId(moodRecord.getUserId())
                .moodType(moodRecord.getMoodType())
                .moodDiary(moodRecord.getMoodDiary())
                .year(moodRecord.getYear())
                .month(moodRecord.getMonth())
                .day(moodRecord.getDay())
                .createdAt(moodRecord.getCreatedAt())
                .modifiedAt(moodRecord.getModifiedAt())
                .build();
    }
}
