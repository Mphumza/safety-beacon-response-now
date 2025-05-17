
import React from "react";
import { Shield } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center py-4">
      <div className="flex items-center gap-2">
        <Shield className="h-8 w-8 text-emergency-police" />
        <h1 className="text-2xl font-bold">
          Safety<span className="text-emergency-hospital">Beacon</span>
        </h1>
      </div>
    </header>
  );
};

export default Header;
