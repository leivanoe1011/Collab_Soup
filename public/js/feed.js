$(document).ready(function () {

    // FEED PAGE
    $.get("/api/projectAll", function (response) {
        console.log(response)

        let column = $("<div class='column'>"); 
        let box = $("<div class='box'>");
        let content = $("<div class='content'>");
        

        for (var i = 0; i < response.length; i++) {
            var hello = 0;

        };


    });
});