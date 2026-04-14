"use client";
import { SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
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
      <nav className="fixed top-0 right-0 bg-background/80 backdrop-blur-xl z-20 left-0 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href={"/"} className="flex items-center">
            <Image
              src={"/spott.png"}
              alt="Logo"
              width={500}
              height={500}
              className="w-full h-11"
              priority
            />
            
            {/* Pro Badge */}
            {isPro && (
              <Badge
                className={
                  "bg-linear-to-r from-pink-500 to-orange-500 gap-1 text-white ml-3"
                }
              >
                <Crown className="w-3 h-3" />
                Pro
              </Badge>
            )}
          </Link>

          {/* Location Search */}
          <div className="hidden md:flex flex-1 justify-center">
            <SearchBar />
          </div>

          {/* Side actions */}
          <div className=" flex items-center">
            {!isPro && (
              <Button
                variant={"ghost"}
                size="sm"
                onClick={() => setShowUpgrade(!showUpgrade)}
              >
                Pricing
              </Button>
            )}
            <Button variant={"ghost"} size="sm" asChild className={"mr-2"}>
              <Link href={"/explore"}>Explore</Link>
            </Button>

            <Authenticated>
              <Button className={"flex gap-2 mr-4"} size="sm" asChild>
                <Link href="/create-event">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Create Event</span>
                </Link>
              </Button>

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
              {/* <Link href={"/sign-in"}> */}
              <SignInButton mode="modal">
                <Button size="sm">Sign In</Button>
              </SignInButton>
              {/* </Link> */}
            </Unauthenticated>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="md:hidden border-t px-3 py-3">
          <SearchBar />
        </div>

        {/* Loader */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 w-full">
            <BarLoader width={"100%"} color="#a855f7" />
          </div>
        )}
      </nav>

      {/* Modals */}
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
