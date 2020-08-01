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
  var languageInputCnt = 0;

  $(document).on("click", "#addSoftwareLanguage", function(event){
      event.preventDefault();

      var breakLine = $("<br>");

      var column = $("<div>");

      $(column).addClass("columns is-centered");

      var field = $("<div>");

      $(field).addClass("field");

      languageInputCnt++;

      var iconField = $("<p>");

      $(iconField).addClass("control has-icons-left");

      var span = $("<span>");

      $(span).addClass("icon is-large is-left");

      var icon = $("<i>");

      $(icon).addClass("fas fa-language");

      var inputField = $("<input>");

      $(inputField).addClass("programLanguage input is-large");

      $(inputField).attr("name",`language${languageInputCnt}`);

      $(inputField).attr("type", "text");

      $(inputField).attr("placeholder", "Language");

      
      $(span).append(icon);


      $(iconField).append(inputField);

      $(iconField).append(span)


      $(field).append(iconField);


      $(column).append(field);

      $("#addMoreLanguages").text("Any more languages you would like to add?");

      $("#softwareLanguage").append(breakLine);

      $("#softwareLanguage").append(column);
  });

}); 











