module.exports = (app) => {
    const photos = require('../controllers/photoController.js');

    // Create a new photo
    app.post('/photos', photos.create);

    // Retrieve all photos
    app.get('/photos', photos.findAll);

    // Retrieve a single photo with photoId
    app.get('/photos/:photoId', photos.findOne);
}
