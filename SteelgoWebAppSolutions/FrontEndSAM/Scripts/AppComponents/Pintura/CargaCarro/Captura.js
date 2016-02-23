
//----------------------------------------CargaCarro---------------------------------------------------------------
IniciarCapturaPinturaCarga();
function IniciarCapturaPinturaCarga() {
    SuscribirEventos();
}

function changeLanguageCall() {
    AjaxObtenerCatalogoClasificacion();
    AjaxObtenerCatalogoPersistencia();
    setTimeout(function () { AjaxPinturaCargaMedioTransporte(); }, 1100); 
        CargarGrid();
        AjaxCargarCamposPredeterminados();  
 
    document.title = _dictionary.PinturaHeaderCargaCarro[$("#language").data("kendoDropDownList").value()];
}
 
function IniciarBacklog() {
    debugger;
  //  SuscribirEventos();
    CargarGridBacklog();
    AjaxCargarCamposPredeterminadosBacklog();
    AjaxCargarSpool(false, 0);
    AjaxObtenerCatalogoClasificacion();
    AjaxObtenerCatalogoPersistencia();
    setTimeout(function () { AjaxPinturaCargaMedioTransporte(); }, 1100);
}

function LimpiarCarro() {
    $("#inputMedioTransporte").val('');
    $("#inputNumeroVeces").val('');
    $("#inputPesoMaximo").val('');
    $("#inputArea").val('');

}

