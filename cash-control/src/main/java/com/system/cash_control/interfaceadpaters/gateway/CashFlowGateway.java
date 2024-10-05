package com.system.cash_control.interfaceadpaters.gateway;

import com.system.cash_control.entities.CashFlow;
import com.system.cash_control.frameworks.db.CashFlowRepository;
import org.springframework.stereotype.Service;

@Service
public class CashFlowGateway {

    private final CashFlowRepository repository;

    public CashFlowGateway(CashFlowRepository repository) {
        this.repository = repository;
    }

    public void insert(CashFlow cashFlow) {
        repository.save(cashFlow);
    }
}
