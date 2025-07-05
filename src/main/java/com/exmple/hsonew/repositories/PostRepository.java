package com.exmple.hsonew.repositories;

import com.exmple.hsonew.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Integer> {
} 