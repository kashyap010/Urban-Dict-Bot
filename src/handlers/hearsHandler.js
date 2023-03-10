const meaning = require("../helpers/scraper");
const { Worker } = require("worker_threads");
const reply = require("../helpers/reply");

const hearsHandler = (ctx) => {
	const term = ctx.update.message.text;
	meaning(term)
		.then((response) => {
			if (!response) {
				ctx.reply("Oops! Couldn't find its meaning on Urban Dictionary");
				return;
			}

			reply(ctx, response);
		})
		.catch((err) => {
			console.error(err);
		});
};

module.exports = { hearsHandler };
