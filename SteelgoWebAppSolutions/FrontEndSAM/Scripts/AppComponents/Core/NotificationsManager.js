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
    if (Cookies.get("messageBody") != null && Cookies.get("messageComplement") != null && Cookies.get("messageType") != null) {
        displayMessage(Cookies.get("messageBody"), Cookies.get("messageComplement"), Cookies.get("messageType"))
    }
}

/****************************/
/*    Global Functions      */
/****************************/

//Method to remove all display classes of the message area
function cleanDisplayMessage() {
    $(".alert-container").removeClass("active");
    $(".message").text("");
    $(".message").removeClass("success");
    $(".message").removeClass("warning");
    $(".message").removeClass("error");
    Cookies.remove("messageBody", { path: '/' });
    Cookies.remove("messageComplement", { path: '/' });
    Cookies.remove("messageType", { path: '/' });
}

//Method to display a message on the proper area Types(o:success | 1:warning | 2:error)
function displayMessage(message, messageComplement, type) {
    cleanDisplayMessage();
    $(".alert-container").addClass("active");
    $(".message").text(message);
    Cookies.set("messageBody", message, { path: '/' });
    Cookies.set("messageComplement", messageComplement, { path: '/' });
    Cookies.set("messageType", type, { path: '/' });
    switch (type) {
        case 0: $(".message").addClass("success"); break;
        case 0: $(".message").addClass("warning"); break;
        case 0: $(".message").addClass("error"); break;
    }
    setTimeout(function () {
        cleanDisplayMessage();
    }, 5000);
}