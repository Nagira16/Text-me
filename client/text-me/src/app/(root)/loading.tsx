import { Skeleton } from "@/components/ui/skeleton";
import React, { JSX } from "react";

const loading = (): JSX.Element => {
  return (
    <div className="min-h-screen w-full grid place-items-center my-14 space-y-3">
      {Array.from({ length: 10 }, (_, i) => (
        <Skeleton key={i} className="w-[700px] h-[600px]" />
      ))}
    </div>
  );
};

export default loading;
