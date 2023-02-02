const { workerData } = require("worker_threads");
const fs = require('fs')

fs.writeFile('response.json', JSON.stringify(workerData), (err) => {
 if (err) console.error(err);
 else console.log("saved");
}) 

