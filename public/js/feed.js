

$(document).on("click", ".projJoinBtn", function () {

    console.log("Joining Project");
    
    var ProjectId = $(this).attr("id");

    console.log(ProjectId);


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
            console.log("In success api post to add user to project");
            console.log(result);

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


        console.log("In Project All GET AJAX Call");

        console.log(project);

        console.log(currentUserId);

        const createBox = () => {

            // i gets created in the "for" loop that calls the 
            // the create box function
            var projNum = project[i].User_projects[0].ProjectId;

            feednum++

            const feedDiv = $("#feedContent");
            let column = $("<div class='column is-half'>");
            let box = $("<div class='box' id='feednum" + feednum + "'>");
            let content = $("<div class='content'>");
            let projName = $("<p>");
            let projDesc = $("<p>");
            let projLang = $("<p>");
            let projPart = $("<p>");
            var projJoin = $("<a class='button is-danger projJoinBtn' id='" + projNum + "'>")


            projName.html('Project Name: ' + project[i].project_name);
            projDesc.html('Project description: ' + project[i].project_description);
            projLang.html('Project language(s): ');
            projPart.html('Project participant(s): ')

            projJoin.html("Join");


            for (var j = 0; j < project[i].Project_languages.length; j++) {
                projLangLength = project[i].Project_languages.length;


                if (j + 1 === projLangLength) {
                    projLang.append(project[i].Project_languages[j].language_name);
                } else {
                    projLang.append(project[i].Project_languages[j].language_name + ", ");
                }
            };


            var projectOwner = 0;

            for (var o = 0; o < project[i].User_projects.length; o++) {

                var id = project[i].User_projects[o].UserId

                // If the project owner exists
                if(id === currentUserId){
                    console.log("Current User Exist");

                    projectOwner = 1;

                    console.log(projectOwner);

                    // Only create the button if not the current user
                    
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



            if(projectOwner === 1){
                console.log("Not append the join")
                content.append(projName, projDesc, projLang, projPart);
            }
            else{
                console.log("Append the Join");
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