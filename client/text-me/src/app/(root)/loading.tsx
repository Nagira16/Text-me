import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="min-h-screen w-full grid place-items-center my-14 space-y-3">
      {Array.from({ length: 10 }, (_, i) => (
        <Skeleton key={i} className="w-[600px] h-[610px]" />
      ))}
    </div>
  );
};

export default loading;
