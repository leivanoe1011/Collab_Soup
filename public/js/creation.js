$(document).ready(function () {
    $("#accountCreate").click(function () {
        let $accountEmail = $("#accountEmail").val();
        let $emailConfirm = $("#emailConfirm").val();
        let $accountPassword = $("#accountPassword").val();
        let $passwordConfirm = $("#passwordConfirm").val();
        let $accountUser = $("#accountUserName").val();

        var accountObj = {
            user_name: $accountUser,
            email: $accountEmail,
            password: $accountPassword
        };

        if ($accountEmail === $emailConfirm && $passwordConfirm === $accountPassword) {
            $("#accountConfirm").html("Successful!");
            $.post("/api/user", accountObj);
        } else {
            $("#accountConfirm").html("Passwords and emails do not match properly!");
            return false;
        };
    });
})
