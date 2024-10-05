package com.system.cash_control.utils.exceptions;

import com.system.cash_control.utils.MessageUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.NoSuchElementException;

@ControllerAdvice
public class ExceptionHandlerUtil {

    private final Clock clock;

    public ExceptionHandlerUtil(Clock clock) {
        this.clock = clock;
    }

    private StandardError setExceptionData(Integer status, String errorDescription, String path, String message) {
        return StandardError.builder()
                .statusCode(status)
                .error(errorDescription)
                .message(message)
                .path(path)
                .time(LocalDateTime.now(clock))
                .build();
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<StandardError> entityNotFound(NoSuchElementException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.NOT_FOUND;

        StandardError error = setExceptionData(status.value(), "Não encontrado", request.getRequestURI(), e.getMessage());

        return ResponseEntity.status(status).body(error);
    }

    @ExceptionHandler(BusinessRuleException.class)
    public ResponseEntity<StandardError> businessError(BusinessRuleException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;

        StandardError error = setExceptionData(status.value(), "", request.getRequestURI(), e.getMessage());

        return ResponseEntity.status(status).body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<StandardError> genericError(Exception e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        return ResponseEntity.status(status)
                .body(setExceptionData(status.value(), "Erro desconhecido", request.getRequestURI(), e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public ResponseEntity<StandardError> dtoValidations(MethodArgumentNotValidException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;

        String message;

        if (e.getFieldError() != null && e.getFieldError().getDefaultMessage() != null) {
            message = MessageUtil.getMessage(e.getFieldError().getDefaultMessage());

            if (message == null) {
                message = e.getFieldError().getField() + ": " + e.getFieldError().getDefaultMessage();
            }
        } else {
            message = e.getMessage();
        }

        return ResponseEntity.status(status)
                .body(setExceptionData(status.value(),
                        "Data Error",
                        request.getRequestURI(),
                        message
                ));
    }
}