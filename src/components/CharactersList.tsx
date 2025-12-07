"use client";

import useSWR from "swr";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
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

  const { data, error, isLoading } = useSWR<Paginated<Character>>(url, fetcher, { 
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    onError: (err: any) => {
      // Handle 404 (no results) silently - we'll show a message in the UI
      if (err?.status === 404 || err?.message?.includes('404')) {
        return;
      }
      // Show toast for other errors
      toast.error(err?.message || "Failed to load characters. Please try again.");
    }
  });

  // when filters change reset to page 1
  useEffect(() => setPage(1), [name, status, species]);

  // Check if error is a 404 (no results found)
  const isNoResults = error && (error?.status === 404 || error?.message?.includes('404') || error?.message?.includes('nothing here'));
  const hasOtherError = error && !isNoResults;

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

      {isLoading && (
        <div className="text-center py-12">
          <p className="text-lg text-rickGreen dark:text-rickGreenDark font-bold animate-pulse">
            Loading characters...
          </p>
        </div>
      )}

      {isNoResults && (
        <div className="text-center py-12 bg-rickDark/30 dark:bg-rickDarker/30 rounded-lg border-2 border-rickYellow/50">
          <p className="text-xl text-rickYellow font-bold mb-2">No Characters Found</p>
          <p className="text-sm text-foreground/70">
            Try adjusting your filters or search criteria
          </p>
        </div>
      )}

      {hasOtherError && (
        <div className="text-center py-12 bg-red-900/20 rounded-lg border-2 border-red-500/50">
          <p className="text-xl text-red-400 font-bold mb-2">Oops! Something went wrong</p>
          <p className="text-sm text-red-300/70">
            Unable to load characters. Please try again later.
          </p>
        </div>
      )}

      {!isLoading && !error && (
        <>
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
        </>
      )}
    </section>
  );
}
