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

async function getProductsByProductAttribute(path) {
    const productPageBuffer = fs.readFileSync(path);
    const $ = cheerio.load(productPageBuffer);
    const productTotalDuplicate = $("#toolbar-amount .toolbar-number:last-child").text();
    const productLinks = [];
    $(".product-photo").each((idx, el) => {
        productLinks.push($(el).find("a").attr("href"))
    });

    let productTotal = String(productTotalDuplicate).split("");
    return {
        productTotal: productTotal.slice(0, productTotal.length / 2).join(""),
        productsLink: productLinks
    };
}

async function getProductImgUrls(path) {
    const buffer = fs.readFileSync(path);
    const $ = cheerio.load(buffer);
    return $(".gallery-placeholder__image").attr("src");
}

async function getProductByProductDetail(path) {
    const productDetailPageBuffer = fs.readFileSync(path);
    const $ = cheerio.load(productDetailPageBuffer);
    let arrTitle = $(".page-title span").text().split(" ");
    arrTitle.shift();
    const branchLabel = $(".amshopby-brand-label").text();
    const title = arrTitle.join(" ");
    const price = $(".box-inner1 .price-box.price-final_price span span .price").text();
    const mark = $(".product-sku-avail div:last-child").text();
    const sku = $(".product.attribute.sku div").text();

    let productDetail = {};
    $('.specification-details table tbody tr td').each((idx, el) => {
        const arr = $(el).text().split(":");
        let key = arr[0];
        const strSplit = key.split(" ");
        for (let i = 0; i < strSplit.length; i++) {
            strSplit[i] = strSplit[i].charAt(0).toUpperCase() + strSplit[i].slice(1);
        }
        key = strSplit.join(" ")
        if(key === "Ozone/CircPump Circuit") {
            key = "CircPump Circuit"
        }
        key = key.replace(/ /g, '').charAt(0).toLowerCase() + key.replace(/ /g, '').slice(1);
        productDetail[`${key}`] = arr[1].trim();
    });

    let productMoreInfo = {};
    $(".additional-information div").each((idx, el) => {
        $(el).find("p").each((idx, el) => {
            const findIdx = $(el).text().indexOf("-");
            let arr = [$(el).text().substring(0, findIdx), $(el).text().substring(findIdx + 1, $(el).text().length)]
            if(arr[0] !== "") {
                let key = arr[0];
                const strSplit = key.split(" ");
                for (let i = 0; i < strSplit.length; i++) {
                    strSplit[i] = strSplit[i].charAt(0).toUpperCase() + strSplit[i].slice(1);
                }
                key = strSplit.join(" ")
                key = key.replace(/ /g, '').charAt(0).toLowerCase() + key.replace(/ /g, '').slice(1);
                productMoreInfo[`${key}`] = arr[1].trim();
            }
        })
    })

    return { branchLabel, title, price, mark, sku, productDetail, productMoreInfo }
}

module.exports = {
    parseHomePage,
    linkProductsPageByCategory,
    getProductsByProductAttribute,
    getProductByProductDetail,
    getProductImgUrls
};