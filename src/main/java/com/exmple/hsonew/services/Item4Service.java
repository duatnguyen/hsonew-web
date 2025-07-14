package com.exmple.hsonew.services;

import com.exmple.hsonew.entities.Item4;
import com.exmple.hsonew.repositories.Item4Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Item4Service {
    @Autowired
    private Item4Repository item4Repository;

    public List<Item4> findAll() {
        return item4Repository.findAll();
    }

    public Optional<Item4> findById(Integer id) {
        return item4Repository.findById(id);
    }

    public Item4 save(Item4 item4) {
        return item4Repository.save(item4);
    }

    public void deleteById(Integer id) {
        item4Repository.deleteById(id);
    }
} 