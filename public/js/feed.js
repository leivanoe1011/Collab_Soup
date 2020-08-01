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

            projName.html('Project Name: ' + project[i].project_name);
            projDesc.html('Project description: ' + project[i].project_description);


            content.append(projName, projDesc);
            box.append(content);
            column.append(box);
            feedDiv.append(column);
        };

        for (var i = 0; i < project.length; i++) {
            createBox();
        };
    });
});