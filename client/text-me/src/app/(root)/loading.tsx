import { Skeleton } from "@/components/ui/skeleton";
import React, { JSX } from "react";

const loading = (): JSX.Element => {
  return (
    <div className="min-h-screen w-full grid place-items-center mt-10 mb-25 sm:my-10 space-y-3">
      {Array.from({ length: 10 }, (_, i) => (
        <Skeleton
          key={i}
          className="w-[calc(100vw-40px)] sm:w-[400px] md:w-[500px] lg:w-[700px] h-[500px] lg:h-[600px]"
        />
      ))}
    </div>
  );
};

export default loading;
