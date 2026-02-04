import React from 'react';

export interface Appointment {
  id: string;
  customerName: string;
  phoneNumber: string;
  timestamp: number; // Unix timestamp for easier math
  isoDate: string;   // For display
  createdAt: number;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ProductItem {
  id: number;
  name: string;
  price: string;
  image: string;
}