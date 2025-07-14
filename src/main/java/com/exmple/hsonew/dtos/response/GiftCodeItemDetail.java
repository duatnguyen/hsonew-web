package com.exmple.hsonew.dtos.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GiftCodeItemDetail {
    private Integer id;
    private String name;
    private Integer quantity;
} 