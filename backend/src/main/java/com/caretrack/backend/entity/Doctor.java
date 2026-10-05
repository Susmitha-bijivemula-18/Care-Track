package com.caretrack.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.hibernate.annotations.CreationTimestamp;

@Data
@Entity
@Table(name = "doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String specialization;

    @Column(nullable = false)
    private String qualification = "";

    @Column(name = "experience_years", nullable = false)
    private Integer experienceYears = 0;

    @Column(name = "consultation_fee")
    private BigDecimal consultationFee = new BigDecimal("500.00");

    @Column(name = "available_days", columnDefinition = "text[]")
    private List<String> availableDays;

    @Column(name = "available_from")
    private LocalTime availableFrom = LocalTime.of(9, 0);

    @Column(name = "available_to")
    private LocalTime availableTo = LocalTime.of(17, 0);

    @Column(name = "is_active")
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
