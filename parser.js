const categoryController = require('./controllers/category.controller');
const fs = require('fs');
const cheerio = require('cheerio')

async function parseHomePage() {
    const homePageBuffer = fs.readFileSync('templates/template-homepage.html');
    const $ = cheerio.load(homePageBuffer);
    const categories = await categoryController.findAll();
    let categoriesHtml = [
        ".controls-sub-category.dropdown-content a", 
        ".pumps-sub-category.dropdown-content a",
        ".filters-sub-category.filters-dropdown-content a",
        ".spa-controls-sub-category.spa-controls-dropdown-content a",
    ]
    let subCateTitle = [];
    categories.map((category, index) => {
        $(categoriesHtml[index]).map((idx, el) => {
            subCateTitle.push({ title: $(el).text().trim(), parentId: category._id });
        })
    })
    
    return subCateTitle;
}

async function linkProductsPageByCategory(path, linkParent) {
    const productPageBuffer = fs.readFileSync(path);
    const $ = cheerio.load(productPageBuffer);

    let links = $("a").map(
        (idx, el) => $(el).attr("href")
    ).get().filter(
        link => link.startsWith(linkParent)
    );
    links = [...new Set(links)];

    return links;
}

module.exports = {
    parseHomePage,
    linkProductsPageByCategory
};