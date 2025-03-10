import { useEffect, useState, useCallback } from "react";
import { UserData, UserWithoutPassword } from "../types";
import { useSocket } from "../components/provider/SocketContext";

export const useUserAuth = () => {
  const [user, setUser] = useState<UserWithoutPassword | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const socket = useSocket();

  const fetchUser = useCallback(async () => {
    try {
      const res: Response = await fetch("http://localhost:5001/user", {
        credentials: "include",
      });
      const data: UserData = await res.json();
      if (data.success) {
        setUser(data.result);
        setIsSignedIn(true);
      } else {
        setUser(null);
        setIsSignedIn(false);
      }
    } catch (error) {
      console.error("Fetch user error:", error);
      setUser(null);
      setIsSignedIn(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const register = async (
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
    profile_image?: File
  ) => {
    try {
      const formData = new FormData();
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (profile_image) formData.append("profile_image", profile_image);

      const res = await fetch("http://localhost:5001/auth/register", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data: UserData = await res.json();
      console.log(data.message);
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data: UserData = await res.json();
      if (data.success) {
        setUser(data.result);
        setIsSignedIn(true);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:5001/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data: UserData = await res.json();
      if (data.success) {
        if (socket && user) {
          socket.emit("leaveRoom", user.id);
        }
        setUser(null);
        setIsSignedIn(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return { user, isSignedIn, register, login, logout, refreshUser: fetchUser };
};
