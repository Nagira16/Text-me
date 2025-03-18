"use client";

import { useAuth } from "@/components/provider/AuthContent";
import React from "react";

const MyAccount = () => {
  const { logout } = useAuth();
  return (
    <div>
      Account
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default MyAccount;
