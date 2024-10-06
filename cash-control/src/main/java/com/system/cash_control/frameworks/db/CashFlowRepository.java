package com.system.cash_control.frameworks.db;

import com.system.cash_control.entities.CashFlow;
import com.system.cash_control.utils.enums.CashFlowType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface CashFlowRepository extends JpaRepository<CashFlow, Integer>, CashFlowRepositoryCustom {

    @Query("SELECT SUM(mov.value) FROM CashFlow AS mov WHERE mov.cashier.id = ?1 AND mov.type = ?2")
    Optional<BigDecimal> calculateCashFlowByType(Integer cashierId, CashFlowType type);

    Optional<CashFlow> findByIdAndCashierId(Integer cashierId, Integer cashierId1);
}
