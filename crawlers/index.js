const needle = require('needle');
const fs = require('fs');

async function getRequest(url) {
    const result = await needle("get", url);
    return result.body;
}

function saveHtml(html) {
    fs.writeFileSync(`./templates/template-${Date.now()}.html`, html);
}

async function downloadHtmlFromUrl(url) {
    const html = await getRequest(url);
    await saveHtml(html);
}

module.exports = downloadHtmlFromUrl;