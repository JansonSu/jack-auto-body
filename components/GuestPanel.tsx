import React from 'react';
import BookingCalendar from './BookingCalendar';
import { LogOut, User } from 'lucide-react';

interface GuestPanelProps {
  onLogout: () => void;
}

const GuestPanel: React.FC<GuestPanelProps> = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-industrial-900 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-industrial-800 p-6 rounded-xl border border-industrial-700">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="bg-industrial-accent/20 p-4 rounded-full">
                <User className="text-industrial-accent w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold text-white uppercase">Guest Dashboard</h2>
                <p className="text-gray-400">Select a time below to confirm your inspection.</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-industrial-700 hover:bg-red-900/40 text-white rounded-lg transition-all"
            >
              <LogOut size={18} /> Exit Dashboard
            </button>
          </div>

          {/* 这里 readOnly={false} 表示可以点击预约 */}
          <BookingCalendar readOnly={false} />
        </div>
      </div>
    </div>
  );
};

export default GuestPanel;