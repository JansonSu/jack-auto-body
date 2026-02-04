import React, { useEffect, useState } from 'react';
import { format, isBefore } from 'date-fns';
import { Trash2, RefreshCw } from 'lucide-react';
import { getAppointments, clearAppointments, deleteAppointment } from '../services/storageService';
import { Appointment } from '../types';

interface AdminPanelProps {
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const loadData = () => {
    // Sort by timestamp descending
    const data = getAppointments().sort((a, b) => b.timestamp - a.timestamp);
    setAppointments(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id: string) => {
    if(window.confirm('Delete this record?')) {
      deleteAppointment(id);
      loadData();
    }
  };

  const handleClearAll = () => {
    if(window.confirm('WARNING: This will wipe all booking data from LocalStorage. Continue?')) {
      clearAppointments();
      loadData();
    }
  };

  return (
    <div className="bg-white text-slate-900 rounded-lg shadow-xl overflow-hidden mt-8 border-4 border-industrial-accent">
      <div className="bg-industrial-800 text-white p-4 flex justify-between items-center">
        <h3 className="text-2xl font-display font-bold">ADMIN CONSOLE</h3>
        <div className="flex gap-2">
            <button onClick={handleClearAll} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
                Reset Database
            </button>
            <button onClick={onClose} className="text-gray-300 hover:text-white underline text-sm">
            Exit Admin
            </button>
        </div>
      </div>
      
      <div className="p-4 overflow-x-auto">
        {appointments.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No active bookings in LocalStorage.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="p-3 font-bold text-sm text-gray-600">Date & Time</th>
                <th className="p-3 font-bold text-sm text-gray-600">Customer</th>
                <th className="p-3 font-bold text-sm text-gray-600">Phone</th>
                <th className="p-3 font-bold text-sm text-gray-600">Status</th>
                <th className="p-3 font-bold text-sm text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => {
                const isExpired = isBefore(new Date(appt.timestamp), new Date());
                return (
                  <tr key={appt.id} className={`border-b ${isExpired ? 'opacity-50 bg-gray-50' : ''}`}>
                    <td className="p-3 font-mono text-sm">
                      {format(new Date(appt.timestamp), 'yyyy-MM-dd HH:mm')}
                    </td>
                    <td className="p-3 font-bold">{appt.customerName}</td>
                    <td className="p-3">{appt.phoneNumber}</td>
                    <td className="p-3">
                      {isExpired ? (
                        <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">Expired</span>
                      ) : (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-bold">Upcoming</span>
                      )}
                    </td>
                    <td className="p-3">
                        <button onClick={() => handleDelete(appt.id)} className="text-red-500 hover:text-red-700">
                            <Trash2 size={16} />
                        </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className="bg-gray-100 p-2 text-center text-xs text-gray-500">
        Data Source: LocalStorage ("jack_sun_appointments")
      </div>
    </div>
  );
};

export default AdminPanel;
