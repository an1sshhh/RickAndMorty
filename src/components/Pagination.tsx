"use client";

type Props = {
  current: number;
  totalPages: number;
  onPageChange: (p: number) => void;
};

export default function Pagination({
  current,
  totalPages,
  onPageChange,
}: Props) {
  const prev = () => onPageChange(Math.max(1, current - 1));
  const next = () => onPageChange(Math.min(totalPages, current + 1));

  // small page window
  const windowSize = 5;
  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, current - half);
  let end = Math.min(totalPages, start + windowSize - 1);
  if (end - start < windowSize - 1) start = Math.max(1, end - windowSize + 1);

  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);

  const buttonClass = (isActive: boolean, isDisabled: boolean) =>
    `px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-110 ${
      isDisabled
        ? "opacity-40 cursor-not-allowed"
        : isActive
          ? "bg-rickYellow text-rickDark shadow-lg"
          : "bg-rickGreen/30 dark:bg-rickGreen/20 text-rickGreen border-2 border-rickGreen dark:border-rickGreenDark hover:bg-rickGreen/50"
    }`;

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 mt-8 p-4 bg-rickDark/40 dark:bg-rickDarker/40 rounded-lg border-2 border-rickGreen/30 dark:border-rickGreenDark/30">
      <button
        onClick={prev}
        disabled={current === 1}
        className={buttonClass(false, current === 1)}
      >
        ← Prev
      </button>

      {start > 1 && (
        <button
          onClick={() => onPageChange(1)}
          className={buttonClass(false, false)}
        >
          1
        </button>
      )}
      {start > 2 && <span className="px-2 text-foreground/60">…</span>}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={buttonClass(p === current, false)}
        >
          {p}
        </button>
      ))}

      {end < totalPages - 1 && (
        <span className="px-2 text-foreground/60">…</span>
      )}
      {end < totalPages && (
        <button
          onClick={() => onPageChange(totalPages)}
          className={buttonClass(false, false)}
        >
          {totalPages}
        </button>
      )}

      <button
        onClick={next}
        disabled={current === totalPages}
        className={buttonClass(false, current === totalPages)}
      >
        Next →
      </button>

      <span className="text-sm text-foreground/70 ml-4">
        Page {current} of {totalPages}
      </span>
    </nav>
  );
}
