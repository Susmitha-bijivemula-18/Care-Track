package com.caretrack.backend.controller;

import com.caretrack.backend.entity.Appointment;
import com.caretrack.backend.entity.Doctor;
import com.caretrack.backend.repository.AppointmentRepository;
import com.caretrack.backend.repository.DoctorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentController(AppointmentRepository appointmentRepository, DoctorRepository doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.doctorRepository = doctorRepository;
    }

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAllByOrderByCreatedAtDesc();
    }

    @PostMapping
    public ResponseEntity<?> createAppointment(@RequestBody Appointment appointment) {
        if (appointment.getDoctor() == null || appointment.getDoctor().getId() == null) {
            return ResponseEntity.badRequest().body("Doctor is required");
        }
        
        Optional<Doctor> doctorOpt = doctorRepository.findById(appointment.getDoctor().getId());
        if (doctorOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Doctor not found");
        }
        
        appointment.setDoctor(doctorOpt.get());
        
        // Generate Token Number e.g. A-12
        char prefix = (char) ('A' + Math.random() * 26);
        int number = (int) (Math.random() * 99) + 1;
        appointment.setTokenNumber(String.format("%c-%02d", prefix, number));
        appointment.setStatus("pending");
        
        Appointment saved = appointmentRepository.save(appointment);
        return ResponseEntity.ok(saved);
    }
}
