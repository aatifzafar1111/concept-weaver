import { useRef, useState } from "react";

export type SourceSettings = {
  sourceType: "youtube" | "pdf";
  url: string;
  file: File | null;
  style: string;
  qCount: number;
  difficulty: string;
};

const PERSONAS = [
  "Explain like I'm 5",
  "Marvel Universe",
  "Hardcore Gamer",
  "Gen-Z Slang",
  "Corporate Speak",
];
const DIFFICULTIES = ["Mix", "Easy", "Medium", "Hard"];

const STAGES = [
  { name: "Understand", note: "Summary + a human analogy" },
  { name: "Explore", note: "A mind map of the concepts" },
  { name: "Test", note: "A quiz written from the source" },
  { name: "Ask", note: "Chat grounded in the source" },
];

export function SourceForm({
  onSubmit,
  error,
}: {
  onSubmit: (s: SourceSettings) => void;
  error?: { title: string; detail: string } | null;
}) {
  const [sourceType, setSourceType] = useState<"youtube" | "pdf">("youtube");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [style, setStyle] = useState(PERSONAS[0]!);
  const [qCount, setQCount] = useState(5);
  const [difficulty, setDifficulty] = useState("Mix");
  const fileRef = useRef<HTMLInputElement>(null);

  const ready = sourceType === "youtube" ? url.trim().length > 0 : Boolean(file);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16 md:py-24">
      <p className="label-eyebrow">Concept Chef</p>
      <h1 className="mt-5 max-w-3xl text-4xl leading-[1.08] md:text-6xl">
        Turn a video or document into a complete learning workspace.
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
        One source in. Four stages out — read it, map it, test yourself on it, then question it
        directly.
      </p>

      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (ready) onSubmit({ sourceType, url, file, style, qCount, difficulty });
          }}
        >
          <div
            role="radiogroup"
            aria-label="Source type"
            className="inline-flex rule-top border-b border-rule"
          >
            {(["youtube", "pdf"] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={sourceType === t}
                onClick={() => setSourceType(t)}
                className={`-mb-px border-b-2 px-1 pb-3 pt-3 text-sm transition-colors first:mr-8 ${
                  sourceType === t
                    ? "border-accent text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "youtube" ? "Paste YouTube link" : "Upload PDF"}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {sourceType === "youtube" ? (
              <div>
                <label htmlFor="yt-url" className="label-eyebrow">
                  Video URL
                </label>
                <input
                  id="yt-url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="mt-3 w-full border-b border-input bg-transparent pb-3 font-display text-2xl outline-none placeholder:text-muted-foreground/60 focus:border-accent md:text-3xl"
                />
                <p className="mt-3 text-sm text-muted-foreground">
                  The video needs captions — the transcript is what everything is built from.
                </p>
              </div>
            ) : (
              <div>
                <span className="label-eyebrow">Document</span>
                <input
                  ref={fileRef}
                  id="pdf-file"
                  type="file"
                  accept="application/pdf"
                  className="sr-only"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="mt-3 flex w-full items-baseline justify-between border-b border-input pb-3 text-left font-display text-2xl transition-colors hover:border-accent md:text-3xl"
                >
                  <span className={file ? "" : "text-muted-foreground/60"}>
                    {file ? file.name : "Choose a PDF…"}
                  </span>
                  <span className="label-eyebrow shrink-0">Browse</span>
                </button>
                <p className="mt-3 text-sm text-muted-foreground">
                  Text-based PDFs only, up to 16 MB. Scans have no extractable text.
                </p>
              </div>
            )}
          </div>

          <fieldset className="mt-12 grid gap-8 sm:grid-cols-3">
            <legend className="label-eyebrow mb-4">Tuning</legend>
            <div>
              <label htmlFor="style" className="block text-sm text-muted-foreground">
                Explanation persona
              </label>
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="mt-2 w-full border-b border-input bg-transparent pb-2 text-sm outline-none focus:border-accent"
              >
                {PERSONAS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="qcount" className="block text-sm text-muted-foreground">
                Quiz questions
              </label>
              <input
                id="qcount"
                type="number"
                min={1}
                max={100}
                value={qCount}
                onChange={(e) => setQCount(Number(e.target.value))}
                className="mt-2 w-full border-b border-input bg-transparent pb-2 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label htmlFor="difficulty" className="block text-sm text-muted-foreground">
                Difficulty
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="mt-2 w-full border-b border-input bg-transparent pb-2 text-sm outline-none focus:border-accent"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={!ready}
            className="mt-12 inline-flex items-center gap-3 bg-accent px-7 py-4 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Build my learning workspace
            <span aria-hidden>→</span>
          </button>

          {error ? (
            <div className="mt-8 border-l-2 border-destructive bg-destructive-soft/60 px-5 py-4">
              <p className="font-display text-lg">{error.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{error.detail}</p>
            </div>
          ) : null}
        </form>

        <aside className="lg:border-l lg:border-rule lg:pl-10">
          <p className="label-eyebrow">What you get</p>
          <ol className="mt-5 space-y-6">
            {STAGES.map((s, i) => (
              <li key={s.name} className="flex gap-4">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-display text-xl leading-tight">{s.name}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{s.note}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-8 border-t border-rule pt-5 text-xs leading-relaxed text-muted-foreground">
            Workspaces live in memory only. Refreshing the page — or a server restart — ends the
            session, so export before you leave.
          </p>
        </aside>
      </div>
    </div>
  );
}
