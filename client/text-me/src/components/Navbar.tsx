"use client";

import Image from "next/image";
import logo from "@/images/Text-Me-Logo.png";
import {
  Bell,
  House,
  LogIn,
  MessageCircleMore,
  Search,
  SquarePlus,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { useAuth } from "./provider/AuthContent";

const Navbar = () => {
  const { user } = useAuth();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const NavLinks = [
    {
      title: "Logo",
      path: "/",
      icon: <Image src={logo} alt="Logo" width={50} height={50} />,
    },
    { title: "Home", path: "/", icon: <House /> },
    { title: "DM", path: "/dm", icon: <MessageCircleMore /> },
    { title: "Search", path: "/search", icon: <Search /> },
    {
      title: "Notification",
      path: "/notification",
      icon: <Bell />,
    },
    {
      title: "Post",
      path: "/post/create",
      icon: <SquarePlus />,
    },
    {
      title: "Account",
      path: "/account",
      icon: user && (
        <Image
          src={user.profile_image}
          alt="User Icon"
          width={30}
          height={30}
          className="rounded-full"
        />
      ),
    },
    {
      title: "SignIn",
      path: "/sign-in",
      icon: !user && <LogIn />,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 flex flex-col h-full w-16 items-center bg-black border-r border-white">
      <ul className="flex flex-col gap-10 items-center mt-16">
        {NavLinks.map((link, i) => (
          <li key={i} className="text-white">
            <Link href={link.path}>{link.icon}</Link>
          </li>
        ))}
        <ModeToggle />
      </ul>
    </nav>
  );
};

export default Navbar;
