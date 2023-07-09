

export interface Table {
  id?: string;
  name?: string;
  description?: string;
  time?: any;
  location?: string;
  address?: string;
  contact?: string;
  images?: string[];
  tags?: string;
  totalSeats?: number;
  participants?: number;
  maxAge?: number;
  minAge?: number;
  participantsMetadata?: ParticipantsMetadata[];
}

export interface ParticipantsMetadata {
  id: string,
  name: string,
  avatar: string,
  age: number,
}



