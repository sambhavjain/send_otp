var Otp = require('../controllers/otp')
var dotenv = require('dotenv');
dotenv.load();
var msg91 = require('msg91')(process.env.MSG91_SECRET, process.env.MSG91_APPNAME, process.env.MSG91_ROUTE)


module.exports = function(app){

	
	app.post('/sendOtp',function(req,res){
        var mob = req.body.mob;
        /*Check if user is registered before or not*/
        Otp.sendOtp(mob, function (Status) {
            console.log(Status);
            res.json(Status);
            if(Status.state == 'success') {   /*If user is not registered before then send otp*/
              var otp = Status.user.otp
              console.log(otp)
              /*sending otp via msg91*/            
              var message_alert = 'Your one time password for Inmile is:'+otp;
              msg91.send(mob, message_alert, function(err, response){
                  if(err)
                    throw err;
                  console.log(response);
              });
              
            }
          })  
 
        });
	app.post('/verifyOtp', Otp.verifyOtp)
}