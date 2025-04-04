"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuth } from "../provider/AuthContent";
import Image from "next/image";
import { Button } from "../ui/button";
import { updateUser } from "@/actions";
import Swal from "sweetalert2";
import { JSX, useState } from "react";

const ProfileSetting = (): JSX.Element => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { user, refreshUser } = useAuth();
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full"></div>
      </div>
    );
  }

  const handleForm = async (formData: FormData): Promise<void> => {
    setIsSaving(true);
    const { success, message } = await updateUser(formData);

    if (success) {
      refreshUser();
      Swal.fire({
        text: message,
        icon: "success",
        toast: true,
        position: "top-right",
        timer: 3000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        text: message,
        icon: "error",
        toast: true,
        position: "top-right",
        timer: 3000,
        showConfirmButton: false,
      });
    }

    setIsSaving(false);
  };

  return (
    <div className="flex flex-col justify-center items-center max-md:space-y-7">
      <p className="text-3xl font-semibold">ProfileSetting</p>
      <form
        action={handleForm}
        className="md:p-10 relative flex flex-col max-md:items-center space-y-20 w-[200px] md:w-[450px] lg:w-[600px]"
      >
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-5 lg:gap-10">
            <Label>UserName</Label>
            <Input
              type="text"
              minLength={4}
              placeholder={user.username}
              className="w-[260px] md:w-90"
              name="username"
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-5 lg:gap-10">
            <Label>Profile Image</Label>
            <Input
              type="file"
              placeholder={user.profile_image}
              className="w-[200px] sm:w-[260px] md:w-90"
              name="profile_image"
            />
            <Image
              src={user.profile_image}
              alt={user.username.charAt(0)}
              width={45}
              height={45}
              className="absolute max-sm:top-24 -right-5 rounded-full"
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-5 lg:gap-10">
            <Label>First Name</Label>
            <Input
              type="text"
              placeholder={user.first_name}
              className="w-[260px] md:w-90"
              name="firstName"
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-5 lg:gap-10">
            <Label>Last Name</Label>
            <Input
              type="text"
              placeholder={user.last_name}
              className="w-[260px] md:w-90"
              name="lastName"
            />
          </div>
        </section>

        <Button
          disabled={isSaving}
          className={`${
            isSaving && "bg-gray-500"
          } bg-foreground hover:bg-gray-300 rounded-2xl`}
        >
          Save Change
        </Button>
      </form>
    </div>
  );
};

export default ProfileSetting;
