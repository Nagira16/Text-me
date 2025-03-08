import { useEffect, useState } from "react";
import { UserData, UserWithoutPassword } from "../types";

export const useAuth = async () => {
  const [user, setUser] = useState<UserWithoutPassword | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const fetchUser = async (): Promise<void> => {
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
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const res: Response = await fetch("http://localhost:5001/auth/login", {
      method: "POST",
      headers: { "Context-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data: UserData = await res.json();
    if (data.success) {
      setUser(data.result);
    }
  };

  const logout = async () => {
    const res: Response = await fetch("http://localhost:5001/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    const data: UserData = await res.json();
    if (data.success) {
      setUser(data.result);
    } else {
      console.log(data.message);
    }
  };
};
