package com.system.cash_control.utils.configs;

import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.encrypt.KeyStoreKeyFactory;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Base64;

@Configuration
public class AuthenticationConfig {

    @Value("${JWT_DECODE}")
    private String jwtEncodePairKeys;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtEncoder jwtEncoder() {
        KeyStoreKeyFactory keyFactory = getKeyStoreKeyFactory();

        RSAPrivateKey privateKey = (RSAPrivateKey) keyFactory.getKeyPair("jwt-key").getPrivate();
        RSAPublicKey publicKey = (RSAPublicKey) keyFactory.getKeyPair("jwt-key").getPublic();

        JWK jwk = new RSAKey.Builder(publicKey).privateKey(privateKey).build();

        JWKSource<SecurityContext> jwkSource = new ImmutableJWKSet<>(new JWKSet(jwk));

        return new NimbusJwtEncoder(jwkSource);
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        KeyStoreKeyFactory keyFactory = getKeyStoreKeyFactory();

        RSAPublicKey publicKey = (RSAPublicKey) keyFactory.getKeyPair("jwt-key").getPublic();

        return NimbusJwtDecoder.withPublicKey(publicKey).build();
    }

    private KeyStoreKeyFactory getKeyStoreKeyFactory() {
        String decodePassword = new String(Base64.getDecoder().decode(jwtEncodePairKeys));

        return new KeyStoreKeyFactory(
                new ClassPathResource("jwt.jks"),
                decodePassword.toCharArray()
        );
    }
}
