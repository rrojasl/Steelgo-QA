function AjaxEmbarqueCargaProveedores() {
    loadingStart();

    $Embarque.Embarque.read({ token: Cookies.get("token") }).done(function (data) {
        if (data.length > 0) {
            $("#inputProveedor").data("kendoDropDownList").value("");
            $("#inputProveedor").data("kendoDropDownList").dataSource.data(data);
            $("#inputProveedor").data("kendoDropDownList").trigger("change");
            AjaxCargarPaquetes();
        } else {
            $("#inputProveedor").data("kendoDropDownList").value("");
        };
        loadingStop();
    });
}

function AjaxCargarPlanasPlacas() {
    loadingStart();

    $CargaEmbarque.CargaEmbarque.read({ token: Cookies.get("token"), transportistaID: $("#inputProveedor").val() }).done(function (data) {
        if (data.length > 0) {
            $("#inputEmbarqueCargaPLacaPlana").data("kendoDropDownList").value("");
            $("#inputEmbarqueCargaPLacaPlana").data("kendoDropDownList").dataSource.data(data);
        } else {
            $("#inputEmbarqueCargaPLacaPlana").data("kendoDropDownList").value("");
        };
        loadingStop();
    });
}

function AjaxCargarPaquetes() {
    loadingStart();

    $CargaEmbarque.CargaEmbarque.read({ token: Cookies.get("token"), tipo: '1' }).done(function (data) {
        if (data.length > 0) {
            $("#inputPaquete").data("kendoDropDownList").value("");
            $("#inputPaquete").data("kendoDropDownList").dataSource.data(data);
        } else {
            $("#inputEmbarqueCargaPLacaPlana").data("kendoDropDownList").value("");
        };
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

    ListaDetalles[index] = { TipoConsulta: "", OrdenTrabajoSpoolID: "", Paquete: "", Codigo: "" };
    ListaDetalles[index].TipoConsulta = ObtenerTipoConsulta();
    switch (ListaDetalles[index].TipoConsulta) {
        case 1: //spool
            ListaDetalles[index].OrdenTrabajoSpoolID = $("#InputID").val();
            ListaDetalles[index].Paquete = 0;
            ListaDetalles[index].Codigo = 0;
            break;//paquete
        case 2:
            ListaDetalles[index].OrdenTrabajoSpoolID = 0;
            ListaDetalles[index].Paquete = $("#inputPaquete").val();
            ListaDetalles[index].Codigo = 0;
            break;
        case 3://codigo
            ListaDetalles[index].OrdenTrabajoSpoolID = 0;
            ListaDetalles[index].Paquete = 0;
            ListaDetalles[index].Codigo = $("#inputCodigo").val();
            break;
        case -1:
            ListaDetalles[index].OrdenTrabajoSpoolID = 0;
            ListaDetalles[index].Paquete = 0;
            ListaDetalles[index].Codigo = 0;
            break;

    }

    $CargaEmbarque.CargaEmbarque.read({ token: Cookies.get("token"), TipoConsulta: ListaDetalles[index].TipoConsulta, OrdenTrabajoSpoolID: ListaDetalles[index].OrdenTrabajoSpoolID, Paquete: ListaDetalles[index].Paquete, Codigo: ListaDetalles[index].Codigo, lenguaje: $("#language").val() }).done(function (data) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        var totalToneladasCargadas = 0;
        var totalToneladasCargadasGeneral = 0;

        if (!validarInformacion(array)) {
            for (var i = 0; i < array.length; i++) {
                totalToneladasCargadas += array[i]["Peso"]
                ds.add(array[i]);
            }

            var piezas = $("#EmbarqueCargaTotalPiezas").text().split(':')[0];
            piezas += ":" + String(ds._data.length);
            $("#EmbarqueCargaTotalPiezas").text(piezas);

            var textoToneladasCargadas = $("#EmbarqueCargaToneladasCargadas").text().split(':')[0];
            totalToneladasCargadasGeneral += $("#EmbarqueCargaToneladasCargadas").text().split(':')[1] == "" ? 0 : parseInt($("#EmbarqueCargaToneladasCargadas").text().split(':')[1]);
            textoToneladasCargadas += ":" + String(totalToneladasCargadasGeneral + totalToneladasCargadas);

            $("#EmbarqueCargaToneladasCargadas").text(textoToneladasCargadas);

        }
        else
            displayMessage("EmbarqueCargaInformacionExistente", "", '2');

       
        loadingStop();
    });
}

function AjaxCargarCamposPredeterminados() {
    loadingStart();
    $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: 32 }).done(function (data) {
        if (data.toLowerCase() == "spool") {
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(0)').attr('checked', true).trigger("change");
        } else if (data.toLowerCase() == "paquete") {
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(1)').attr('checked', true).trigger("change");

        } else if (data.toLowerCase() == "codigo") {
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(2)').attr('checked', true).trigger("change");
        }

        loadingStop();
    });

}