
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
        "relative flex flex-col items-center justify-center w-full p-8 rounded-xl shadow-lg transition-all transform active:scale-95",
        isPolice ? "bg-emergency-police text-white" : "bg-emergency-hospital text-white",
        "hover:brightness-110 animate-pulse-emergency",
        className
      )}
    >
      <div className="absolute top-3 right-3">
        {isPolice ? <AlertTriangle size={24} /> : <Phone size={24} />}
      </div>
      <div className="text-4xl font-bold mb-2">{isPolice ? "Police" : "Hospital"}</div>
      <div className="text-sm opacity-90">
        {isPolice ? "Emergency Response" : "Medical Assistance"}
      </div>
    </button>
  );
};

export default EmergencyButton;
