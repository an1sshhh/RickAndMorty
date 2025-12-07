import CharacterCard from "@/components/CharacterCard";
import type { Character, Paginated } from "@/types/rick";

async function fetchCharacters(page = 1): Promise<Paginated<Character>> {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) throw new Error("Failed to fetch characters");
  return res.json();
}

export default async function Home() {
  const data = await fetchCharacters(1);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">RickDex</h1>

      <p className="text-slate-600 mb-4">
        Showing page 1 — {data.info.count} total characters
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data.results.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}
