
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";

interface EmergencyContactSetupProps {
  onSave: (name: string, phone: string) => void;
  emergencyContact: { name: string; phone: string } | null;
}

const EmergencyContactSetup: React.FC<EmergencyContactSetupProps> = ({ 
  onSave, 
  emergencyContact 
}) => {
  const [name, setName] = useState(emergencyContact?.name || "");
  const [phone, setPhone] = useState(emergencyContact?.phone || "");
  const [isEditing, setIsEditing] = useState(!emergencyContact);

  const handleSave = () => {
    if (name && phone) {
      onSave(name, phone);
      setIsEditing(false);
    }
  };

  if (!isEditing && emergencyContact) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Emergency Contact</h3>
            <div className="flex items-center gap-2 mt-2">
              <Phone size={16} className="text-emergency-hospital" />
              <p>{emergencyContact.name}: {emergencyContact.phone}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsEditing(true)}
          >
            Change
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-3">
      <h3 className="font-medium">Set Emergency Contact</h3>
      <div className="space-y-2">
        <Label htmlFor="contact-name">Contact Name</Label>
        <Input
          id="contact-name"
          placeholder="Emergency contact name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-phone">Contact Phone</Label>
        <Input
          id="contact-phone"
          type="tel"
          placeholder="Emergency contact phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <Button onClick={handleSave} className="w-full">
        Save Contact
      </Button>
    </div>
  );
};

export default EmergencyContactSetup;
