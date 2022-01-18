const categoryController = require('./controllers/category.controller');
const fs = require('fs');
const cheerio = require('cheerio')

async function parseHomePage() {
    const homePageBuffer = fs.readFileSync('templates/template-1642493417352.html');
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

module.exports = parseHomePage;