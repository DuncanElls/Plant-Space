module.exports = (app) => {

    const gardenItems = require('../controllers/gardenItems.controller');

    app.get('/api/gardenItems', gardenItems.getAllGardenItems);
    app.get('/api/gardenItems/:userId', gardenItems.getGardenItemsByUserId);

    app.post('/api/gardenItems', gardenItems.createGardenItems);

    app.delete('/api/gardenItems/:userId/:plantId', gardenItems.removeFromGarden);

}