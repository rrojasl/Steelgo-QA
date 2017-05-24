function AjaxZona() {
    loadingStart();
    $IntermedioAcabado.IntermedioAcabado.read({ token: Cookies.get("token"), procesoPintura: $('input:radio[name=ProcesoPintura]:checked').val() }).done(function (data) {
        if (Error(data)) {
            $("#inputZona").data("kendoComboBox").value("");
            $("#inputZona").data("kendoComboBox").dataSource.data(data);
            if (data.length == 2) {
                $("#inputZona").data("kendoComboBox").select(1);
                AjaxCuadrante(data[1].ZonaID)
            }
        }
        loadingStop();
    });
}

function AjaxCuadrante(zonaID) {
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), ZonaID: zonaID,procesoPintura: $('input:radio[name=ProcesoPintura]:checked').val() }).done(function (data) {
        var cuadranteid = 0;
        if (data.length > 0) {
            $("#inputCuadrante").data("kendoComboBox").dataSource.data(data);
        }

        loadingStop();
    });
}



function AjaxSistemaPintura(zonaID, cuadranteID) {
    loadingStart();
    $IntermedioAcabado.IntermedioAcabado.read({ token: Cookies.get("token"), ZonaID: zonaID, CuadranteID: cuadranteID, procesoPintura: $('input:radio[name=ProcesoPintura]:checked').val(), lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            $("#inputSistemaPintura").data("kendoComboBox").value("");
            $("#inputSistemaPintura").data("kendoComboBox").dataSource.data(data);
            if (data.length == 2) {
                
                $("#inputSistemaPintura").data("kendoComboBox").select(1);
                $("#inputSistemaPintura").data("kendoComboBox").trigger("change");
            }
        }
        loadingStop();
    });
}

function AjaxColores(zonaID, cuadranteID, sistemaPinturaID) {
    loadingStart();
    $IntermedioAcabado.IntermedioAcabado.read({ token: Cookies.get("token"), SistemaPinturaID: sistemaPinturaID, lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            $("#inputColor").data("kendoComboBox").value("");
            $("#inputColor").data("kendoComboBox").dataSource.data(data);
        }
        loadingStop();
    });
}

function AjaxCargaMostrarPredeterminadoseleciconProcesosPintura() {
    var TipoMuestraPredeterminadoID = 4076;
    var procesoid = 0;

    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "shotblast") {
            $('input:radio[name=ProcesoPintura]:nth(0)').trigger("click");
        }
        else if (data == "primario") {
            $('input:radio[name=ProcesoPintura]:nth(1)').trigger("click");
        }
        else if (data == "intermedio") {
            $('input:radio[name=ProcesoPintura]:nth(2)').trigger("click");
        }
        else if (data == "acabado") {
            $('input:radio[name=ProcesoPintura]:nth(3)').trigger("click");
        }
       
        loadingStop();
    });
}