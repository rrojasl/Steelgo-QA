function AjaxGuardadoMasivo(data) {
    var OK = false;
    CapturaMasiva = [];
    CapturaMasiva[0] = { Detalle: "" };
    CapturaMasiva[0].Detalle = JSON.stringify(data);
    var proyectoID = $("#Proyecto").data("kendoComboBox").value();
    //--------MANDO OPC PARA EJECUTAR EL IF DEL STORE CUANDO SEA OK PND----------//
    $OK.OK.create(CapturaMasiva[0], { lenguaje: $("#language").val(), token: Cookies.get("token"), OPC: '1' }).done(function (data) {
        if (Error(data)) {
            download(data, "ResultadoCargaMasiva.csv", "text/csv");
            displayNotify("MensajeGuardadoExistoso", "", "0");
            OK = true;
        }
    });
    return OK;
};
