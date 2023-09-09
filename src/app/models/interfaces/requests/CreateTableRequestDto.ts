export interface CreateTableRequestDto {
  id: string;
  name: string;
  description: string;
  time: Date;
  minMaxSeats: number;
  maxAge: number;
  minAge: number;
}