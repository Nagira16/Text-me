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
    <div className="flex flex-col justify-center items-center max-md:space-y-7">
      <p className="text-3xl font-semibold">PasswordSetting</p>
      <form
        action={formAction}
        className="md:p-10 flex flex-col max-md:items-center space-y-20 w-[200px] md:w-[450px] lg:w-[600px]"
      >
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-5 lg:gap-10">
            <Label className="w-fit md:w-30 lg:w-fit">Current Password</Label>
            <Input
              className="w-[260px] md:w-[340px]"
              type="password"
              name="current_password"
              minLength={8}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-5 lg:gap-10">
            <Label className="w-fit md:w-30 lg:w-fit">New Password</Label>
            <Input
              className="w-[260px] md:w-[340px]"
              type="password"
              name="new_password"
              minLength={8}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-5 lg:gap-10">
            <Label className="w-fit md:w-30 lg:w-fit">Confirm Password</Label>
            <Input
              className="w-[260px] md:w-[340px]"
              type="password"
              name="confirm_password"
              minLength={8}
              required
            />
          </div>
        </section>

        <Button
          type="submit"
          className={`bg-foreground hover:bg-gray-400 rounded-2xl ${
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
