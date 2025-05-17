
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import EmergencyButton from "@/components/EmergencyButton";
import EmergencyConfirmationDialog from "@/components/EmergencyConfirmationDialog";
import EmergencyContactSetup from "@/components/EmergencyContactSetup";
import Header from "@/components/Header";
import { getCurrentLocation } from "@/services/locationService";
import { sendEmergencyAlert } from "@/services/emergencyService";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const { toast } = useToast();
  const [emergencyType, setEmergencyType] = useState<"police" | "hospital" | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState<{ name: string; phone: string } | null>(null);

  // Load emergency contact from localStorage on component mount
  useEffect(() => {
    const savedContact = localStorage.getItem("emergencyContact");
    if (savedContact) {
      setEmergencyContact(JSON.parse(savedContact));
    }
  }, []);

  const saveEmergencyContact = (name: string, phone: string) => {
    const contact = { name, phone };
    setEmergencyContact(contact);
    localStorage.setItem("emergencyContact", JSON.stringify(contact));
    
    toast({
      title: "Emergency Contact Saved",
      description: `${name} will be notified during emergencies.`,
    });
  };

  const handleEmergencyButtonClick = (type: "police" | "hospital") => {
    setEmergencyType(type);
    setConfirmDialogOpen(true);
  };

  const handleEmergencyConfirm = async () => {
    if (!emergencyType) return;
    
    setIsLoading(true);
    
    try {
      const locationData = await getCurrentLocation();
      
      if (locationData.error) {
        toast({
          variant: "destructive",
          title: "Location Error",
          description: locationData.error,
        });
      }
      
      const response = await sendEmergencyAlert({
        type: emergencyType,
        name: emergencyContact?.name || "Anonymous",
        phone: emergencyContact?.phone || "",
        additionalInfo: `Emergency SOS triggered. ${emergencyContact ? 'Emergency contact is ' + emergencyContact.name + ' (' + emergencyContact.phone + ')' : 'No emergency contact set.'}`,
        location: locationData,
      });
      
      toast({
        title: "Emergency Alert Sent",
        description: response.message,
        duration: 6000,
      });
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error Sending Alert",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
      setConfirmDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-md mx-auto p-4">
        <Header />
        
        <main className="space-y-6 my-6">
          <div className="grid grid-cols-1 gap-4">
            <EmergencyButton 
              type="police" 
              onClick={() => handleEmergencyButtonClick("police")} 
            />
            <EmergencyButton 
              type="hospital" 
              onClick={() => handleEmergencyButtonClick("hospital")} 
            />
          </div>
          
          <Card>
            <CardContent className="pt-4">
              <EmergencyContactSetup 
                onSave={saveEmergencyContact}
                emergencyContact={emergencyContact}
              />
            </CardContent>
          </Card>
          
          <div className="text-sm text-center text-gray-500">
            This is an emergency SOS application simulation.
          </div>
        </main>
      </div>
      
      <EmergencyConfirmationDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        type={emergencyType || "police"}
        onConfirm={handleEmergencyConfirm}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Index;
