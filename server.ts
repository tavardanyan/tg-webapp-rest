import { Telegraf } from "telegraf";

const bot = new Telegraf(process.env.BOT_TOKEN!);

bot.start((ctx) => {
  ctx.reply("Open the menu:", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "🍽 Open Menu",
            web_app: { url: "https://yourdomain.com" },
          },
        ],
      ],
      resize_keyboard: true,
    },
  });
});

bot.on("message", (ctx) => {
  const data = ctx.message?.web_app_data?.data;
  if (!data) return;

  try {
    const order = JSON.parse(data);
    ctx.reply(`✅ Order received!\nTotal: ${order.total} AMD`);
    // TODO: Save order in DB / notify restaurant
  } catch (e) {
    console.error("Invalid order data:", e);
  }
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

bot.launch();
