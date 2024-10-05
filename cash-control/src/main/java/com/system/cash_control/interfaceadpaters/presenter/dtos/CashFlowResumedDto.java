package com.system.cash_control.interfaceadpaters.presenter.dtos;

import com.system.cash_control.utils.enums.CashFlowType;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.Map;

@Getter
public class CashFlowResumedDto {

    private BigDecimal cashInflow;

    private BigDecimal cashOutflow;

    private BigDecimal balanceGeneral;

    public CashFlowResumedDto(Map<CashFlowType, BigDecimal> report) {
        this.cashInflow = report.get(CashFlowType.E);
        this.cashOutflow = report.get(CashFlowType.S);
        this.balanceGeneral = this.cashInflow.subtract(this.cashOutflow);
    }
}
