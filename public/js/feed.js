$(document).ready(function () {
    // FEED PAGE

    var feednum = 1;

    $.get("/api/projectAll", function (response) {
        project = response;

        console.log(project);

        const createBox = () => {
            feednum++

            const feedDiv = $("#feedContent");
            let column = $("<div class='column is-half'>");
            let box = $("<div class='box' id='feednum" + feednum + "'>");
            let content = $("<div class='content'>");
            let projName = $("<p>");
            let projDesc = $("<p>");
            let projLang = $("<p>");

            projName.html('Project Name: ' + project[i].Project.project_name);
            projDesc.html('Project description: ' + project[i].Project.project_description);
            projLang.html('Project language(s): ' + project[i].language_name);


            content.append(projName, projDesc, projLang);
            box.append(content);
            column.append(box);
            feedDiv.append(column);
        };

        for (var i = 0; i < project.length; i++) {
            createBox();
        };

        if (sessionStorage.getItem("created") === 'true') {
            window.location.hash = "feednum" + feednum;
            sessionStorage.removeItem("created");
        }
    });
});