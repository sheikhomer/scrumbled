import { useDispatch, useSelector } from "react-redux";
import { LocalSession, Participant } from "../models/session";
import { EventMessage } from "../services/signalR/type";
import { IRootState } from "../store";
import { update } from "../store/slices/session";

const useSignalRConfig = () => {
  const session = useSelector((state: IRootState) => state.sessionData);
  const dispatch = useDispatch();
  if (!session) {
    return;
  }
  const joinNewSession = ({
    userId,
    userName,
  }: {
    userId: string;
    userName: string;
  }) => {
    const filteredParticipant = session.participants!.find(
      (x) => x.userId === userId
    )!;
    const updatedParticipant: Participant = {
      ...filteredParticipant,
      name: userName,
    };

    const updatedParticipants = [
      ...session.participants!.filter((x) => x.userId !== userId!),
      updatedParticipant,
    ];
    const updatedSession: LocalSession = {
      ...(session as LocalSession),
      userName: userName,
      participants: [...updatedParticipants],
    };
    localStorage.setItem("sessionData", JSON.stringify(updatedSession));
    dispatch(update(updatedSession));
  };
  const joinExistingSession = ({
    userId,
    userName,
  }: {
    userId: string;
    userName: string;
  }) => {
    const newParticipant: Participant = {
      name: userName,
      userId: userId,
      isOwner: false,
    };
    const participants = [...session.participants!, newParticipant];
    const updatedSession = {
      ...(session as LocalSession),
      participants: [...participants],
    };
    localStorage.setItem("sessionData", JSON.stringify(updatedSession));
    dispatch(update(updatedSession));
  };
  return {
    ReceiveUserJoinedMessage: (message: EventMessage) => {
      if (
        message.eventName === "UserJoined" &&
        session.userId !== message.user.userId
      ) {
        joinExistingSession(message.user);
      } else if (
        message.eventName === "UserJoined" &&
        session.userId === message.user.userId
      ) {
        joinNewSession(message.user);
      }
    },
  };
};

export default useSignalRConfig;
