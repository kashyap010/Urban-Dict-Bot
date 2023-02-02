const fs = require('fs')
const { Worker } = require('worker_threads')

const moreMeanings = (ctx) => {
  ctx.reply("Wait...")

  fs.readFile('response.json', (err, data) => {
   if (err) {
    console.error(err);
    return
   }

   const jsonData = JSON.parse(data)
   
   ctx
    .replyWithHTML(`<b>Definition</b>\n${jsonData[0].definition}\n\n<b>Example</b>\n${jsonData[0].example}`)
    .then(() => {
       if (jsonData.length == 1) return;
       
       ctx.reply(`There are ${jsonData.length - 1} more meanings. Do you want to see more?`, {
         reply_markup: {
           inline_keyboard: [
             [
               { text: 'Yes please, 1 more', callback_data: 'Yes'},
               { text: 'No, I got it now', callback_data: 'No'}
             ]
           ]
         }
       })

       const worker = new Worker('./helpers/worker.js', {
         workerData: jsonData.slice(1,)
       });        
    })
  })
}

module.exports = { moreMeanings }