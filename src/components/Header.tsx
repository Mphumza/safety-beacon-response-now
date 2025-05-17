
import React from "react";
import { Siren } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center py-4">
      <div className="flex items-center gap-2">
        <Siren className="h-8 w-8 text-emergency-police" />
        <h1 className="text-2xl font-bold">SOS EMERGENCY</h1>
      </div>
    </header>
  );
};

export default Header;
