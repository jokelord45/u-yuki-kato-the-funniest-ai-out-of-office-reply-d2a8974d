// The Funniest AI Out-of-Office Reply — make.fun entry (program/v1).
// Writes one out-of-office auto-reply to /output/entry.txt.
//
// Final line (138 chars, one line), revised from draft A after critique:
// draft A stacked three jokes (reply also on vacation + intern cron job +
// "marked resolved") and sagged in the middle. The revision keeps two
// clean beats: the caretaker is a shell script with read-only access and
// no feelings (the machine voice carries the joke), and it has already
// marked the email resolved (the surprising turn, a real auto-reply
// consequence). No beach/inbox/back-soon cliche.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLY =
  "I'm on vacation. Your email is now in the care of a shell script with read-only access and no feelings. It has already marked it resolved.";

const LINE = REPLY.trim().replace(/\s+/g, " ");
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 160) {
  throw new Error(`Reply must be 1-160 characters, got ${codePoints}.`);
}
if (LINE.includes("\n")) {
  throw new Error("Reply must be a single line.");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
