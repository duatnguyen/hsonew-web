package com.exmple.hsonew.controllers;

import com.exmple.hsonew.entities.Item7;
import com.exmple.hsonew.services.Item7Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/item7s")
public class Item7Controller {
    @Autowired
    private Item7Service item7Service;

    @GetMapping("")
    public ResponseEntity<List<Item7>> getAllItem7s() {
        return ResponseEntity.ok(item7Service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item7> getItem7ById(@PathVariable Integer id) {
        Optional<Item7> item7 = item7Service.findById(id);
        return item7.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("")
    public ResponseEntity<Item7> createItem7(@RequestBody Item7 item7) {
        Item7 saved = item7Service.save(item7);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Item7> updateItem7(@PathVariable Integer id, @RequestBody Item7 item7) {
        if (!item7Service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        item7.setId(id);
        Item7 updated = item7Service.save(item7);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem7(@PathVariable Integer id) {
        if (!item7Service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        item7Service.deleteById(id);
        return ResponseEntity.noContent().build();
    }
} 