const fs = require('fs');
const Photo = require('../models/photo.js')

// Create a photo
exports.create = (req, res) => {

    // validate request
    if(!req.body.posted) {
        return res.status(400).send({
            message: "Date posted cannot be empty"
        })
    }

    const photo = {
        userId: req.body.userId,
        username: req.body.username,
        caption: req.body.caption,
        posted: req.body.posted,
        base64Image: req.body.base64Image
    }

    // to declare some path to store your converted image
    const path = './images/'+Date.now()+'.png'
 
    const imgdata = req.body.base64Image;

    // to convert base64 format into random filename
    const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    
    fs.writeFileSync(path, base64Data,  {encoding: 'base64'});

    return res.send(path);

    // get photo from request
    // const photoObj = new Photo({
    //     userId: req.body.userId,
    //     username: req.body.username,
    //     caption: req.body.caption,
    //     posted: req.body.posted,
    //     base64Image: req.body.base64Image
    // });

    res.status(200).send(photo.base64Image);


    // save photo
    // photo.save()
    // .then(data => {
    //     res.status(200).send(data);
    // })
    // .catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some errors occured while saving the photo"
    //     });
    // });
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
