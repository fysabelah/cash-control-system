package com.system.cash_control.entities;

import com.system.cash_control.utils.exceptions.BusinessRuleException;
import jakarta.persistence.*;
import jakarta.xml.bind.ValidationException;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "caixa")
@NoArgsConstructor
@Getter
public class Cashier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter
    private Integer id;

    @Column(name = "descricao")
    private String description;

    @Column(name = "saldoInicial", precision = 15, scale = 4)
    private BigDecimal openingBalance;

    @Column
    @Setter
    private boolean deleted;

    public Cashier(Integer id, String description, BigDecimal openingBalance) throws BusinessRuleException {
        this.id = id;
        setDescription(description);
        setOpeningBalance(openingBalance);
    }

    public void setDescription(String description) throws BusinessRuleException {
        if (description == null || description.isBlank()) {
            throw new BusinessRuleException("DESCRIPTION_CAN_NOT_BE_EMPTY");
        }

        this.description = description;
    }

    public void setOpeningBalance(BigDecimal openingBalance) throws BusinessRuleException {
        if (openingBalance == null) {
            throw new BusinessRuleException("BALANCE_IS_MANDATORY");
        }

        this.openingBalance = openingBalance;
    }
}
