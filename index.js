const { Telegraf } = require('telegraf')
require('dotenv').config()
const { meaning } = require('./urbanDictionaryApi')

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
 ctx.reply("Hello")
})

bot.hears(/[\S\s]/, (ctx) => {
 const term = ctx.update.message.text;
 meaning(term)
  .then(response => {
   if (!response) {
    ctx.reply("Oops! Couldn't find its meaning on Urban Dictionary")
    return;
   }
   ctx.replyWithHTML(`<b>Definition</b>\n${response[0].definition}\n\n<b>Example</b>\n${response[0].example}`)
  })
  .catch(err => {
   console.error(err)
  })
})

bot.launch()

// TODO:
// 1. if defn doesn't exist
// 2. send synchronously: defn then example
// 3. 