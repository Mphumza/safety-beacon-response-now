
import { LocationData } from "./locationService";

export interface EmergencyRequest {
  type: "police" | "hospital";
  name: string;
  phone: string;
  additionalInfo: string;
  location: LocationData;
}

export interface EmergencyResponse {
  success: boolean;
  message: string;
  requestId?: string;
}

// This is a mock service - in a real application, this would connect to a backend API
export const sendEmergencyAlert = async (requestData: EmergencyRequest): Promise<EmergencyResponse> => {
  // Simulate network request delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate success (in a real app, this would be an actual API call)
  const success = Math.random() > 0.1; // 90% success rate for demo purposes
  
  if (success) {
    return {
      success: true,
      message: `Your ${requestData.type} emergency alert has been sent. Help is on the way.`,
      requestId: `EM-${Date.now().toString().slice(-6)}`
    };
  } else {
    throw new Error("Unable to connect to emergency services. Please try again or call directly.");
  }
};
