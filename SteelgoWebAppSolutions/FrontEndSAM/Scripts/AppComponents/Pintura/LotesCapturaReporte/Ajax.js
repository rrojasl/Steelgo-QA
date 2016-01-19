function AjaxCargarSistemaPintura()
{
    //El id es para identificar que es sistema pintura
    loadingStart();
    $LotesCapturaReporte.LotesCapturaReporte.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), tipo: 1 }).done(function (data) {
        $("#inputSistemaPintura").data("kendoDropDownList").value("");
        $("#inputSistemaPintura").data("kendoDropDownList").dataSource.data(data);
        loadingStop();
    });
}

function AjaxCargarLotes()
{

    //El id es para identificar que es por lotes
    loadingStart();
    $LotesCapturaReporte.LotesCapturaReporte.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), tipo: 2 }).done(function (data) {
        $("#inputLote").data("kendoDropDownList").value("");
        $("#inputLote").data("kendoDropDownList").dataSource.data(data);
        loadingStop();
    });
}

function AjaxBuscarSpool()
{
    loadingStart();
    $LotesCapturaReporte.LotesCapturaReporte.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), sistemaPinturaID: $("#inputSistemaPintura").val(), lotePinturaID: $("#inputLote").val() }).done(function (data) {
        $("#grid").data("kendoGrid").dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
        loadingStop();
    });
}

function ajaxGuardar(arregloCaptura)
{
    loadingStart();
    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];



    for (index = 0; index < arregloCaptura.length; index++) {
        ListaDetalles[index] = { PruebasSpoolID: "", SpoolID: "", CapturaPrueba: ""};
        ListaDetalles[index].PruebasSpoolID = arregloCaptura[index].PruebasSpoolID;
        ListaDetalles[index].SpoolID = arregloCaptura[index].SpoolID;
        ListaDetalles[index].CapturaPrueba = arregloCaptura[index].CapturaPrueba;
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
}