import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { BookAppointment } from './pages/BookAppointment';
import { AppointmentForm } from './pages/AppointmentForm';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';

const Placeholder = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center h-64 border-2 border-dashed border-border rounded-xl">
    <div className="text-center">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="text-muted-foreground mt-2">This page is under construction.</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/book-appointment/:doctorId" element={<AppointmentForm />} />
        
        {/* Patient Dashboard Routes */}
        <Route path="/patient" element={<AppLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="doctors" element={<Placeholder title="Find Doctors" />} />
          <Route path="appointments" element={<Placeholder title="Appointments" />} />
          <Route path="queue" element={<Placeholder title="Queue Tracking" />} />
          <Route path="records" element={<Placeholder title="Medical Records" />} />
          <Route path="history" element={<Placeholder title="Health History" />} />
          <Route path="notifications" element={<Placeholder title="Notifications" />} />
          <Route path="profile" element={<Placeholder title="Patient Profile" />} />
          <Route path="settings" element={<Placeholder title="Settings" />} />
        </Route>

        {/* Catch-all to redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
