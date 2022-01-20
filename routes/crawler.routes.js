const express = require('express');
const { linkProductsPageByCategory, getProductsByProductAttribute } = require('../parser');
const router = express.Router();
const fs = require('fs')
const path = require('path');
const { saveHtmlFromUrl } = require('../crawlers');

function getFileName(url) {
    let fromIdx = 0;
    for(let i = url.length; i >= 0; i--) {
        if(url[i] === '/' || url[i] === '?') {
            fromIdx = i;
            break;
        }
    }
    
    return url.substring(fromIdx + 1, url.length - 1);
}

function getStructureFolderName(url) {
    const result = url.split("/");
    return [result[3], result[result.length - 1]]
}

function createStructureFolder(currentUrl){
    const [parentCate, subCate] = getStructureFolderName(currentUrl);
    const dirParentCate = path.join(__dirname, `../templates/${parentCate}`);
    const dirSubCate = path.join(__dirname, `../templates/${parentCate}/${subCate}`);

    if (!fs.existsSync(dirParentCate))
        fs.mkdirSync(dirParentCate);
    if (!fs.existsSync(dirSubCate))
        fs.mkdirSync(dirSubCate)

    return [parentCate, subCate];
}

router.post('/', async(req, res) => {
    const visitedLinks = [];
    let linksToVisit = [
        `https://www.spapartsproshop.com/controls/spa-controls/electronic/complete`
    ]

    while(linksToVisit.length > 0) {
        try {
            const currentUrl = linksToVisit.pop();
            if(visitedLinks.includes(currentUrl))
                continue;
            console.log(`Now crawling ${currentUrl}`);
            const [parentCate, subCate] = createStructureFolder(currentUrl);
            await saveHtmlFromUrl(currentUrl, `template-${subCate}.html`, `/${parentCate}/${subCate}`)
            let links = await linkProductsPageByCategory(`templates/${parentCate}/${subCate}/template-${subCate}.html`, currentUrl);
            
            links = links.filter(link => (!link.includes('?p=') && link !== currentUrl));
            links.map(async link => {
                const fileName = getFileName(link);
                await saveHtmlFromUrl(link, `template-${fileName}.html`, `/${parentCate}/${subCate}`)
            });

            links.map(async link => {
                if(link === "https://www.spapartsproshop.com/controls/spa-controls/electronic/complete/brand_gecko-alliance") {
                    const fileName = getFileName(link);
                    const { productTotal, productsLink } = await getProductsByProductAttribute(`templates/${parentCate}/${subCate}/template-${fileName}.html`);

                    productsLink.map(async productLink => {
                        const arr = productLink.split("/");
                        const productName = arr[arr.length - 1];
                        await saveHtmlFromUrl(productLink, `${productName}.html`, 'products');
                    })

                    if(Math.ceil(productTotal / 12) > 1) {
                        for(let i = 2; i <= Math.ceil(productTotal / 12); i++) {
                            await saveHtmlFromUrl(`${link}?p=${i}`, `template-${getFileName(link)}?p=${i}.html`, `/${parentCate}/${subCate}`)
                        }
                    }
                }
            })
        } catch (error) {
            console.error(error);
        }
    }
    
    // visitedLinks.push(linksToVisit[0]);
    // linksToVisit.shift();



    // const dir = path.join(__dirname, '../templates/controls')
    // if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    // const templateName = await downloadHtmlFromUrl(links[1], 'controls');

    // const visitedLinks = [];
    // let linksToVisit = [
    //     "https://www.spapartsproshop.com/controls/spa-controls/electronic/complete"
    // ]

    // while(linksToVisit.length > 0) {
    //     try {
    //         const currentUrl = linksToVisit.pop();
    //         if(visitedLinks.includes(currentUrl))
    //             continue;
    //         console.log(`Now crawling ${currentUrl}`);

    //         const html = await httpRequest.getRequest(`https://www.amazon.com${currentUrl}`);
    //         const parsedResult = parseAll(html);
    //         const cleanLinks = parsedResult.productLinks.map(link => link.slice(0, 14));

    //         linksToVisit = [...linksToVisit, ...cleanLinks];
    //         console.log(parsedResult);
    //         visitedLinks.push(currentUrl);
    //         await sleep(5000);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    return res.json({ isSuccess: true })
})

router.get('/download', async (req, res) => {
    try {
        await downloadHtmlFromUrl("https://www.spapartsproshop.com/")
        
        return res.status(200).json({ isSuccess: true })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error });
    }
})

module.exports = router;