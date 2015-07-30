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
          dateCreated: new Date(),
        }
    },  
    dataType: 'json',
    success: function(response){
      if(response.userExist){alert("Account already exist. Forgot password?")} else {alert("Congratuations! Account created.")}
    }
  })
}


APIaction.prototype.userLogIn = function(){
  $.ajax({
    type: 'POST',
    url: '/sessions',
    data:{
      user:{
        username: memberuserName,
        password: memberpassword,
      }
    },
    dataType: 'json',
    success: function(response){
      if(response.userExist == false){ 
        return alert("No record found. Please sign up.")
      }
      if(response.authorized == false){ 
        return alert("Username or Password not correct, please check again.")
      }

      return alert("Sign in successful!")
    }
  })
}


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
$('.submit').on('click', function(){
  memberuserName = $('.memberuserName').val();
  memberpassword = $('.memberpassword').val();
  apiAction.userLogIn(memberuserName, memberpassword)

})

//




});//end of jQuery
