package com.exmple.hsonew.entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Ranking {

    @Id
    private int id;

    @Column(name = "name")
    private String name;


    @Column(name =  "level")
    private int level;

    @Column(name = "point_nap_save")
    private int pointNapSave;

    @Column(name = "point_san_boss")
    private int pointSanBoss;

}
