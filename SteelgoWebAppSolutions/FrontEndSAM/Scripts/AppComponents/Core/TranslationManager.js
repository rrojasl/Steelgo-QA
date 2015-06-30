/****************************/
/*   Traslation Functions   */
/****************************/
            
//Function to change the labels to the corresponding language of the layout page
function changeLayoutLabels(language) {
    $("label").each(function (index) {
        if (validateElementExistence(_dictionary[$(this).attr("id")])
                && validateElementExistence(_dictionary[$(this).attr("id")][language])) {
            $("#" + $(this).attr("id")).text(_dictionary[$(this).attr("id")][language]);
        }
    });
}

//Function to change the spans to the corresponding language of the layout page
function changeLayoutSpans(language) {
    $("span").each(function (index) {
        if (validateElementExistence(_dictionary[$(this).attr("id")])
                && validateElementExistence(_dictionary[$(this).attr("id")][language])) {
            $("#" + $(this).attr("id")).text(_dictionary[$(this).attr("id")][language]);
        }
    });
}

//Function to change the inputs to the corresponding language of the layout page
function changeLayoutInputs(language) {
    $("input").each(function (index) {
        if (validateElementExistence(_dictionary[$(this).attr("id")])
                && validateElementExistence(_dictionary[$(this).attr("id")][language])) {
            $("#" + $(this).attr("id")).prop("value",_dictionary[$(this).attr("id")][language]);
            $("#layoutLabel0001").prop("value","").prop("placeholder",_dictionary[$(this).attr("id")][language]);
        }
    });
}

//Function to change language in the onChange trigger of the language dropdownlist
function changeLanguage() {
    var langValue = this.value();
    kendo.culture(this.value());
    var datePickerOptions = {
        format: kendo.culture().calendar.patterns.d
    };

    kendo.ui.progress($("#grid"), true);
    changeLayoutLabels(langValue);
    changeLayoutSpans(langValue);
    changeLayoutInputs(langValue);
    $.getScript("../Scripts/kendo/2014.2.716/messages/kendo.messages." + this.value() + ".js", function () {
        kendo.ui.progress($("#grid"), false);
        if (typeof changeLanguageCall == 'function') {
            changeLanguageCall();
        }
        if (typeof changeDatePickerDateFormat == 'function') {
            changeDatePickerDateFormat(datePickerOptions);
        }
    });
}

//Function to add elements to the dictionary from a string in this form "newItem°es°en|newItem2°es°en"
function addElementToDictionary(sParam) {
    var elementsToAdd = sParam.split("|");
    for (var i = 0; i < elementsToAdd.length; i++) {
        var partsOfElement = elementsToAdd[i].split("°");
        _dictionary[partsOfElement[0]] = {};
        _dictionary[partsOfElement[0]]["es-MX"] = partsOfElement[1];
        _dictionary[partsOfElement[0]]["en-US"] = partsOfElement[2];
    }
}