import { useEffect, useState } from "react";

/** Honest pipeline copy matching what the backend actually does. */
const STEPS = [
  { label: "Reading the source", note: "Fetching the transcript or extracting PDF text" },
  { label: "Structuring concepts", note: "Gemini writes the summary, analogy and mind map" },
  { label: "Preparing your workspace", note: "Laying out the quiz and grounding the chat" },
];

export function Processing({ sourceLabel }: { sourceLabel: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Advances optimistically; the final step stays active until /generate resolves.
    const t1 = setTimeout(() => setStep(1), 3500);
    const t2 = setTimeout(() => setStep(2), 12000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col justify-center px-6 py-20">
      <p className="label-eyebrow">Building workspace</p>
      <h1 className="mt-4 font-display text-3xl md:text-4xl">{sourceLabel}</h1>
      <ol className="mt-12 space-y-8">
        {STEPS.map((s, i) => {
          const state = i < step ? "done" : i === step ? "active" : "pending";
          return (
            <li key={s.label} className="flex gap-5">
              <span
                aria-hidden
                className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
                  state === "done"
                    ? "bg-success"
                    : state === "active"
                      ? "animate-pulse bg-accent"
                      : "bg-rule"
                }`}
              />
              <span>
                <span
                  className={`block font-display text-xl ${
                    state === "pending" ? "text-muted-foreground" : ""
                  }`}
                >
                  {s.label}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{s.note}</span>
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-14 border-t border-rule pt-5 text-xs text-muted-foreground">
        Long sources take longer — the transcript is truncated before it reaches the model.
      </p>
    </div>
  );
}
