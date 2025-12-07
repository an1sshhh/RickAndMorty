"use client";

import dynamic from "next/dynamic";
import React from "react";
import Link from "next/link";

const CharactersList = dynamic(() => import("@/components/CharactersList"), {
  ssr: false,
  loading: () => (
    <div className="text-center py-12">
      <p className="text-lg text-rickGreen dark:text-rickGreenDark font-bold animate-pulse">
        Loading characters...
      </p>
    </div>
  ),
});

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rickDark to-rickDarker dark:from-rickDarker dark:to-black text-foreground">
      {/* Header */}
      <div className="border-b-4 border-rickGreen dark:border-rickGreenDark bg-rickDark/50 dark:bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-5xl font-bold text-rickGreen dark:text-rickGreenDark drop-shadow-lg">
              RickDex
            </h1>
            <Link
              href="/favorites"
              className="px-6 py-2 bg-rickYellow text-rickDark font-bold rounded-lg hover:bg-opacity-90 transition-all hover:shadow-lg transform hover:scale-105"
            >
              ⭐ Favorites
            </Link>
          </div>
          <p className="text-rickYellow dark:text-yellow-300 text-lg font-semibold drop-shadow-md">
            Browse characters, search, filter, paginate and favorite them.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <CharactersList />
      </div>

      {/* Portal Effect Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rickGreen/5 dark:bg-rickGreen/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rickBlue/5 dark:bg-rickBlue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>
    </div>
  );
}
