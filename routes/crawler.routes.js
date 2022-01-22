const express = require('express');
const { getLinksPagination, getLinksProductDetail, getDataFromProductDetailPage } = require('../helpers/crawler');
const router = express.Router();
const productController = require('../controllers/product.controller')

router.post('/', async(req, res) => {
    let linksProduct = [];
    const pageProdsByCate = [
        'https://www.spapartsproshop.com/catalog/category/view/s/spa-controls/id/496/?cat=496',
        'https://www.spapartsproshop.com/pumps-blowers/pumps',
        'https://www.spapartsproshop.com/spa-and-water-maintenance/filters'
    ];
    await Promise.all(
        pageProdsByCate.map(async pageProdByCate => {
            const linksPagination = await getLinksPagination(pageProdByCate);
            if(linksPagination.length) {
                await Promise.all(
                    linksPagination.map(async linkPagination => {
                        const linksProductDetail = await getLinksProductDetail(linkPagination);
                        linksProduct.push(linksProductDetail)
                    })
                )
            }
        })
    )
    linksProduct = linksProduct.flat();
    
    for (const linkProduct of linksProduct) {
        const product = await getDataFromProductDetailPage(linkProduct);
        const { name, sku } = product;
        const isProductExist = await productController.isExist(name, sku);
        if(!isProductExist);
            await productController.create(product);
        await sleep(500);
    }

    return res.json({ isSuccess: true })
})

async function sleep(miliseconds) {
    return new Promise(resolve => setTimeout(resolve, miliseconds));
}

module.exports = router;