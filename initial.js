const Category = require('./models/category.model');
const parseHomePage = require('./parser');
const categoryController = require('./controllers/category.controller');

async function initData(list, model, field) {
    const existingDocs = await model.find();
    const existingDocNames = existingDocs.map((doc) => doc[field]);
    const newDocs = list.filter((doc) => !existingDocNames.includes(doc[field]));
    if (newDocs.length) {
        const docsCreated = await model.insertMany(newDocs);

        if (!docsCreated) {
            throw new Error(`Init data sync failed`)
        }
    }
}

async function createSeedData() {
    const categories = await categoryController.findAll();
    if(!categories.length) {
        const categories = [{ title: 'Controls' }, { title: 'Pumps' }, { title: 'Filters' }, { title: 'Keypads' }];
        await initData(categories, Category, 'title');
        const homePageData = await parseHomePage();
        await categoryController.bulkCreate(homePageData);
    }
}

module.exports = createSeedData;