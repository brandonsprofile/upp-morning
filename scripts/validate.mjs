import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const required = [
  '<meta name="viewport"',
  '<meta name="x-release" content="__COMMIT_SHA__">',
  'font-family: "Geist"',
  'id="bike-button"',
  'id="metro-button"',
  'id="done-button"'
];

for (const marker of required) {
  if (!html.includes(marker)) throw new Error(`Missing required marker: ${marker}`);
}

const scriptStart = html.indexOf("<script>");
const scriptEnd = html.indexOf("</script>", scriptStart);
if (scriptStart === -1 || scriptEnd === -1) throw new Error("Inline application script not found");

const script = html.slice(scriptStart + "<script>".length, scriptEnd);
new Function(script);

console.log("Validated HTML structure, release marker, controls, and JavaScript syntax.");
