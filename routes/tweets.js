var Joi = require('joi')

var Auth = require('./auth')


exports.register = function(server, options, next){
  server.route([
    {
      method: 'GET',
      path:'/tweets',
      handler: function(request, reply){
        var db = request.server.plugins['hapi-mongodb'].db;

        db.collection('tweets').find().toArray(function(err, tweets){
          if(err) {return reply('Internal MongoDB error')}

          reply (tweets);
        })
      }
    },
    {//get one tweet
      method: 'GET',
      path:'/tweets/{id}',
      handler: function(request, reply){
        var tweet_id = encodeURIComponent(request.params.id);        
        var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID;
        var db = request.server.plugins['hapi-mongodb'].db;

        db.collection('tweets').findOne({'_id': ObjectId(tweet_id)},function(err, tweet){
          if(err) {return reply('Internal MongoDB error')}

          reply (tweet);
        })
      }
    },
    {
      method: 'POST',
      path: '/tweets',
      config: {
        handler: function(request, reply){
          
          Auth.authenticated(request, function(session){
            if(session.authenticated){
            var db       = request.server.plugins['hapi-mongodb'].db;
            var ObjectId = request.server.plugins['hapi-mongodb'].ObjectID;

            var tweet = {
              'message': request.payload.tweet.message,
              'user_id': ObjectId(session.user_id)
            };

            db.collection('tweets').insert(tweet, function(err, writeResult){
              if(err) {return reply('Internal MongoDB error')}

              reply(writeResult)

            })

            } else {
              reply (session)
            }

          })
        },
        validate :{
          payload:{
            tweet:{
              message: Joi.string().max(140).required()
            }
          }
        }
        
      }
    }

  ])


  next();
}

exports.register.attributes = {
  name: 'tweets-routes',
  version: '0.0.1'
};