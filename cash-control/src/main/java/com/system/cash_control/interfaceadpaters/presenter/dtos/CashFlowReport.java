package com.system.cash_control.interfaceadpaters.presenter.dtos;

import com.system.cash_control.utils.pagination.PagedResult;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CashFlowReport {

    private PagedResult<CashFlowDto> cashFlow;

    private CashFlowResumedDto cashFlowWithFilters;

    private CashFlowResumedDto cashFlowWithGeneral;

}
