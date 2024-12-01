const util = require("@azure/core-util");
const fs = require('node:fs/promises');

(async () => {
    let uuid = {uuid:util.randomUUID()};
    fs.writeFile('installation-id.json', JSON.stringify(uuid));
    console.log(JSON.stringify(uuid));
    })();