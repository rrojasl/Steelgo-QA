function AjaxObtenerSpoolID() {
    $CapturaArmado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
        $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
        Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });

    });
}

function AjaxCargarPaquetes() {
    loadingStart();
    $CargaEmbarque.CargaEmbarque.read({ token: Cookies.get("token"), tipo: '1' }).done(function (data) {
        if (data.length > 0) {
            $("#inputPaquete").data("kendoComboBox").value("");
            $("#inputPaquete").data("kendoComboBox").dataSource.data(data);
        } 
        loadingStop();
    });
}


function AjaxCargarCamposPredeterminados() {
    loadingStart();
    $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: 33 }).done(function (data) {
        if (data.toLowerCase() == "spool") {
            $('input:radio[name=RevisionEmbarqueTipoSeleccion]:nth(0)').attr('checked', true).trigger("change");
        } else if (data.toLowerCase() == "paquete") {
            $('input:radio[name=RevisionEmbarqueTipoSeleccion]:nth(1)').attr('checked', true).trigger("change");

        } else if (data.toLowerCase() == "codigo") {
            $('input:radio[name=RevisionEmbarqueTipoSeleccion]:nth(2)').attr('checked', true).trigger("change");
        }

        loadingStop();
    });

}

function ajaxBuscar() {
    loadingStart();
    $RevisionEmbarque.RevisionEmbarque.read({ token: Cookies.get("token"), embarquePlanaID: $("#inputEmbarqueBuscar").val(), lenguaje: $("#language").val() }).done(function (data) {
        if (data.length > 0) {
            $("#grid").data("kendoGrid").dataSource.data([]);
            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = data;
            for (var i = 0; i < array.length; i++) {
                ds.add(array[i]);
            }
        };
        loadingStop();
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

    $RevisionEmbarque.RevisionEmbarque.read({ token: Cookies.get("token"), TipoConsulta: ListaDetalles[index].TipoConsulta, OrdenTrabajoSpoolID: ListaDetalles[index].OrdenTrabajoSpoolID, Paquete: ListaDetalles[index].Paquete, Codigo: ListaDetalles[index].Codigo, lenguaje: $("#language").val(), embarquePlanaID: (EmbarquePlanaID == 0 ? $("#inputEmbarqueBuscar").val() : EmbarquePlanaID) }).done(function (data) {

        var ds = $("#grid").data("kendoGrid").dataSource;

        var array = data;

        for (var i = 0; i < array.length; i++) {
            if (!validarInformacion(array[i])) {
                ds.add(array[i]);
            }
            else
                displayMessage("EmbarqueCargaInformacionExistente", "", '2');
        }

        loadingStop();
    });
}

function validarOpcionSeleccionada(row)
{
    if (row.Llego || row.NoLlego || row.LlegoComentarios)
        return true;
    return false;
}


function ajaxGuardar(arregloCaptura) {
    try {
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];
        var row = 0;
        for (index = 0; index < arregloCaptura.length; index++) {
            if (validarOpcionSeleccionada(arregloCaptura[index])) {
                ListaDetalles[row] = { EmbarquePlanaID: "", SpoolID: "", EmbarquePaqueteID: "", Llego: "", NoLlego: "", LlegoConComentarios: "", LlegoMas: "", Comentario: "" };
                ListaDetalles[row].EmbarquePlanaID = EmbarquePlanaID ==0 ? $("#inputEmbarqueBuscar").val() : EmbarquePlanaID;
                ListaDetalles[row].SpoolID = arregloCaptura[index].SpoolID;
                ListaDetalles[row].EmbarquePaqueteID = arregloCaptura[index].EmbarquePaqueteID;
                ListaDetalles[row].Llego = arregloCaptura[index].Llego;
                ListaDetalles[row].NoLlego = arregloCaptura[index].NoLlego;
                ListaDetalles[row].LlegoConComentarios = arregloCaptura[index].LlegoComentarios;
                ListaDetalles[row].LlegoMas = arregloCaptura[index].LlegoMas;
                ListaDetalles[row].Comentario = arregloCaptura[index].Comentario;
                row++;
            }
        }
        if (ListaDetalles.length > 0) {
            Captura[0].Detalles = ListaDetalles;

            $RevisionEmbarque.RevisionEmbarque.update(Captura[0], { token: Cookies.get("token") }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                    displayMessage("EmbarqueRevisionGuardar", "", '1');
                    ajaxBuscar();
                }
                else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                    displayMessage("EmbarqueRevisionErrorGuardar", "", '2');
                    opcionHabilitarView(false, "FieldSetView")
                }
                $("#grid").data("kendoGrid").dataSource.sync();
                loadingStop();
            });

            return true;
        }
        else {
            displayMessage("EmbarqueRevisionNoSeleccionaOpcion", "", '2');
            loadingStop();
        }
    } catch (e) {
        loadingStop();
        displayMessage("Mensajes_error", e.message, '0');
    }
}


function AjaxCargarEmbarques() {
    loadingStart();
    $RevisionEmbarque.RevisionEmbarque.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (data.length > 0) {
            $("#inputEmbarqueBuscar").data("kendoComboBox").value("");
            $("#inputEmbarqueBuscar").data("kendoComboBox").dataSource.data(data);
        }
        loadingStop();
    });
}

