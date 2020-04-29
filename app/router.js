const Authentication = require('./controllers/authentication');
const passwordService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
    const photos = require('../app/controllers/photoController');

     // Create a new photo
     app.post('/photos', photos.create);

     // Retrieve all photos
     app.get('/photos', photos.findAll);
 
     // Retrieve a single photo with photoId
     app.get('/photos/:photoId', photos.findOne); 

    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);

    app.get('/', requireAuth, (req, res, next) => {
        res.send(['React', 'Redux', 'Node', 'Express', 'JWT']);
    });
};
