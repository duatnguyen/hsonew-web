package com.exmple.hsonew.controllers;

import com.exmple.hsonew.entities.Item3;
import com.exmple.hsonew.services.Item3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/item3s")
public class Item3Controller {
    @Autowired
    private Item3Service item3Service;

    @GetMapping("")
    public ResponseEntity<List<Item3>> getAllItem3s() {
        return ResponseEntity.ok(item3Service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item3> getItem3ById(@PathVariable Integer id) {
        Optional<Item3> item3 = item3Service.findById(id);
        return item3.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("")
    public ResponseEntity<Item3> createItem3(@RequestBody Item3 item3) {
        Item3 saved = item3Service.save(item3);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item3> updateItem3(@PathVariable Integer id, @RequestBody Item3 item3) {
        if (!item3Service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        item3.setId(id);
        Item3 updated = item3Service.save(item3);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem3(@PathVariable Integer id) {
        if (!item3Service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        item3Service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
} 