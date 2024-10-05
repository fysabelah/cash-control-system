package com.system.cash_control.interfaceadpaters.controllers;

import com.system.cash_control.entities.CashFlow;
import com.system.cash_control.entities.Cashier;
import com.system.cash_control.interfaceadpaters.gateway.CashFlowGateway;
import com.system.cash_control.interfaceadpaters.gateway.CashierGateway;
import com.system.cash_control.interfaceadpaters.presenter.CashFlowPresenter;
import com.system.cash_control.interfaceadpaters.presenter.dtos.CashFlowDto;
import com.system.cash_control.interfaceadpaters.presenter.dtos.CashFlowReport;
import com.system.cash_control.utils.enums.CashFlowType;
import com.system.cash_control.utils.exceptions.BusinessRuleException;
import com.system.cash_control.utils.pagination.Pagination;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Clock;
import java.time.LocalDate;
import java.time.Month;
import java.util.Optional;

@Component
public class CashFlowController {

    private final Clock clock;

    private final CashFlowGateway gateway;

    private final CashFlowPresenter presenter;

    private final CashierGateway cashierGateway;

    private static final String CASHIER_OPENING_MESSAGE = "Abertura do caixa";

    public CashFlowController(Clock clock, CashFlowGateway cashFlowGateway, CashFlowPresenter presenter, CashierGateway cashierGateway) {
        this.clock = clock;
        this.gateway = cashFlowGateway;
        this.presenter = presenter;
        this.cashierGateway = cashierGateway;
    }

    public void createFirstCash(Cashier cashier) {
        CashFlow cashFlow = CashFlow.builder()
                .cashier(cashier)
                .value(cashier.getOpeningBalance())
                .type(CashFlowType.E)
                .description(CASHIER_OPENING_MESSAGE)
                .build();

        insert(cashFlow);
    }

    public void insert(CashFlowDto dto) throws BusinessRuleException {
        CashFlow cashFlow = presenter.convert(dto);

        Optional<Cashier> cashier = cashierGateway.findByIdOptional(cashFlow.getCashier().getId());

        if (cashier.isEmpty()) {
            throw new BusinessRuleException("CASH_FLOW_CASHIER_NOT_FOUND");
        }

        insert(cashFlow);
    }

    private void insert(CashFlow cashFlow) {
        cashFlow.setDate(LocalDate.now(clock));

        gateway.insert(cashFlow);
    }

    public void updateFirstCashFlow(Integer id, BigDecimal balance) {
        // TODO criar implementação da atualização da saldo inicial
    }

    public CashFlowDto update(Integer id, CashFlowDto dto) {
        return null;
    }

    public void delete(Integer id) {

    }

    public CashFlowReport findAll(Pagination page, Integer cashierId, Month month, String year) {
        return null;
    }
}
