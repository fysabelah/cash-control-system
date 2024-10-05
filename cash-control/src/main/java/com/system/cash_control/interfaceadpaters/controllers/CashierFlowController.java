package com.system.cash_control.interfaceadpaters.controllers;

import com.system.cash_control.entities.CashFlow;
import com.system.cash_control.entities.Cashier;
import com.system.cash_control.interfaceadpaters.gateway.CashFlowGateway;
import com.system.cash_control.utils.enums.CashFlowType;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Clock;
import java.time.LocalDateTime;

@Component
public class CashierFlowController {

    private final Clock clock;

    private final CashFlowGateway gateway;

    private static final String CASHIER_OPPENING_MESSAGE = "Abertura do caixa";

    public CashierFlowController(Clock clock, CashFlowGateway cashFlowGateway) {
        this.clock = clock;
        this.gateway = cashFlowGateway;
    }

    public void createFirstCash(Cashier cashier) {
        CashFlow cashFlow = CashFlow.builder()
                .cashier(cashier)
                .date(LocalDateTime.now(clock))
                .value(cashier.getOpeningBalance())
                .type(CashFlowType.E)
                .description(CASHIER_OPPENING_MESSAGE)
                .build();

        gateway.insert(cashFlow);
    }

    public void updateFirstCashFlow(Integer id, BigDecimal balance) {
        // TODO criar implementação da atualização da saldo inicial
    }
}
