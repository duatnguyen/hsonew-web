package com.exmple.hsonew.repositories;

import com.exmple.hsonew.entities.Item3;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Item3Repository extends JpaRepository<Item3, Integer> {
} 