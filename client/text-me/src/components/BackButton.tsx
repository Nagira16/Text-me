import { ChevronLeft } from "lucide-react";
import { JSX } from "react";

const BackButton = (): JSX.Element => {
  return (
    <ChevronLeft
      onClick={() => window.history.back()}
      className="absolute top-10 left-10"
    />
  );
};

export default BackButton;
