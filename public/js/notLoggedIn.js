function loadUserProjects(result) {
    var userProjects = result;

    for (var i = 0; i < userProjects.length; i++) {

        var feednum = i;
        var currentPrj = userProjects[i];
        var projectName = currentPrj.Project.project_name;
        var projectDesc = currentPrj.Project.project_description;

        let column = $("<div class='column is-half'>");
        let box = $("<div class='box' id='feednum" + feednum + "'>");
        let content = $("<div class='content'>");
        let projName = $("<p>");
        let projDesc = $("<p>");
        let projLang = $("<p>");

        projName.html('Project Name: ' + projectName);
        projDesc.html('Project description: ' + projectDesc);
        projLang.html('Project language(s): ');

        var langList = $("<ul>");

        var projectLanguages = currentPrj.Project.Project_languages;

        // Get project language
        for (var j = 0; j < projectLanguages.length; j++) {
            var lang = projectLanguages[j].language_name;
            var listItem = $("<li>");
            $(listItem).text(lang);
            $(langList).append(listItem);
        };

        $(projLang).append(langList);

        $(content).append(projName, projDesc, projLang);
        $(box).append(content);
        $(column).append(box);


        $(document).find(".user_proj_data").append(column);
    };
};

function getUserProjects() {
    $.ajax({
        url: "/api/userProject/" + window.location.href.charAt(window.location.href.length - 1),
        type: "GET",
        success: function (result) {

            var userObj = result;

            loadUserProjects(userObj);
        }
    });
};

function initialProfileConfig() {
    $("#projInfo").addClass("is-hidden");
};

$(document).ready(function () {

    initialProfileConfig();

    $("#projectSec").click(function () {
        $("#aboutSec").removeClass("is-active");
        $("#projectSec").addClass("is-active");
        $("#projects").removeClass("is-hidden");
        $("#Form").addClass("is-hidden");
        $("#info").addClass("is-hidden");
        $("#projInfo").removeClass("is-hidden");

        // getUserProjects();
    });

    $("#aboutSec").click(function () {
        $("#projectSec").removeClass("is-active");
        $("#aboutSec").addClass("is-active");
        $("#projects").addClass("is-hidden");
        $("#Form").addClass("is-hidden");
        $("#info").removeClass("is-hidden");
        $("#projInfo").addClass("is-hidden");
    });

    getUserProjects();
});


