const Comment = require('../models/comment')

// Create a comment
exports.create = (req, res) => {

    // validate request
    if(!req.body.comment) {
        return res.status(400).send({
            message: "Comment cannot be empty"
        })
    } else {
        const comment = new Comment({
            photoId: req.body.photoId,
            username: req.body.username,
            posted: req.body.posted,
            comment: req.body.comment,
        });
    
        // save comment
        comment.save()
        .then(data => {
            res.status(200).send({
                success: true,
                data: data,
                message: 'success',
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some errors occured while saving comment"
            });
        });
    }
}

exports.findOne = (req, res) => {
    Comment.find({photoId: req.params.photoId}).sort({createdAt: 'desc'})
    .then(comment => {
        // console.log(comment);
        if(!comment) {
            res.status(422).send({ 
                success: false,
                data: null,
                message: 'No comment found',
            });
        } else {
            res.status(200).send({ 
                success: true,
                data: comment,
                message: 'success',
            });
        }
    })
    .catch(err => {
        return res.status(500).send({
            message: "Error retrieving comment with photo id " + req.params.photoId
        })
    })
}