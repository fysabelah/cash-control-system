package com.system.cash_control.interfaceadpaters.presenter;

import com.system.cash_control.entities.Cashier;
import com.system.cash_control.utils.exceptions.BusinessRuleException;
import org.springframework.stereotype.Component;

@Component
public class CashierPresenter {

    public Cashier convert(CashierDto dto) throws BusinessRuleException {
        return new Cashier(
                dto.id(),
                dto.description(),
                dto.balance()
        );
    }

    public CashierDto convert(Cashier entity) {
        return new CashierDto(entity.getId(),
                entity.getDescription(),
                entity.getOpeningBalance());
    }
}
