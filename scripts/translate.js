#!/usr/bin/env node
/**
 * Generates translation files for all 46 languages using the Claude API.
 * Usage: ANTHROPIC_API_KEY=sk-... node scripts/translate.js [lang1 lang2 ...]
 * Without language args, translates all languages.
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error("Set ANTHROPIC_API_KEY environment variable");
  process.exit(1);
}

const LANGUAGES = {
  ar: "Arabic",
  bg: "Bulgarian",
  bn: "Bengali",
  cs: "Czech",
  de: "German",
  el: "Greek",
  en: "English",
  es: "Spanish",
  fa: "Farsi (Persian)",
  fr: "French",
  gu: "Gujarati",
  ha: "Hausa",
  he: "Hebrew",
  hi: "Hindi",
  hu: "Hungarian",
  hy: "Armenian",
  id: "Indonesian",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  mr: "Marathi",
  ms: "Malay",
  pa: "Punjabi",
  pl: "Polish",
  pt: "Portuguese",
  ro: "Romanian",
  ru: "Russian",
  sr: "Serbian",
  sv: "Swedish",
  sw: "Swahili",
  ta: "Tamil",
  te: "Telugu",
  tg: "Tajik",
  th: "Thai",
  tl: "Tagalog",
  tr: "Turkish",
  uk: "Ukrainian",
  ur: "Urdu",
  vi: "Vietnamese",
  xh: "Xhosa",
  zh: "Chinese (Simplified)",
};

const SOURCE = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../src/i18n/nl.json"), "utf8")
);

const OUT_DIR = path.join(__dirname, "../src/i18n");

function callClaude(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 32000,
      messages: [{ role: "user", content: prompt }],
    });

    const req = https.request(
      {
        hostname: "api.anthropic.com",
        path: "/v1/messages",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          "anthropic-version": "2023-06-01",
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.error) return reject(new Error(parsed.error.message));
            resolve(parsed.content[0].text);
          } catch (e) {
            reject(e);
          }
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function translateLanguage(code, name) {
  const outFile = path.join(OUT_DIR, `${code}.json`);
  if (fs.existsSync(outFile)) {
    console.log(`  [skip] ${code} already exists`);
    return;
  }
  // Remove stale .raw file from a previous failed attempt
  if (fs.existsSync(outFile + ".raw")) fs.unlinkSync(outFile + ".raw");

  console.log(`  [translating] ${code} (${name})...`);

  const prompt = `You are a professional translator specializing in educational content for children aged 8-14.

Translate this JSON from Dutch to ${name}.

CRITICAL RULES:
1. Return ONLY valid JSON — no markdown, no explanation, no code fences
2. Keep all JSON keys exactly as-is (they are code identifiers)
3. Keep all emoji exactly as-is
4. Keep numbers (correct, value, cat) exactly as-is
5. For the "scramble" activity: the "answer" must be a real word in ${name} (not a transliteration), and "scrambled" must be an anagram of that answer using the same letters. The "hint" translates the meaning.
6. For "truefalse" statements: keep "answer" as true/false boolean
7. Translate all text values naturally for children — fun, clear, age-appropriate
8. For RTL languages (Arabic, Hebrew, Farsi, Urdu), the text should read naturally RTL
9. The "badge" field contains an emoji + title — translate the title part only, keep the emoji
10. CRITICAL: Never use ASCII double quotes (") inside string values — they break JSON. Use the language's native quotation marks instead (e.g. 「」for Chinese, «» for others, or just rephrase to avoid quotes)

Source JSON:
${JSON.stringify(SOURCE, null, 2)}`;

  const raw = await callClaude(prompt);

  // Strip any accidental markdown fences
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned);
    fs.writeFileSync(outFile, JSON.stringify(parsed, null, 2), "utf8");
    console.log(`  [done] ${code}`);
  } catch (e) {
    console.error(`  [error] ${code}: JSON parse failed — saving raw output`);
    fs.writeFileSync(outFile + ".raw", raw, "utf8");
    throw e;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const targets = args.length
    ? Object.fromEntries(
        args.map((c) => [c, LANGUAGES[c]]).filter(([, v]) => v)
      )
    : LANGUAGES;

  console.log(`Translating to ${Object.keys(targets).length} language(s)...`);

  for (const [code, name] of Object.entries(targets)) {
    try {
      await translateLanguage(code, name);
      // Small delay to avoid rate limits
      await new Promise((r) => setTimeout(r, 500));
    } catch (e) {
      console.error(`  [failed] ${code}: ${e.message}`);
    }
  }

  console.log("Done.");
}

main();
