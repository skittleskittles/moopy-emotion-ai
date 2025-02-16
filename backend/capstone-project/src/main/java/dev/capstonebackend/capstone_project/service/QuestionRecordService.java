package dev.capstonebackend.capstone_project.service;


import dev.capstonebackend.capstone_project.dao.QuestionRecordDao;
import dev.capstonebackend.capstone_project.dao.UserDao;
import dev.capstonebackend.capstone_project.domain.QuestionRecord;
import dev.capstonebackend.capstone_project.domain.User;
import dev.capstonebackend.capstone_project.enums.ApiMessage;
import dev.capstonebackend.capstone_project.exception.ApiException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @program: Capstone_Project
 * @author: Yiyan Kong
 * @create: 2025-02-16 00:44
 **/
@Slf4j
@Service
public class QuestionRecordService {

    @Autowired
    private QuestionRecordDao questionRecordDao;

    @Autowired
    private UserDao userDao;

    public int insertQuestionRecord(Long userId, Integer score) {
        User existUser = userDao.selectUserById(userId);
        if (existUser == null) {
            log.info("User with id {} does not exist", userId);
            throw new ApiException(ApiMessage.INVALID_USER_ID);
        }
        QuestionRecord questionRecord = QuestionRecord.builder().userId(userId).score(score).build();
        return questionRecordDao.insertQuestionRecord(questionRecord);
    }
}
