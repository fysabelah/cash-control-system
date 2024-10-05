package com.system.cash_control.frameworks.db;

import com.system.cash_control.entities.CashFlow;
import com.system.cash_control.utils.exceptions.BusinessRuleException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.math.BigDecimal;
import java.time.Month;
import java.util.Map;

class CashFlowRepositoryCustomImpl implements CashFlowRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public CashFlow findFlowOfCashierCreation(Integer cashierId) throws BusinessRuleException {
        String sql = "SELECT * " +
                "FROM movimentacao AS mov" +
                "WHERE mov.caixa_id = " + cashierId + " AND " +
                "mov.id = (SELECT MIN(mov.id) FROM movimentacao AS mov WHERE mov.caixa_id = " + cashierId + ")";

        Query query = entityManager.createQuery(sql, CashFlow.class);

        try {
            return (CashFlow) query.getSingleResult();
        } catch (NoResultException exception) {
            throw new BusinessRuleException("CASHIER_UPDATE_FIRST_CASH_FLOW_NOT_FOUND");
        }
    }

    @Override
    public Map<String, BigDecimal> getCashFlowValues(Integer cashierId, Month month, String year) {
        return null;
    }
}
