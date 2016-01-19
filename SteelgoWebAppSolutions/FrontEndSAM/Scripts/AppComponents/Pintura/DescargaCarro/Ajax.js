function AjaxCargarCuadrante(area) {
    loadingStart();
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), AreaID: area }).done(function (data) {
        $("#inputCuadrante").data("kendoDropDownList").value("");
        $("#inputCuadrante").data("kendoDropDownList").dataSource.data(data);
        loadingStop();
    });
}

function AjaxPinturaDescargaMedioTransporte() {
    loadingStart();

    $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), idMedioTransporteCarga: 0 }).done(function (data) {
        if (data.length > 0) {
            $("#inputCarro").data("kendoDropDownList").value("");
            $("#inputCarro").data("kendoDropDownList").dataSource.data(data);
            $("#inputCarro").data("kendoDropDownList").trigger("change");
        } else {
            $("#inputCarro").data("kendoDropDownList").value("");
        };
        loadingStop();
    });
}

function ajaxObtenerDetalleMedioTransporteID(MedioTransporteCargaID)
{
    $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), idMedioTransporteCarga: MedioTransporteCargaID }).done(function (data) {
        if (data.length > 0) {
            $("#grid").data("kendoGrid").dataSource.data([]);
            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = data;
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
        $MedioTransporte.MedioTransporte.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
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