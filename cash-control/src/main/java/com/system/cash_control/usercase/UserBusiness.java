package com.system.cash_control.usercase;

import com.system.cash_control.entities.User;
import com.system.cash_control.interfaceadpaters.presenter.dtos.UserDto;
import com.system.cash_control.utils.exceptions.BusinessRuleException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserBusiness {

    private final BCryptPasswordEncoder cryptPasswordEncoder;

    public UserBusiness(BCryptPasswordEncoder cryptPasswordEncoder) {
        this.cryptPasswordEncoder = cryptPasswordEncoder;
    }

    public User createUser(Optional<User> userSaved, UserDto userDto) throws BusinessRuleException {
        if (userSaved.isPresent()) {
            throw new BusinessRuleException("USER_ALREADY_USER");
        }

        return new User(
                userDto.username(),
                cryptPasswordEncoder.encode(userDto.password())
        );
    }
}
