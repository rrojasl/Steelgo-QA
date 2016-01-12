function AjaxPinturaCargaMedioTransporte() {
    loadingStart();

    $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (data.length > 0) {
            $("#inputCarro").data("kendoDropDownList").value("");
            $("#inputCarro").data("kendoDropDownList").dataSource.data(data);



        } else {
            $("#inputCarro").data("kendoDropDownList").value("");
        };
        loadingStop();
    });
}

function AjaxCargarCamposPredeterminados() {
    loadingStart();
    $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: 34 }).done(function (data) {
        if (data.toLowerCase() == "spool") {
            $('input:radio[name=PinturaCargaTipoSeleccion]:nth(0)').attr('checked', true).trigger("change");
        }
        else if (data.toLowerCase() == "codigo") {
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(1)').attr('checked', true).trigger("change");
        }

        loadingStop();
    });

}

function AjaxObtenerSpoolID() {
    $CapturaArmado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
        $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
        Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
    });
}


function AjaxAgregarCarga() {
    loadingStart();

    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];

    var index = 0;

    ListaDetalles[index] = { TipoConsulta: "", OrdenTrabajoSpoolID: "", Codigo: "" };
    ListaDetalles[index].TipoConsulta = ObtenerTipoConsulta();
    switch (ListaDetalles[index].TipoConsulta) {
        case 1: //spool
            ListaDetalles[index].OrdenTrabajoSpoolID = $("#InputID").val();
            ListaDetalles[index].Codigo = 0;
            break;//paquete
        case 2://codigo
            ListaDetalles[index].OrdenTrabajoSpoolID = 0;
            ListaDetalles[index].Codigo = $("#inputCodigo").val();
            break;
        case -1:
            ListaDetalles[index].OrdenTrabajoSpoolID = 0;
            ListaDetalles[index].Codigo = 0;
            break;

    }

    $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token"), TipoConsulta: ListaDetalles[index].TipoConsulta, OrdenTrabajoSpoolID: ListaDetalles[index].OrdenTrabajoSpoolID, Codigo: ListaDetalles[index].Codigo, lenguaje: $("#language").val(), medioTransporteID: $("#inputCarro").val() }).done(function (data) {

        var ds = $("#grid").data("kendoGrid").dataSource;
        var carDataSourceSelected = $("#inputCarro").data("kendoDropDownList").dataItem($("#inputCarro").data("kendoDropDownList").select())
        var array = data;

        if (array.length > 0) {

            for (var i = 0; i < array.length; i++) {
                if (!validarInformacion(array[i])) {
                    if (carDataSourceSelected.AreaPermitidoMedioTransporte > (SumarArea() + array[i].Area))
                        if (carDataSourceSelected.PesoMaximoPermitido > (SumarTonelada() + array[i].Peso))
                            ds.add(array[i]);
                        else {
                            displayMessage("PinturaCargaSpoolToneladaSuperiorPermididoCarro", "", '2');
                        }
                    else {
                        displayMessage("PinturaCargaSpoolAreaSuperiorPermididoCarro", "", '2');
                    }

                }
            }

            ImprimirAreaTonelada();
        } else
            displayMessage("PinturaCargaSpoolNoEncontrado", "", '2');


        loadingStop();
    });
}

function ImprimirAreaTonelada() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var array = ds._data;
    var totalAreaCargada = 0;
    var totalToneladasCargadas = 0;
    for (var i = 0; i < array.length; i++) {
        totalAreaCargada += array[i]["Area"];
        totalToneladasCargadas += array[i]["Peso"];
    }
    $("#labelM2").text(totalAreaCargada);
    $("#labelToneladas").text(totalToneladasCargadas);
    return totalAreaCargada;
}

function SumarArea() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var array = ds._data;
    var totalAreaCargada = 0;
    for (var i = 0; i < array.length; i++) {
        totalAreaCargada += array[i]["Area"];
    }

    return totalAreaCargada;
}


function SumarTonelada() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var array = ds._data;
    var totalToneladasCargadas = 0;
    for (var i = 0; i < array.length; i++) {

        totalToneladasCargadas += array[i]["Peso"];
    }

    return totalToneladasCargadas;
}

function ajaxGuardar(arregloCaptura) {
    try {
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];



        for (index = 0; index < arregloCaptura.length; index++) {
            ListaDetalles[index] = { SpoolID: "", Accion:"" };
            ListaDetalles[index].Accion = arregloCaptura[index].Accion;
            ListaDetalles[index].SpoolID = arregloCaptura[index].SpoolID;
        }


        Captura[0].Detalles = ListaDetalles;
        $MedioTransporte.MedioTransporte.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val(), medioTransporteID: $("#inputCarro").val(), cerrar: 0 }).done(function (data) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                displayMessage("PinturaGuardarGuardar", "", '1');
            }
            else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                displayMessage("PinturaGuardarErrorGuardar", "", '2');
            }

            $("#grid").data("kendoGrid").dataSource.sync();
            loadingStop();
        });
    } catch (e) {
        loadingStop();
        displayMessage("Mensajes_error", e.message, '0');

    }
};