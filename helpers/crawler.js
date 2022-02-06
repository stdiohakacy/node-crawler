const needle = require('needle')
const path = require('path')
const fs = require('fs')
const cheerio = require('cheerio')
const axios = require('axios').default;

async function getLinksPagination(link) {
    const linksPagination = [link];
    const result = await needle("get", link);
    const html = result.body;
    const $ = cheerio.load(html);
    const results = $(".toolbar-amount").text().trim().split(" ");
    const total = results[results.length - 2];
    if(Math.ceil(total / 12) > 1) {
        for(let i = 2; i <= Math.ceil(total / 12); i++) {
            linksPagination.push(`${link}?p=${i}`)
        }
    }
    return linksPagination;
}

function includeBlog(link) {
    const arr = link.split("/");
    return arr[arr.length - 1].includes('blog') ? true : false
}

function includeWishList(link) {
    const arr = link.split("/");
    return arr.includes('wishlist') ? true : false
}

function linkValid(link) {
    const result = link.split("/").filter(link => link !== "");
    return result.length === 3 && result[1] === "www.spapartsproshop.com"
}

function includeTroubleshootingTips(link) {
    const arr = link.split("/");
    return arr[arr.length - 1].includes('troubleshooting-tips') ? true : false
}

function includeGlossary(link) {
    return link.includes("glossary")
}

async function getLinksProductDetail(linkPagination) {
    const result = await needle("get", linkPagination);
    const html = result.body;
    const $ = cheerio.load(html);

    let links = $("a").map(
        (idx, el) => $(el).attr("href")
    ).get()
    .filter(link => {
        if(
            !linkValid(link) 
            || includeBlog(link) 
            || includeWishList(link) 
            || includeTroubleshootingTips(link) 
            || includeGlossary(link)
        ) {
            return false;
        }
        return true;
    });
    links = [...new Set(links)];
    return links;
}

function getCategories($) {
    const defaultCate = 'Default Category';
    let cate = ''
    let subCate = ''

    $(".items li").each((idx, el) => {
        if(idx === 1) {
            cate = $(el).text().trim();
        }
        if(idx === 2) {
            subCate = $(el).text().trim();
        }
    })
    return `${defaultCate}/${cate},${defaultCate}/${cate}/${subCate}`;
}

async function getImageUrls(sku) {
    const url = `https://www.spapartsproshop.com/rest/all/V1/products-render-info?searchCriteria[filterGroups][0][filters][0][conditionType]=like&storeId=2&currencyCode=usd&searchCriteria[filterGroups][0][filters][0][field]=sku&searchCriteria[filterGroups][0][filters][0][value]=${sku}`

    const response = await axios.get(url)
    return response?.data?.items[0]?.images[0]?.url;
}

function getAdditionalAttributes($) {
    let result = ``;
    $('.specification-details table tbody tr td').each((idx, el) => {
        const arr = $(el).text().split(":");
        arr[0] = arr[0].toLowerCase().split(" ").join("_");
        arr[1] = arr[1].trim();
        if(arr[1]) {
            result = result.concat(`${arr[0]}=${arr[1]},`)
        }
    });
    return result.substring(0, result.length - 1);
}

function getDescription($) {
    let description = ``;
    $('.additional-information div p').each((idx, el) => {
        description = description.concat($(el).text().trim()).concat('<br/>')
    });
    if(!description) {
        $('.additional-information div').each((idx, el) => {
            description = description.concat($(el).text().trim()).concat('<br/>')
        });
    }
    return description;
}

function getRelatedSkus($) {
    const relatedSkus = [];
    $('.alternate_part_numbers-list li').each((idx, el) => {
        relatedSkus.push($(el).text().trim());
    })
    return `related_skus=${relatedSkus.join("|")}` ;
}

function getQty($) {
    let qty = -1;
    $(".product-sku-avail div").each((idx, el) => {
        if(idx === 1) {
            switch ($(el).text().trim()) {
                case "Available":
                    qty = 10;
                    break;
                case "Limited quantities":
                    qty = 1;
                    break;
                case "Out-of-stock":
                    qty = 0;
                    break;
                default:
                    break;
            }
        }
    })
    return qty;
}

async function getDataFromProductDetailPage(linkProduct) {
    const result = await needle("get", linkProduct);
    const html = result.body;
    const $ = cheerio.load(html);
    const sku = $(".product.attribute.sku div").text();
    let categories = getCategories($);
    const name = $(".page-title span").text();
    const price = $(".box-inner1 .price-box.price-final_price span span .price").text().substring(1).concat('0000');
    const url_key = name.toLowerCase().split(" ").join("-").concat(Date.now());
    const meta_title = name;
    const meta_keyword = name;
    const meta_description = name;
    const created_at = Date.now();
    const updated_at = Date.now();
    const additional_attributes = getAdditionalAttributes($);
    const base_image = await getImageUrls(sku)
    const part_manufactures = $(".amshopby-brand-label").text();
    const short_description = $(".product.attribute.overview div").text();
    const description = getDescription($);
    const related_skus = getRelatedSkus($);
    const qty = getQty($);
    const data =  { 
        sku, categories, name, price, url_key, meta_title, meta_keyword, meta_description, 
        created_at, updated_at, additional_attributes, part_manufactures, short_description, description, related_skus, qty
    }
    if(base_image) {
        data.base_image = base_image;
    }
    return data;
}

module.exports = {
    getLinksPagination,
    getLinksProductDetail,
    getDataFromProductDetailPage
}