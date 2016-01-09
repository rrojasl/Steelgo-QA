function AjaxCargarSpool() {
    loadingStart();

    $CargaCarroBackLog.CargaCarroBackLog.read({ token: Cookies.get("token"), embarquePlanaID: 0 }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
        
        loadingStop();
    });
}

function AjaxPinturaCargaMedioTransporte() {
    loadingStart();

    $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        loadingStart();
        $("#inputCarro").data("kendoDropDownList").value("");
        $("#inputCarro").data("kendoDropDownList").dataSource.data(data);
        loadingStop();
    });
}


function AjaxSubirSpool(listaSpool) {
    
    var contSave = 0;
    var medioTransporteID;
    Captura = [];
    Captura[0] = { ListaDetalles: "" };
    ListaDetalles = [];
    for (var index = 0 ; index < listaSpool.length; index++) {
        if (listaSpool[index].Seleccionado) {
            ListaDetalles[contSave] = {
                Spool: "",
                SistemaPintura: ""
            };
            ListaDetalles[contSave].Spool = listaSpool[index].SpoolID;
            ListaDetalles[contSave].SistemaPintura = listaSpool[index].SistemaPintura;
            contSave++;
        }
    }
    var cerrado = 0;
    if ($('#chkCerrar').is(':checked')) {
        cerrado = 1;
    }
    if (ListaDetalles.length != 0) {
        if (ServicioPinturaCorrecto(ListaDetalles)) {
            MedioTransporteID = $("#inputCarro").data("kendoDropDownList").value();
            Captura[0].ListaDetalles = ListaDetalles;

            loadingStart();
            $CargaCarroBackLog.CargaCarroBackLog.create(Captura[0], { token: Cookies.get("token"), medioTransporteID: MedioTransporteID, cerrar: cerrado }).done(function (data) {
                displayMessage("PinturaCargaBackLogMensajeGuardadoExitoso", "", "0");
                AjaxCargarSpool();
                AjaxPinturaCargaMedioTransporte();
                loadingStop();
            });
        }
        else {
            displayMessage("PinturaCargaBackLogMensajeErrorServicioPintura", "", "1");
        }
    }
    else {
        displayMessage("PinturaCargaBackLogMensajeSeleccionaSpool", "", "1");
    }
    

}

function ServicioPinturaCorrecto(ListaDetalles) {
    var sistema;
    for (var i = 0 ; i < ListaDetalles.length ; i++) {
        if (i == 0) {
            sistema = ListaDetalles[0].SistemaPintura;
        }
        if (sistema != ListaDetalles[i].SistemaPintura) {
            return false;
        }
    }
    return true;
}


function AjaxCargarCamposPredeterminados() {

    loadingStart();
    $CargaCarroBackLog.CargaCarroBackLog.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {

        if (data.Cerrar == "No") {
            $('#chkCerrar').attr('checked', false);
        }
        else if (data.Cerrar == "Si") {
            $('#chkCerrar').attr('checked',true);
        }
        
        loadingStop();
    });
}