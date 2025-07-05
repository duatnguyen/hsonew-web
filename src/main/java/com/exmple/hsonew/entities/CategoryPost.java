package com.exmple.hsonew.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryPost {
    @Id
    @Column(length = 20)
    private String id;

    @Column(nullable = false, length = 100)
    private String label;

    @Column(length = 10)
    private String icon;
}
