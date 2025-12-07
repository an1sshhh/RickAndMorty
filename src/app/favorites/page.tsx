"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { buildCharacterIdsUrl, fetcher } from "@/lib/api";
import type { Character } from "@/types/rick";
import CharacterCard from "@/components/CharacterCard";
import { getFavs } from "@/lib/favs";
import Link from "next/link";

export default function FavoritesPage() {
  const [ids, setIds] = useState<number[]>([]);
  const [chars, setChars] = useState<Character[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const f = getFavs();
    setIds(f);
  }, []);

  useEffect(() => {
    if (ids.length === 0) {
      setChars([]);
      return;
    }
    const url = buildCharacterIdsUrl(ids);
    if (!url) return;
    setLoading(true);
    setError(null);
    fetcher<Character | Character[]>(url)
      .then((res) => {
        // API returns object for single id, array for multiple
        const list = Array.isArray(res) ? res : [res];
        setChars(list);
      })
      .catch((err) => {
        const errorMsg = err?.message || "Failed to load favorite characters";
        setError(errorMsg);
        toast.error(errorMsg);
      })
      .finally(() => setLoading(false));
  }, [ids]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rickDark to-rickDarker dark:from-rickDarker dark:to-black text-foreground">
      {/* Header */}
      <div className="border-b-4 border-rickGreen dark:border-rickGreenDark bg-rickDark/50 dark:bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-5xl font-bold text-rickYellow drop-shadow-lg">
              ⭐ Favorites
            </h1>
            <Link
              href="/"
              className="px-6 py-2 bg-rickGreen dark:bg-rickGreenDark text-rickDark font-bold rounded-lg hover:bg-opacity-90 transition-all hover:shadow-lg transform hover:scale-105"
            >
              ← Back to RickDex
            </Link>
          </div>
          <p className="text-rickGreen dark:text-rickGreenDark text-lg font-semibold drop-shadow-md mt-2">
            Your collection of favorite characters
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading && (
          <div className="text-center py-12">
            <p className="text-xl text-rickGreen dark:text-rickGreenDark font-bold animate-pulse">
              Loading favorites…
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-12 bg-red-900/20 rounded-lg border-2 border-red-500/50">
            <p className="text-xl text-red-400 font-bold mb-2">Unable to Load Favorites</p>
            <p className="text-sm text-red-300/70 mb-4">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-rickGreen text-rickDark font-bold rounded-lg hover:bg-opacity-90 transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && chars && chars.length === 0 && (
          <div className="bg-rickDark/80 dark:bg-rickDarker border-4 border-rickGreen/30 dark:border-rickGreenDark/30 rounded-lg p-12 text-center">
            <p className="text-2xl text-foreground/70 mb-4">No favorites yet</p>
            <p className="text-foreground/50 mb-8">
              Mark characters as Favorites on the homepage to see them here.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-rickGreen dark:bg-rickGreenDark text-rickDark font-bold rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              Browse Characters
            </Link>
          </div>
        )}

        {!loading && chars && chars.length > 0 && (
          <div>
            <div className="mb-6 p-4 bg-rickGreen/10 dark:bg-rickGreen/5 border-l-4 border-rickGreen dark:border-rickGreenDark rounded">
              <p className="text-lg font-bold text-rickGreen dark:text-rickGreenDark">
                {chars.length} character{chars.length !== 1 ? "s" : ""} favorited
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {chars?.map((c) => (
                <CharacterCard key={c.id} character={c} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Portal Effect Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rickGreen/5 dark:bg-rickGreen/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rickBlue/5 dark:bg-rickBlue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>
    </div>
  );
}
