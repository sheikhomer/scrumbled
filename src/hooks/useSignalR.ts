import { HubConnection, HubConnectionState } from "@microsoft/signalr";
import { useEffect, useState } from "react";
import makeConnection from "../services/signalR/connection";
import { Intent } from "../services/signalR/type";

const useSignalR = (
  config: Record<string, (...args: any) => void> | undefined
) => {
  const [connection, setConnection] = useState<HubConnection>();

  useEffect(() => {
    const start = async () => {
      await connection!.start();
    };
    if (!connection) {
      setConnection(makeConnection());
    }
    if (connection && config) {
      for (let key in config) {
        connection.on(key, config[key]);
      }
      if (connection.state === HubConnectionState.Disconnected) {
        start();
      }
    }
    
  }, [config, connection]);

  const sendMessage = async <Tin, Tout>(intent: Intent<Tin>) => {
    if (connection?.state === HubConnectionState.Connected) {
      return await connection.invoke<Tout>(intent.name, intent.payload);
    }
  };

  return {
    sendMessage,
  };
};

export default useSignalR;
