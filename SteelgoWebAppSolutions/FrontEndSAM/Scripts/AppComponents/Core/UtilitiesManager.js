/****************************/
/*    Utilities Functions   */
/****************************/

//Function to obtain an url parameter if is not present then return the notFindValue parameter
function getUrlParameter(sParam, notFindValue) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
    return notFindValue;
}

//Function to validate the existence of an element
function validateElementExistence(element) {
    if (typeof (element) !== 'undefined'
            && element != null) {
        return true;
    }
    return false;
}

//Function to activate waiting screen
function loadingStart() {
    $body.addClass("loading");
}

//Function to deactivate waiting screen
function loadingStop() {
    $body.removeClass("loading");
}

//Function to encrypt base64 a string
function encrypt(toEncodData) {
    var encodedData = window.btoa(toEncodData);
    if (encodedData[encodedData.length - 1] == '=') {
        encodedData = encodedData.substr(0, encodedData.length - 1);
    }
    return encodedData;
}

//Function to decrypt base64 a string
function decrypt(encodedData) {
    if (encodedData[encodedData.length - 1] != '=') {
        encodedData = encodedData + '=';
    }
    return window.atob(encodedData);
}