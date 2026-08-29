import { useEffect, useState } from "react";

export type DisplayOption = "a" | "b" | "c";
export const DEFAULT_DISPLAY_OPTION: DisplayOption = "a";

const STORAGE_KEY = "cc-display-font";

const OPTIONS: { id: DisplayOption; label: string; note: string }[] = [
  { id: "a", label: "A", note: "Fraunces / Space Mono" },
  { id: "b", label: "B", note: "Instrument Serif / Inter" },
  { id: "c", label: "C", note: "Newsreader / Plex Mono" },
];

/**
 * Temporary comparison control: swaps the single --font-serif-display theme
 * variable by setting data-display on <html>. Remove once a option is chosen.
 */
export function DisplayFontSwitcher() {
  const [active, setActive] = useState<DisplayOption>(DEFAULT_DISPLAY_OPTION);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as DisplayOption | null;
    const next = stored === "a" || stored === "b" || stored === "c" ? stored : DEFAULT_DISPLAY_OPTION;
    setActive(next);
  }, []);

  useEffect(() => {
    document.documentElement.dataset["display"] = active;
    window.localStorage.setItem(STORAGE_KEY, active);
  }, [active]);

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1 rounded-full border border-rule bg-paper/95 px-2 py-1.5 shadow-sm"
      role="group"
      aria-label="Display font option"
    >
      <span className="label-util px-1 text-muted-foreground">Font</span>
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => setActive(option.id)}
          aria-pressed={active === option.id}
          title={option.note}
          className={`label-util rounded-full px-2.5 py-1 transition-colors duration-150 ${
            active === option.id
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
