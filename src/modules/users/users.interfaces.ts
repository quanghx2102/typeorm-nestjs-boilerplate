// user.interface.ts
export interface UserResponse {
  id: number;
  username: string;
  fullName?: string;
  desc?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
