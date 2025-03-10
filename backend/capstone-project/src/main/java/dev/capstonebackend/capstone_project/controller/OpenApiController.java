package dev.capstonebackend.capstone_project.controller;

import dev.capstonebackend.capstone_project.bo.ChatBo;
import dev.capstonebackend.capstone_project.converter.ChatConverter;
import dev.capstonebackend.capstone_project.domain.MessageRecord;
import dev.capstonebackend.capstone_project.domain.Result;
import dev.capstonebackend.capstone_project.enums.ApiMessage;
import dev.capstonebackend.capstone_project.request.OpenApiReqBody;
import dev.capstonebackend.capstone_project.service.ChatService;
import dev.capstonebackend.capstone_project.service.OpenApiService;
import dev.capstonebackend.capstone_project.util.ResultUtil;
import dev.capstonebackend.capstone_project.vo.ChatVo;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@Api(tags = {"OpenApi Module"})
@RequestMapping("/api")
@CrossOrigin // allow frontend running on different port
@Slf4j
public class OpenApiController {

    @Autowired
    private OpenApiService openApiService;

    @Autowired
    private ChatService chatService;

    @PostMapping("/chat")
    public Result<?> chat(@RequestBody OpenApiReqBody apiReqBody) {
        String prompt = apiReqBody.getMessage();
        ChatBo bo = ChatConverter.openApiReqBodyToBo(apiReqBody);
        return ResultUtil.success(openApiService.chatWithGPT(prompt, bo));
    }

    @PostMapping("/messageList")
    public Result<?> retrieveMessage(@RequestBody OpenApiReqBody apiReqBody) {
        if (!retrieveParamCheck(apiReqBody)) {
            log.info("Invalid request, recordReqBody={}", apiReqBody.toString());
            return ResultUtil.error(ApiMessage.ILLEGAL_PARAMS);
        }
        List<MessageRecord> messageList = chatService.selectMessagesByUserId(apiReqBody.getUserId());
        List<ChatVo> voList = Optional.ofNullable(messageList).orElse(Collections.emptyList())
                .stream().map(ChatConverter::messageRecordToVo).toList();
        return ResultUtil.success(ChatConverter.messageVoToConversationVo(voList));

    }

    @PostMapping("/save")
    public Result<?> saveMessage(@RequestBody OpenApiReqBody apiReqBody) {
        if (!saveParamCheck(apiReqBody)) {
            log.info("Invalid request, recordReqBody={}", apiReqBody.toString());
            return ResultUtil.error(ApiMessage.ILLEGAL_PARAMS);
        }
        ChatBo bo = ChatConverter.openApiReqBodyToBo(apiReqBody);
        int result = chatService.saveMessageContent(bo);
        return ResultUtil.success(bo.getConversationId());
    }

    private Boolean retrieveParamCheck(OpenApiReqBody apiReqBody) {
        if (Objects.isNull(apiReqBody) || Objects.isNull(apiReqBody.getUserId())) {
            return Boolean.FALSE;
        }
        return Boolean.TRUE;
    }

    private Boolean saveParamCheck(OpenApiReqBody apiReqBody) {
        if (Objects.isNull(apiReqBody) || Objects.isNull(apiReqBody.getUserId())) {
            return Boolean.FALSE;
        }
        if (StringUtils.isEmpty(apiReqBody.getMessage())) {
            return Boolean.FALSE;
        }
        return Boolean.TRUE;
    }

}
