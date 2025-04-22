export type User = {
  id: number;
  username: string;
  userCode: string;
  role: number;
};

export enum UserRole {
  Unspecified = 0,
  Therapist = 1,
  Client = 2,
}
