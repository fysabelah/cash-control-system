package com.system.cash_control.interfaceadpaters.presenter;

import com.system.cash_control.entities.CashFlow;
import com.system.cash_control.entities.Cashier;
import com.system.cash_control.interfaceadpaters.presenter.dtos.CashFlowDto;
import com.system.cash_control.interfaceadpaters.presenter.dtos.CashFlowResumedDto;
import com.system.cash_control.utils.enums.CashFlowType;
import com.system.cash_control.utils.pagination.PagedResult;
import com.system.cash_control.utils.pagination.Pagination;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

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

    public PagedResult<CashFlowDto> convert(Page<CashFlow> result) {
        Pagination pagination = new Pagination(result.getNumber(), result.getSize(), result.getTotalPages());

        List<CashFlowDto> data = result.get().map(this::convert)
                .toList();

        return new PagedResult<>(pagination, data);
    }

    public CashFlowResumedDto convert(Map<CashFlowType, BigDecimal> values) {
        return new CashFlowResumedDto(values);
    }
}
