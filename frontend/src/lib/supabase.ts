const API_BASE_URL = 'http://localhost:8080/api';

// ─── Type definitions ────────────────────────────────────

export interface Doctor {
  id: string;
  full_name: string;
  specialization: string;
  qualification: string;
  experience_years: number;
  consultation_fee: number;
  available_days: string[];
  available_from: string;
  available_to: string;
  is_active: boolean;
  created_at: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientAge: number;
  patientEmail: string;
  patientPhone: string;
  problemDescription: string;
  problemCategory: string;
  doctor?: Doctor;
  appointmentDate: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  tokenNumber: string;
  createdAt: string;
}

// ─── Doctor operations ───────────────────────────────────────────────────────

export async function fetchDoctors(): Promise<Doctor[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors`);
    if (!response.ok) throw new Error('Failed to fetch doctors');
    return await response.json();
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return [];
  }
}

export async function fetchDoctorById(id: string): Promise<Doctor | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors/${id}`);
    if (!response.ok) throw new Error('Failed to fetch doctor');
    return await response.json();
  } catch (error) {
    console.error('Error fetching doctor:', error);
    return null;
  }
}

export async function fetchDoctorsBySpecialization(specialization: string): Promise<Doctor[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/doctors?specialization=${encodeURIComponent(specialization)}`);
    if (!response.ok) throw new Error('Failed to fetch doctors');
    return await response.json();
  } catch (error) {
    console.error('Error fetching doctors by specialization:', error);
    return [];
  }
}

// ─── Appointment operations ──────────────────────────────────────────────────

export async function createAppointment(appointment: {
  patient_name: string;
  patient_age: number;
  patient_email: string;
  patient_phone: string;
  problem_description: string;
  problem_category: string;
  doctor_id: string;
  appointment_date: string;
}): Promise<Appointment | null> {
  try {
    // Map snake_case to camelCase for Spring Boot backend
    const payload = {
      patientName: appointment.patient_name,
      patientAge: appointment.patient_age,
      patientEmail: appointment.patient_email,
      patientPhone: appointment.patient_phone,
      problemDescription: appointment.problem_description,
      problemCategory: appointment.problem_category,
      doctor: { id: appointment.doctor_id },
      appointmentDate: appointment.appointment_date,
    };

    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error('Failed to create appointment');
    return await response.json();
  } catch (error) {
    console.error('Error creating appointment:', error);
    return null;
  }
}

export async function fetchAppointments(): Promise<Appointment[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/appointments`);
    if (!response.ok) throw new Error('Failed to fetch appointments');
    return await response.json();
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
}

// ─── Auth operations ─────────────────────────────────────────────────────────

export async function signUp(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Signup failed');
  }
  const data = await response.json();
  localStorage.setItem('auth_token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
}

export async function signIn(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Signin failed');
  }
  const data = await response.json();
  localStorage.setItem('auth_token', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
}

export async function signOut() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user');
}

export async function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return { user: JSON.parse(userStr) };
  }
  return null;
}
