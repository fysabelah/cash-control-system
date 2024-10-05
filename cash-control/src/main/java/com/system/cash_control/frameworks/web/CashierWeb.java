package com.system.cash_control.frameworks.web;

import com.system.cash_control.interfaceadpaters.controllers.CashierController;
import com.system.cash_control.interfaceadpaters.presenter.CashierDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/cashier")
@Tag(name = "Caixa")
public class CashierWeb {

    private final CashierController controller;

    public CashierWeb(CashierController controller) {
        this.controller = controller;
    }

    @PostMapping
    @Operation(description = "Cadastrar caixa")
    public ResponseEntity<CashierDto> insert(@Valid @RequestBody CashierDto cashier) {
        return ResponseEntity.ok(controller.insert(cashier));
    }

    @GetMapping(value = "/{id}")
    @Operation(description = "Buscar caixa por identificador")
    public ResponseEntity<CashierDto> findById(@Parameter(description = "Identificador do caixa") @PathVariable Integer id) {
        return ResponseEntity.ok(controller.findById(id));
    }

    @PutMapping(value = "/{id}")
    @Operation(description = "Atualizar informações do caixa. O saldo inicial não é alterado")
    public ResponseEntity<CashierDto> update(@Parameter(description = "Identificador do caixa") @PathVariable Integer id,
                                             @Valid @RequestBody CashierDto dto) {
        return ResponseEntity.ok(controller.update(id, dto));
    }

    @DeleteMapping(value = "/{id}")
    @Operation(description = "Deletar caixa")
    public ResponseEntity<Void> delete(@Parameter(description = "Identificador do caixa") @PathVariable Integer id) {
        controller.delete(id);

        return ResponseEntity.noContent().build();
    }
}
