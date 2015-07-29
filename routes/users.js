var Bcrypt = require('bcrypt');
var Joi = require('joi');

// defining the plugin
exports.register = function(server, options, next){
  // define routes
  server.route([
    {
      method: 'POST',
      path: '/users',
      // add joi (add a config that wraps the handler)
      config:{
        handler: function(request, reply){
          var db = request.server.plugins['hapi-mongodb'].db;

          var user = request.payload.user;
            // user = {
            //     name : ...,
            //     email:....,
            // }
          var uniqUserQuery = {
            $or: [
              {username: user.username},
              {email: user.email}
            ]
          };

          
          db.collection('users').count(uniqUserQuery, function(err, userExist){
            
            if(userExist){
              return reply({userExist: true});
            }
            // Encripty my password
            Bcrypt.genSalt(10, function(err, salt){
              Bcrypt.hash(user.password, salt, function(err, encrypted){
                user.password = encrypted;

                //insert user document into DB
                db.collection('users').insert(user, function(err, writeResult){
                  if (err) {
                    return reply ("Internal MongoDB error", err)
                  }
                  reply(writeResult)
                })
              })
            });

          })
        }, 
        validate: {
          payload: {
            user : {
              firstname: Joi.string().min(1).max(40).required(),
              lastname: Joi.string().min(1).max(40).required(),
              email: Joi.string().email().max(100).required(),
              username: Joi.string().min(1).max(40).required(),
              password: Joi.string().min(1).max(40).required(),
            }
          }
        }

      }
    }
    ,
    {
      method: 'GET',
      path: '/users',
      handler: function(request, reply){

        var db = request.server.plugins['hapi-mongodb'].db;

        db.collection('users').find().toArray(function(err,users){
          if(err) {return reply('Internal MongoDB error')}

            reply(users);
        })
      }
    }
  ]);
  

  next(); // <-- DO NOT Forget
};

// defining the description
exports.register.attributes = {
  name: 'users-routes',
  version: '0.0.1'
};

