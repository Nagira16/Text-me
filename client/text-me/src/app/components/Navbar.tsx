"use client";

import Image from "next/image";
import logo from "@/app/images/Text-Me-Logo.png";
import { Bell, CircleUserRound, House, MessageCircleMore } from "lucide-react";
import { useUserAuth } from "../hooks/useUserAuth";
import Link from "next/link";

const Navbar = () => {
  const { user } = useUserAuth();

  const NavLinks = [
    {
      title: "Logo",
      path: "/",
      icon: <Image src={logo} alt="Logo" width={50} height={50} />,
    },
    { title: "Home", path: "/", icon: <House /> },
    { title: "DM", path: "/dm", icon: <MessageCircleMore /> },
    { title: "Notification", path: "/notification", icon: <Bell /> },
    {
      title: "Account",
      path: "/account",
      icon: user ? (
        <Image
          src={user.profile_image}
          alt="User Icon"
          width={50}
          height={50}
        />
      ) : (
        <CircleUserRound />
      ),
    },
  ];

  return (
    <nav className="fixed top-0 left-0 flex flex-col h-full w-16 items-center bg-black border-r border-white">
      <ul className="flex flex-col gap-16 items-center mt-16">
        {NavLinks.map((link, i) => (
          <li key={i}>
            <Link href={link.path}>{link.icon}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
