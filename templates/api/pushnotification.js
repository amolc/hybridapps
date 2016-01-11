			    	


			    	var gcm = require('node-gcm');
			    	var device_token = "APA91bEwcpQLaTEByT37g-zxj0PhhG9n_G--a_BxyD-bLJe9GN3hz2T3QEpOEbo2k9ez0GxTie7ZfS5pm2QoST8I_oAsyAAomwiiI2kB9oDRZUmOpZxrL-nfGblyynW4azpuI2cx1eNF";
			    	//var sender = new gcm.Sender(419937285756); //create a new sender
    				var sender = new gcm.Sender('AIzaSyAJ9kNU7h4VSK2oiqrD5EatNVvzBD6zsxw');
    				var message = new gcm.Message(); //create a new message

    				message.addData('title', 'New Message');
    				message.addData('message', 'Mobile Register successfully');
    				message.addData('sound', 'notification');

				    message.collapseKey = 'testing'; //grouping messages
				    message.delayWhileIdle = true; //delay sending while receiving device is offline
				    message.timeToLive = 3; //the number of seconds to keep the message on the server if the device is offline
			     	/*
			     	sender.send(message, device_token, function(result){
        				console.log(result);
        				console.log('push sent to: ' + device_token);
    				});*/

					sender.send(message, device_token, function(err,result) {
						console.log("the result is");
						console.log( result );
						console.log( err );
					});