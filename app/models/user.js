const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// define our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

userSchema.pre('save', async function(next){
    //'this' refers to the current document about to be saved
    const user = this;
    //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
    //your application becomes.
    const hash = await bcrypt.hash(user.password, 10);
    //Replace the plain text password with the hash and then store it
    user.password = hash;
    //Indicates we're done and moves on to the next middleware
    next();
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { return callback(err); }

        callback(null, isMatch);
    });
};

// create the model class
const model = mongoose.model('user', userSchema);

// export the model
module.exports = model;
