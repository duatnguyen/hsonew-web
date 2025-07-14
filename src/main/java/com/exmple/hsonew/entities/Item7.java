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
@Table(name = "item7")
public class Item7 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "imgid")
    private Integer imgid;

    @Column(name = "price")
    private Long price;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "content", length = 1000)
    private String content;

    @Column(name = "type")
    private Integer type;

    @Column(name = "pricetype")
    private Integer pricetype;

    @Column(name = "sell")
    private Integer sell;

    @Column(name = "value")
    private Integer value;

    @Column(name = "trade")
    private Integer trade;

    @Column(name = "setcolorname")
    private Integer setcolorname;
} 