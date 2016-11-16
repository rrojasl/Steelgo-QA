﻿var ventanaPopup;

var dataItemSeleccionadoPopup;
var EmbarquePlanaID = 0;

function changeLanguageCall() {
    CargarGrid();
    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").value("");
    $("#lblEstatus").text("");
    $("#lblEmbarqueCargaTotalPiezas").text("");
    $("#lblEmbarqueCargaToneladasCargadas").text("");
    $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value("");
    $("#inputProveedor").data("kendoComboBox").value("");
    document.title = "Cargas";
    //$('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    //$("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    opcionHabilitarView(false, "FieldSetView")
};

if ($("#inputHiddenEmbarquePlanaID").val() != null && $("#inputHiddenEmbarquePlanaID").val() != undefined && $("#inputHiddenEmbarquePlanaID").val() != "0") {
    EmbarquePlanaID = $("#inputHiddenEmbarquePlanaID").val();
}
else {
    EmbarquePlanaID = 0;

}

IniciarCapturaEmbarqueCarga();

function IniciarCapturaEmbarqueCarga() {
    SuscribirEventos();
    //setTimeout(function () { AjaxEmbarqueCargaProveedores(); }, 1000);
    //setTimeout(function () { AjaxCargarCamposPredeterminados(); }, 2000);
    //setTimeout(function () { CrearPopup(); }, 2200);
    //setTimeout(function () { AjaxCargarCuadrante(0); }, 2400);
}



function CrearPopup() {
    ventanaPopup = $("#ventanaPopup").kendoWindow({
        title: _dictionary.EmbarqueCargaTituloPopupCuadrante[$("#language").data("kendoDropDownList").value()],
        visible: false, //the window will not appear before its .open method is called
        width: "300px",
        height: "140px",
        modal: true
    }).data("kendoWindow");
}

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        edit: function (e) {
            if ($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
                this.closeCell();
            }
        },
        dataSource: {
            data: [
                {
                    Consecutivo:"1",
                    SpoolID: "X001-001",
                    Paquete: "Paquete 1",
                    Peso:"50"
                }
            ],
            schema: {
                model: {
                    fields: {
                        Consecutivo:{type:"int",editable:false},
                        SpoolID: { type: "string", editable: false },
                        Paquete: { type: "string", editable: false },
                        Seleccionado: { type: "boolean", editable: false },
                        EmbarquePaqueteID: { type: "int", editable: false },
                        Peso: { type: "int", editable: false },
                        CuadranteID: { type: "int", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Mensaje: { type: "string", editable: false }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                    { field: "Accion", operator: "eq", value: 0 },
                    { field: "Accion", operator: "eq", value: 2 },
                    { field: "Accion", operator: "eq", value: undefined }
                ]
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        filterable: getGridFilterableMaftec(),
        editable: false,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25,50, 20],
            info: false,
            input: false,
            numeric: true,
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "Consecutivo", title: _dictionary.columnConcecutivoEmbarque[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "150px" },
            { field: "SpoolID", title: _dictionary.columnSpoolIDEmbarque[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "Paquete", title: _dictionary.columnPaqueteEmbarque[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "Peso", title: _dictionary.columnPesoEmbarque[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "130px", attributes: { style: "text-align:right;" }, format: "{0: }" },
            { command: { text: _dictionary.botonDescarga[$("#language").data("kendoDropDownList").value()] }, title: _dictionary.columnDescargar[$("#language").data("kendoDropDownList").value()], width: "70px", attributes: { style: "text-align:center;" } },
           
        ]
    });
    CustomisaGrid($("#grid"));

    $("#grid .k-grid-content").on("change", "input.chkbx", function (e) {
        if ($("#language").val() == "es-MX") {
            if ($('#Guardar').text() != "Editar" && $("#lblEstatus").text().toLowerCase() != "cerrada") {
                var grid = $("#grid").data("kendoGrid");
                dataItem = grid.dataItem($(e.target).closest("tr"));
                dataItem.set("Seleccionado", this.checked);
                if (this.checked) {
                    dataItem.Seleccionado = true;
                }
                else {
                    dataItem.Seleccionado = false;
                }

                grid.dataSource.sync();
            }
            else {
                var grid = $("#grid").data("kendoGrid");
                if (this.checked) {
                    e.target.checked = false;
                }
                else {
                    e.target.checked = true;
                }
                grid.dataSource.sync();
            }
        }
        else {
            if ($('#Guardar').text() != "Edit" && $("#lblEstatus").text().toLowerCase() != "closed") {
                var grid = $("#grid").data("kendoGrid");
                dataItem = grid.dataItem($(e.target).closest("tr"));
                dataItem.set("Seleccionado", this.checked);
                if (this.checked) {
                    dataItem.Seleccionado = true;
                }
                else {
                    dataItem.Seleccionado = false;
                }

                grid.dataSource.sync();
            }
            else {
                var grid = $("#grid").data("kendoGrid");
                if (this.checked) {
                    this.checked = false;
                }
                else {
                    this.checked = true;
                }
                grid.dataSource.sync();
            }
        }


    });
};

function eliminarCaptura(e) {
    e.preventDefault();
    if ($("#language").val() == "es-MX") {
        if ($('#Guardar').text() != "Editar" && $("#lblEstatus").text().toLowerCase() != "cerrada") {
            dataItemSeleccionadoPopup = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
            ventanaPopup.open().center();

            var cmbPopupCuadrante = $("#inputPopupCuadrante").data("kendoComboBox");
            cmbPopupCuadrante.value(dataItemSeleccionadoPopup.CuadranteID);
            $("#inputPopupPaqueteID").text(dataItemSeleccionadoPopup.EmbarquePaqueteID);
            $("#inputPopupSpoolID").text(dataItemSeleccionadoPopup.SpoolID);
        }
    }
    else {
        if ($('#Guardar').text() != "Edit" && $("#lblEstatus").text().toLowerCase() != "closed") {
            dataItemSeleccionadoPopup = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

            ventanaPopup.open().center();

            var cmbPopupCuadrante = $("#inputPopupCuadrante").data("kendoComboBox");
            cmbPopupCuadrante.value(dataItemSeleccionadoPopup.CuadranteID);
            $("#inputPopupPaqueteID").text(dataItemSeleccionadoPopup.EmbarquePaqueteID);
            $("#inputPopupSpoolID").text(dataItemSeleccionadoPopup.SpoolID);
        }
    }
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



