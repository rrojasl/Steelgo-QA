/********************************************/
/********************************************/
/*********                          *********/
/*********    Utilities Manager     *********/
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
function utilitiesManagerToBeExecutedOnDocumentReady() {
    //CODE
}

/****************************/
/*    Global Functions      */
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

//Function to show or hide the side menu
function toggleSideMenu() {
    if (Cookies.get("navegacion") != null && Cookies.get("navegacion") != "1" && Cookies.get("navegacion") != "2") {
        $("ul").removeClass("open");
        $("i.arrow").removeClass("down");
        $("#sidebar").toggleClass("minified");
        $(".content-container").toggleClass("expanded");
    }
}

//Function to redirect properly with the specified language
function redirectToLanguage(event,link) {
    event.preventDefault();
    window.location.href = link.href + "?leng=" + $("#language").data("kendoDropDownList").value();
}

//Function to remove any grid
function removeGrid(grid) {
    var tmp = [];
    try {
        tmp = grid.data("kendoGrid").dataSource.data() || grid.data("kendoGrid").options.dataSource.data()
    } catch (e) { }
    var contenedor = grid.parent();
    grid.remove();
    contenedor.append("<div id='" + grid.attr("id") + "'></div>");
    return tmp;
}

function messageindexKendoCombobox(obj) {
    if (obj.selectedIndex == -1) {
        var elemento = obj.list.attr("id");
        var index = elemento.indexOf("-");
        var valor = elemento.substring(0, index);

        displayMessage("notificationslabel0083", $("#" + valor).closest("div").find("label").text(), '1');
    };
};

function modificarResultTextoKendoCombobox(id, result, lng) {
    if (result.length > 0) {
        switch (id) {
            case "Tracto":
                if (lng == "es-MX") {
                    result[0].Placas = "Agregar nuevo";
                } else {
                    result[0].Placas = "Add new";
                }
                break;
           default:
                if (lng == "es-MX") {
                    result[0].Nombre = "Agregar nuevo";
                } else {
                    result[0].Nombre = "Add new";
                }
                break;
        }
    };
    return result;
};
function modificartextoKendoCombobox(controls, lng) {
    $(controls).each(function (i, obj) {
        switch ($(obj).attr("id")) {
            case "Tracto":
                if ($(obj).data("kendoComboBox").dataSource.data().length) {
                    if (lng == "es-MX") {
                        $(obj).data("kendoComboBox").dataSource.data()[0].Placas = "Agregar nuevo";
                    } else {
                        $(obj).data("kendoComboBox").dataSource.data()[0].Placas = "Add new";
                    }
                    $(obj).data("kendoComboBox").refresh();
                }
                break;
            case "PlanaID":
                if ($(obj).data("kendoMultiSelect").dataSource.data().length) {
                    if (lng == "es-MX") {
                        $(obj).data("kendoMultiSelect").dataSource.data()[0].Nombre = "Agregar nuevo";
                    } else {
                        $(obj).data("kendoMultiSelect").dataSource.data()[0].Nombre = "Add new";
                    }
                    $(obj).data("kendoMultiSelect").refresh();
                }
                break;
            default:
                if ($(obj).data("kendoComboBox").dataSource.data().length) {
                    if (lng == "es-MX") {
                        $(obj).data("kendoComboBox").dataSource.data()[0].Nombre = "Agregar nuevo";
                    } else {
                        $(obj).data("kendoComboBox").dataSource.data()[0].Nombre = "Add new";
                    }
                    $(obj).data("kendoComboBox").refresh();
                }
                break;

        };

    });
};

function esNumero(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

//Ajusta el tamaño de los filtros rápidos a las columnas del grid
//Funcion: resizeFilters
//Parametros: N/A
//Return:     N/A
/*function resizeFilters() {   
    $("#grid .k-grid-header tr th:visible").each(function (i, obj) {
        var wd = 0;
        wd = $(this).outerWidth(true);
        console.log("th: "+i+" width: "+$(this).outerWidth(true));
        $("#filterContainer > div").find("input").each(function (index, event) {
            if (i == index) {
                $(this).outerWidth(wd + 1.4);
                console.log("qf: " + index + " width: " + $(this).outerWidth(true));
            }
        });
    });
    $(".quickFilters:first-of-type").outerWidth($(".quickFilters:first-of-type").outerWidth() + 0.6);

    $(window).resize(function () {
        $("#grid .k-grid-header tr th").each(function (i, obj) {
            var wd = 0
            wd = $(this).outerWidth(true);
            console.log("th: "+i+" width: "+$(this).outerWidth(true));
            $("#filterContainer > div").find("input").each(function (index, event) {
                if (i == index) {
                    $(this).outerWidth(wd + 1.4);
                    console.log("qf: " + index + " width: " + $(this).outerWidth(true));
                }
            });
        });
        $(".quickFilters:first-of-type").outerWidth($(".quickFilters:first-of-type").outerWidth() + 0.6);
    });
}*/