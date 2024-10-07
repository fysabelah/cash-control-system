package com.system.cash_control.interfaceadpaters.gateway;

import com.system.cash_control.entities.Cashier;
import com.system.cash_control.frameworks.db.CashierRepository;
import com.system.cash_control.utils.MessageUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public Page<Cashier> findAll(Integer cashierId, String description, Pageable pageable) {
        if (cashierId != null && description != null && !description.isBlank()) {
            return repository.findAllByIdAndDescription(cashierId, description.toUpperCase(), pageable);
        }

        if (cashierId != null) {
            return repository.findById(cashierId, pageable);
        }

        if (description != null && !description.isBlank()) {
            return repository.findByDescriptionLike(description.toUpperCase(), pageable);
        }

        return repository.findAll(pageable);
    }
}
