// defining the plugin
exports.register = function(server, options, next){
  // define routes
  server.route([
    {
      method: 'POST',
      path: '/users',
      handler: function(request, reply){
        var db = request.server.plugins['hapi-mongodb'].db;

        var user = request.payload.user;
          // user = {
          //     name : ...,
          //     email:....,
          // }

        db.collection('users').insert(user, function(err, writeResult){
          reply(writeResult); // you always need a callback function because node is asychonous.
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
