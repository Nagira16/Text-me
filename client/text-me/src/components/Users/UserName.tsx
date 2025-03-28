"use client";

import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../provider/AuthContent";
import { JSX, useEffect, useState } from "react";

const UserName = (): JSX.Element | null => {
  const { id }: { id: string } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    if (id !== user.id) {
      router.push("/");
    } else {
      setUsername(user.username);
    }
  }, [id, user, router]);

  if (!username) return null;

  return <strong>{username}</strong>;
};

export default UserName;
