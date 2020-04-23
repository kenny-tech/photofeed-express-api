const Photo = require('../models/photoModel.js')

// Create a photo
exports.create = (req, res) => {

    // validate request
    if(!req.body.posted) {
        return res.status(400).send({
            message: "Date posted cannot be empty"
        })
    }

    // get photo from request
    const photo = new Photo({
        user_id: req.body.user_id,
        caption: req.body.caption,
        posted: req.body.posted,
        url: req.body.url
    });

    // const photo = new Photo({
    //     user_id: "gdgh7",
    //     caption: "First caption",
    //     posted: 12345,
    //     url: "myfirstphoto.jpg"
    // });

    // save photo
    photo.save()
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some errors occured while saving the photo"
        });
    });
};

// Get all photos
exports.findAll = (req, res) => {
    Photo.find()
    .then(photos => {
        res.status(200).send(photos);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some errors occured while retrieving photos"
        })
    })
}

// Get a single photo
exports.findOne = (req, res) => {
    Photo.findById(req.params.photoId)
    .then(photo => {
        if(!photo) {
            return res.status(404).send({
                message: "Photo not found with id " + req.params.photoId
            });
        }
        res.send(photo)
    })
    .catch(err => {
        return res.status(500).send({
            message: "Error retrieving photo with id " + req.params.photoId
        })
    })
}
