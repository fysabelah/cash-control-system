package com.system.cash_control.frameworks.db;

import com.system.cash_control.entities.CashFlow;
import com.system.cash_control.utils.enums.CashFlowType;
import com.system.cash_control.utils.exceptions.BusinessRuleException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.time.Month;

interface CashFlowRepositoryCustom {

    CashFlow findFlowOfCashierCreation(Integer cashierId) throws BusinessRuleException;

    BigDecimal getCashFlowValues(Integer cashierId, Month month, String year, CashFlowType type);

    Page<CashFlow> findAll(Pageable pageable, Integer cashierId, Month month, String year);
}
