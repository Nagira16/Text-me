import UserProfile from "@/components/Users/UserProfile";
import { JSX } from "react";

const Account = (): JSX.Element => {
  return (
    <div className="min-h-screen w-full grid place-items-center">
      <UserProfile />
    </div>
  );
};

export default Account;
