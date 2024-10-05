package com.system.cash_control.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "caixa")
@AllArgsConstructor
@NoArgsConstructor
public class Cashier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "descricao")
    private String description;

    @Column(name = "saldoInicial", precision = 15, scale = 4)
    private BigDecimal openingBalance;
}
