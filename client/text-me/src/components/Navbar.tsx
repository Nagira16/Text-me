"use client";

import Image from "next/image";
import {
  Bell,
  House,
  LogIn,
  MessageCircleMore,
  Search,
  SquarePlus,
} from "lucide-react";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";
import { ModeToggle } from "./Buttons/ModeToggle";
import { useAuth } from "./provider/AuthContent";
import { useNotificationStore } from "@/store/useNotificationStore";

const Navbar = (): JSX.Element | null => {
  const { user } = useAuth();
  const [isClient, setIsClient] = useState<boolean>(false);
  const notifications = useNotificationStore((state) => state.notifications);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const NavLinks = [
    {
      title: "Logo",
      path: "/",
      icon: (
        <Image
          src={"/text-me.png"}
          alt="Logo"
          width={50}
          height={50}
          className="dark:invert max-sm:size-8"
        />
      ),
    },
    { title: "Home", path: "/", icon: <House className="max-sm:size-5" /> },
    {
      title: "DM",
      path: "/dm",
      icon: <MessageCircleMore className="max-sm:size-5" />,
    },
    {
      title: "Search",
      path: "/search",
      icon: <Search className="max-sm:size-5" />,
    },
    {
      title: "Notification",
      path: "/notification",
      icon: <Bell className="max-sm:size-5" />,
    },
    {
      title: "Post",
      path: "/post/create",
      icon: <SquarePlus className="max-sm:size-5" />,
    },
    {
      title: "Account",
      path: `/account/${user?.id}`,
      icon: user && (
        <Image
          src={user.profile_image}
          alt="User Icon"
          width={30}
          height={30}
          className="rounded-full max-sm:size-6"
        />
      ),
    },
    {
      title: "SignIn",
      path: "/sign-in",
      icon: !user && <LogIn className="max-sm:size-5" />,
    },
  ];

  return (
    <>
      <nav className="hidden fixed top-0 left-0 sm:flex flex-col h-full w-16 items-center bg-background border-r border-foreground z-50">
        <ul className="flex flex-col gap-10 items-center mt-16">
          {NavLinks.map((link, i) => (
            <li
              key={i}
              className="text-white relative transition-transform duration-300 hover:scale-[120%] "
            >
              {link.title === "Notification" && notifications.length > 0 && (
                <span className="text-xs absolute -right-[3px] -top-2 bg-red-500 rounded-full px-[3px]">
                  {notifications.length}
                </span>
              )}
              <Link href={link.path} className="text-foreground">
                {link.icon}
              </Link>
            </li>
          ))}
          <ModeToggle />
        </ul>
      </nav>

      <nav className="sm:hidden fixed bottom-0 flex h-16 w-full justify-center items-center bg-background border-t border-foreground z-50">
        <ul className="flex gap-4 items-center ">
          {NavLinks.map((link, i) => (
            <li
              key={i}
              className="text-white relative transition-transform duration-300 hover:scale-[120%] "
            >
              {link.title === "Notification" && notifications.length > 0 && (
                <span className="text-xs absolute -right-[3px] -top-2 bg-red-500 rounded-full px-[3px]">
                  {notifications.length}
                </span>
              )}
              <Link href={link.path} className="text-foreground">
                {link.icon}
              </Link>
            </li>
          ))}
          <ModeToggle />
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
