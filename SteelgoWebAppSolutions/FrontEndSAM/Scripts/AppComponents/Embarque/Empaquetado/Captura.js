var ventanaAgregarPaquetePopup;
var EmbarquePlanaID = 0;
var ventanaPopup;
IniciarCapturaEmpaquetadoCarga();

function IniciarCapturaEmpaquetadoCarga()
{
    SuscribirEventos();
   // setTimeout(function () { AjaxEmbarqueCargaProveedores(); }, 1000);
    setTimeout(function () { AjaxCargarCamposPredeterminados(); }, 2000);
    setTimeout(function () { CrearPopup(); }, 2200);
    setTimeout(function () { CrearPaquetePopup(); }, 2300);
    setTimeout(function () { AjaxCargarCuadrante(0); }, 2400);
}

if ($("#inputHiddenEmbarquePlanaID").val() != null && $("#inputHiddenEmbarquePlanaID").val() != undefined && $("#inputHiddenEmbarquePlanaID").val() != "0") {
    EmbarquePlanaID = $("#inputHiddenEmbarquePlanaID").val();
}
else {
    EmbarquePlanaID = 0;

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

function changeLanguageCall() {
    CargarGrid();
    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").value("");
    //$("#lblEstatus").text("");
    $("#lblEmbarqueEmpaquetadoTotalPiezas").text("");
    $("#lblEmbarqueEmpaquetadoToneladasCargadas").text("");
   // $("#inputEmbarqueEmpaquetadoPLacaPlana").data("kendoComboBox").value("");
   // $("#inputProveedor").data("kendoComboBox").value("");
    document.title = _dictionary.lblEmpaquetado[$("#language").data("kendoDropDownList").value()];
    $('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    $("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    opcionHabilitarView(false, "FieldSetView")
};

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


function ExistenSeleccionados(ds) {
    for (var i = 0; i < ds.length; i++) {
        if (ds[i].Seleccionado) {
            return true;
        }
    }
    return false;
}

function CrearPaquetePopup() {
    ventanaAgregarPaquetePopup = $("#ventanaPaquetePopup").kendoWindow({
        title: _dictionary.EmbarqueCargaTituloPopupPaquete[$("#language").data("kendoDropDownList").value()],
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
            schema: {
                model: {
                    fields: {
                        OrdenTrabajoSpoolID: { type: "string", editable: false },
                        SpoolID: { type: "string", editable: false },
                        NumeroControl: { type: "string", editable: false },
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
            { field: "Consecutivo", title: _dictionary.EmbarqueCargaHeaderConsecutivo[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { field: "NumeroControl", title: _dictionary.EmbarqueCargaHeaderSpool[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { field: "Paquete", title: _dictionary.EmbarqueCargaHeaderPaquete[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { field: "Seleccionado", title: " ", filterable: { multi: true, dataSource: [{ Seleccionado: true }, { Seleccionado: false }] }, template: '<input type="checkbox" #= Seleccionado ? "checked=checked" : "" # class="chkbx"  ></input>  ', width: "150px" },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: "", width: "99px" }
        ]
    });
    CustomisaGrid($("#grid"));

    $("#grid .k-grid-content").on("change", "input.chkbx", function (e) {
        if ($("#language").val() == "es-MX") {
            if ($('#Guardar').text() != "Editar"/* && $("#lblEstatus").text().toLowerCase() != "cerrada"*/) {
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
            if ($('#Guardar').text() != "Edit" /*&& $("#lblEstatus").text().toLowerCase() != "closed"*/) {
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

function AsignarValorPaqueteASinPaquete() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var asigando = false;
    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    var embarquePaqueteID;
    var indice = 0;
    for (var i = 0; i < ds._data.length; i++) {
        if (ds._data[i]["Seleccionado"] && ds._data[i]["NumeroControl"] != "") {
            for (var j = 0; j < ds._data.length; j++) {
                if (ds._data[j]["Seleccionado"] && ds._data[j]["Paquete"] == "") {
                    ListaDetalles[indice] = { Accion: "", SpoolID: "", CuadranteID: "" };
                    ListaDetalles[indice].Accion = 1;
                    ListaDetalles[indice].SpoolID = ds._data[j].SpoolID;
                    ListaDetalles[indice].CuadranteID = ds._data[j].CuadranteID;
                    ds._data[j]["Paquete"] = ds._data[i]["Paquete"];
                    ds._data[j]["EmbarquePaqueteID"] = ds._data[i]["EmbarquePaqueteID"];
                    embarquePaqueteID = ds._data[i]["EmbarquePaqueteID"];
                    asigando = true;
                    indice++;
                }
            }
            Captura[0].Detalles = ListaDetalles;

            $CargaEmbarque.CargaEmbarque.create(Captura[0], { token: Cookies.get("token"), EmpaquetadoPaqueteID: embarquePaqueteID }).done(function (data) {
                if (data.Folio != "error") {

                    AjaxCargarPaquetes();
                    displayMessage("EmbarqueCargaCuadranteActualizado", "", '1');
                }
                else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                    displayMessage("EmbarqueCargaErrorCuadranteActualizado", "", '3');
                }
                $("#grid").data("kendoGrid").dataSource.sync();
                loadingStop();
            });


            break;
        }
    }

    ds.sync();

    if (!asigando)
        return false;
    return true;
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

function eliminarCaptura(e) {
    e.preventDefault();
    if ($("#language").val() == "es-MX") {
        if ($('#Guardar').text() != "Editar" /*&& $("#lblEstatus").text().toLowerCase() != "cerrada"*/) {
            dataItemSeleccionadoPopup = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
            ventanaPopup.open().center();

            var cmbPopupCuadrante = $("#inputPopupCuadrante").data("kendoComboBox");
            cmbPopupCuadrante.value(dataItemSeleccionadoPopup.CuadranteID);
            $("#inputPopupPaqueteID").text(dataItemSeleccionadoPopup.EmbarquePaqueteID);
            $("#inputPopupSpoolID").text(dataItemSeleccionadoPopup.SpoolID);
        }
    }
    else {
        if ($('#Guardar').text() != "Edit" /*&& $("#lblEstatus").text().toLowerCase() != "closed"*/) {
            dataItemSeleccionadoPopup = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

            ventanaPopup.open().center();

            var cmbPopupCuadrante = $("#inputPopupCuadrante").data("kendoComboBox");
            cmbPopupCuadrante.value(dataItemSeleccionadoPopup.CuadranteID);
            $("#inputPopupPaqueteID").text(dataItemSeleccionadoPopup.EmbarquePaqueteID);
            $("#inputPopupSpoolID").text(dataItemSeleccionadoPopup.SpoolID);
        }
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
