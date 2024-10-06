package com.system.cash_control.interfaceadpaters.presenter.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

@JsonIgnoreProperties(value = {"id"}, allowGetters = true, ignoreUnknown = true)
public record CashierDto(
        @Schema(accessMode = Schema.AccessMode.READ_ONLY)
        Integer id,

        @NotBlank
        @Schema(example = "Caixa da entrada")
        String description,

        @PositiveOrZero
        @Schema(example = "500")
        @NotNull
        BigDecimal balance
) {
}
