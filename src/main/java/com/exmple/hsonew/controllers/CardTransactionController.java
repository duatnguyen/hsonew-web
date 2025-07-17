package com.exmple.hsonew.controllers;

import com.exmple.hsonew.entities.CardTransaction;
import com.exmple.hsonew.services.CardTransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/card-transactions")
public class CardTransactionController {
    @Autowired
    private CardTransactionService cardTransactionService;

    @PostMapping("")
    public ResponseEntity<CardTransaction> create(@RequestBody CardTransaction cardTransaction) {
        CardTransaction saved = cardTransactionService.save(cardTransaction);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("")
    public ResponseEntity<List<CardTransaction>> getAll() {
        List<CardTransaction> list = cardTransactionService.findAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CardTransaction> getById(@PathVariable Long id) {
        Optional<CardTransaction> cardTransaction = cardTransactionService.findById(id);
        return cardTransaction.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}