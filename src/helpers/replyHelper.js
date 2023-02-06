const { Worker } = require('worker_threads')

const helper = (ctx, data) => {
 ctx
  .replyWithHTML(`<b>Definition</b>👇👇\n${data[0].definition}\n\n👇👇<b>Example</b>\n${data[0].example}`)
  .then(() => {
     if (data.length == 1) return;
     
     ctx.reply(`There are ${data.length - 1} more meanings. Do you want to see more?`, {
       reply_markup: {
         inline_keyboard: [
           [
             { text: 'Yes, 1 more', callback_data: 'Yes'},
             { text: 'No', callback_data: 'No'}
           ]
         ]
       }
     })
 
     const worker = new Worker('./src/helpers/worker.js', {
       workerData: data.slice(1,)
     });        
  })
}

module.exports = helper