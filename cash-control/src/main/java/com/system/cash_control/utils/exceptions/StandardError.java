package com.system.cash_control.utils.exceptions;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class StandardError {

    private LocalDateTime time;

    private int statusCode;

    private String error;

    private String message;

    private String path;
}
