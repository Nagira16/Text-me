"use client";

import { useUserAuth } from "@/hooks/useUserAuth";
import { UseUserAuth } from "@/types";
import { createContext, JSX, ReactNode, useContext } from "react";

const AuthContext = createContext<UseUserAuth | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const auth: UseUserAuth = useUserAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = (): UseUserAuth => {
  const context: UseUserAuth | null = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
