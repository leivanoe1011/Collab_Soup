

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

    var languageInputCnt = 0;

    $(document).on("click", "#addSoftwareLanguage", function (event) {
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

        $(inputField).attr("name", `language${languageInputCnt}`);

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

    $("#projCreateBtn").on("click", function(){
        sessionStorage.setItem("created", true);
    });
})