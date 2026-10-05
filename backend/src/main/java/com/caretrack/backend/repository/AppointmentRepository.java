package com.caretrack.backend.repository;

import com.caretrack.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface AppointmentRepository extends JpaRepository<Appointment, UUID> {
    List<Appointment> findAllByOrderByCreatedAtDesc();
}
