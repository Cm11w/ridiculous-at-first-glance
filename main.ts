// Ridiculous at First Glance, Real by the Second
// Writes one single-sentence startup pitch (at most 200 characters)
// to /output/entry.txt for the make.fun judge.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "We rent trained ferrets to pull cables through walls for electricians, who pay per job, because a ferret squeezes where no drill can reach and works for chicken treats.";

// The gate: entry.txt must be UTF-8 text of 1 to 200 characters, not only
// whitespace. Fail loudly instead of writing an entry the judge never sees.
if (PITCH.length === 0 || PITCH.length > 200 || PITCH.trim().length === 0) {
  throw new Error(`Pitch is ${PITCH.length} characters; the gate allows 1-200.`);
}

// The brief asks for one sentence: exactly one sentence-ending mark.
if ((PITCH.match(/[.!?]/g) ?? []).length !== 1) {
  throw new Error("Pitch must be exactly one sentence.");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, PITCH, "utf8");

// Round-trip check: what the judge reads must be byte-identical to the pitch.
if (readFileSync(outPath, "utf8") !== PITCH) {
  throw new Error("Written entry.txt does not match the pitch.");
}
