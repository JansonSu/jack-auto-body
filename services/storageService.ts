import { Appointment } from '../types';

const STORAGE_KEY = 'jack_sun_appointments';

export const getAppointments = (): Appointment[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading from storage", error);
    return [];
  }
};

export const saveAppointment = (appointment: Appointment): boolean => {
  const current = getAppointments();
  
  // Conflict detection: Check if any existing appointment is within the same hour
  // We assume 1 hour fixed slots.
  const conflict = current.some(appt => {
    // Exact match on timestamp (since we generate slots on fixed hours)
    return appt.timestamp === appointment.timestamp;
  });

  if (conflict) {
    return false;
  }

  const updated = [...current, appointment];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return true;
};

export const clearAppointments = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const deleteAppointment = (id: string) => {
  const current = getAppointments();
  const updated = current.filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
