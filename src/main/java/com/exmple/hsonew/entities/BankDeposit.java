package com.exmple.hsonew.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bank_deposits")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BankDeposit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "transaction_id", nullable = false, length = 100)
    private String transactionId;

    @Column(name = "content_id", nullable = false, length = 100)
    private String contentId;

    @Column(name = "user_id", nullable = false, length = 50)
    private String userId;

    @Column(name = "user_account", nullable = false, length = 100)
    private String userAccount;

    @Column(name = "amount", nullable = false)
    private Integer amount;

    @Column(name = "deposit_date")
    private LocalDateTime depositDate;

    @Column(name = "status")
    private Byte status;

    @Column(name = "note", columnDefinition = "text")
    private String note;
} 