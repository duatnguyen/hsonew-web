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
@Table(name = "item4")
public class Item4 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "icon")
    private Integer icon;

    @Column(name = "price")
    private Long price;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "content", length = 255)
    private String content;

    @Column(name = "typepotion")
    private Integer typepotion;

    @Column(name = "moneytype")
    private Integer moneytype;

    @Column(name = "sell")
    private Integer sell;

    @Column(name = "value")
    private Integer value;

    @Column(name = "canTrade")
    private Integer canTrade;
} 