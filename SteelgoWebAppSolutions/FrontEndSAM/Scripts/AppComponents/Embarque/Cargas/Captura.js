var ventanaPopup;
var ventanaAgregarPaquetePopup;
var dataItemSeleccionadoPopup;
var EmbarquePlanaID=0;

function changeLanguageCall() {
    CargarGrid();
};

if ($("#inputHiddenEmbarquePlanaID").val() != null && $("#inputHiddenEmbarquePlanaID").val() != undefined && $("#inputHiddenEmbarquePlanaID").val()!="0") {
    EmbarquePlanaID = $("#inputHiddenEmbarquePlanaID").val();
}
else {
    EmbarquePlanaID = 0;
    $('#btnEmbarqueCerrarPlana').attr("disabled", true);
}

IniciarCapturaEmbarqueCarga();

function IniciarCapturaEmbarqueCarga() {
    SuscribirEventos();
    setTimeout(function () { AjaxEmbarqueCargaProveedores(); }, 1000);
    setTimeout(function () { AjaxCargarCamposPredeterminados(); }, 2000);
    setTimeout(function () { CrearPopup(); }, 2200);
    setTimeout(function () { CrearPaquetePopup(); }, 2300);
    setTimeout(function () { AjaxCargarCuadrante(0); }, 2400);
}

function CrearPaquetePopup() {
    ventanaAgregarPaquetePopup = $("#ventanaPaquetePopup").kendoWindow({
        title: _dictionary.EmbarqueCargaTituloPopupPaquete[$("#language").data("kendoDropDownList").value()],
        visible: false, //the window will not appear before its .open method is called
        width: "565px",
        height: "182px",
        modal: true
    }).data("kendoWindow");
}

function CrearPopup() {
    ventanaPopup = $("#ventanaPopup").kendoWindow({
        title: _dictionary.EmbarqueCargaTituloPopupCuadrante[$("#language").data("kendoDropDownList").value()],
        visible: false, //the window will not appear before its .open method is called
        width: "565px",
        height: "182px",
        modal: true
    }).data("kendoWindow");
}

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            schema: {
                model: {
                    fields: {
                        OrdenTrabajoSpoolID: { type: "string", editable: false },
                        SpoolID: { type: "string", editable: false },
                        NumeroControl: { type: "string", editable: false },
                        Paquete: { type: "string", editable: false },
                        EmbarquePaqueteID: { type: "int", editable: false },
                        Peso: { type: "int", editable: false },
                        CuadranteID: { type: "int", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Mensaje: { type: "string", editable: false }
                    }
                }
            },
            pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        filterable: {
            extra: false
        },
        editable: false,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "Consecutivo", title: "Consecutivo", filterable: true },
            { field: "NumeroControl", title: "Spool ID", filterable: true },
            { field: "Paquete", title: "Paquete", filterable: true },
            { field: "Seleccionado", title: " ", filterable: true, template: '<input type="checkbox" #= Seleccionado ? "checked=checked" : "" # class="chkbx"  ></input>  ' },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: "", width: "99px" }
        ]
    });

    $("#grid .k-grid-content").on("change", "input.chkbx", function (e) {
        var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));
        dataItem.set("Seleccionado", this.checked);
    });
};

function eliminarCaptura(e) {
    e.preventDefault();

    dataItemSeleccionadoPopup = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

    if ($('#botonGuardar').text() == "Guardar") {
        ventanaPopup.open().center();
    }

    var cmbPopupCuadrante = $("#inputPopupCuadrante").data("kendoDropDownList");
    cmbPopupCuadrante.value(dataItemSeleccionadoPopup.CuadranteID);
    $("#inputPopupPaqueteID").text(dataItemSeleccionadoPopup.EmbarquePaqueteID);
    $("#inputPopupSpoolID").text(dataItemSeleccionadoPopup.SpoolID);

}

function validarInformacion(row) {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var existe = false;

    for (var i = 0; i < ds._data.length; i++) {

        if (ds._data[i]["NumeroControl"] == row.NumeroControl) {
            existe = true;
            break;
        }


    }
    return existe;
}

function validarExisteSpoolSeleccionadoSinPaquete() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var existe = false;
    if (ds._data.length == 0) {
        displayMessage("EmbarqueCargaSeleccionaSpool", "", '2');
        return true;
    }
    else {
        for (var i = 0; i < ds._data.length; i++) {
            if (ds._data[i]["Seleccionado"] && ds._data[i]["Paquete"] != "") {
                existe = true;
                break;
            }
        }
        if (existe)
            displayMessage("EmbarqueCargaSeTieneEmpaquetado", "", '2');
        return existe;
    }
}

function validarExistaSoloUnpaqueteSeleccionado() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var PaqueteIDSeleccionado;
    var filaConPaqueteSinAsignar = false;
    var contador = 0;
    for (var i = 0; i < ds._data.length; i++) {
        if (ds._data[i]["Seleccionado"]) {
            for (var j = 0; j < ds._data.length; j++) {
                if (ds._data[i]["EmbarquePaqueteID"] != 0 && i != j && ds._data[i]["EmbarquePaqueteID"] != ds._data[j]["EmbarquePaqueteID"] && ds._data[j]["EmbarquePaqueteID"] != 0)
                    contador++;
            }
        }
    }

    if (contador == 0) {//no hay mas de un paquete seleccionado
        for (var i = 0; i < ds._data.length; i++) {
            if (ds._data[i]["Seleccionado"] && ds._data[i]["EmbarquePaqueteID"] == 0) {
                filaConPaqueteSinAsignar = true;
            }
            else if (ds._data[i]["Seleccionado"] && ds._data[i]["EmbarquePaqueteID"] != 0) {
                filaConPaqueteSinAsignar = false;
                break;
            }
        }

        return (true && !filaConPaqueteSinAsignar);
    }
    return false;
}

function validarSoloSeleccionadoSinPaquete() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var PaqueteIDSeleccionado;
    var contador = 0;
    for (var i = 0; i < ds._data.length; i++) {
        if (ds._data[i]["Seleccionado"] && ds._data[i]["EmbarquePaqueteID"] != 0) {
            return false;
        }
    }
    return true;
}

function AsignarValorPaqueteASinPaquete() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var asigando = false;
    for (var i = 0; i < ds._data.length; i++) {
        if (ds._data[i]["Seleccionado"] && ds._data[i]["NumeroControl"] != "") {
            for (var j = 0; j < ds._data.length; j++) {
                if (ds._data[j]["Seleccionado"] && ds._data[j]["Paquete"] == "") {
                    ds._data[j]["Paquete"] = ds._data[i]["Paquete"];
                    ds._data[j]["EmbarquePaqueteID"] = ds._data[i]["EmbarquePaqueteID"];
                    asigando = true;
                }
            }

            break;
        }
    }

    ds.sync();

    if (!asigando)
        return false;
    return true;
}