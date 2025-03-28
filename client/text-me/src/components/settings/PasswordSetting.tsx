import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const PasswordSetting = () => {
  const handleForm = async (formData: FormData) => {};

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-3xl font-semibold">PasswordSetting</p>
      <form action={handleForm} className="p-10 flex flex-col space-y-20">
        <section className="space-y-6">
          <div className="flex justify-between items-center gap-10 ">
            <Label>Current Password</Label>
            <Input className="w-90" type="password" name="current_password" />
          </div>
          <div className="flex justify-between items-center gap-10 ">
            <Label>New Password</Label>
            <Input className="w-90" type="password" name="new_password" />
          </div>
          <div className="flex justify-between items-center gap-10 ">
            <Label>Confirm Password</Label>
            <Input className="w-90" type="password" name="confirm_password" />
          </div>
        </section>

        <Button>Save Change</Button>
      </form>
    </div>
  );
};

export default PasswordSetting;
