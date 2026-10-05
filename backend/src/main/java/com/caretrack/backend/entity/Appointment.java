package com.caretrack.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@Entity
@Table(name = "appointments")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "patient_name", nullable = false)
    private String patientName;

    @Column(name = "patient_age", nullable = false)
    private Integer patientAge;

    @Column(name = "patient_email", nullable = false)
    private String patientEmail = "";

    @Column(name = "patient_phone", nullable = false)
    private String patientPhone = "";

    @Column(name = "problem_description", nullable = false)
    private String problemDescription = "";

    @Column(name = "problem_category", nullable = false)
    private String problemCategory = "";

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "doctor_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Doctor doctor;

    @Column(name = "appointment_date", nullable = false)
    private LocalDate appointmentDate = LocalDate.now();

    @Column(nullable = false)
    private String status = "pending";

    @Column(name = "token_number", nullable = false)
    private String tokenNumber = "";

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
