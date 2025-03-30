"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAuth } from "../provider/AuthContent";
import Image from "next/image";
import { Button } from "../ui/button";
import { updateUser } from "@/actions";
import Swal from "sweetalert2";
import { useState } from "react";

const ProfileSetting = () => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-16 w-16 border-4 border-t-transparent border-blue-500 rounded-full"></div>
      </div>
    );
  }

  const handleForm = async (formData: FormData) => {
    setIsSaving(true);
    const { success, message } = await updateUser(formData, user.id);

    if (success) {
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
    <div className="flex flex-col justify-center items-center">
      <p className="text-3xl font-semibold">ProfileSetting</p>
      <form
        action={handleForm}
        className="p-10 relative flex flex-col space-y-20"
      >
        <section className="space-y-6">
          <div className="flex justify-between items-center gap-10 ">
            <Label>UserName</Label>
            <Input
              type="text"
              minLength={4}
              placeholder={user.username}
              className="w-90"
              name="username"
            />
          </div>
          <div className="flex justify-between items-center gap-10">
            <Label>Profile Image</Label>
            <Input
              type="file"
              placeholder={user.profile_image}
              className="w-90"
              name="profile_image"
            />
            <Image
              src={user.profile_image}
              alt={user.username.charAt(0)}
              width={45}
              height={45}
              className="absolute -right-5 rounded-full"
            />
          </div>
          <div className="flex justify-between items-center gap-10">
            <Label>First Name</Label>
            <Input
              type="text"
              placeholder={user.first_name}
              className="w-90"
              name="firstName"
            />
          </div>
          <div className="flex justify-between items-center gap-10">
            <Label>Last Name</Label>
            <Input
              type="text"
              placeholder={user.last_name}
              className="w-90"
              name="lastName"
            />
          </div>
        </section>

        <Button
          disabled={isSaving}
          className={`${
            isSaving && "bg-gray-500"
          } dark:bg-white bg-black dark:hover:bg-gray-300 hover:bg-gray-500`}
        >
          Save Change
        </Button>
      </form>
    </div>
  );
};

export default ProfileSetting;
