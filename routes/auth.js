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

  if(!cookie){
    return callback({authenticated: false})
  }

  var session_id = cookie.session_id;
  callback({session_id: session_id})  
}
