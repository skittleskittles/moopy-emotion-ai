package dev.capstonebackend.capstone_project.exception;


import dev.capstonebackend.capstone_project.enums.ApiMessage;

public class ApiException extends RuntimeException{

    private final Integer code;
    private Object data;

    public ApiException(ApiMessage apiMessage) {
        super(apiMessage.getMsg());
        this.code = apiMessage.getCode();
    }

    public Integer getCode() {return code;}
    public Object getData() {return data;}

}

