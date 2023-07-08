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
  images?: string[];
  tags?: string;
  totalSeats?: number;
  participants?: number;
  ageRange?: number;
  participantsMetadata?: ParticipantsMetadata[];
}

export interface User {
  id: string;
  name: string;
}

export interface ParticipantsMetadata {
  id: string,
  name: string,
  avatar: string,
  age: number,
}



