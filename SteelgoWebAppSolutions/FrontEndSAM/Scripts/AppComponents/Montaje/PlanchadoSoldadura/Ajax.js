function AjaxGuardadoMasivo(data) {
    var OK = false;
    CapturaMasiva = [];
    CapturaMasiva[0] = { Detalle: "" };
    CapturaMasiva[0].Detalle = JSON.stringify(data);
    
    //--------MANDO OPC PARA EJECUTAR EL IF DEL STORE CUANDO SEA OK PND----------//
    $PlanchadoSoldadura.PlanchadoSoldadura.create(CapturaMasiva[0], { lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            download(data, "ResultadoCargaMasiva.csv", "text/csv");
            displayNotify("MensajeGuardadoExistoso", "", "0");
            OK = true;
        }
    });
    return OK;
};
