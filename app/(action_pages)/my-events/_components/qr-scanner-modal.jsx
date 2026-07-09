"use client";

import { useState, useEffect, useRef } from "react";
import { QrCode, Loader2 } from "lucide-react";
import { useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import QrScanner from "qr-scanner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function QRScannerModal({ isOpen, onClose }) {
  const [scannerReady, setScannerReady] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const { mutate: checkInAttendee } = useConvexMutation(
    api.registration.checkInAttendee
  );

  const handleCheckIn = async (qrCode) => {
    try {
      const result = await checkInAttendee({ qrCode });

      if (result.success) {
        toast.success("✅ Check-in successful!");
        onClose();
      } else {
        toast.error(result.message || "Check-in failed");
      }
    } catch (error) {
      toast.error(error.message || "Invalid QR code");
    }
  };

  useEffect(() => {
    let qrScanner = null;

    if (isOpen && videoRef.current) {
      console.log("Initializing QR scanner...");

      qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          console.log("QR Code detected:", result.data);
          if (qrScanner) {
             qrScanner.stop();
          }
          handleCheckIn(result.data);
        },
        { 
          highlightScanRegion: true, 
          highlightCodeOutline: true,
          preferredCamera: "environment"
        }
      );

      qrScanner.start()
        .then(() => {
          setScannerReady(true);
          setError(null);
        })
        .catch((err) => {
          console.error("Failed to start camera:", err);
          setError("Camera permission denied or not available.");
          toast.error("Camera failed. Please use manual entry.");
        });
    }

    return () => {
      if (qrScanner) {
        console.log("Cleaning up scanner...");
        qrScanner.stop();
        qrScanner.destroy();
      }
      setScannerReady(false);
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-purple-500" />
            Check-In Attendee
          </DialogTitle>
          <DialogDescription>
            Scan QR code or enter ticket ID manually
          </DialogDescription>
        </DialogHeader>

        {error ? (
          <div className="text-red-500 text-sm">{error}</div>
        ) : (
          <div className="flex flex-col items-center relative">
            <video 
              ref={videoRef} 
              className="w-full rounded-md shadow-sm border border-white/10" 
              style={{ minHeight: "250px", backgroundColor: "#000" }} 
            />
            {!scannerReady && (
              <div className="flex items-center justify-center py-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500 bg-black/50 p-1 rounded-full" />
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-4 text-center">
              {scannerReady
                ? "Position the QR code within the frame"
                : "Please allow camera access when prompted"}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}