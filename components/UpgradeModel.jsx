"use client";

import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PricingTable } from "@clerk/nextjs";

export default function UpgradeModal({ isOpen, onClose, trigger = "limit" }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-[#0B0B0F] border border-white/10 text-white">

        {/* 🔥 HEADER */}
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <DialogTitle className="text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Upgrade to Pro
            </DialogTitle>
          </div>

          <DialogDescription className="text-gray-400">
            {trigger === "header" && "Create unlimited events with Pro. "}
            {trigger === "limit" && "You've reached your free event limit. "}
            {trigger === "color" && "Custom theme colors are a Pro feature. "}
            Unlock premium features and grow faster with Eventra.
          </DialogDescription>
        </DialogHeader>

        {/* 🔥 PRICING TABLE (THEMED) */}
        <PricingTable
          appearance={{
            baseTheme: "dark",
            variables: {
              colorPrimary: "#7C3AED",
              colorBackground: "#0B0B0F",
              colorText: "#ffffff",
              colorInputBackground: "#111827",
              colorBorder: "#1F2937",
              borderRadius: "12px",
            },
            elements: {
              card: "bg-[#111827] border border-white/10 shadow-xl",
              pricingTableCard: "hover:scale-[1.03] transition-all duration-300",
              pricingTableCardHeader: "text-white",
              pricingTableCardPrice: "text-purple-400 text-3xl font-bold",
              button:
                "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90",
            },
          }}
          checkoutProps={{
            appearance: {
              elements: {
                drawerRoot: {
                  zIndex: 2000,
                },
              },
            },
          }}
        />

        {/* 🔥 FOOTER */}
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 border-white/10 text-gray-300 hover:bg-white/5 cursor-pointer"
          >
            Continue with Free Plan
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}