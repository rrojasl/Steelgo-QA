
/// <reference path="Captura.js" />
function changeLanguageCall() {
    $("#Area").data("kendoComboBox").value("");
    AjaxCargarArea();
     AjaxObtenerPatios();
     AjaxHerramientas();
     loadingStop();
     Limpiar();
     HablilitarInputs();
};