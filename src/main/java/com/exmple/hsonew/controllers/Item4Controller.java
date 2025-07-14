package com.exmple.hsonew.controllers;

import com.exmple.hsonew.entities.Item4;
import com.exmple.hsonew.services.Item4Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/item4s")
public class Item4Controller {
    @Autowired
    private Item4Service item4Service;

    @GetMapping("")
    public ResponseEntity<List<Item4>> getAllItem4s() {
        return ResponseEntity.ok(item4Service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item4> getItem4ById(@PathVariable Integer id) {
        Optional<Item4> item4 = item4Service.findById(id);
        return item4.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("")
    public ResponseEntity<Item4> createItem4(@RequestBody Item4 item4) {
        Item4 saved = item4Service.save(item4);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item4> updateItem4(@PathVariable Integer id, @RequestBody Item4 item4) {
        if (!item4Service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        item4.setId(id);
        Item4 updated = item4Service.save(item4);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem4(@PathVariable Integer id) {
        if (!item4Service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        item4Service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
} 