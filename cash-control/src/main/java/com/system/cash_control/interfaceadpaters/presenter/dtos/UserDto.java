package com.system.cash_control.interfaceadpaters.presenter.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

public record UserDto(
        @NotBlank
        @Schema(example = "admin")
        String username,

        @NotBlank
        @Schema(example = "admin123")
        String password
) {
}
