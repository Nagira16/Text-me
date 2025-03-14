"use client";

import { getUser } from "@/actions";
import { UserData } from "@/types";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ProtectWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const data: UserData = await getUser();

      if (!data.success) {
        router.push("/sign-in");
      }
    };

    fetchUser();
  }, [router]);

  return <>{children}</>;
};

export default ProtectWrapper;
