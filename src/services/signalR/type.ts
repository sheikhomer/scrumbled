export interface Intent<T>{
    name: string,
    payload: T
}

export interface UserConnection{
    userId: string,
    sessionId: string,
    userName: string
}

export interface EventMessage{
    eventName: string,
    message: string,
    user: UserConnection
}