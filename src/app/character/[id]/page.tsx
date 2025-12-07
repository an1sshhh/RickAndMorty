import type { Character } from "@/types/rick";

async function fetchCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!res.ok) throw new Error("Failed to fetch character");
  return res.json();
}

export default async function CharacterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const character = await fetchCharacter(id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{character.name}</h1>

      <div className="flex gap-6">
        <img
          src={character.image}
          alt={character.name}
          className="w-60 h-60 rounded-lg object-cover"
        />

        <div className="space-y-1">
          <p><strong>Status:</strong> {character.status}</p>
          <p><strong>Species:</strong> {character.species}</p>
          <p><strong>Origin:</strong> {character.origin.name}</p>
          <p><strong>Location:</strong> {character.location.name}</p>
          <p><strong>Episodes Appearances:</strong> {character.episode.length}</p>
        </div>
      </div>
    </div>
  );
}
