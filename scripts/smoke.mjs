const url = process.env.SMOKE_URL;
const expectedRelease = process.env.RELEASE_SHA;

if (!url) throw new Error("SMOKE_URL is required");
if (!expectedRelease) throw new Error("RELEASE_SHA is required");

let lastError;
for (let attempt = 1; attempt <= 12; attempt += 1) {
  try {
    const response = await fetch(url, { redirect: "follow", cache: "no-store" });
    const html = await response.text();
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    if (!html.includes(`name="x-release" content="${expectedRelease}"`)) {
      throw new Error("Live release marker does not match the deployed commit");
    }
    if (!html.includes("Cykel") || !html.includes("Svenska")) {
      throw new Error("Expected prototype content is missing");
    }
    console.log(`Live smoke test passed for ${url} at ${expectedRelease}`);
    process.exit(0);
  } catch (error) {
    lastError = error;
    console.log(`Smoke attempt ${attempt}/12 failed: ${error.message}`);
    if (attempt < 12) await new Promise(resolve => setTimeout(resolve, 5000));
  }
}

throw lastError;
