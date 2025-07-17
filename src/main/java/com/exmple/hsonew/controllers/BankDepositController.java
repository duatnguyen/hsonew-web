package com.exmple.hsonew.controllers;

import com.exmple.hsonew.entities.BankDeposit;
import com.exmple.hsonew.services.BankDepositService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bank-deposits")
public class BankDepositController {
    @Autowired
    private BankDepositService bankDepositService;

    @GetMapping("")
    public ResponseEntity<List<BankDeposit>> getAll() {
        return ResponseEntity.ok(bankDepositService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BankDeposit> getById(@PathVariable Integer id) {
        Optional<BankDeposit> deposit = bankDepositService.findById(id);
        return deposit.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("")
    public ResponseEntity<BankDeposit> create(@RequestBody BankDeposit deposit) {
        return ResponseEntity.ok(bankDepositService.save(deposit));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BankDeposit> update(@PathVariable Integer id, @RequestBody BankDeposit deposit) {
        if (!bankDepositService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        deposit.setId(id);
        return ResponseEntity.ok(bankDepositService.save(deposit));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        if (!bankDepositService.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        bankDepositService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
} 