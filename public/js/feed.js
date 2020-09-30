
$(document).ready(function () {
    // FEED PAGE
    var feednum = 1;

    $.get("/api/projectAll", function (response) {

        // Map the object correctly
        project = response;

        console.log(project);

        const createBox = () => {
            var projNum = project[i].User_projects[0].ProjectId;

            feednum++

            const feedDiv = $("#feedContent");
            let column = $("<div class='column is-half is-offset-1-mobile is-four-fifths-mobile'>");
            let box = $("<div class='box' id='feednum" + feednum + "'>");
            let content = $("<div class='content'>");
            let projName = $("<p>");
            let projDesc = $("<p>");
            let projLang = $("<p>");
            var projPart = $("<p>");
            var projJoin = $("<a class='button is-danger projJoinBtn' id='" + projNum + "'>");

            projJoin.html("Join");

            projName.html('Project Name: ' + project[i].project_name);
            projDesc.html('Project description: ' + project[i].project_description);
            projLang.html('Project language(s): ');
            projPart.html('Project participant(s): ');


            for (var j = 0; j < project[i].Project_languages.length; j++) {
                projLangLength = project[i].Project_languages.length;

                if (j + 1 === projLangLength) {
                    projLang.append(project[i].Project_languages[j].language_name);
                } else {
                    projLang.append(project[i].Project_languages[j].language_name + ", ");
                };
            };

            content.append(projName, projDesc, projLang, projPart, projJoin);
            box.append(content);
            column.append(box);
            feedDiv.append(column);

            var userIdArr = [];

            for (var o = 0; o < project[i].User_projects.length; o++) {
                var userIdObj = {
                    id: userIdArr
                };

                userIdArr.push(project[i].User_projects[o].UserId);
            };

            $.post("/api/users/", userIdObj, function (response) {
                for (var t = 0; t < response.length; t++) {
                    if (t + 1 === response.length) {
                        projPart.append("<a href='/profile/" + response[t].id + "'>" + response[t].name + "</a>");
                    } else {
                        projPart.append("<a href='/profile/" + response[t].id + "'>" + response[t].name + ", </a>");
                    };
                };
            });

        };

        for (var i = 0; i < project.length; i++) {
            createBox();
        };

        if (sessionStorage.getItem("created") === 'true') {
            window.location.hash = "feednum" + feednum;
            sessionStorage.removeItem("created");
        };
    });

    $(document).on("click", ".projJoinBtn", function () {
        var ProjectId = $(this).attr("id");

        var PostRes = {
            ProjectId: ProjectId
        };


        // Redirect if user is not logged in
        // If user is logged in, then refresh the Project 
        // Participant list with the new name
        $.post("/api/joinProject", PostRes);

        $(this).addClass("is-hidden");
    });
});

