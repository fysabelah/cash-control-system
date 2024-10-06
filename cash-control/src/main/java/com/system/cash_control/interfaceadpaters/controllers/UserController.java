package com.system.cash_control.interfaceadpaters.controllers;

import com.system.cash_control.entities.User;
import com.system.cash_control.interfaceadpaters.gateway.UserGateway;
import com.system.cash_control.interfaceadpaters.presenter.dtos.UserDto;
import com.system.cash_control.usercase.UserBusiness;
import com.system.cash_control.utils.exceptions.BusinessRuleException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Optional;

@Component
public class UserController {

    private final UserGateway gateway;

    private final UserBusiness business;

    @Autowired
    public UserController(UserGateway gateway, UserBusiness business) {
        this.gateway = gateway;
        this.business = business;
    }

    public void insert(UserDto userDto) throws BusinessRuleException {
        Optional<User> alreadySaved = gateway.findByUsername(userDto.username());

        User user = business.createUser(alreadySaved, userDto);

        gateway.insert(user);
    }

    public String getToken(String authorization) throws BusinessRuleException {
        if (authorization == null || authorization.isBlank()) {
            throw new BusinessRuleException("MISSING_AUTHORIZATION_HEADER");
        }

        String decodedAuthorization = new String(Base64.getDecoder().decode(authorization));

        String username = decodedAuthorization.split(" ")[0];

        return null;
    }
}
