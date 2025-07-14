package com.exmple.hsonew.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "item3")
public class Item3 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "type")
    private Integer type;

    @Column(name = "part")
    private Integer part;

    @Column(name = "clazz")
    private Integer clazz;

    @Column(name = "iconid")
    private Integer iconid;

    @Column(name = "level")
    private Integer level;

    @Column(name = "data", length = 255)
    private String data;

    @Column(name = "color")
    private Integer color;
} 