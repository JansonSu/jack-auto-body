import React, { useState, useEffect, useCallback } from 'react';
import { format, addDays, startOfToday, setHours, setMinutes, isBefore, isSameDay } from 'date-fns';
import { Calendar, Clock, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { getAppointments, saveAppointment } from '../services/storageService';
import { Appointment } from '../types';

const OPEN_HOUR = 9;
const CLOSE_HOUR = 17; // 5 PM

// 新增接口定义
interface BookingCalendarProps {
  readOnly?: boolean;
}

// 默认为 false，兼容原有调用
const BookingCalendar: React.FC<BookingCalendarProps> = ({ readOnly = false }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const fetchAppointments = useCallback(() => {
    const data = getAppointments();
    setAppointments(data);
  }, []);

  useEffect(() => {
    fetchAppointments();
    const interval = setInterval(fetchAppointments, 60000);
    return () => clearInterval(interval);
  }, [fetchAppointments]);

  const days = Array.from({ length: 14 }, (_, i) => addDays(startOfToday(), i));

  const generateSlots = (date: Date) => {
    const slots = [];
    for (let hour = OPEN_HOUR; hour < CLOSE_HOUR; hour++) {
      const slotTime = setMinutes(setHours(date, hour), 0);
      slots.push(slotTime);
    }
    return slots;
  };

  const getSlotStatus = (slotTime: Date) => {
    const now = new Date();
    if (isBefore(slotTime, now)) return 'expired';
    const isOccupied = appointments.some(appt => appt.timestamp === slotTime.getTime());
    if (isOccupied) return 'booked';
    return 'available';
  };

  const handleSlotClick = (slotTime: Date, status: string) => {
    // 如果是只读模式，直接返回，不打开弹窗
    if (readOnly || status !== 'available') return;

    setSelectedSlot(slotTime);
    setBookingStatus('idle');
    setCustomerName('');
    setPhoneNumber('');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) return;

    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      customerName,
      phoneNumber,
      timestamp: selectedSlot.getTime(),
      isoDate: selectedSlot.toISOString(),
      createdAt: Date.now()
    };

    const success = saveAppointment(newAppointment);

    if (success) {
      setBookingStatus('success');
      fetchAppointments();
      setTimeout(() => {
        setIsModalOpen(false);
        setBookingStatus('idle');
      }, 2000);
    } else {
      setBookingStatus('error');
    }
  };

  return (
    <section id="booking" className="py-16 bg-industrial-900 border-t border-industrial-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-white uppercase tracking-wider">
            {/* 根据模式显示不同标题 */}
            {readOnly ? "Check Availability" : "Book an Appointment"}
          </h2>
          <p className="text-industrial-accent mt-2">
            {readOnly ? "Please login as Guest to book a time" : "1-Hour Slots • Fixed Pricing Assessment"}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 bg-industrial-800 p-6 rounded-xl border border-industrial-700 shadow-2xl">

          {/* Day Selector */}
          <div className="lg:w-1/3">
            <h3 className="text-xl text-white font-bold mb-4 flex items-center">
              <Calendar className="mr-2 w-5 h-5 text-industrial-accent" /> Select Date
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {days.map((day) => (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`p-3 rounded-lg text-center transition-all ${isSameDay(day, selectedDate)
                      ? 'bg-industrial-accent text-white ring-2 ring-blue-300'
                      : 'bg-industrial-900 text-gray-400 hover:bg-industrial-700'
                    }`}
                >
                  <div className="text-xs uppercase font-bold">{format(day, 'EEE')}</div>
                  <div className="text-lg font-display">{format(day, 'd')}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Slots Selector */}
          <div className="lg:w-2/3 border-t lg:border-t-0 lg:border-l border-industrial-700 lg:pl-8 pt-8 lg:pt-0">
            <h3 className="text-xl text-white font-bold mb-4 flex items-center">
              <Clock className="mr-2 w-5 h-5 text-industrial-accent" />
              Available Slots for {format(selectedDate, 'MMM do')}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {generateSlots(selectedDate).map((slot) => {
                const status = getSlotStatus(slot);
                // 判断是否允许点击：只有available且非只读模式才可点
                const isClickable = status === 'available' && !readOnly;

                return (
                  <button
                    key={slot.toISOString()}
                    disabled={!isClickable}
                    onClick={() => handleSlotClick(slot, status)}
                    className={`
                      py-4 px-2 rounded-md border text-sm font-semibold transition-all relative overflow-hidden
                      ${status === 'available'
                        ? (readOnly
                          ? 'bg-industrial-900 border-industrial-700 text-gray-400 cursor-default' // 只读样式
                          : 'bg-industrial-900 border-industrial-700 text-white hover:border-industrial-accent hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]') // 可点样式
                        : ''}
                      ${status === 'booked'
                        ? 'bg-red-900/20 border-red-900/50 text-red-500 cursor-not-allowed opacity-60'
                        : ''}
                      ${status === 'expired'
                        ? 'bg-gray-800 border-transparent text-gray-600 cursor-not-allowed'
                        : ''}
                    `}
                  >
                    {format(slot, 'h:00 a')}
                    {status === 'booked' && <span className="block text-xs mt-1">Booked</span>}
                    {status === 'expired' && <span className="block text-xs mt-1">Closed</span>}
                    {status === 'available' && (
                      <span className={`block text-xs mt-1 ${readOnly ? 'text-gray-500' : 'text-green-500'}`}>
                        {readOnly ? 'Available' : 'Open'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 只有在非只读模式下，且Modal打开时才渲染弹窗 */}
      {!readOnly && isModalOpen && selectedSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-industrial-800 w-full max-w-md p-6 rounded-2xl border border-industrial-700 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>

            <h3 className="text-2xl font-display font-bold text-white mb-2">Confirm Booking</h3>
            <p className="text-gray-400 mb-6">
              {format(selectedSlot, 'MMMM do, yyyy')} at <span className="text-industrial-accent">{format(selectedSlot, 'h:00 a')}</span>
            </p>

            {bookingStatus === 'success' ? (
              <div className="text-center py-8 animate-pulse">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl text-white font-bold">Booking Confirmed!</h4>
                <p className="text-gray-400">See you at the shop, {customerName}.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-industrial-900 border border-industrial-700 rounded-lg p-3 text-white focus:outline-none focus:border-industrial-accent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-industrial-900 border border-industrial-700 rounded-lg p-3 text-white focus:outline-none focus:border-industrial-accent"
                    placeholder="(555) 000-0000"
                  />
                </div>

                {bookingStatus === 'error' && (
                  <div className="bg-red-900/30 text-red-400 p-3 rounded text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" /> Slot was just taken. Please try another.
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-industrial-accent hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors mt-4"
                >
                  Secure Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default BookingCalendar;