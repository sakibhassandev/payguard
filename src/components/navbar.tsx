"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { signOut } from "next-auth/react";
import { NavbarProps } from "@/lib/definitions";

export function Navbar({ name, links }: NavbarProps) {
  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">{name}</span>
        </Link>
        <div className="flex items-center space-x-4">
          {links?.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button variant="ghost">{link.name}</Button>
            </Link>
          ))}
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
