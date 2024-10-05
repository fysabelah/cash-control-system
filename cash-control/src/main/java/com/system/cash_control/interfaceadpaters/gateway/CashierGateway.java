package com.system.cash_control.interfaceadpaters.gateway;

import com.system.cash_control.entities.Cashier;
import com.system.cash_control.frameworks.db.CashierRepository;
import com.system.cash_control.utils.MessageUtil;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class CashierGateway {

    private final CashierRepository repository;

    public CashierGateway(CashierRepository repository) {
        this.repository = repository;
    }

    public Cashier insert(Cashier cashier) {
        cashier.setDeleted(false);

        cashier = repository.save(cashier);

        return cashier;
    }

    public Cashier findById(Integer id) {
        return findByIdOptional(id)
                .orElseThrow(() ->
                        new NoSuchElementException(MessageUtil.getMessage("CASHIER_NOT_FOUND", id.toString())));
    }

    public Optional<Cashier> findByIdOptional(Integer id) {
        return repository.findByIdAndDeleted(id, false);
    }

    public void delete(Cashier cashier) {
        cashier.setDeleted(true);

        repository.save(cashier);
    }

    public Cashier update(Cashier cashier) {
        return repository.save(cashier);
    }
}
