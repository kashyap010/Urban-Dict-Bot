const { Worker } = require("worker_threads");

const helper = (ctx, data) => {
	ctx
		.replyWithHTML(
			`<b>Definition</b>👇👇\n${data[0].meaning}\n\n👇👇<b>Example</b>\n${data[0].example}`
		)
		.then(() => {
			if (data.length == 1) return;

			const length = data.length - 1;
			const sentence =
				length === 1
					? `There is ${length} more meaning`
					: `There are ${length} more meanings`;
			ctx.reply(`${sentence}. Do you want to see more?`, {
				reply_markup: {
					inline_keyboard: [
						[
							{ text: "Yes, 1 more", callback_data: "Yes" },
							{ text: "No", callback_data: "No" },
						],
					],
				},
			});

			const worker = new Worker("./src/helpers/worker.js", {
				workerData: data.slice(1),
			});
		});
};

module.exports = helper;
