

$(document).ready(function () {
    sessionStorage.setItem('loggedin', true);
    
 

    $("#projectSec").click(function () {
        $("#aboutSec").removeClass("is-active");
        $("#projectCreate").removeClass("is-active");
        $("#projectSec").addClass("is-active");
        $("#projects").removeClass("is-hidden");
        $("#projectCreateForm").addClass("is-hidden");
        $("#info").addClass("is-hidden");
    });

    $("#aboutSec").click(function () {
        $("#projectSec").removeClass("is-active");
        $("#projectCreate").removeClass("is-active");
        $("#aboutSec").addClass("is-active");
        $("#projects").addClass("is-hidden");
        $("#projectCreateForm").addClass("is-hidden");
        $("#info").removeClass("is-hidden");
    });

    $("#projectCreate").click(function () {
        $("#projectSec").removeClass("is-active");
        $("#projectCreateForm").removeClass("is-hidden");
        $("#aboutSec").removeClass("is-active");
        $("#projectCreate").addClass("is-active");
        $("#projects").addClass("is-hidden");
        $("#info").addClass("is-hidden");
    });


    $(document).on("click", "#linkedInEdit", function(event){
        event.preventDefault();


        // After update reload the page
    });



})