import { JSX, useActionState, useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { updatePassword } from "@/actions";
import Swal from "sweetalert2";

const PasswordSetting = (): JSX.Element => {
  const [state, formAction, isLoading] = useActionState(updatePassword, {
    success: false,
    message: "",
    result: null,
  });

  useEffect(() => {
    if (!state.message) return;

    Swal.fire({
      text: state.message,
      icon: state.success ? "success" : "error",
      toast: true,
      position: "top-right",
      timer: 3000,
      showConfirmButton: false,
    });
  }, [state.message]);

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-3xl font-semibold">PasswordSetting</p>
      <form action={formAction} className="p-10 flex flex-col space-y-20">
        <section className="space-y-6">
          <div className="flex justify-between items-center gap-10 ">
            <Label>Current Password</Label>
            <Input
              className="w-90"
              type="password"
              name="current_password"
              minLength={8}
              required
            />
          </div>
          <div className="flex justify-between items-center gap-10 ">
            <Label>New Password</Label>
            <Input
              className="w-90"
              type="password"
              name="new_password"
              minLength={8}
              required
            />
          </div>
          <div className="flex justify-between items-center gap-10 ">
            <Label>Confirm Password</Label>
            <Input
              className="w-90"
              type="password"
              name="confirm_password"
              minLength={8}
              required
            />
          </div>
        </section>

        <Button
          type="submit"
          className={`dark:bg-white bg-black dark:hover:bg-gray-300 hover:bg-gray-500 rounded-2xl ${
            isLoading && "bg-gray-500"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Change"}
        </Button>
      </form>
    </div>
  );
};

export default PasswordSetting;
