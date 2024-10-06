package com.system.cash_control.frameworks.web;

import com.system.cash_control.interfaceadpaters.controllers.UserController;
import com.system.cash_control.interfaceadpaters.presenter.dtos.UserDto;
import com.system.cash_control.utils.exceptions.BusinessRuleException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/user")
@Tag(name = "Usuário")
public class UserWeb {

    private final UserController controller;

    public UserWeb(UserController controller) {
        this.controller = controller;
    }

    @PostMapping
    @Operation(description = "Cadastrar usuário")
    public ResponseEntity<Void> insert(@Valid @RequestBody UserDto user) throws BusinessRuleException {
        controller.insert(user);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    @Operation(description = "Gerar token JWT")
    public ResponseEntity<String> getToken(@RequestHeader(value = HttpHeaders.AUTHORIZATION) String authorization) throws BusinessRuleException {
        return ResponseEntity.ok(controller.getToken(authorization));
    }
}
