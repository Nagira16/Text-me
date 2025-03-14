"use client";

import BackButton from "@/components/BackButton";
import { useAuth } from "@/components/provider/AuthContent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FetchData } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const SignIn = () => {
  const { login } = useAuth();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const router: AppRouterInstance = useRouter();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const signInHandle = async (formData: FormData) => {
    setIsSaving(true);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { message, success }: FetchData = await login(email, password);

    setIsSaving(false);

    Swal.fire({
      text: message,
      icon: success ? "success" : "error",
      position: "top-right",
      toast: true,
      timer: 3000,
      showConfirmButton: false,
      didClose() {
        success && router.push("/");
      },
    });
  };
  return (
    <div className="min-h-screen grid place-items-center p-4">
      <BackButton />

      <Card className="w-full max-w-sm py-10 shadow-lg rounded-lg space-y-5">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <Form action={signInHandle} className="space-y-7">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs">
                Email
              </Label>
              <Input
                className="rounded-3xl"
                name="email"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className="text-xs">
                Password
              </Label>
              <Input
                className="rounded-3xl"
                name="password"
                type="password"
                placeholder="Password"
                minLength={8}
                required
              />
            </div>

            <Link href="/sign-up" className="text-xs text-center">
              <p>Create account</p>
            </Link>

            <Button
              variant="default"
              className="w-full rounded-3xl mt-6"
              disabled={isSaving}
            >
              {isSaving ? "Saving" : "Sign In"}
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
