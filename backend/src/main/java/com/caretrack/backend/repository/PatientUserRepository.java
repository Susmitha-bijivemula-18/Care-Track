package com.caretrack.backend.repository;

import com.caretrack.backend.entity.PatientUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface PatientUserRepository extends JpaRepository<PatientUser, UUID> {
    Optional<PatientUser> findByEmail(String email);
}
