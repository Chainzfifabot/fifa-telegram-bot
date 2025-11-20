const express = require("express");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
let messagesMemory = [];

app.get("/", (req, res) => res.send("Bot is alive!"));
app.post("/telegram_webhook", async (req, res) => {
    const message = req.body.message;
    if (!message) return res.sendStatus(200);

    const chat_id = message.chat.id;
    const text = message.text;

    if (text.toLowerCase().startsWith("/predict")) {
        await sendTelegramMessage(chat_id, "Prediction feature coming soon!");
    } else {
        await sendTelegramMessage(chat_id, "Send /predict to get a FIFA prediction!");
    }
    res.sendStatus(200);
});

async function sendTelegramMessage(chat_id, text) {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({chat_id, text})
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot running on port ${PORT}`));
