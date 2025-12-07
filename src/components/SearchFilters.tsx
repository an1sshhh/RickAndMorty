"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  name: string;
  onNameChange: (s: string) => void;
  status: string;
  onStatusChange: (s: string) => void;
  species: string;
  onSpeciesChange: (s: string) => void;
};

const STATUS_OPTIONS = ["", "Alive", "Dead", "unknown"];

export default function SearchFilters({
  name,
  onNameChange,
  status,
  onStatusChange,
  species,
  onSpeciesChange,
}: Props) {
  const [localName, setLocalName] = useState(name);

  // debounce search input
  useEffect(() => {
    const t = setTimeout(() => onNameChange(localName.trim()), 400);
    return () => clearTimeout(t);
  }, [localName, onNameChange]);

  useEffect(() => setLocalName(name), [name]);

  // species suggestions
  const speciesSuggestions = useMemo(
    () => ["", "Human", "Alien", "Humanoid", "Robot", "Animal", "Cronenberg"],
    []
  );

  const inputBaseClass =
    "mt-1 block w-full rounded-lg border-2 px-4 py-2 bg-rickDark/50 dark:bg-rickDarker text-foreground placeholder-foreground/50 border-rickGreen dark:border-rickGreenDark focus:border-rickYellow focus:outline-none focus:ring-2 focus:ring-rickYellow/30 font-semibold transition-all";

  const labelClass = "block text-sm font-bold text-rickGreen dark:text-rickGreenDark mb-2";

  return (
    <div className="space-y-4 md:space-y-0 md:flex md:flex-row md:items-end md:gap-4 bg-rickDark/40 dark:bg-rickDarker/40 p-4 rounded-lg border-2 border-rickGreen/30 dark:border-rickGreenDark/30">
      <div className="flex-1">
        <label className={labelClass}>Search Character Name</label>
        <input
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          placeholder="e.g. Rick, Morty, Jessica..."
          className={inputBaseClass}
        />
      </div>

      <div className="w-full md:w-48">
        <label className={labelClass}>Status</label>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className={inputBaseClass}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s} className="bg-rickDark text-foreground">
              {s || "Any Status"}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-56">
        <label className={labelClass}>Species</label>
        <select
          value={species}
          onChange={(e) => onSpeciesChange(e.target.value)}
          className={inputBaseClass}
        >
          {speciesSuggestions.map((s) => (
            <option key={s} value={s} className="bg-rickDark text-foreground">
              {s || "Any Species"}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
