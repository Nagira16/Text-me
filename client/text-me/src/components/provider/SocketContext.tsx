"use client";

import {
  createContext,
  JSX,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContent";
import { NotificationType } from "@/types";
import { useNotificationStore } from "@/store/useNotificationStore";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { isSignedIn, user } = useAuth();
  const addNewNotification = useNotificationStore(
    (state) => state.addNewNotification
  );

  useEffect(() => {
    const newSocket = io("http://localhost:5001");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && isSignedIn && user?.id) {
      socket.emit("joinRoom", { userId: user.id });
    }
  }, [socket, isSignedIn, user]);

  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (data: NotificationType) => {
      addNewNotification(data);
    };

    socket.on("newNotification", handleNewNotification);

    return () => {
      socket.off("newNotification", handleNewNotification);
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = (): Socket => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
