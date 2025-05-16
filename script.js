document.getElementById("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const token = document.getElementById("token").value.trim();
  const filter = document.getElementById("filter").value.trim().toLowerCase();
  const logEl = document.getElementById("log");

  logEl.textContent = "🚀 実行中...\n";

  if (!token) {
    logEl.textContent += "[❌] トークンが空です！";
    return;
  }

  try {
    const res = await fetch("https://group-leaver.holojime.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, filter })
    });

    const result = await res.text();
    logEl.textContent += result;
  } catch (err) {
    logEl.textContent += "[❌] エラー: " + err.message;
  }
});
