import { Session } from "../../models/session";
import { User } from "../../models/user";

const baseUrl = process.env.REACT_APP_BASE_API_URI;
export const getSession: (id: string) => Promise<Session> = async (
  id: string
) => {
  const response = await fetch(`${baseUrl}/session/${id}`, {
    method: "GET",
  });
  return await response.json();
};

export const createSession: () => Promise<Session> = async () => {
  const response = await fetch(`${baseUrl}/session`, {
    method: "POST",
  });
  return await response.json();
};

export const updateParticipants = async ({id, user}:{id:string, user:User}) => {
  const response = await fetch(`${baseUrl}/session/${id}/user/${user.userId}`, {
    method: "PUT",
    body:JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return response.status;
};

