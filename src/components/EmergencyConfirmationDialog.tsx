
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface EmergencyConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "police" | "hospital";
  onConfirm: () => void;
  isLoading?: boolean;
}

const EmergencyConfirmationDialog: React.FC<EmergencyConfirmationDialogProps> = ({
  open,
  onOpenChange,
  type,
  onConfirm,
  isLoading = false,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            {type === "police" ? "Police Emergency" : "Medical Emergency"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Are you sure you want to request{" "}
            {type === "police" ? "police assistance" : "medical assistance"}?
            This will send your location and emergency contact information to emergency services.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col gap-2 sm:flex-row">
          <AlertDialogCancel className="w-full sm:w-auto" disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={`w-full sm:w-auto ${
              type === "police"
                ? "bg-emergency-police hover:bg-red-700"
                : "bg-emergency-hospital hover:bg-blue-700"
            }`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Yes, Send Alert"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EmergencyConfirmationDialog;
