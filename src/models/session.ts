export interface Participant {
  name: string;
}

export interface Session {
  sessionId?: string;
  participants?: Array<Participant>;
}
