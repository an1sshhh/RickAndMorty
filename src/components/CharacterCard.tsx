"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Character } from "@/types/rick";

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

  return (
    <article className="bg-white rounded-lg border p-3 shadow-sm">
      <div className="relative w-full h-48 mb-3 overflow-hidden rounded">
        <Image
          src={character.image}
          alt={character.name}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <h3 className="text-lg font-semibold">{character.name}</h3>
      <p className="text-sm text-slate-600">
        {character.species} • {character.status}
      </p>

      <div className="mt-3 flex items-center justify-between">
        <button
          onClick={toggleFav}
          className={`px-3 py-1 rounded text-sm ${
            isFav ? "bg-yellow-400" : "bg-slate-100"
          }`}
        >
          {isFav ? "★ Favorited" : "☆ Favorite"}
        </button>

        <a
          href={`/character/${character.id}`}
          className="text-sm underline text-blue-600"
        >
          Details
        </a>
      </div>
    </article>
  );
}
