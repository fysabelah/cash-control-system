package com.system.cash_control.frameworks.web;

import com.system.cash_control.interfaceadpaters.controllers.CashFlowController;
import com.system.cash_control.interfaceadpaters.presenter.dtos.CashFlowDto;
import com.system.cash_control.interfaceadpaters.presenter.dtos.CashFlowReport;
import com.system.cash_control.utils.exceptions.BusinessRuleException;
import com.system.cash_control.utils.pagination.Pagination;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Month;

@RestController
@RequestMapping(value = "/cashflow")
@Tag(name = "Movimentações de caixa")
public class CashFlowWeb {

    private final CashFlowController controller;

    public CashFlowWeb(CashFlowController controller) {
        this.controller = controller;
    }

    @PostMapping
    @Operation(description = "Inserir movimentação")
    public ResponseEntity<Void> insert(@Valid @RequestBody CashFlowDto dto) throws BusinessRuleException {
        controller.insert(dto);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping(value = "/{id}")
    @Operation(description = "Atualizar movimentação")
    public ResponseEntity<CashFlowDto> update(@PathVariable Integer id, @Valid @RequestBody CashFlowDto dto) {
        return ResponseEntity.ok(controller.update(id, dto));
    }

    @DeleteMapping(value = "/{id}")
    @Operation(description = "Excluir movimentação")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        controller.delete(id);

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping
    @Operation(description = "Buscar movimentações")
    public ResponseEntity<CashFlowReport> findAll(@Parameter(description = "Tamanho da página") @RequestParam(required = false) Integer pageSize,
                                                    @Parameter(description = "Página") @RequestParam(required = false) Integer initialPage,
                                                    @Parameter(description = "Identificador do caixa") @RequestParam Integer cashierId,
                                                    @Parameter(description = "Mês") @RequestParam(required = false) Month month,
                                                    @Parameter(description = "Ano") @RequestParam(required = false) @Pattern(regexp = "[0-9]{4}") String year
    ) {
        Pagination page = new Pagination(initialPage, pageSize);

        return ResponseEntity.ok(controller.findAll(page, cashierId, month, year));
    }
}
