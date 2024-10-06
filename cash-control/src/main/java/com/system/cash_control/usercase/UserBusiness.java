package com.system.cash_control.usercase;

import com.system.cash_control.entities.User;
import com.system.cash_control.interfaceadpaters.presenter.dtos.LoginDto;
import com.system.cash_control.interfaceadpaters.presenter.dtos.UserDto;
import com.system.cash_control.utils.exceptions.BusinessRuleException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Component;

import java.time.Clock;
import java.time.Instant;
import java.util.Base64;
import java.util.Optional;

@Component
public class UserBusiness {

    private final BCryptPasswordEncoder cryptPasswordEncoder;

    private final Clock clock;

    @Value("${jwt.expiration.time}")
    private Long jwtExpirationTime;

    @Value("${spring.application.name}")
    private String authority;

    private final JwtEncoder jwtEncoder;

    public UserBusiness(BCryptPasswordEncoder cryptPasswordEncoder, Clock clock, JwtEncoder jwtEncoder) {
        this.cryptPasswordEncoder = cryptPasswordEncoder;
        this.clock = clock;
        this.jwtEncoder = jwtEncoder;
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

    public void validateUserProvide(String encodePassword, Optional<User> optional) throws BusinessRuleException {
        if (optional.isEmpty()) {
            throw new BusinessRuleException("USER_NOT_FOUND");
        }

        String decodePassword = new String(Base64.getDecoder().decode(encodePassword));

        if (!cryptPasswordEncoder.matches(decodePassword, optional.get().getPassword())) {
            throw new BusinessRuleException("WRONG_USER_OR_PASSWORD");
        }
    }

    public LoginDto createToken(String username) {
        Instant creationDate = Instant.now(clock);
        Instant expiredDateTime = creationDate.plusSeconds(jwtExpirationTime);

        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer(authority)
                .subject(username)
                .issuedAt(creationDate)
                .expiresAt(expiredDateTime)
                .claim("scope", "ADMIN")
                .build();

        return new LoginDto(
                jwtEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue(),
                jwtExpirationTime
        );
    }
}
