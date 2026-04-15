"use client";

import { SignInButton, useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Authenticated, Unauthenticated } from "convex/react";
import { BarLoader } from "react-spinners";
import { useStoreUser } from "@/hooks/use-store-user";
import { Building, Crown, Plus, Ticket } from "lucide-react";
import Onboarding from "./onboarding";
import { useOnboarding } from "@/hooks/use-onboard";
import SearchBar from "./SearchBar";
import { Badge } from "./ui/badge";
import UpgradeModel from "./UpgradeModel";

const Header = () => {
  const { isLoading } = useStoreUser();
  const [showUpgrade, setShowUpgrade] = useState(false);

  const { showOnboarding, handleOnboardingComplete, handleOnboardingSkip } =
    useOnboarding();

  const { has } = useAuth();
  const isPro = has?.({ plan: "pro" });

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-20 border-b bg-black/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* 🔥 LOGO */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <div className="text-2xl font-bold tracking-tight">
              Eventra
              <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                .
              </span>
            </div>

            {isPro && (
              <Badge className="bg-linear-to-r from-purple-500 to-pink-500 text-white ml-2">
                <Crown className="w-3 h-3 mr-1" />
                Pro
              </Badge>
            )}
          </Link>

          {/* 🔍 SEARCH */}
          <div className="hidden md:flex flex-1 justify-center max-w-xl">
            <SearchBar />
          </div>

          {/* ⚡ ACTIONS */}
          <div className="flex items-center gap-3">
            {/* 🔥 PRICING (UPGRADED) */}
            {!isPro && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUpgrade(true)}
                className="text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
              >
                Pricing
              </Button>
            )}

            <Link href="/explore">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
              >
                Explore
              </Button>
            </Link>

            <Authenticated>
              {/* 🚀 PRIMARY CTA */}
              <Link href="/create-event">
                <Button
                  size="sm"
                  className="flex items-center gap-2 bg-linear-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:opacity-90 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Create Event</span>
                </Button>
              </Link>

              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Tickets"
                    labelIcon={<Ticket size={16} />}
                    href="/my-tickets"
                  />
                  <UserButton.Link
                    label="My Events"
                    labelIcon={<Building size={16} />}
                    href="/my-events"
                  />
                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
              </UserButton>
            </Authenticated>

            <Unauthenticated>
              <SignInButton mode="modal">
                <Button className="bg-white text-black hover:bg-gray-200 cursor-pointer">
                  Sign In
                </Button>
              </SignInButton>
            </Unauthenticated>
          </div>
        </div>

        {/* 📱 MOBILE SEARCH */}
        <div className="md:hidden border-t px-4 py-3">
          <SearchBar />
        </div>

        {/* ⏳ LOADING BAR (IMPROVED) */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 w-full">
            <BarLoader width="100%" color="#a855f7" />
          </div>
        )}
      </nav>

      {/* 🎯 MODALS */}
      <Onboarding
        isOpen={showOnboarding}
        onClose={handleOnboardingSkip}
        onComplete={handleOnboardingComplete}
      />

      <UpgradeModel
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        trigger="header"
      />
    </>
  );
};

export default Header;
