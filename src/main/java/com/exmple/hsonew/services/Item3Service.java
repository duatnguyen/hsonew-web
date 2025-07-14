package com.exmple.hsonew.services;

import com.exmple.hsonew.entities.Item3;
import com.exmple.hsonew.repositories.Item3Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Item3Service {
    @Autowired
    private Item3Repository item3Repository;

    public List<Item3> findAll() {
        return item3Repository.findAll();
    }

    public Optional<Item3> findById(Integer id) {
        return item3Repository.findById(id);
    }

    public Item3 save(Item3 item3) {
        return item3Repository.save(item3);
    }

    public void deleteById(Integer id) {
        item3Repository.deleteById(id);
    }
} 