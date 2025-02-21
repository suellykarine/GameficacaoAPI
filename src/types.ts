export interface User {
  id: number;
  email: string;
  streak: number;
  lastLogin: Date;
  readings?: Reading[];
}

export interface Reading {
  id: number;
  resourceId?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmChannel?: string | null;
  userId: number;
}
