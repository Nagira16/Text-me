import { ChevronLeft } from "lucide-react";

const BackButton = () => {
  return (
    <ChevronLeft
      onClick={() => window.history.back()}
      className="absolute top-10 left-10"
    />
  );
};

export default BackButton;
