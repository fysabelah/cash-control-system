package com.system.cash_control.frameworks.db;

import com.system.cash_control.entities.CashFlow;
import com.system.cash_control.utils.exceptions.BusinessRuleException;

import java.math.BigDecimal;
import java.time.Month;
import java.util.Map;

interface CashFlowRepositoryCustom {

    CashFlow findFlowOfCashierCreation(Integer cashierId) throws BusinessRuleException;

    Map<String, BigDecimal> getCashFlowValues(Integer cashierId, Month month, String year);
}
