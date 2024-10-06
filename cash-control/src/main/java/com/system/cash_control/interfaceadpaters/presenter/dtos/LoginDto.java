package com.system.cash_control.interfaceadpaters.presenter.dtos;

import io.swagger.v3.oas.annotations.media.Schema;

public record LoginDto(
        String token,
        @Schema(description = "Tempo de expiração em segundos") Long expirationTime) {
}
