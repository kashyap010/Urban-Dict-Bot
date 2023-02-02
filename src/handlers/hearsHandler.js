const { meaning } = require('../urbanDictionaryApi')
const { Worker } = require('worker_threads')
const replyHelper = require('../helpers/replyHelper')

const hearsHandler = (ctx) => {
 const term = ctx.update.message.text;
 meaning(term)
  .then(response => {
    if (!response) {
      ctx.reply("Oops! Couldn't find its meaning on Urban Dictionary")
      return;
    }
    
    replyHelper(ctx, response)
  })
  .catch(err => {
   console.error(err)
  })
}

module.exports = { hearsHandler }