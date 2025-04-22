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

export enum ConnectType {
  Unspecified = 0,
  Client_Connect_Therapist = 1,
  Therapist_Connect_Client = 2,
}
