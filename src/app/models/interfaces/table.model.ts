import { UserInfo } from 'firebase/auth';

interface Contact extends UserInfo {}

export interface Table {
  id?: string;
  name?: string;
  description?: string;
  time?: Date;
  location?: string;
  address?: string;
  contact?: string;
  images?: string;
  tags?: string;
  totalSeats?: number;
  participants?: number;
}

export interface User {
  id: string;
  name: string;
}



