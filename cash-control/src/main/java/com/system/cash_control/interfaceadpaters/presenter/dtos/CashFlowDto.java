package com.system.cash_control.interfaceadpaters.presenter.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.system.cash_control.utils.enums.CashFlowType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

@JsonIgnoreProperties(value = {"id", "date"}, allowGetters = true, ignoreUnknown = true)
public record CashFlowDto(
        @Schema(accessMode = Schema.AccessMode.READ_ONLY)
        Integer id,

        @Schema(accessMode = Schema.AccessMode.READ_ONLY)
        String date,

        @NotBlank
        @Schema(example = "Pagamento Boleto")
        String description,

        @PositiveOrZero
        @Schema(example = "500")
        @NotNull
        BigDecimal value,

        @NotNull
        CashFlowType type,

        @NotNull
        Integer cashierId
) {
}
