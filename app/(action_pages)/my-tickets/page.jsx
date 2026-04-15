"use client";

import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { useConvexMutation, useConvexQuery } from "@/hooks/use-convex-query";
import { format } from "date-fns";
import { Calendar, Loader2, MapPin, Ticket, Tickets } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "sonner";

const MyTickets = () => {
  const [selectedTicket, setTickets] = useState(null);
  const router = useRouter();

  const { data: registrations, isLoading } = useConvexQuery(
    api.registration.getMyRegistrations,
  );

  const { mutate: cancelRegistration, isLoading: isCancel } = useConvexMutation(
    api.registration.cancelRegistration,
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  const now = Date.now();

  const upcomingReg = registrations.filter(
    (reg) =>
      reg.event && reg.event.startDate >= now && reg.status === "confirmed",
  );

  const pastReg = registrations.filter(
    (reg) =>
      (reg.event && reg.event.startDate < now) || reg.status === "cancelled",
  );

  const handleCancelReg = async (regId) => {
    if (!window.confirm("Are you sure to cancel registration?")) return;

    try {
      await cancelRegistration({ regId });
      toast.success("Registration cancelled Successfully");
    } catch (error) {
      toast.error("Failed to cancel registration" || error.message);
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Tickets</h1>
          <p className="text-muted-foreground">
            View and manage your event registrations
          </p>
        </div>

        {/* Upcoming */}
        {upcomingReg?.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingReg.map((reg) => (
                <EventCard
                  key={reg._id}
                  event={reg.event}
                  action={"ticket"}
                  onClick={() => setTickets(reg)}
                  onDelete={() => handleCancelReg(reg._id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Past */}
        {pastReg?.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Past or Cancelled Events
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastReg.map((reg) => (
                <EventCard
                  key={reg._id}
                  event={reg.event}
                  action={null}
                  onClick={() => setTickets(reg)}
                  onDelete={() => handleCancelReg(reg._id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Reg */}
        {upcomingReg?.length === 0 && pastReg?.length === 0 && (
          <Card className={"p-12 text-center"}>
            <div className="max-w-md mx-auto space-y-4">
              <h2 className="text-2xl font-semibold">No Tickets Found</h2>
            </div>
            <p className="text-muted-foreground">
              Register for events ot see your tickets
            </p>
            <Button className={"gap-2"} asChild>
              <Link href={"/explore"}>
                <Ticket className="w-4 h-4" />
                Check out events
              </Link>
            </Button>
          </Card>
        )}
      </div>

      {/* QR */}
      {selectedTicket && (
        <Dialog
          open={!!selectedTicket}
          onOpenChange={() => setTickets(null)}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Your Ticket</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="text-center">
                <p className="font-semibold mb-1">
                  {selectedTicket.attendeeName}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedTicket.event.title}
                </p>
              </div>

              <div className="flex justify-center p-6 bg-white rounded-lg">
                <QRCode value={selectedTicket.qrCode} size={200} level="H" />
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-1">Ticket ID</p>
                <p className="font-mono text-sm">{selectedTicket.qrCode}</p>
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {format(selectedTicket.event.startDate, "PPP, h:mm a")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {selectedTicket.event.locationType === "online"
                      ? "Online Event"
                      : `${selectedTicket.event.city}, ${
                          selectedTicket.event.state ||
                          selectedTicket.event.country
                        }`}
                  </span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Show this QR code at the event entrance for check-in
              </p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MyTickets;
