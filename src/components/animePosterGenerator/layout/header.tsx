import { ModeToggle } from "@/components/theme-provider/modeToggle";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-end">
      <ModeToggle />
    </div>
  );
};

export default Header;
