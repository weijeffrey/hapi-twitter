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
      if(response.userExist){
        alert("Account already exist. Forgot password?")
      } else {
        alert("Congratuations! Account created.")
      }
    }, 
    error: function(xhr, status, data){
      console.log(xhr)
    }

  })
};

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


var apiAction = new APIaction;


// creatUser
$('#memberSection').on('click',function(){
  $('.nonMember_wrapping').slideToggle();
});

$('.signUp').on('click',function(){
  firstName = $('#firstName').val();
  lastName  = $('#lastName').val();
  email     = $('#email').val();
  userName  = $('#userName').val();
  password  = $('#password').val();
  
  // if((firstName !== "") && (lastName !== "") && (userName !== "") && (email !== "") && (password !== "")) {
    apiAction.createUser(firstName,lastName,email,userName,password);
  // } else {
  //   alert('At least one of the input fields is empty!');
  //   }
  
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

// slider
var main = function() {
  $('.dropdown-toggle').click(function() {
    $('.dropdown-menu').toggle();
  });

  
  $('.arrow-next').click(function() {
    var currentSlide = $('.active-slide');
    var nextSlide = currentSlide.next();

    var currentDot = $('.active-dot');
    var nextDot = currentDot.next();

    if(nextSlide.length === 0) {
      nextSlide = $('.slide').first();
      nextDot = $('.dot').first();
    }
    
    currentSlide.fadeOut(600).removeClass('active-slide');
    nextSlide.fadeIn(600).addClass('active-slide');

    currentDot.removeClass('active-dot');
    nextDot.addClass('active-dot');
  });


  $('.arrow-prev').click(function() {
    var currentSlide = $('.active-slide');
    var prevSlide = currentSlide.prev();

    var currentDot = $('.active-dot');
    var prevDot = currentDot.prev();

    if(prevSlide.length === 0) {
      prevSlide = $('.slide').last();
      prevDot = $('.dot').last();
    }
    
    currentSlide.fadeOut(600).removeClass('active-slide');
    prevSlide.fadeIn(600).addClass('active-slide');

    currentDot.removeClass('active-dot');
    prevDot.addClass('active-dot');
  });

}



});//end of jQuery
