

$(document).on("click", ".projJoinBtn", function () {

    
    var ProjectId = $(this).attr("id");


    var PostRes = {
        ProjectId: ProjectId,
        UserId: " ",
        project_owner: 0
    };

    $.ajax({
        url: "/api/joinProject",
        type: "POST",
        data: PostRes,
        success: function(result){


            // Only want to hide if the Join was successful 
            // $(this).addClass("is-hidden");

            location.reload();

        }
    })

});


$(document).ready(function () {
    // FEED PAGE
    var feednum = 1;



    $.get("/api/projectAll", function (result) {
       
        project = result.response;

        currentUserId = result.currentUserId;



        const createBox = () => {

            // i gets created in the "for" loop that calls the 
            // the create box function
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


            projName.html('Project Name: ' + project[i].project_name);
            projDesc.html('Project description: ' + project[i].project_description);
            projLang.html('Project language(s): ');
            projPart.html('Project participant(s): ');

            projJoin.html("Join");


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

            var projectOwner = 0;

            for (var o = 0; o < project[i].User_projects.length; o++) {

                var id = project[i].User_projects[o].UserId

                // If the project owner exists
                if(id === currentUserId){

                    projectOwner = 1;

                    
                }
                
                $.ajax({
                    url: `/api/users/${id}`,
                    type: "GET",
                    success: function(response){
                        console.log(response);

                        projPart.append(response + " ");
                    }
                });

            }



            $.post("/api/users/", userIdObj, function (response) {
                for (var t = 0; t < response.length; t++) {
                    if (t + 1 === response.length) {
                        projPart.append("<a href='/profile/" + response[t].id + "'>" + response[t].name + "</a>");
                    } else {
                        projPart.append("<a href='/profile/" + response[t].id + "'>" + response[t].name + ", </a>");
                    };
                };
            });

            if(projectOwner === 1){
                content.append(projName, projDesc, projLang, projPart);
            }
            else{
                console.log(projectOwner);
                content.append(projName, projDesc, projLang, projPart, projJoin);
            }

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
        };
    });


});