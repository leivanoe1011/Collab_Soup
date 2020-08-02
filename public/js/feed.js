$(document).ready(function () {
    // FEED PAGE
    $.get("/api/projectAll", function (response) {
        project = response;

        console.log(project);


        const createBox = () => {
            const feedDiv = $("#feedContent");
            let column = $("<div class='column'>");
            let box = $("<div class='box'>");
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
    });
});