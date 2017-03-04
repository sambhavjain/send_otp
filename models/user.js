var mongoose = require('mongoose')
var Random = require("random-js");

var random = new Random(Random.engines.mt19937().autoSeed());

var userSchema =  mongoose.Schema({

	mob : {type: Number, required: true},
	otp : {
        type: Number,
        unique: true,
        'default': random.integer(100000, 999999)
    },
    isVerified : {
    	type: Boolean,
    	'default': false
    },
    registrationDate : String
})

module.exports = mongoose.model('User', userSchema);