function CargarGrid() {
    $("#grid").kendoGrid({
        edit: function (e) { 
            this.closeCell(); 
        },
        autoBind: true,
        dataSource: { 
            schema: {
                model: {
                    fields: {
                        SpoolID: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Area: { type: "number", editable: false },
                        Peso: { type: "number", editable: false }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 }
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
        editable: true,
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
            { field: "SpoolJunta", title: _dictionary.PinturaCargaSpool[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { field: "SistemaPintura", title: _dictionary.PinturaCargaSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { field: "Area", type: 'number', title: _dictionary.PinturaCargaArea[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { field: "Peso", type: 'number', title: _dictionary.PinturaCargaPeso[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: "", width: "99px" }
        ]
    });
    CustomisaGrid($("#grid"));

}


function eliminarCaptura(e) {
    e.preventDefault(); 
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
        var filterValue = $(e.currentTarget).val();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
         
        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
            iframe: true,
            title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
            visible: false, //the window will not appear before its .open method is called
            width: "400px",
            height: "auto",
            modal: true
        }).data("kendoWindow");
          
        ventanaConfirm.content(_dictionary.CapturaAvanceIntAcabadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

        ventanaConfirm.open().center();

        $("#yesButton").click(function () {
            var dataSource = $("#grid").data("kendoGrid").dataSource;


            if (dataItem.Accion === 1)
            { dataSource.remove(dataItem); }
            else
                dataItem.Accion = 3

            dataSource.sync();

            ImprimirAreaTonelada();
            ventanaConfirm.close();
        });
        $("#noButton").click(function () {
            ventanaConfirm.close();
        });
    }
}

function validarInformacion(row) {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var existe = false;

    for (var i = 0; i < ds._data.length; i++) {
        if (ds._data[i]["SpoolID"] == row.SpoolID && ds._data[i]["Accion"] != 3) {
            existe = true;
            break;
        }
    }
    return existe;
}

function ValidarDatosNuevoCarro(ListaDetalles) {
    var error = false;

    if (ListaDetalles.Nombre == "") {
        displayMessage("Mensajes_error", "Escriba nombre de carro", '2');
        error = true;
    }

    if (ListaDetalles.NumeroVecesUsoMaximo == "" && ListaDetalles.PersistenciaID == 1) {
        displayMessage("Mensajes_error", "Escriba número de veces que puede ser utilizado el carro", '2');
        error = true;
    }

    if (ListaDetalles.PesoMaximo == "") {
        displayMessage("Mensajes_error", "Escriba peso de carro", '2');
        error = true;
    }

    if (ListaDetalles.Area == "") {
        displayMessage("Mensajes_error", "Escriba área de carro", '2');
        error = true;
    }
    return error;
}

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------CargaCarroBackLog-------------------------------------------------
function CargarGridBacklog() {
 
    kendo.ui.Grid.fn.editCell = (function (editCell) {
        return function (cell) {
            cell = $(cell);

            var that = this,
                column = that.columns[that.cellIndex(cell)],
                model = that._modelForContainer(cell),
                event = {
                    container: cell,
                    model: model,
                    preventDefault: function () {
                        this.isDefaultPrevented = true;
                    }
                };

            if (model && typeof this.options.beforeEdit === "function") {
                this.options.beforeEdit.call(this, event);
                if (event.isDefaultPrevented) return;
            }

            editCell.call(this, cell);
        };
    })(kendo.ui.Grid.fn.editCell);
     
    $("#grid[nombre='grid-backlog']").kendoGrid({
        edit: function (e) {
            if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

            }
            else {
                this.closeCell();
            }

        },
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        OrdenImportancia: { type: "number", editable: false },
                        SpoolJunta: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Color: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Nombre: { type: "string", editable: false },
                        Metros2: { type: "number", editable: false },
                        Peso: { type: "number", editable: false },
                        Seleccionado: { type: "bool", editable: false }
                    }
                }
            },
            pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            var modelo = e.model;
        },
        navigatable: false,
        filterable: {
            extra: false
        },
        editable: true,
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
            { field: "OrdenImportancia", title: _dictionary.PinturaCargaBackLogOrdenImportancia[$("#language").data("kendoDropDownList").value()], filterable: true, width: "140px" },
            { field: "SpoolJunta", title: _dictionary.PinturaCargaBackLogSpool[$("#language").data("kendoDropDownList").value()], filterable: true, width: "120px" },
            { field: "SistemaPintura", title: _dictionary.PinturaCargaBackLogSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: true, width: "110px" },
            { field: "Color", title: _dictionary.PinturaCargaBackLogColor[$("#language").data("kendoDropDownList").value()], filterable: true, width: "120px" },
            { field: "Cuadrante", title: _dictionary.PinturaCargaBackLogQuadrant[$("#language").data("kendoDropDownList").value()], filterable: true, width: "140px" },
            { field: "Metros2", title: _dictionary.PinturaCargaBackLogM2[$("#language").data("kendoDropDownList").value()], filterable: true, width: "95px" },
            { field: "Peso", title: _dictionary.PinturaCargaBackLogPeso[$("#language").data("kendoDropDownList").value()], filterable: true, width: "95px" },
            { field: "Nombre", title: _dictionary.PinturaCargaBackLogProyecto[$("#language").data("kendoDropDownList").value()], filterable: true, width: "140px" },
           { field: "Seleccionado", title: _dictionary.PinturaCargaBackLogSeleccionado[$("#language").data("kendoDropDownList").value()], filterable: false, template: '<input type="checkbox" #= Seleccionado ? "checked=checked" : "" # class="chkbx"  ></input>  ', width: "120px" },

        ]
    });

    $("#grid[nombre='grid-backlog'] .k-grid-content").on("change", ":checkbox", function (e) {
        if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#grid[nombre='grid-backlog']").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));
            if ($(this)[0].checked) {
                dataItem.Seleccionado = true;
            }
            else {
                if (dataItem.Status) {
                    dataItem.Seleccionado = true;
                    $(this)[0].checked = true;
                }
                else {
                    dataItem.Seleccionado = false;
                }
            }
            $("#grid[nombre='grid-backlog']").data("kendoGrid").dataSource.sync();
        }
        else {
            if ($(this)[0].checked) {
                $(this)[0].checked = false;
            }
            else {
                $(this)[0].checked = true;
            }
        }
    });
};

function AjaxCargarCamposPredeterminadosBacklog() {

    loadingStart();
    $CargaCarroBackLog.CargaCarroBackLog.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {

        if (data.Cerrar == "No") {
            $('#chkCerrar').attr('checked', false);
        }
        else if (data.Cerrar == "Si") {
            $('#chkCerrar').attr('checked', true);
        }

        loadingStop();
    });
}

function AjaxCargarSpool(cargarSpoolsDespuesDeCargar, MedioTransporteCargaID) {
    loadingStart();

    if (MedioTransporteCargaID == 0 && $('#inputCarro').val() != "") MedioTransporteCargaID = $('#inputCarro').val();

    $CargaCarroBackLog.CargaCarroBackLog.read({ medioTransporteID: MedioTransporteCargaID, token: Cookies.get("token") }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;

        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }

        if (cargarSpoolsDespuesDeCargar) {
            opcionHabilitarView(true, "FieldSetView");
        }


        loadingStop();
    });
}
