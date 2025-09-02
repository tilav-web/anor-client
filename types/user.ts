export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  balance: number;
  role: Role;
  createdAt: string;
  updatedAt: string;
}
