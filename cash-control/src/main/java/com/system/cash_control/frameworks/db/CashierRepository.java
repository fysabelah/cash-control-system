package com.system.cash_control.frameworks.db;

import com.system.cash_control.entities.Cashier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CashierRepository extends JpaRepository<Cashier, Integer> {
}
