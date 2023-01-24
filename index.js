const { Telegraf } = require('telegraf')
require('dotenv').config()
const { meaning } = require('./urbanDictionaryApi')

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
 ctx.reply("Message me a word and I'll tell you its meaning")
})

bot.command('help', (ctx) => {
  ctx.replyWithHTML("<b>How to use?</b>\nJust message me a word and I'll tell you its meaning")
})

bot.hears("a", (ctx) => {
  ctx.reply("There are 7 more meanings. Do you want to see more?", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Yes', callback_data: 'Yes'},
          { text: 'No', callback_data: 'No'},
        ]
      ]
    }
  })
})

bot.action("Yes", (ctx) => {
  ctx.reply("ok")
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
// 1. divide into handlers
// 2. more meanings