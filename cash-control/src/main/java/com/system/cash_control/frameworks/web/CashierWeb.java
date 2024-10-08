package com.system.cash_control.frameworks.web;

import com.system.cash_control.interfaceadpaters.controllers.CashierController;
import com.system.cash_control.interfaceadpaters.presenter.dtos.CashierDto;
import com.system.cash_control.utils.exceptions.BusinessRuleException;
import com.system.cash_control.utils.pagination.PagedResult;
import com.system.cash_control.utils.pagination.Pagination;
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
    public ResponseEntity<CashierDto> insert(@Valid @RequestBody CashierDto cashier) throws BusinessRuleException {
        return ResponseEntity.ok(controller.insert(cashier));
    }

    @GetMapping(value = "/{id}")
    @Operation(description = "Buscar caixa por identificador")
    public ResponseEntity<CashierDto> findById(@Parameter(description = "Identificador do caixa") @PathVariable Integer id) {
        return ResponseEntity.ok(controller.findById(id));
    }

    @PutMapping(value = "/{id}")
    @Operation(description = "Atualizar informações do caixa")
    public ResponseEntity<CashierDto> update(@Parameter(description = "Identificador do caixa") @PathVariable Integer id,
                                             @Valid @RequestBody CashierDto dto) throws BusinessRuleException {
        return ResponseEntity.ok(controller.update(id, dto));
    }

    @DeleteMapping(value = "/{id}")
    @Operation(description = "Deletar caixa")
    public ResponseEntity<Void> delete(@Parameter(description = "Identificador do caixa") @PathVariable Integer id) {
        controller.delete(id);

        return ResponseEntity.noContent().build();
    }

    @Operation(description = "Recuperar caixas")
    @GetMapping
    public ResponseEntity<PagedResult<CashierDto>> findAll(@Parameter(description = "Tamanho da página") @RequestParam(required = false) Integer pageSize,
                                                           @Parameter(description = "Página") @RequestParam(required = false) Integer initialPage,
                                                           @Parameter(description = "Identificador do caixa") @RequestParam(required = false) Integer cashierId,
                                                           @Parameter(description = "Descrição") @RequestParam(required = false) String description) {
        Pagination page = new Pagination(initialPage, pageSize);

        return ResponseEntity.ok(controller.findAll(page, cashierId, description));

    }
}
