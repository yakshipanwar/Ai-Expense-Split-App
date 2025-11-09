"use client";

import {
  SignedOut,
  SignedIn,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { useStoreUser } from "@/hooks/use-store-user";
import {BarLoader} from "react-spinners";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";

const Header = () => {
  const { isLoading } = useStoreUser();
  const path =  usePathname();

  return (
    <header className="fixed top-0 w-full bg-white border-b border-gray-200 shadow-sm z-50">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
      <Image src={"/logos/Money-Divvy.png"}
      alt="Logo" width={800} height={100} className="h-11 w-auto object-contain">
      </Image>
      </Link>
      
      {path=== "/" && (
        <div className="hidden md:flex items-center gap-6">
          <Link href="#features"
          className="text-sm font-medium hover:text-green-600 transition">
            Features
          </Link>
          <Link href="#how-it-works"
          className="text-sm font-medium hover:text-green-600 transition">
            How it Works
          </Link>
        </div>
      )}
      <div className="flex items-center gap-4">
        <Authenticated>
          <Link href="/dashboard">
          <Button variant="outline" className="hidden md:inline-flex items-center gap-2 hover:text-green-600 hover:border-green-600 transition">
            <LayoutDashboard className="h-4 w-4">
            </LayoutDashboard>
            Dashboard
          </Button>
          <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
            <LayoutDashboard className="h-4 w-4"></LayoutDashboard>
          </Button>
          </Link>
          <UserButton></UserButton>
        </Authenticated>
        <Unauthenticated>
          <SignInButton>
            <Button variant={"ghost"}>Sign In</Button>
          </SignInButton>
          <SignUpButton>
            <Button className="bg-green-600 hover:bg-green-700 border-none">
              Get Started
            </Button>
          </SignUpButton>
        </Unauthenticated>
      </div>
      </nav>
      {isLoading && <BarLoader width={"100%"} color="#36d7b7"/> }
    </header>
  );
};

export default Header;
