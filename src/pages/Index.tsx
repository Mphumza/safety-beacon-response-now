
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import EmergencyButton from "@/components/EmergencyButton";
import EmergencyConfirmationDialog from "@/components/EmergencyConfirmationDialog";
import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import { getCurrentLocation } from "@/services/locationService";
import { sendEmergencyAlert } from "@/services/emergencyService";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [emergencyType, setEmergencyType] = useState<"police" | "hospital" | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
        name,
        phone,
        additionalInfo,
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
          <h2 className="text-2xl font-semibold text-center">Emergency Response</h2>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            <CardHeader className="pb-2">
              <h3 className="text-lg font-medium">Your Contact Information</h3>
            </CardHeader>
            <CardContent>
              <ContactForm
                name={name}
                setName={setName}
                phone={phone}
                setPhone={setPhone}
                additionalInfo={additionalInfo}
                setAdditionalInfo={setAdditionalInfo}
              />
            </CardContent>
          </Card>
          
          <div className="text-sm text-gray-500 text-center">
            This application simulates emergency services. In a real emergency, call your local emergency number.
          </div>
        </main>
      </div>
      
      <EmergencyConfirmationDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        type={emergencyType || "police"}
        onConfirm={handleEmergencyConfirm}
      />
    </div>
  );
};

export default Index;
