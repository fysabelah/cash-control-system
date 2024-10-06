package com.system.cash_control.frameworks.db;

import com.system.cash_control.entities.CashFlow;
import com.system.cash_control.utils.enums.CashFlowType;
import com.system.cash_control.utils.exceptions.BusinessRuleException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.criteria.*;
import org.hibernate.query.sqm.tree.domain.SqmEntityValuedSimplePath;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.time.Month;
import java.util.ArrayList;
import java.util.List;

class CashFlowRepositoryCustomImpl implements CashFlowRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    private static final String ALIAS_CASHIER = "cashier";

    @Override
    public CashFlow findFlowOfCashierCreation(Integer cashierId) throws BusinessRuleException {
        String sql = "SELECT mov " +
                "FROM CashFlow AS mov " +
                "WHERE mov.id = (SELECT MIN(mov.id) FROM CashFlow AS mov WHERE mov.cashier.id = " + cashierId + ")";

        Query query = entityManager.createQuery(sql, CashFlow.class);

        try {
            return (CashFlow) query.getSingleResult();
        } catch (NoResultException exception) {
            throw new BusinessRuleException("CASHIER_UPDATE_FIRST_CASH_FLOW_NOT_FOUND");
        }
    }

    @Override
    public BigDecimal getCashFlowValues(Integer cashierId, Month month, String year, CashFlowType type) {
        String sql = "SELECT SUM(mov.value) " +
                "FROM CashFlow AS mov " +
                "WHERE mov.cashier.id = " + cashierId +
                " AND mov.type = " + type;

        if (month != null) {
            sql += " AND EXTRACT(MONTH FROM mov.date) = " + month.getValue();
        }

        if (year != null && !year.isBlank()) {
            sql += " AND EXTRACT(YEAR FROM mov.date) = " + year;
        }

        Query query = entityManager.createQuery(sql, BigDecimal.class);

        BigDecimal result = (BigDecimal) query.getSingleResult();

        return result == null ? BigDecimal.ZERO : result;
    }

    @Override
    public Page<CashFlow> findAll(Pageable pageable, Integer cashierId, Month month, String year) {
        List<CashFlow> data = getCashFlows(pageable, cashierId, month, year);

        Long total = countCashFlows(cashierId, month, year);

        return new PageImpl<>(data, pageable, total);
    }

    private Long countCashFlows(Integer cashierId, Month month, String year) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Long> criteriaQuery = criteriaBuilder.createQuery(Long.class);
        Root<CashFlow> cashFlowRoot = criteriaQuery.from(CashFlow.class);
        Selection<Object> alias = cashFlowRoot.get(ALIAS_CASHIER).alias(ALIAS_CASHIER);

        Predicate finalPredicate = getPredicates(criteriaBuilder, cashierId, month, year, cashFlowRoot, (SqmEntityValuedSimplePath) alias);
        criteriaQuery.where(finalPredicate);

        criteriaQuery.select(criteriaBuilder.count(cashFlowRoot));

        Query query = entityManager.createQuery(criteriaQuery);

        return (Long) query.getSingleResult();
    }

    private Predicate getPredicates(CriteriaBuilder criteriaBuilder, Integer cashierId, Month month, String year, Root<CashFlow> cashFlowRoot, SqmEntityValuedSimplePath alias) {
        List<Predicate> predicates = new ArrayList<>();

        predicates.add(criteriaBuilder.equal(alias.get("id"), cashierId));

        if (month != null) {
            Expression<Integer> monthExpression = criteriaBuilder.function("date_part", Integer.class,
                    criteriaBuilder.literal("MONTH"), cashFlowRoot.get("date"));

            predicates.add(criteriaBuilder.equal(monthExpression, month.getValue()));
        }

        if (year != null && !year.isBlank()) {
            Expression<Integer> yearExpression = criteriaBuilder.function("date_part", Integer.class,
                    criteriaBuilder.literal("YEAR"), cashFlowRoot.get("date"));

            predicates.add(criteriaBuilder.equal(yearExpression, year));
        }

        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }

    private List<CashFlow> getCashFlows(Pageable page, Integer cashierId, Month month, String year) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<CashFlow> criteriaQuery = criteriaBuilder.createQuery(CashFlow.class);
        Root<CashFlow> cashFlowRoot = criteriaQuery.from(CashFlow.class);
        Selection<Object> alias = cashFlowRoot.get(ALIAS_CASHIER).alias(ALIAS_CASHIER);

        Predicate finalPredicate = getPredicates(criteriaBuilder, cashierId, month, year, cashFlowRoot, (SqmEntityValuedSimplePath) alias);
        criteriaQuery.where(finalPredicate);

        criteriaQuery.select(cashFlowRoot)
                .orderBy(criteriaBuilder.asc(cashFlowRoot.get("date")));

        Query query = entityManager.createQuery(criteriaQuery)
                .setFirstResult(page.getPageNumber())
                .setMaxResults(page.getPageSize());

        return query.getResultList();
    }
}
