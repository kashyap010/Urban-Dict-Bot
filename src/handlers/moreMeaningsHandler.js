const fs = require("fs");
const { Worker } = require("worker_threads");
const reply = require("../helpers/reply");

const moreMeaningsHandler = (ctx) => {
	ctx.reply("Wait...");

	fs.readFile("response.json", (err, data) => {
		if (err) {
			console.error(err);
			return;
		}

		const jsonData = JSON.parse(data);

		reply(ctx, jsonData);
	});
};

module.exports = { moreMeaningsHandler };
