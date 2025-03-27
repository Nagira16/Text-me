"use client";

import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../provider/AuthContent";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const UserName = () => {
  const { id }: { id: string } = useParams();
  const router: AppRouterInstance = useRouter();
  const { user } = useAuth();

  if (id !== user?.id) {
    router.push("/");
  }

  return <strong>{user?.username}</strong>;
};

export default UserName;
