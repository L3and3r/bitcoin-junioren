#!/usr/bin/env node
/**
 * Patches existing translation files with missing keys from nl.json.
 * Usage: ANTHROPIC_API_KEY=sk-... node scripts/patch-translations.js
 */

const fs = require("fs");
const path = require("path");
const https = require("https");

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) { console.error("Set ANTHROPIC_API_KEY"); process.exit(1); }

const I18N_DIR = path.join(__dirname, "../src/i18n");
const SOURCE = JSON.parse(fs.readFileSync(path.join(I18N_DIR, "nl.json"), "utf8"));

const LANG_NAMES = {
  ar:"Arabic",bg:"Bulgarian",bn:"Bengali",cs:"Czech",de:"German",el:"Greek",
  en:"English",es:"Spanish",fa:"Farsi",fr:"French",gu:"Gujarati",ha:"Hausa",
  he:"Hebrew",hi:"Hindi",hu:"Hungarian",hy:"Armenian",id:"Indonesian",
  it:"Italian",ja:"Japanese",ko:"Korean",mr:"Marathi",ms:"Malay",pa:"Punjabi",
  pl:"Polish",pt:"Portuguese",ro:"Romanian",ru:"Russian",sr:"Serbian",
  sv:"Swedish",sw:"Swahili",ta:"Tamil",te:"Telugu",tg:"Tajik",th:"Thai",
  tl:"Tagalog",tr:"Turkish",uk:"Ukrainian",ur:"Urdu",vi:"Vietnamese",
  xh:"Xhosa",zh:"Chinese (Simplified)",
};

function getMissingKeys(source, target, prefix = "") {
  const missing = {};
  for (const [k, v] of Object.entries(source)) {
    const fullKey = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "object" && !Array.isArray(v)) {
      const sub = getMissingKeys(v, target?.[k] || {}, fullKey);
      if (Object.keys(sub).length) missing[k] = sub;
    } else if (target?.[k] === undefined) {
      missing[k] = v;
    }
  }
  return missing;
}

function deepMerge(target, patch) {
  const result = { ...target };
  for (const [k, v] of Object.entries(patch)) {
    if (typeof v === "object" && !Array.isArray(v) && typeof result[k] === "object") {
      result[k] = deepMerge(result[k], v);
    } else {
      result[k] = v;
    }
  }
  return result;
}

function callClaude(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    });
    const req = https.request({
      hostname: "api.anthropic.com", path: "/v1/messages", method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": API_KEY, "anthropic-version": "2023-06-01" },
    }, (res) => {
      let data = "";
      res.on("data", c => data += c);
      res.on("end", () => {
        try {
          const p = JSON.parse(data);
          if (p.error) return reject(new Error(p.error.message));
          resolve(p.content[0].text);
        } catch(e) { reject(e); }
      });
    });
    req.on("error", reject);
    req.write(body); req.end();
  });
}

async function patchFile(code) {
  const file = path.join(I18N_DIR, `${code}.json`);
  if (!fs.existsSync(file)) return;

  const target = JSON.parse(fs.readFileSync(file, "utf8"));
  const missing = getMissingKeys(SOURCE.ui, target.ui || {});

  if (!Object.keys(missing).length) {
    console.log(`  [skip] ${code} — nothing missing`);
    return;
  }

  console.log(`  [patching] ${code} — missing: ${JSON.stringify(Object.keys(missing))}`);

  const prompt = `Translate this JSON from Dutch to ${LANG_NAMES[code]}.
Return ONLY valid JSON. No markdown. No double quotes inside string values — use native quotes or rephrase.
Keep {placeholders} like {moves} and {name} exactly as-is. Keep emoji as-is.

${JSON.stringify(missing, null, 2)}`;

  const raw = await callClaude(prompt);
  const cleaned = raw.replace(/^```json\s*/i,"").replace(/^```\s*/i,"").replace(/\s*```$/,"").trim();

  try {
    const patch = JSON.parse(cleaned);
    const updated = { ...target, ui: deepMerge(target.ui || {}, patch) };
    fs.writeFileSync(file, JSON.stringify(updated, null, 2), "utf8");
    console.log(`  [done] ${code}`);
  } catch(e) {
    console.error(`  [error] ${code}: ${e.message}`);
    fs.writeFileSync(file + ".patch.raw", raw, "utf8");
  }
}

async function main() {
  const args = process.argv.slice(2);
  const codes = args.length ? args : Object.keys(LANG_NAMES);
  console.log(`Patching ${codes.length} files...`);
  for (const code of codes) {
    try { await patchFile(code); await new Promise(r => setTimeout(r, 300)); }
    catch(e) { console.error(`  [failed] ${code}: ${e.message}`); }
  }
  console.log("Done.");
}

main();
