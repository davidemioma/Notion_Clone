"use client";

import { redirect } from "next/navigation";
import Spinner from "@/components/Spinner";
import { useConvexAuth } from "convex/react";
import Navigation from "./_components/Navigation";

export default function DocumentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated && !isLoading) {
    return redirect("/");
  }

  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation />

      <main className="h-full flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
