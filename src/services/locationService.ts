
export interface LocationData {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  error?: string;
}

export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        latitude: null,
        longitude: null,
        accuracy: null,
        error: "Geolocation is not supported by your browser"
      });
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        let errorMessage = "Unknown error occurred";
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }
        
        resolve({
          latitude: null,
          longitude: null,
          accuracy: null,
          error: errorMessage
        });
      }
    );
  });
};
