"use client";

import { useUserAuth } from "@/app/hooks/useUserAuth";
import { UseUserAuth } from "@/app/types";
import { createContext, ReactNode, useContext } from "react";

const AuthContext = createContext<UseUserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth: UseUserAuth = useUserAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context: UseUserAuth | null = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
