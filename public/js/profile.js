$(document).ready(function(){
    if($("#aboutSec").hasClass("is-active") === true){
        $("#projects").addClass("is-hidden");
    };

    $("#projectSec").click(function(){
        $("#aboutSec").removeClass("is-active");
        $("#projectSec").addClass("is-active");
        $("#projects").removeClass("is-hidden");
        $("#info").addClass("is-hidden");
    });

    $("#aboutSec").click(function(){
        $("#projectSec").removeClass("is-active");
        $("#aboutSec").addClass("is-active");
        $("#projects").addClass("is-hidden");
        $("#info").removeClass("is-hidden");
    });
})