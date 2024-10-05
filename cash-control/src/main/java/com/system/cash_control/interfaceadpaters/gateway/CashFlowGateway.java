package com.system.cash_control.interfaceadpaters.gateway;

import com.system.cash_control.entities.CashFlow;
import com.system.cash_control.frameworks.db.CashFlowRepository;
import com.system.cash_control.utils.MessageUtil;
import com.system.cash_control.utils.enums.CashFlowType;
import com.system.cash_control.utils.exceptions.BusinessRuleException;
import com.system.cash_control.utils.pagination.Pagination;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Month;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
public class CashFlowGateway {

    private final CashFlowRepository repository;

    public CashFlowGateway(CashFlowRepository repository) {
        this.repository = repository;
    }

    public void insert(CashFlow cashFlow) {
        repository.save(cashFlow);
    }

    public CashFlow findFlowOfCashierCreation(Integer cashierId) throws BusinessRuleException {
        return repository.findFlowOfCashierCreation(cashierId);
    }

    public CashFlow update(CashFlow cashFlow) {
        return repository.save(cashFlow);
    }

    public CashFlow findById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException(MessageUtil.getMessage("CASH_FLOW_NOT_FOUND", id.toString())));
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }

    private BigDecimal calculateCashFlowByType(Integer cashierId, CashFlowType cashFlowType) {
        return repository.calculateCashFlowByType(cashierId, cashFlowType)
                .orElse(BigDecimal.ZERO);
    }

    public Map<CashFlowType, BigDecimal> getGeneralCashFlowValues(Integer cashierId) {
        Map<CashFlowType, BigDecimal> cashFlow = HashMap.newHashMap(2);

        BigDecimal generalCashIn = calculateCashFlowByType(cashierId, CashFlowType.E);
        BigDecimal generalCashOut = calculateCashFlowByType(cashierId, CashFlowType.S);

        cashFlow.put(CashFlowType.E, generalCashIn);
        cashFlow.put(CashFlowType.S, generalCashOut);

        return cashFlow;
    }

    public Map<CashFlowType, BigDecimal> getCashFlowValues(Integer cashierId, Month month, String year) {
        Map<CashFlowType, BigDecimal> cashFlow = HashMap.newHashMap(2);

        BigDecimal generalCashIn = repository.getCashFlowValues(cashierId, month, year, CashFlowType.E);
        BigDecimal generalCashOut = repository.getCashFlowValues(cashierId, month, year, CashFlowType.S);

        cashFlow.put(CashFlowType.E, generalCashIn);
        cashFlow.put(CashFlowType.S, generalCashOut);

        return cashFlow;
    }

    public Page<CashFlow> findAll(Pagination page, Integer cashierId, Month month, String year) {
        Pageable pageable = PageRequest.of(page.getPage(), page.getPageSize());

        return repository.findAll(pageable, cashierId, month, year);
    }

    public CashFlow findByIdAndCashier(Integer cashFlowId, Integer cashierId) {
        return repository.findByIdAndCashierId(cashierId, cashierId)
                .orElseThrow(() ->
                        new NoSuchElementException(MessageUtil.getMessage("CASH_FLOW_COMBINED_WITH_CASHIER_NOT_FOUND",
                                cashFlowId.toString(), cashierId.toString())));
    }
}
