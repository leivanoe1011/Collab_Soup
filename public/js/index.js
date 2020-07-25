$(document).ready(function () {


  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {

    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");

  });


  //login modal open and close.
  $("#modal-btn").click(function () {
    $("#login-modal").addClass("is-active")
  })
  $("#modalClose").click(function () {
    $("#login-modal").removeClass("is-active")
  })




  $("#accountCreate").click(function () {
    var $accountEmail = $("#accountEmail").val();
    var $emailConfirm = $("#emailConfirm").val();
    var $accountPassword = $("#accountPassword").val();
    var $passwordConfirm = $("#passwordConfirm").val();

    var accountObj = {
      user_name: "123",
      email: $accountEmail,
      password: $accountPassword
    }

    if ($accountEmail === $emailConfirm && $passwordConfirm === accountPassword) {
      $("#accountConfirm").html("Successful!");
      $.post("/api/user", accountObj)
    } else {
      $("#accountConfirm").html("Passwords and emails do not match properly!");
      return false
    }
  })

});