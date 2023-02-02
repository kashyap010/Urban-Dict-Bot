const { meaning } = require('../urbanDictionaryApi')
const { Worker } = require('worker_threads')

const hearsHandler = (ctx) => {
 const term = ctx.update.message.text;
 meaning(term)
  .then(response => {
    if (!response) {
      ctx.reply("Oops! Couldn't find its meaning on Urban Dictionary")
      return;
    }
    
    ctx
     .replyWithHTML(`<b>Definition</b>\n${response[0].definition}\n\n<b>Example</b>\n${response[0].example}`)
     .then(() => {
        if (response.length == 1) return;
        
        ctx.reply(`There are ${response.length - 1} more meanings. Do you want to see more?`, {
          reply_markup: {
            inline_keyboard: [
              [
                { text: 'Yes, 1 more', callback_data: 'Yes'},
                { text: 'No', callback_data: 'No'}
              ]
            ]
          }
        })

        const worker = new Worker('./helpers/worker.js', {
          workerData: response.slice(1,)
        });        
     })
  })
  .catch(err => {
   console.error(err)
  })
}

module.exports = { hearsHandler }