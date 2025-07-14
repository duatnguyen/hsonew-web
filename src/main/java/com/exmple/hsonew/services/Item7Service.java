package com.exmple.hsonew.services;

import com.exmple.hsonew.entities.Item7;
import com.exmple.hsonew.repositories.Item7Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Item7Service {
    @Autowired
    private Item7Repository item7Repository;

    public List<Item7> findAll() {
        return item7Repository.findAll();
    }

    public Optional<Item7> findById(Integer id) {
        return item7Repository.findById(id);
    }

    public Item7 save(Item7 item7) {
        return item7Repository.save(item7);
    }

    public void deleteById(Integer id) {
        item7Repository.deleteById(id);
    }
} 