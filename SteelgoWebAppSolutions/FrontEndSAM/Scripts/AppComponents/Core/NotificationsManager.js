/********************************************/
/********************************************/
/*********                          *********/
/********* Notifications Manager    *********/
/*********                          *********/
/********************************************/
/********************************************/

/****************************/
/*    Global Variables      */
/****************************/

//Add all global variables for your partial view here

/****************************/
/*    Document Ready        */
/****************************/

//Method to be called on the document ready and contains all the pertinent code for a partial view
function notificationsManagertoBeExecutedOnDocumentReady() {
    //CODE
}

/****************************/
/*    Global Functions      */
/****************************/

//Method to display a message on the proper area Types(o:success | 1:warning | 2:error)
function displayMessage(message, messageComplement, type) {
    $(".alert-container").addClass("active");
    $(".message").text(message);
    switch (type) {
        case 0: $(".message").addClass("success"); break;
        case 0: $(".message").addClass("warning"); break;
        case 0: $(".message").addClass("error"); break;
    }
    setTimeout(function () {
        $(".alert-container").removeClass("active");
        $(".message").text("");
        $(".message").removeClass("success");
        $(".message").removeClass("warning");
        $(".message").removeClass("error");
    }, 5000);
}