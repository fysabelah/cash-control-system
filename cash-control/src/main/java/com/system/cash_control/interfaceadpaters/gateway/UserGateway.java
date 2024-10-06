package com.system.cash_control.interfaceadpaters.gateway;

import com.system.cash_control.entities.User;
import com.system.cash_control.frameworks.db.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserGateway {

    private final UserRepository repository;

    public UserGateway(UserRepository repository) {
        this.repository = repository;
    }

    public Optional<User> findByUsername(String username) {
        return repository.findById(username);
    }

    public void insert(User user) {
        repository.save(user);
    }
}
