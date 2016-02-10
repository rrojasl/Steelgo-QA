function AjaxCargarCuadrante(area) {
    loadingStart(); 
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), AreaID: area }).done(function (data) { 
        $("#inputCuadrante").data("kendoComboBox").value("");
        $("#inputCuadrante").data("kendoComboBox").dataSource.data(data);

        $("#inputCuadrantePopup").data("kendoComboBox").value("");
        $("#inputCuadrantePopup").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}

function AjaxCargarCarrosCargados() {

    loadingStart(); 
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), cargado: 1 }).done(function (data) {
        $("#inputCarro").data("kendoComboBox").value("");
        $("#inputCarro").data("kendoComboBox").setDataSource(data); 
        loadingStop();
    });
}
  
function ajaxObtenerDetalleMedioTransporteID(MedioTransporteCargaID)
{ 
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), medioTransporteCargaID: MedioTransporteCargaID, lenguaje: $("#language").val() }).done(function (data) {
 
        if (data.listaCapturaAvance.length > 0) {
            $("#grid").data("kendoGrid").dataSource.data([]);
            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = data.listaCapturaAvance;
            for (var i = 0; i < array.length; i++) {
                ds.add(array[i]);
            }
        } else {
        };
        loadingStop();
    });
}

function ajaxGuardar(arregloCaptura) {
    try {
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];
         
        for (index = 0; index < arregloCaptura.length; index++) {
            ListaDetalles[index] = { SpoolID: "", Accion: "", medioTransporteID: "", CuadranteID:"" };
            ListaDetalles[index].Accion = arregloCaptura[index].Accion;
            ListaDetalles[index].SpoolID = arregloCaptura[index].SpoolID;
            ListaDetalles[index].medioTransporteID = arregloCaptura[index].MedioTransporteID; 
            ListaDetalles[index].CuadranteID = arregloCaptura[index].CuadranteID;
        }
         
        Captura[0].Detalles = ListaDetalles;
 
        $MedioTransporte.MedioTransporte.create(Captura[0], { medioTransporteCargaID: arregloCaptura[0].MedioTransporteCargaID, token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                displayMessage("PinturaGuardarDescarga", "", '1');
                AjaxCargarCarrosCargados();
                opcionHabilitarView(true, "FieldSetView");

            }
            else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                displayMessage("PinturaGuardarErrorDesGuardar", "", '2');
            }

            $("#grid").data("kendoGrid").dataSource.sync();
            loadingStop();
        });
    } catch (e) {
        loadingStop();
        displayMessage("Mensajes_error", e.message, '0');
    }
};

function ajaxAplicarDescarga(arregloCaptura) {
    try { 
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];
        var index = 0;
        ListaDetalles[index] = { SpoolID: "", Accion: "", medioTransporteID: "", CuadranteID: "" };
        ListaDetalles[index].Accion = arregloCaptura.Accion;
        ListaDetalles[index].SpoolID = arregloCaptura.SpoolID; 
        ListaDetalles[index].CuadranteID = $("#inputCuadrante").val();
        Captura[0].Detalles = ListaDetalles;

        $MedioTransporte.MedioTransporte.create(Captura[0], { medioTransporteCargaID: $("#inputCarro").val(), token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                ajaxObtenerDetalleMedioTransporteID($("#inputCarro").data("kendoComboBox").value());
                displayMessage("PinturaGuardarDescarga", "", '1');
            }
            else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                displayMessage("PinturaGuardarErrorDesGuardar", "", '2');
            }

            $("#grid").data("kendoGrid").dataSource.sync();
            loadingStop();
        });
    } catch (e) {
        loadingStop();
        displayMessage("Mensajes_error", e.message, '0');

    }
};