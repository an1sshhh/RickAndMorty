"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Character } from "@/types/rick";
import Link from "next/link";

export default function CharacterCard({ character }: { character: Character }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favs") || "[]") as number[];
    setIsFav(favs.includes(character.id));
  }, [character.id]);

  function toggleFav() {
    const favs = JSON.parse(localStorage.getItem("favs") || "[]") as number[];
    if (favs.includes(character.id)) {
      const updated = favs.filter((id) => id !== character.id);
      localStorage.setItem("favs", JSON.stringify(updated));
      setIsFav(false);
    } else {
      favs.push(character.id);
      localStorage.setItem("favs", JSON.stringify(favs));
      setIsFav(true);
    }
  }

  const statusColor = {
    Alive: "bg-rickGreen/20 text-rickGreen border-rickGreen",
    Dead: "bg-red-500/20 text-red-500 border-red-500",
    unknown: "bg-gray-500/20 text-gray-400 border-gray-500",
  }[character.status] || "bg-gray-500/20";

  return (
    <article className="bg-rickDark/80 dark:bg-rickDarker border-2 border-rickGreen dark:border-rickGreenDark rounded-lg p-4 shadow-lg hover:shadow-2xl hover:border-rickYellow dark:hover:border-rickYellow transition-all transform hover:scale-105 hover:shadow-rickGreen/50">
      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg border-2 border-rickGreen/50 dark:border-rickGreenDark/50">
        <Image
          src={character.image}
          alt={character.name}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      <h3 className="text-lg font-bold text-rickGreen dark:text-rickGreenDark mb-2 line-clamp-2">
        {character.name}
      </h3>

      <div className="space-y-2 mb-4">
        <p className={`text-sm font-semibold border rounded-full py-1 px-2 inline-block ${statusColor}`}>
          {character.status}
        </p>
        <p className="text-sm text-foreground/80">
          {character.species}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <button
          onClick={toggleFav}
          className={`flex-1 px-3 py-2 rounded-lg font-bold text-sm transition-all transform hover:scale-105 ${
            isFav
              ? "bg-rickYellow text-rickDark hover:bg-yellow-400"
              : "bg-rickGreen/30 dark:bg-rickGreen/20 text-rickGreen hover:bg-rickGreen/50 border border-rickGreen"
          }`}
        >
          {isFav ? "★ Favorited" : "☆ Favorite"}
        </button>

        <Link
          href={`/character/${character.id}`}
          className="flex-1 text-center px-3 py-2 rounded-lg font-bold text-sm bg-rickBlue dark:bg-rickBlueDark text-white hover:bg-opacity-90 transition-all transform hover:scale-105"
        >
          Details →
        </Link>
      </div>
    </article>
  );
}
