$(document).ready(function(){

var APIaction = function(){

};

APIaction.prototype.createUser = function(){

  $.ajax({
    type: 'POST',
    url: '/users',
    data: {
        user:{
          firstname: firstName,
          lastname: lastName,
          email: email,
          username: userName,
          password: password,
          // dateCreated: new Date(),
        }
    },  
    dataType: 'json',
    success: function(response){
      if(response.userExist){alert("Account already exist. Forgot password?")}
    }
  })
}


// APIaction.prototype.userLogIn = function(){
//   $.ajax({
//     type: 'GET',
//     url: '/'+memberUserName,
//     dataType: 'json',
//     success: function(response){
//       console.log(response)
//     }
//   })
// }


var apiAction = new APIaction


// creatUser
$('#memberSection').on('click',function(){
  $('.nonMember_wrapping').slideToggle();
});

$('.signUp').on('click',function(){
  firstName = $('#firstName').val();
  lastName = $('#lastName').val();
  email = $('#email').val();
  userName = $('#userName').val();
  password = $('#password').val();
  
  if((firstName !== "") && (lastName !== "") && (userName !== "") && (email !== "") && (password !== "")) {
    apiAction.createUser(firstName,lastName,email,userName,password);
  } else {
    alert('At least one of the input fields is empty!');
    }
  
  $('#firstName').val("");
  $('#lastName').val("");
  $('#email').val("");
  $('#userName').val("");
  $('#password').val("");
  
})

//user LogIn
memberUserName = $('memberUserName').val();
memberPassWord = $('memberPassWord').val();


$('.submit').on('click', function(){
  apiAction.userLogIn()

})




});//end of jQuery
