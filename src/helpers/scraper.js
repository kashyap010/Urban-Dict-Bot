const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");

function minMax(value) {
	const max = 2; // adjust depending on how many pages you want to scrape data from
	return Math.min(Math.max(value, 1), max);
}

function buildDefinition($, el) {
	return {
		word: $(el).find(".word").prop("innerText"),
		meaning: $(el).find(".meaning").prop("innerText"),
		example: $(el).find(".example").prop("innerText"),
	};
}

async function scrape(term) {
	try {
		const baseUrl = `https://www.urbandictionary.com/define.php?term=${term}`;
		const { data: html } = await axios.get(baseUrl, { validateStatus: false });
		const $ = cheerio.load(html);

		if (!$(".definition").length) return false;

		const totalPages = minMax(
			$(".pagination").children().first().children().length
		);

		const defns = [];
		for (let i = 1; i <= totalPages; i++) {
			const url = baseUrl + (i > 1 ? `&page=${i}` : "");
			const { data: html } = await axios.get(url);

			const $ = cheerio.load(html);

			const $definitions = $(".definition");
			$definitions.each((idx, el) => {
				if (
					$(el).find(".word").prop("innerText").toLowerCase() !=
					term.toLowerCase()
				)
					return;
				const defn = buildDefinition($, el);
				defns.push(defn);
			});
		}
		return defns;
	} catch (e) {
		return e;
	}
}

module.exports = scrape;

// scrape("Kashyap")
// 	.then((r) => {
// 		console.log(r);
// 	})
// 	.catch((e) => {
// 		console.log("Error\n", e);
// 	});
