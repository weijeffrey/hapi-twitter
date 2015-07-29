var Bcrypt = require('bcrypt');

exports.register = function(server, options, next){

  server.route([
    {
      method: 'POST',
      path: '/sessions',
      handler: function(request, reply){

        var db = request.server.plugins['hapi-mongodb'].db;

        var user = request.payload.user;

        db.collection('users').findOne({username:user.username},function(err, userMongo){
          if(err) {return reply('Internal MongoDB error')}

          //stop if you can't find the user
          if(userMongo === null){
            return reply({userExist: false});
          } 

          //so now the user exist, please check the password
          Bcrypt.compare(user.password,userMongo.password,function(err, same){
            if(!same){
              return reply({authorized: false})
            }

          //password is correct, create new session in the sessions collection

            var randomKeyGenerator = function() {
              return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
            }

            var session = {
              user_id: userMongo._id,
              session_id: randomKeyGenerator(), 
            }

            db.collection('sessions').insert(session, function(err, writeResult){
              if(err) {return reply('Internal MongoDB error')}

              //set the same session_id in the Client's cookie
              request.session.set('hapi_twitter_session', session);

              reply({authorized: true})
            })

          })

        });
      }

    }

    ]);


  next();
}

exports.register.attributes = {
  name: 'sessions-route',
  version: '0.0.1'
}

// compare(data, encrypted, cb)
// data - [REQUIRED] - data to compare.
// encrypted - [REQUIRED] - data to be compared to.
// cb - [REQUIRED] - a callback to be fired once the data has been compared. uses eio making it asynchronous.
// err - First parameter to the callback detailing any errors.
// same - Second parameter to the callback providing whether the data and encrypted forms match [true | false].