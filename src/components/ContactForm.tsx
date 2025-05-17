
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactFormProps {
  name: string;
  setName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  additionalInfo: string;
  setAdditionalInfo: (value: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  name,
  setName,
  phone,
  setPhone,
  additionalInfo,
  setAdditionalInfo,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="Your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="info">Emergency Details</Label>
        <Textarea
          id="info"
          placeholder="Describe your emergency"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          rows={2}
        />
      </div>
    </div>
  );
};

export default ContactForm;
