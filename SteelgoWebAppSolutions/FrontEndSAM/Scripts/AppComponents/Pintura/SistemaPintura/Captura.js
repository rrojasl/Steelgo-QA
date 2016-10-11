var editado = false;
var ListaPruebas = [];
var ListaUnidadMedida = [];
var modeloRenglon;

function changeLanguageCall() {
    var paramReq = getParameterByName('SistemaPinturaID');
    paramReq = paramReq == null ? "" : paramReq;
    $("#inputSistemaPinturaID").val(paramReq);
    setTimeout(function () { AjaxObtenerColor(); }, 100);

    CargarGrid();
    CargarGridPopUp();
    document.title = "Sistema Pintura";

};

function getParameterByName(name, url) {

    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

IniciarSistemaPintura();

function IniciarSistemaPintura() {
    SuscribirEventos();
};

function getParameterByName(name, url) {

    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function SiguienteProceso(paramReq) {
    var url = "";
    if (paramReq == null) {
        url = "/PND/CapturaReporteRT?leng=" + $("#language").data("kendoDropDownList").value();
    } else {
        url = "/PND/CapturaReporteRT?leng=" + $("#language").data("kendoDropDownList").value()
            + "&requisicion=" + paramReq;
    }

    $("#EntregaresultadosSup").attr("href", url);
    $("#EntregaresultadosINF").attr("href", url);
}

function CargarGrid() {
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
    $("#grid").kendoGrid({
        autoBind: true,
        autoSync: true,
        edit: function (e) {

            if ($('#botonGuardar').text() != _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()] || ($("#inputNoAplicable").is(':checked'))) {
                this.closeCell();
            }
        },

        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        Agregar: { type: "boolean", editable: false },
                        Proceso: { type: "string", editable: false },
                        MetrosLote: { type: "number", editable: true },
                        NumeroPruebas: { type: "number", editable: true },
                        Pruebas: { type: "string", editable: false }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 },
                  { field: "Accion", operator: "eq", value: 4 }
                ]
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        selectable: true,

        filterable: getGridFilterableMaftec(),
        columns: [
            {
                field: "Agregar", title: _dictionary.columnAgregar[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                }, template: "<input name='fullyPaid' class='chk-agregar' type='checkbox' data-bind='checked: Agregar' #= Agregar ? checked='checked' : '' #/>", width: "50px", attributes: { style: "text-align:center;" }
            },
            { field: "Proceso", title: "Proceso", filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "MetrosLote", title: "Mts. Lote", filterable: getGridFilterableCellNumberMaftec(), width: "130px", editor: RenderMetrosLote, attributes: { style: "text-align:right;" }, format: "{0: }" },
            { field: "NumeroPruebas", title: "Pbas. lote", filterable: getGridFilterableCellNumberMaftec(), width: "100px",editor: RenderNumeroPruebas, attributes: { style: "text-align:right;" }, format: "{0: }" },
            { field: "Pruebas", title: "Pruebas", template: "<div class='EnlaceDetallePruebas' style='text-align:center;'><a href='\\#/'  > <span>Detalle Pruebas</span></a></div>", filterable: getGridFilterableCellNumberMaftec(), width: "90px" },

        ],
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            if (!isEditable(fieldName, e.model)) {
                e.preventDefault();
            }
        },
    });
    CustomisaGrid($("#grid"));

    $("#grid .k-grid-content").on("change", "input.chk-agregar", function (e) {
        if (!($("#inputNoAplicable").is(':checked'))) {
            if ($("#language").val() == "es-MX") {
                if ($('#Guardar').text() != "Editar") {
                    var grid = $("#grid").data("kendoGrid")
                    dataItem = grid.dataItem($(e.target).closest("tr"));
                    if ($(this)[0].checked) {
                        dataItem.Agregar = true;

                    }
                    else {
                        if (!(dataItem.MetrosLote == 0 && dataItem.NumeroPruebas == 0 && dataItem.listadoPruebasDetalle.length == 0)) {
                            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                                iframe: true,
                                title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                                visible: false, //the window will not appear before its .open method is called
                                width: "auto",
                                height: "auto",
                                modal: true,
                                animation: {
                                    close: false,
                                    open: false
                                }
                            }).data("kendoWindow");

                            ventanaConfirm.content("Se eliminaran los datos del proceso, ¿desea continuar?" +
                                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

                            ventanaConfirm.open().center();



                            $("#yesButton").click(function () {
                                dataItem.Agregar = false;
                                dataItem.MetrosLote = 0;
                                dataItem.NumeroPruebas = 0;
                                dataItem.listadoPruebasDetalle = [];
                                ventanaConfirm.close();
                                $("#grid").data("kendoGrid").dataSource.sync();
                            });
                            $("#noButton").click(function () {
                                ventanaConfirm.close();
                                dataItem.Agregar = true;
                                $(this)[0].checked = true;
                                $("#grid").data("kendoGrid").dataSource.sync();
                            });
                        }
                        else {
                            dataItem.Agregar = false;
                        }

                    }

                }
                else {
                    if ($(this)[0].checked) {
                        $(this)[0].checked = false;
                    }
                    else {
                        $(this)[0].checked = true;
                    }
                }
            }
            else {
                if ($('#Guardar').text() != "Edit") {
                    var grid = $("#grid").data("kendoGrid")
                    dataItem = grid.dataItem($(e.target).closest("tr"));
                    if ($(this)[0].checked) {
                        dataItem.Agregar = true;
                    }
                    else {
                        dataItem.Agregar = false;

                    }
                    $("#grid").data("kendoGrid").dataSource.sync();
                }
                else {
                    if ($(this)[0].checked) {
                        $(this)[0].checked = false;
                    }
                    else {
                        $(this)[0].checked = true;
                    }
                }
            }
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

function isEditable(fieldName, model) {
    if (fieldName === "MetrosLote") {
        if (!model.Agregar)
            return false;

    }
    if (fieldName === "NumeroPruebas") {
        if (!model.Agregar)
            return false;

    }

    return true; // default to editable
}


function cancelarCaptura(e) {
    e.preventDefault();
    var filterValue = $(e.currentTarget).val();
    var dataItem = $("#gridPopUp").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

    ventanaConfirm = $("#ventanaConfirm").kendoWindow({
        iframe: true,
        title: "Peligro",
        visible: false, //the window will not appear before its .open method is called
        width: "auto",
        height: "auto",
        modal: true,
        animation: {
            close: false,
            open: false
        }
    }).data("kendoWindow");

    ventanaConfirm.content("Esta seguro de eliminar la captura?"+//_dictionary.CapturaReporteModificarNoPlacas[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

    ventanaConfirm.open().center();

    $("#yesButton").click(function () {

        var dataSource = $("#gridPopUp").data("kendoGrid").dataSource;
        if (dataItem.Accion == 2) {
            dataItem.Accion = 3;
        }
        else {
            dataSource.remove(dataItem);
        }
        $("#gridPopUp").data("kendoGrid").dataSource.sync();
        ventanaConfirm.close();
    });
    $("#noButton").click(function () {
        ventanaConfirm.close();
    });


}

function limpiarRenglon(e) {
    e.preventDefault();
    if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

        var itemToClean = $("#gridPopUp").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

        if (itemToClean.Accion == 2)
            itemToClean.Accion = 4;

        itemToClean.ProyectoProcesoPrueba = "";
        itemToClean.ProyectoProcesoPruebaID = 0;
        itemToClean.UnidadMedida = "";
        itemToClean.UnidadMedidaID = 0;
        itemToClean.UnidadMinima = 0;
        itemToClean.UnidadMaxima = 0;

        var dataSource = $("#gridPopUp").data("kendoGrid").dataSource;
        dataSource.sync();
        //alert(itemToClean);
    }


}


function CargarGridPopUp() {

    $("#gridPopUp").kendoGrid({
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        Accion: { type: "int", editable: false },
                        Prueba: { type: "string", editable: true },
                        UnidadMedida: { type: "string", editable: true },
                        UnidadMinima: { type: "number", editable: true },
                        UnidadMaxima: { type: "number", editable: true },
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: undefined},
                  { field: "Accion", operator: "eq", value: 2 },
                  { field: "Accion", operator: "eq", value: 4 }
                ]
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false

        },
        pageable: false,
        selectable: true,
        filterable: getGridFilterableMaftec(),

        columns: [
            { field: "ProyectoProcesoPrueba", title: "Prueba", filterable: getGridFilterableCellMaftecpopUp(), width: "120px", editor: comboBoxPruebas },
            { field: "UnidadMedida", title: "U. medida", filterable: getGridFilterableCellMaftecpopUp(), width: "120px", editor: comboBoxUnidadMedida },
            { field: "UnidadMinima", title: "U. min", filterable: getGridFilterableCellNumberMaftec(), width: "50px", editor: RenderUnidadMinima, attributes: { style: "text-align:right;" }, format: "{0: }" },
            { field: "UnidadMaxima", title: "U max", filterable: getGridFilterableCellNumberMaftec(), width: "50px", editor: RenderUnidadMaxima, attributes: { style: "text-align:right;" }, format: "{0: }" },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: cancelarCaptura }, title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()], width: "50px" },
            { command: { text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()], click: limpiarRenglon }, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "50px" }
        ],
        editable: true,
        navigatable: true,
        toolbar: [{ name: "create" }]
    });
    CustomisaGrid($("#gridPopUp"));
};

function LlenarGridPopUp(data) {
    modeloRenglon = data;
    $("#gridPopUp").data('kendoGrid').dataSource.data([]);
    var ds = $("#gridPopUp").data("kendoGrid").dataSource;
    ListaPruebas = data.listadoPruebasProceso;
    ListaUnidadMedida = data.listadoUnidadesMedida;
    var array = data.listadoPruebasDetalle;
    for (var i = 0; i < array.length; i++) {
        ds.add(array[i]);
    }
    VentanaModal();
}



function VentanaModal() {

    var modalTitle = "";
    modalTitle = "Detalle pruebas";
    var window = $("#windowGrid");
    var win = window.kendoWindow({
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: true,
        width: "50%",
        minWidth: 30,
        position: {
            top: "10px",
            left: "10px"
        },
        actions: [
            "Close"
        ],
        close: function onClose(e) {
            var gridDataSource = $("#gridPopUp").data("kendoGrid").dataSource;
            gridDataSource.filter([]);

            //    gridDataSource.filter({ field: gridDataSource.options.fields[i].field, value: "" });


        }
    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};
