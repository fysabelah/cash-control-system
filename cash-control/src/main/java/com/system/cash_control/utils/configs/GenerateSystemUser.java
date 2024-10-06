package com.system.cash_control.utils.configs;

import com.system.cash_control.entities.User;
import com.system.cash_control.interfaceadpaters.controllers.UserController;
import com.system.cash_control.interfaceadpaters.gateway.UserGateway;
import com.system.cash_control.interfaceadpaters.presenter.dtos.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.util.Base64;
import java.util.Optional;

@Configuration
public class GenerateSystemUser implements CommandLineRunner {

    @Value("${username.system.admin}")
    private String username;

    @Value("${username.system.password}")
    private String password;

    @Autowired
    private UserGateway userGateway;

    @Autowired
    private UserController controller;


    @Override
    public void run(String... args) throws Exception {
        Optional<User> user = userGateway.findByUsername(username);

        if (user.isEmpty()) {
            String decodePassword = new String(Base64.getDecoder().decode(password));

            UserDto dto = new UserDto(username, decodePassword);

            controller.insert(dto);
        }
    }
}
