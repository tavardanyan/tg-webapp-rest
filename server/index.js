import { Telegraf } from "telegraf";

const bot = new Telegraf('8013131602:AAH2MMtXvCM5yAbSQa62P_3BZIGNxIuxCo0');

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

// bot.on('web_app_data', (msg) => {
//   const data = JSON.parse(msg.web_app_data.data);
//   const userId = msg.from.id;

//   // send confirmation back
//   bot.sendMessage(userId, `✅ Order received!\nTotal items: ${data.order.length}`);
// });

bot.on("message", (ctx) => {
  console.log(ctx)
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
