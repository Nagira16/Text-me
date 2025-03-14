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
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";

const SignUp = () => {
  const { register } = useAuth();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const router: AppRouterInstance = useRouter();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const nextStep = (): void => setStep((prev) => prev + 1);
  const prevStep = (): void => setStep((prev) => prev - 1);

  const signUpHandle = async () => {
    setIsSaving(true);

    const { message, success }: FetchData = await register(
      firstName,
      lastName,
      username,
      email,
      password,
      profileImage
    );

    setIsSaving(false);
    if (!success) setStep(1);

    Swal.fire({
      text: message,
      icon: success ? "success" : "error",
      position: "top-right",
      toast: true,
      timer: 3000,
      showConfirmButton: false,
      didClose() {
        if (success) {
          router.push("/sign-in");
          setFirstName("");
          setLastName("");
          setUsername("");
          setEmail("");
          setPassword("");
          setProfileImage(null);
        }
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
          <Form action={signUpHandle}>
            {step === 1 && (
              <article className="space-y-7">
                <div className="space-y-1">
                  <Label htmlFor="firstname" className="text-xs">
                    First Name
                  </Label>
                  <Input
                    className="rounded-3xl"
                    value={firstName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFirstName(e.target.value)
                    }
                    type="text"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="lastname" className="text-xs">
                    Last Name
                  </Label>
                  <Input
                    className="rounded-3xl"
                    value={lastName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setLastName(e.target.value)
                    }
                    type="text"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="username" className="text-xs">
                    Username
                  </Label>
                  <Input
                    className="rounded-3xl"
                    value={username}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setUsername(e.target.value)
                    }
                    type="text"
                    placeholder="Username"
                    minLength={4}
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="default"
                    className="rounded-3xl mt-6"
                    type="button"
                    onClick={nextStep}
                  >
                    Next
                  </Button>
                </div>
              </article>
            )}

            {step === 2 && (
              <article className="space-y-7">
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-xs">
                    Email
                  </Label>
                  <Input
                    className="rounded-3xl"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
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
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    type="password"
                    placeholder="Password"
                    minLength={8}
                    required
                  />
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="default"
                    className="rounded-3xl mt-6"
                    type="button"
                    onClick={prevStep}
                  >
                    Back
                  </Button>
                  <Button
                    variant="default"
                    className="rounded-3xl mt-6"
                    type="button"
                    onClick={nextStep}
                  >
                    Next
                  </Button>
                </div>
              </article>
            )}

            {step === 3 && (
              <article className="space-y-7">
                <div className="space-y-1">
                  <Label htmlFor="profile_image" className="text-xs">
                    Profile Image (Option)
                  </Label>
                  <Input
                    className="rounded-3xl"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files) {
                        setProfileImage(e.target.files[0]);
                      }
                    }}
                    type="file"
                  />
                </div>
                <Button
                  variant="default"
                  className="w-full rounded-3xl mt-6"
                  disabled={isSaving}
                  type="submit"
                >
                  {isSaving ? "Saving" : "Sign Up"}
                </Button>
              </article>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
