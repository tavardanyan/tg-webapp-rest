// api/bot.ts
import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN);

// Example: Menu (commented, but works if you want)
// bot.start((ctx) => {
//   ctx.reply("Open the menu:", {
//     reply_markup: {
//       keyboard: [
//         [
//           {
//             text: "🍽 Open Menu",
//             web_app: { url: "https://yourdomain.com" },
//           },
//         ],
//       ],
//       resize_keyboard: true,
//     },
//   });
// });

bot.on("message", async (ctx) => {
  const data = (ctx.message)?.web_app_data?.data;
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
      console.error("Error handling update", err);
    }
    return res.status(200).send("OK");
  }

  // Healthcheck endpoint
  res.status(200).send("Bot is running via webhook ✅");
}
