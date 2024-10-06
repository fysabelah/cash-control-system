package com.system.cash_control.entities;

import com.system.cash_control.utils.enums.CashFlowType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "movimentacao")
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class CashFlow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Temporal(value = TemporalType.DATE)
    @Column(name = "data")
    private LocalDate date;

    @Column(name = "descricao")
    private String description;

    @Column(name = "valor", precision = 15, scale = 4)
    private BigDecimal value;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "tipo")
    private CashFlowType type;

    @ManyToOne(optional = false)
    @JoinColumn(name = "caixa_id")
    private Cashier cashier;
}
