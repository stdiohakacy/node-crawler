const needle = require('needle');
const fs = require('fs');
const path = require('path')

async function downloadHtmlFromUrl(fileName, url, p) {
    const result = await needle("get", url);
    const html = result.body;
    if(!p) {
        fs.writeFileSync(`./templates/${fileName}`, html);
    } else {
        fs.writeFileSync(`./templates/${p}/${fileName}`, html);
    }
}

async function saveHtmlFromUrl(url, name, p) {
    const result = await needle("get", url);
    const html = result.body;
    const pathFile = path.join(__dirname, `../templates/${p}/${name}`)
    if(!fs.existsSync(pathFile))
        fs.writeFileSync(pathFile, html)

    return pathFile;
}

module.exports = {
    downloadHtmlFromUrl,
    saveHtmlFromUrl
};