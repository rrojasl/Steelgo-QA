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

    $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token"), TipoConsulta: ListaDetalles[index].TipoConsulta, OrdenTrabajoSpoolID: ListaDetalles[index].OrdenTrabajoSpoolID, Codigo: ListaDetalles[index].Codigo, lenguaje: $("#language").val() }).done(function (data) {

        var ds = $("#grid").data("kendoGrid").dataSource;

        var array = data;
        var totalToneladasCargadas = 0;
        var totalAreaCargada = 0;


        for (var i = 0; i < array.length; i++) {
            totalAreaCargada += array[i]["AreaSpool"];
            totalToneladasCargadas += array[i]["ToneladasSpool"]
            ds.add(array[i]);
        }

        $("#labelM2").text(totalAreaCargada);
        $("#labelToneladas").text(totalToneladasCargadas);

        loadingStop();
    });
}
