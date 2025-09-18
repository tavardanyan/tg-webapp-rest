// api/bot.ts
import { Telegraf, Markup } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);

// ✅ Replace with your real channel username (with @ or without)
const CHANNEL = process.env.CHANNEL_USERNAME || "@yourchannel";

// Handle /start with paramId
bot.start(async (ctx) => {
  const paramId = ctx.startPayload; // e.g. "12345"
  const userId = ctx.from.id;

  console.log("User started with:", { userId, paramId });

  if (!paramId) {
    return ctx.reply("Welcome! Please use a special link to start.");
  }

  // Send join + confirm buttons
  await ctx.reply(
    `👋 Hi! Please subscribe to our channel and confirm.\n\nParamId: ${paramId}`,
    Markup.inlineKeyboard([
      [Markup.button.url("📢 Join Channel", `https://t.me/${CHANNEL.replace("@", "")}`)],
      [Markup.button.callback("✅ I Subscribed", `checksub_${paramId}`)],
    ])
  );
});

// Handle "I Subscribed" button
bot.action(/checksub_(.+)/, async (ctx) => {
  const paramId = ctx.match[1];
  const userId = ctx.from.id;

  try {
    const member = await ctx.telegram.getChatMember(CHANNEL, userId);

    if (["member", "administrator", "creator"].includes(member.status)) {
      await ctx.reply(`✅ Subscription confirmed! Your paramId = ${paramId}`);
      // TODO: Save { userId, paramId } to your DB
      console.log("Subscribed:", { userId, paramId });
    } else {
      await ctx.reply("❌ You are not subscribed yet. Please join the channel first.");
    }
  } catch (err) {
    console.error("Error checking subscription:", err);
    await ctx.reply("⚠️ Could not verify subscription. Try again later.");
  }
});

// Existing WebApp order handler (kept from your code)
bot.on("message", async (ctx) => {
  console.log("New Message:", ctx.message);
  const data = ctx.message?.web_app_data?.data;
  if (!data) return;

  try {
    const order = JSON.parse(data);
    await ctx.reply(`✅ Order received!\nTotal: ${order.total} AMD`);
    // TODO: Save order in DB / notify restaurant
  } catch (e) {
    console.error("Invalid order data:", e);
  }
});

// Vercel serverless entrypoint
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await bot.handleUpdate(req.body);
    } catch (err) {
      console.error("Error handling update:", err);
    }
    return res.status(200).send("OK");
  }

  // Healthcheck endpoint
  res.status(200).send("Bot is running via webhook ✅");
}
