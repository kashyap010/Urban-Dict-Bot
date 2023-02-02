const { Telegraf } = require('telegraf')
require('dotenv').config()
const { meaning } = require('./src/urbanDictionaryApi')
const { hearsHandler } = require('./src/handlers/hearsHandler')
const { moreMeanings } = require('./src/handlers/moreMeaningsHandler')

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
 ctx.reply("Message me a word and I'll tell you its meaning")
})

bot.command('help', (ctx) => {
  ctx.replyWithHTML("<b>How to use?</b>\nJust message me a word and I'll tell you its meaning")
})

bot.action("No", (ctx) => {
  ctx.reply("Okay👍")
})

bot.action("Yes", moreMeanings)

bot.hears(/[\S\s]/, hearsHandler)

bot.launch()