const { Telegraf } = require('telegraf')
require('dotenv').config()
const { hearsHandler } = require('./src/handlers/hearsHandler')
const { moreMeaningsHandler } = require('./src/handlers/moreMeaningsHandler')

const fs = require('fs');
const secrets = JSON.parse(fs.readFileSync('/run/secrets/test-secret', 'utf-8'))

const bot = new Telegraf(process.env.BOT_TOKEN || secrets.BOT_TOKEN);

bot.start((ctx) => {
 ctx.reply("Message me a word and I'll tell you its meaning")
})

bot.command('help', (ctx) => {
  ctx.replyWithHTML("<b>How to use?</b>\nJust message me a word and I'll tell you its meaning")
})

bot.action("No", (ctx) => {
  ctx.reply("Okay👍")
})

bot.action("Yes", moreMeaningsHandler)

bot.hears(/[\S\s]/, hearsHandler)

bot.launch()