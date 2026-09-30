import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";

const root = new URL("../", import.meta.url);
const output = new URL("../dist/", import.meta.url);
const release = process.env.RELEASE_SHA || execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const source = await readFile(new URL("index.html", root), "utf8");
const built = source.replaceAll("__COMMIT_SHA__", release);
if (built === source) throw new Error("Release marker was not injected");

await writeFile(new URL("index.html", output), built);
await cp(new URL("favicon.svg", root), new URL("favicon.svg", output));

console.log(`Built release ${release} in dist/`);
