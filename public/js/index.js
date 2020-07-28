$(document).ready(function () {
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

  $("#accountCreate").click(function () {
    let $accountEmail = $("#accountEmail").val();
    let $emailConfirm = $("#emailConfirm").val();
    let $accountPassword = $("#accountPassword").val();
    let $passwordConfirm = $("#passwordConfirm").val();
    let $accountUser = $("#accountUserName").val();

    var accountObj = {
      user_name: $accountUser,
      email: $accountEmail,
      password: $accountPassword
    };

    if ($accountEmail === $emailConfirm && $passwordConfirm === accountPassword) {
      $("#accountConfirm").html("Successful!");
      $.post("/api/user", accountObj);
    } else {
      $("#accountConfirm").html("Passwords and emails do not match properly!");
      return false;
    };
  });

  $("#loginBtn").click(function () {
    let $loginEmail = $("#loginEmail").val();
    let $loginPassword = $("#loginPassword").val();

    var loginInfo = {
      user_name: "darth vader",
      email: $loginEmail,
      password: $loginPassword
    }

    $.post("/api/userByEmail", loginInfo, function (response) {

      if (response.length === 0) {
        console.log("nothing");
        $(".modal-card-body").append("<p class='has-text-danger'>Something went wrong! Check your email and password!</p>")
        return false;
      } else {
        $("#login-modal").removeClass("is-active");
      };

      sessionStorage.setItem("loggedin", true);
      sessionStorage.setItem("id", response[0].id);
      sessionStorage.setItem("email", response[0].email);
      sessionStorage.setItem("user_name", response[0].user_name);

      if(sessionStorage.getItem("loggedin") === "true"){
        window.location = "/feed"
      }
    });

  });


}); 
