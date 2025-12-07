"use client";

import useSWR from "swr";
import { useEffect, useMemo, useState } from "react";
import type { Character, Paginated } from "@/types/rick";
import { buildCharacterUrl, fetcher } from "@/lib/api";
import CharacterCard from "@/components/CharacterCard";
import Pagination from "./Pagination";
import SearchFilters from "./SearchFilters";

export default function CharactersList() {
  // UI state
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [species, setSpecies] = useState<string>("");

  // build url for SWR
  const url = useMemo(() => buildCharacterUrl({ page, name: name || undefined, status: status || undefined, species: species || undefined }), [page, name, status, species]);

  const { data, error, isLoading } = useSWR<Paginated<Character>>(url, fetcher, { revalidateOnFocus: false });

  // when filters change reset to page 1
  useEffect(() => setPage(1), [name, status, species]);

  return (
    <section>
      <div className="mb-4">
        <SearchFilters
          name={name}
          onNameChange={setName}
          status={status}
          onStatusChange={setStatus}
          species={species}
          onSpeciesChange={setSpecies}
        />
      </div>

      {isLoading && <p className="text-sm text-slate-500">Loading...</p>}
      {error && <p className="text-sm text-red-500">Error loading characters: {String(error)}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data?.results?.map((c) => <CharacterCard key={c.id} character={c} />) ?? null}
      </div>

      <div className="mt-6">
        <Pagination
          current={page}
          totalPages={data?.info?.pages ?? 1}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </section>
  );
}
