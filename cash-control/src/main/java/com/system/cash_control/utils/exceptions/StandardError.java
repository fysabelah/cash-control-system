package com.system.cash_control.utils.exceptions;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public class StandardError {

    private LocalDateTime time;

    private int statusCode;

    private String error;

    private String message;

    private String path;
}
