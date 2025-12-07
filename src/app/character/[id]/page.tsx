import type { Character } from "@/types/rick";
import Link from "next/link";

async function fetchCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error("Failed to fetch character");
  return res.json();
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const character = await fetchCharacter(id);

  const statusColor = {
    Alive: "bg-rickGreen/20 text-rickGreen border-rickGreen",
    Dead: "bg-red-500/20 text-red-500 border-red-500",
    unknown: "bg-gray-500/20 text-gray-400 border-gray-500",
  }[character.status] || "bg-gray-500/20";

  return (
    <div className="min-h-screen bg-gradient-to-br from-rickDark to-rickDarker dark:from-rickDarker dark:to-black text-foreground">
      {/* Header */}
      <div className="border-b-4 border-rickGreen dark:border-rickGreenDark bg-rickDark/50 dark:bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-block mb-4 px-4 py-2 bg-rickBlue dark:bg-rickBlueDark text-white rounded-lg hover:bg-opacity-90 transition-all font-bold"
          >
            ← Back to RickDex
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-rickDark/80 dark:bg-rickDarker border-4 border-rickGreen dark:border-rickGreenDark rounded-lg p-8 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Character Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-square border-4 border-rickGreen/50 dark:border-rickGreenDark/50 rounded-lg overflow-hidden shadow-xl">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Character Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-5xl font-bold text-rickGreen dark:text-rickGreenDark mb-2">
                  {character.name}
                </h1>
                <p className={`text-lg font-bold border-2 rounded-lg py-2 px-4 inline-block ${statusColor}`}>
                  {character.status}
                </p>
              </div>

              <div className="space-y-4 border-t-2 border-rickGreen/30 dark:border-rickGreenDark/30 pt-6">
                <div className="bg-rickGreen/10 dark:bg-rickGreen/5 border-l-4 border-rickGreen dark:border-rickGreenDark p-4 rounded">
                  <p className="text-sm text-foreground/70">Species</p>
                  <p className="text-2xl font-bold text-rickGreen dark:text-rickGreenDark">
                    {character.species}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-rickBlue/10 dark:bg-rickBlue/5 border-l-4 border-rickBlue dark:border-rickBlueDark p-4 rounded">
                    <p className="text-sm text-foreground/70">Gender</p>
                    <p className="text-xl font-bold text-rickBlue dark:text-rickBlueDark">
                      {character.gender}
                    </p>
                  </div>

                  <div className="bg-rickPurple/10 dark:bg-rickPurple/5 border-l-4 border-rickPurple dark:border-rickPurpleDark p-4 rounded">
                    <p className="text-sm text-foreground/70">Type</p>
                    <p className="text-xl font-bold text-rickPurple dark:text-rickPurpleDark">
                      {character.type || "Unknown"}
                    </p>
                  </div>
                </div>

                <div className="bg-rickYellow/10 dark:bg-yellow-400/5 border-l-4 border-rickYellow p-4 rounded">
                  <p className="text-sm text-foreground/70">Origin</p>
                  <p className="text-lg font-bold text-rickYellow dark:text-yellow-300">
                    {character.origin.name}
                  </p>
                </div>

                <div className="bg-rickYellow/10 dark:bg-yellow-400/5 border-l-4 border-rickYellow p-4 rounded">
                  <p className="text-sm text-foreground/70">Last Known Location</p>
                  <p className="text-lg font-bold text-rickYellow dark:text-yellow-300">
                    {character.location.name}
                  </p>
                </div>

                <div className="bg-rickGreen/10 dark:bg-rickGreen/5 border-l-4 border-rickGreen dark:border-rickGreenDark p-4 rounded">
                  <p className="text-sm text-foreground/70">Episode Appearances</p>
                  <p className="text-2xl font-bold text-rickGreen dark:text-rickGreenDark">
                    {character.episode.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portal Effect Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rickGreen/5 dark:bg-rickGreen/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rickBlue/5 dark:bg-rickBlue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>
    </div>
  );
}
