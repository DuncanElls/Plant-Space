module.exports = (app) => {

    const plants = require('../controllers/plants.controller.js');

    app.get('/api/plants', plants.getAllPlants);
    app.get('/api/plants/category/:category', plants.getPlantsByCategory);
    app.get('/api/plants/:id', plants.getPlantsById);

    // app.get('/api/plants/garden/:userId', plants.getPlantsById);
    // app.post('/api/plants/garden/:userId', plants.getPlantsById);
    // app.delete('/api/plants/garden/:userId', plants.getPlantsById);

    app.post('/api/plants', plants.createPlant);

    app.put('/api/plants/:id', plants.updatePlant);

    app.delete('/api/plants/:id', plants.deletePlantById)
}