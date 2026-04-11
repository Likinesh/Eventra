"use client";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Authenticated, Unauthenticated } from "convex/react";
import { BarLoader } from "react-spinners";
import { useStoreUser } from "@/hooks/user-store-user";
import { Building, Plus, Ticket } from "lucide-react";

const Header = () => {
  const { isLoading } = useStoreUser();
  const [showUpgrade, setShowUpgrade] = useState(false);
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
          </Link>

          {/* Location Search */}

          {/* Side actions */}
          <div className=" flex items-center">
            <Button
              variant={"ghost"}
              size="sm"
              onClick={() => setShowUpgrade(!showUpgrade)}
            >
              Pricing
            </Button>
            <Button
              variant={"ghost"}
              size="sm"
              asChild 
              className={"mr-2"}
            >
              <Link href={"/explore"}>Explore</Link>
            </Button>

            <Authenticated>
              <Button className={"flex gap-2 mr-4"} size="sm" asChild >
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
                  <UserButton.Action label="manageAcoount" />
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
        {/* Loader */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 w-full">
            <BarLoader width={"100%"} color="#a855f7" />
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
