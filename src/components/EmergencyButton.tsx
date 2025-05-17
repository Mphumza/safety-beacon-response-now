
import React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, Phone } from "lucide-react";

interface EmergencyButtonProps {
  type: "police" | "hospital";
  onClick: () => void;
  className?: string;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({
  type,
  onClick,
  className,
}) => {
  const isPolice = type === "police";
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center w-full p-6 rounded-xl shadow-lg transition-all",
        isPolice ? "bg-emergency-police text-white" : "bg-emergency-hospital text-white",
        "hover:brightness-110",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        {isPolice ? <AlertTriangle size={28} /> : <Phone size={28} />}
        <div className="text-3xl font-bold">{isPolice ? "POLICE" : "HOSPITAL"}</div>
      </div>
    </button>
  );
};

export default EmergencyButton;
