$(document).ready(function () {
    // FEED PAGE
    $.get("/api/projectAll", function (response) {
        project = response;

        console.log(project);


        var createBox = () => {
            const feedDiv = $("#feedContent");
            let column = $("<div class='column'>");
            let box = $("<div class='box'>");
            let content = $("<div class='content'>");
            let projName = $("<p>")

            projName.html('Project Name: ' + project[i].project_name);

            content.append(projName);
            box.append(content);
            column.append(box);
            feedDiv.append(column);
        };




        for (var i = 0; i < project.length; i++) {
            createBox();
        };
    });
});