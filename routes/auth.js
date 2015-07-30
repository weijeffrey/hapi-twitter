module.exports = {};
// same as var Auth = {};
// require ('./auth') in sessions.js = {}

// module.exports.authenticated = function(){} will be referred by Auth.authenticated in the sessions.js

module.exports.authenticated = function(request, callback){
  // return true if user is logged in
  // return false if user is not logged in

  //1. retrieve session_id from cookie
  //2. look into DB to find matching session_id

  var cookie = request.session.get('hapi_twitter_session');
  var msg = "access denied"

  if(!cookie){
    return callback({
      authenticated: false,
      message: msg
    })
  }

  var session_id = cookie.session_id;
  
  var db = request.server.plugins['hapi-mongodb'].db;

  db.collection('sessions').findOne({session_id: session_id}, function(err, session){
    if (!session){
      return callback({
        authenticated: false,
        message: msg
      })
    }

    callback({authenticated: true, user_id: session.user_id})
  })




}
