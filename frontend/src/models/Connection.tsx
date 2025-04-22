export enum ConnectType {
  Unspecified = 0,
  Client_Connect_Therapist = 1,
  Therapist_Connect_Client = 2,
}

export interface ConnectionVO {
  therapistId: number;
  therapistName: string;
  therapistCode: string;

  clientId: number;
  clientName: string;
  clientCode: string;

  connectDate: string;
  lastActiveDate: string;
}

export interface ConnectionListResponse {
  code: number;
  message: string;
  data: ConnectionVO[];
}
