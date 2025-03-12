"use client";

import { UserData } from "@/types";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ProtectWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res: Response = await fetch("http://localhost:5001/user", {
        credentials: "include",
      });
      const data: UserData = await res.json();
      if (!data.success) {
        router.push("/sign-in");
      }
    };

    fetchUser();
  }, [router]);

  return <>{children}</>;
};

export default ProtectWrapper;
