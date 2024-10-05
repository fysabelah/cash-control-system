package com.system.cash_control.entities;

import com.system.cash_control.utils.enums.CashFlowType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "movimentacao")
@AllArgsConstructor
@NoArgsConstructor
public class CashFlow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Temporal(value = TemporalType.TIMESTAMP)
    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "descricao")
    private String description;

    @Column(name = "valor")
    private BigDecimal value;

    @Enumerated(value = EnumType.STRING)
    private CashFlowType type;

    @ManyToOne(optional = false)
    @JoinColumn(name = "caixa_id")
    private Cashier cashier;
}
