export interface Participant {
  name: string;
  userId:string;
  isOwner: boolean;
}

export interface Session {
  sessionId: string;
  participants: Array<Participant>;
}

export interface LocalSession extends Session{
  userId: string,
  userName?: string
}
