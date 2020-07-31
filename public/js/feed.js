$(document).ready(function () {

    // FEED PAGE
    $.get("/api/projectAll", function (response) {
        var project = response


        console.log(project)


        var createBox = () => {
            var feedDiv = $("#feedContent");
            var column = $("<div class='column'>");
            var box = $("<div class='box'>");
            var content = $("<div class='content'>");

            var projName = $("<p>")

            projName.html('Project Name: ' + project[i].project_name);
            



            content.append(projName)

            box.append(content)

            column.append(box)

            feedDiv.append(column)
        }




        for (var i = 0; i < project.length; i++) {
            createBox();
        };
    });
});