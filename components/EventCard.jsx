"use client";

import { Calendar, MapPin, Users, Trash2, X, QrCode, Eye } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { getCategoryIcon, getCategoryLabel } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function EventCard({
  event,
  onClick,
  onDelete,
  variant = "grid",
  action = null,
  className = "",
}) {

  return (
    <Card
      className={`overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl border border-border/50 hover:border-purple-500/40 ${className}`}
      onClick={onClick}
    >
      {/* 🔥 IMAGE */}
      <div className="relative h-52 overflow-hidden">
        {event.coverImage ? (
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-4xl"
            style={{ backgroundColor: event.themeColor }}
          >
            {getCategoryIcon(event.category)}
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Price badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-black/70 backdrop-blur text-white">
            {event.ticketType === "free"
              ? "Free"
              : `₹${event.ticketPrice}`}
          </Badge>
        </div>

        {/* Trending badge (optional future) */}
        {event.registrationCount > 50 && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
              🔥 Trending
            </Badge>
          </div>
        )}
      </div>

      {/* 🔥 CONTENT */}
      <CardContent className="space-y-3 p-4">

        {/* Category */}
        <Badge variant="outline" className="w-fit">
          {getCategoryIcon(event.category)} {getCategoryLabel(event.category)}
        </Badge>

        {/* Title */}
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-purple-400 transition-colors">
          {event.title}
        </h3>

        {/* Info */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{format(event.startDate, "PPP")}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">
              {event.locationType === "online"
                ? "Online Event"
                : `${event.city}, ${event.state || event.country}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>
              {event.registrationCount}/{event.capacity} attending
            </span>
          </div>
        </div>

        {/* 🔥 CTA */}
        {action && (
          <div className="flex gap-2 pt-3">
            <Button
              size="sm"
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.(e);
              }}
            >
              {action === "event" ? (
                <>
                  <Eye className="w-4 h-4 mr-1" />
                  View Event
                </>
              ) : (
                <>
                  <QrCode className="w-4 h-4 mr-1" />
                  Show Ticket
                </>
              )}
            </Button>

            {onDelete && (
              <Button
                size="sm"
                variant="outline"
                className="text-red-500 hover:bg-red-500/10"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(event._id);
                }}
              >
                {action === "event" ? (
                  <Trash2 className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}