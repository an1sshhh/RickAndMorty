import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rickDark to-rickDarker dark:from-rickDarker dark:to-black flex items-center justify-center">
      <div className="max-w-md mx-auto p-8 bg-rickDark/80 dark:bg-rickDarker border-4 border-rickYellow rounded-lg text-center">
        <div className="text-8xl mb-4">🤷</div>
        <h1 className="text-4xl font-bold text-rickYellow mb-4">
          Character Not Found
        </h1>
        <p className="text-foreground/70 mb-6">
          This character doesn't exist in the Rick and Morty universe... or at least not in our database.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-rickGreen dark:bg-rickGreenDark text-rickDark font-bold rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
        >
          ← Back to RickDex
        </Link>
      </div>
    </div>
  );
}
