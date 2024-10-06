package com.system.cash_control.utils.configs;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    private static final String SCHEME_NAME = "bearerAuth";

    @Bean
    public OpenAPI apiDocConfig() {
        return new OpenAPI()
                .info(
                        new Info()
                                .title("Sistema de Controle de Caixa")
                                .description("API para cadastro de usuário e gerencimento de caixa.")
                                .version("1.0.0")
                ).addSecurityItem(
                        new SecurityRequirement().addList(SCHEME_NAME)
                ).components(
                        new Components()
                                .addSecuritySchemes(SCHEME_NAME, new SecurityScheme()
                                        .name(SCHEME_NAME)
                                        .type(SecurityScheme.Type.HTTP)
                                        .bearerFormat("JWT")
                                        .in(SecurityScheme.In.HEADER)
                                        .scheme("bearer")
                                )
                );
    }

    @Bean
    public GroupedOpenApi groupedOpenApi() {
        return GroupedOpenApi.builder()
                .group("Controle de Caixa")
                .packagesToScan("com.system.cash_control.frameworks.web")
                .build();
    }
}
