/********************************************/
/********************************************/
/*********                          *********/
/*********     Alerts Manager       *********/
/*********                          *********/
/********************************************/
/********************************************/

/****************************/
/*    Global Variables      */
/****************************/

//Add all global variables for your partial view here
var alertTimeOut = 15000;

/****************************/
/*    Document Ready        */
/****************************/

//Method to be called on the document ready and contains all the pertinent code for a partial view
function alertsManagertoBeExecutedOnDocumentReady() {
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

    var messageText = "";
    if (message.length > 0) {
        messageText = _dictionary[message][$("#language").data("kendoDropDownList").value()];
    }

    messageText = messageText + messageComplement;

    $(".message").text(messageText);
    console.log(messageText);
    Cookies.set("messageBody", message, { path: '/' });
    Cookies.set("messageComplement", messageComplement, { path: '/' });
    Cookies.set("messageType", type, { path: '/' });

    switch (type) {
        case '0': $(".message").addClass("success"); break;
        case '1': $(".message").addClass("warning"); break;
        case '2': $(".message").addClass("error"); break;
    }

    setTimeout(function () {
        cleanDisplayMessage();
    }, alertTimeOut);
}
function displayNotify(title, message, extraMessage, type) {
    var messageNotify;

    if (extraMessage.length > 0) {
        messageNotify = extraMessage;
    }
    else {
        messageNotify = _dictionary[message][$("#language").data("kendoDropDownList").value()];
    }

    var options = {
        title: _dictionary[title][$("#language").data("kendoDropDownList").value()],
        text: messageNotify
    };

    switch (type) {
        case '2':
            options.type = "error";
            break;
        case '0':
            options.type = "success";
            break;
    }
    new PNotify(options);
}
function showConfirmationWindow(message) {
    return showWindow('#confirmationTemplate', message)
};

function showWindow(template, message) {

    var dfd = new jQuery.Deferred();
    var result = false;

    $("<div id='popupWindow'></div>")
    .appendTo("body")
    .kendoWindow({
        width: "200px",
        modal: true,
        title: "",
        modal: true,
        visible: false,
        close: function (e) {
            this.destroy();
            dfd.resolve(result);
        }
    }).data('kendoWindow').content($(template).html()).center().open();

    $('.popupMessage').html(message);

    $('#popupWindow .confirm_yes').val(_dictionary.AlertPreguntaSi[$("#language").data("kendoDropDownList").value()]);
    $('#popupWindow .confirm_no').val(_dictionary.AlertPreguntaNo[$("#language").data("kendoDropDownList").value()]);

    $('#popupWindow .confirm_no').click(function () {
        result = false;
        $('#popupWindow').data('kendoWindow').close();
    });

    $('#popupWindow .confirm_yes').click(function () {
        result = true;
        $('#popupWindow').data('kendoWindow').close();
    });

    return dfd.promise();




};