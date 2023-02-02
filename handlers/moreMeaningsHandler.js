const fs = require('fs')
const { Worker } = require('worker_threads')
const replyHelper = require('../helpers/replyHelper')

const moreMeanings = (ctx) => {
  ctx.reply("Wait...")

  fs.readFile('response.json', (err, data) => {
   if (err) {
    console.error(err);
    return
   }

   const jsonData = JSON.parse(data)
   
   replyHelper(ctx, jsonData)
  })
}

module.exports = { moreMeanings }