"use client";

import { useEffect, useState, useCallback } from "react";
import {
  FetchData,
  UserData,
  UserWithoutPassword,
  UseUserAuth,
} from "../types";
import { getUser } from "@/actions";

export const useUserAuth = (): UseUserAuth => {
  const [user, setUser] = useState<UserWithoutPassword | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const fetchUser = useCallback(async (): Promise<void> => {
    try {
      const data: UserData = await getUser();

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
    profile_image?: File | null
  ): Promise<FetchData> => {
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

      return { message: data.message, success: data.success };
    } catch (error) {
      console.error("Register error:", error);
      return { message: "Register error", success: false };
    }
  };

  const login = async (email: string, password: string): Promise<FetchData> => {
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
        return { message: data.message, success: data.success };
      } else return { message: data.message, success: data.success };
    } catch (error) {
      console.error("Login error:", error);
      return { message: "Login Error", success: false };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const res = await fetch("http://localhost:5001/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data: UserData = await res.json();
      if (data.success) {
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
