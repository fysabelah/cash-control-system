package com.system.cash_control.interfaceadpaters.controllers;

import com.system.cash_control.entities.Cashier;
import com.system.cash_control.interfaceadpaters.gateway.CashierGateway;
import com.system.cash_control.interfaceadpaters.presenter.CashierDto;
import com.system.cash_control.interfaceadpaters.presenter.CashierPresenter;
import com.system.cash_control.utils.exceptions.BusinessRuleException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class CashierController {

    private final CashierPresenter presenter;

    private final CashierGateway gateway;

    private final CashierFlowController cashierFlowController;

    @Autowired
    public CashierController(CashierPresenter presenter, CashierGateway gateway, CashierFlowController cashierFlowController) {
        this.presenter = presenter;
        this.gateway = gateway;
        this.cashierFlowController = cashierFlowController;
    }

    @Transactional
    public CashierDto insert(CashierDto dto) throws BusinessRuleException {
        Cashier cashier = presenter.convert(dto);

        cashier = gateway.insert(cashier);

        cashierFlowController.createFirstCash(cashier);

        return presenter.convert(cashier);
    }

    public CashierDto findById(Integer id) {
        return presenter.convert(gateway.findById(id));
    }

    @Transactional
    public CashierDto update(Integer id, CashierDto dto) throws BusinessRuleException {
        Cashier cashier = gateway.findById(id);

        cashier.setDescription(dto.description());

        if (!cashier.getOpeningBalance().equals(dto.balance())) {
            cashierFlowController.updateFirstCashFlow(cashier.getId(), dto.balance());
        }

        cashier.setOpeningBalance(dto.balance());

        cashier = gateway.update(cashier);

        return presenter.convert(cashier);
    }

    public void delete(Integer id) {
        Cashier cashier = gateway.findById(id);

        gateway.delete(cashier);
    }
}
