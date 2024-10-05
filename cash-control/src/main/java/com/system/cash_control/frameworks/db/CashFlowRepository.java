package com.system.cash_control.frameworks.db;

import com.system.cash_control.entities.CashFlow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CashFlowRepository extends JpaRepository<CashFlow, Integer> {
}
