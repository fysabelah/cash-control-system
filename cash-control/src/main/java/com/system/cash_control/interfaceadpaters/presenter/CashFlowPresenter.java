package com.system.cash_control.interfaceadpaters.presenter;

import com.system.cash_control.entities.CashFlow;
import com.system.cash_control.entities.Cashier;
import com.system.cash_control.interfaceadpaters.presenter.dtos.CashFlowDto;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;

@Component
public class CashFlowPresenter {

    public CashFlow convert(CashFlowDto dto) {
        CashFlow cashFlow = CashFlow.builder()
                .cashier(new Cashier())
                .value(dto.value())
                .type(dto.type())
                .description(dto.description())
                .build();

        cashFlow.getCashier().setId(dto.cashierId());

        return cashFlow;
    }

    public CashFlowDto convert(CashFlow cashFlow) {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        return new CashFlowDto(
                cashFlow.getId(),
                cashFlow.getDate().format(dateTimeFormatter),
                cashFlow.getDescription(),
                cashFlow.getValue(),
                cashFlow.getType(),
                cashFlow.getCashier().getId()
        );
    }
}
