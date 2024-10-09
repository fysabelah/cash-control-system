package com.system.cash_control.interfaceadpaters.presenter;

import com.system.cash_control.entities.Cashier;
import com.system.cash_control.interfaceadpaters.presenter.dtos.CashierDto;
import com.system.cash_control.utils.exceptions.BusinessRuleException;
import com.system.cash_control.utils.pagination.PagedResult;
import com.system.cash_control.utils.pagination.Pagination;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

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

    public PagedResult<CashierDto> convert(Page<Cashier> result) {
        Pagination pagination = new Pagination(result.getNumber(), result.getSize(), result.getTotalPages());

        List<CashierDto> data = result.get()
                .map(this::convert)
                .toList();

        return new PagedResult<>(pagination, data);
    }
}
