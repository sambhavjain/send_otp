var User = require('../models/user')


exports.sendOtp = function(mob,callback) {
 
	// console.log(mob)
	var newuser = new User();
	User.find({ "mob": mob } ,function(err,users){
	 
	var len = users.length;
	if(len == 0){
				newuser.mob = mob;
			    newuser.registrationDate = new Date();
			   	newuser.save(function (err) {
			   		if(err)
			   			throw err;
			 		callback({state: 'success', user: newuser});
			 		
			 		console.log(newuser.name + " Partially Registered");
			 				
					});
			     } 
		
 		else if (len > 0){
 			if(users[0].isVerified == true){
 				callback({state: 'failure', 'message':"Mobile No. already Registered"});
 			} 
 			
 			 if(users[0].isVerified == false){
 				callback({state: 'success', user: users[0]})
 			}
    	
		}
	});
	
}

exports.verifyOtp =function(req, res) {
	var otp = req.body.otp;
	//user.find({otp: otp},function(err, user){
	console.log(otp);
		
		User.findOne({'otp': req.body.otp ,'mob' : req.body.mob}, function(err,_user){
		if(err){
			throw err;
		} 
		else if(_user){ 
			_user.isVerified = true;
			_user.save();
			res.json({state: 'success', message : 'user verified successfully'});
		}
		else {
				res.json({state: 'failure', 'message' : 'user not found'});
				console.log('user not found');
			}
		})
		
	}
	