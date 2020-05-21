const User = require('../models/user')

exports.updateProfile = (req, res) => {

    User.findByIdAndUpdate(req.params.userId, req.body, {new: true, useFindAndModify: false}, function(err, user) {
        if (err) {
            res.status(422).send({ 
                success: false,
                data: null,
                message: err + ': Unable to update profile. Please try again',
            });
        } else {
            res.status(200).send({ 
                success: true,
                data: user,
                message: 'Profile successfully updated',
            });
        }
    })
}

