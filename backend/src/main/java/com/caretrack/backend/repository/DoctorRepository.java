package com.caretrack.backend.repository;

import com.caretrack.backend.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface DoctorRepository extends JpaRepository<Doctor, UUID> {
    List<Doctor> findByIsActiveTrueOrderByFullNameAsc();
    List<Doctor> findByIsActiveTrueAndSpecializationOrderByFullNameAsc(String specialization);
}
