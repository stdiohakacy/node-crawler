const Category = require('./models/category.model');
async function initData(list, model, field) {
    const existingDocs = await model.find();
    const existingDocNames = existingDocs.map((doc) => doc[field]);
    const newDocs = list.filter((doc) => !existingDocNames.includes(doc[field]));
    if (newDocs.length) {
        const docsCreated = await model.insertMany(newDocs);

        if (!docsCreated) {
            throw new ApolloError('Init data sync failed!', '500');
        }
    }
}

async function createSeedData() {
    const categories = [{ title: 'Controls' }, { title: 'Pumps' }, { title: 'Filters' }, { title: 'Keypads' }];
    await initData(categories, Category, 'title');
}

module.exports = createSeedData;