"use client";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Authenticated, Unauthenticated } from "convex/react";
import { BarLoader } from "react-spinners";
import { useStoreUser } from "@/hooks/user-store-user";

const Header = () => {
  const { isLoading } = useStoreUser();
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
            <Authenticated>
              <UserButton />
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
