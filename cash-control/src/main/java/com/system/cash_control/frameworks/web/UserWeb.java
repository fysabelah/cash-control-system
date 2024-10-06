package com.system.cash_control.frameworks.web;

import com.system.cash_control.interfaceadpaters.controllers.UserController;
import com.system.cash_control.interfaceadpaters.presenter.dtos.UserDto;
import com.system.cash_control.utils.exceptions.BusinessRuleException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/user")
public class UserWeb {

    private UserController controller;

    @PostMapping
    public ResponseEntity<Void> insert(@Valid @RequestBody UserDto user) throws BusinessRuleException {
        controller.insert(user);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<String> getToken(@RequestHeader(value = "Authorization") String header) {
        return ResponseEntity.ok(controller.getToken(header));
    }
}
