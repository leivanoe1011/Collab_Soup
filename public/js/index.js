$(document).ready(function () {
  if(sessionStorage.getItem("loggedin") === "true"){
    $("#modal-btn").hide();
    $("#signupBtn").hide();
    $("#logoutBtn").removeClass("is-hidden");
    $("#profileBtn").removeClass("is-hidden");
  }

  $("#logoutBtn").click(function(){
    sessionStorage.clear();

    window.location = "/logout"
  });

  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {

    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");

  });

  //login modal open and close.
  $("#modal-btn").click(function () {
    $("#login-modal").addClass("is-active");
  });

  $("#modalClose").click(function () {
    $("#login-modal").removeClass("is-active");
  });



  // Added Language field to Sign Up 
 
}); 











