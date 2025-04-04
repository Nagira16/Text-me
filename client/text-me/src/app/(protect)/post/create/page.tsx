"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PostData } from "@/types";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Form from "next/form";
import { useRouter } from "next/navigation";
import React, { JSX, useState } from "react";
import Swal from "sweetalert2";

const PostForm = (): JSX.Element => {
  const router: AppRouterInstance = useRouter();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const addPost = async (formData: FormData) => {
    setIsSaving(true);
    const res: Response = await fetch("http://localhost:5001/post", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const { success, message }: PostData = await res.json();

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
    <div className="min-h-screen grid place-items-center">
      <Form action={addPost} className="space-y-7 max-sm:w-[calc(100vw-20px)]">
        <div>
          <Label htmlFor="image">Photo</Label>
          <Input type="file" name="image" required />
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <Input type="text" name="content" />
        </div>

        <Button
          disabled={isSaving}
          className={`bg-foreground dark:hover:bg-gray-300 hover:bg-gray-500 ${
            isSaving && "bg-gray-500"
          }`}
        >
          Post
        </Button>
      </Form>
    </div>
  );
};

export default PostForm;
