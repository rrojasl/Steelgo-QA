var editado = false;

function changeLanguageCall() {
    CargarGrid();
    CargarGridPopUp();
    document.title = "SistemaPintura";
};

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

            if ($('#botonGuardar').text() != _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            }
        },

        dataSource: {
            data: [
                    { plantillaColor: "", Proceso: "ShotBlast", Color: "", UnidadMinima: 1, UnidadMaxima: 5, Pruebas: "Detalle pruebas", Accion: 1, ListaColor: [], listadoPruebas: [{ Prueba: "Espesores", NumeroPruebas: 2, ListaPruebas: [{ Nombre: "Espesores", PruebaID: 1 }, { Nombre: "Adherencia", PruebaID: 2 }, { Nombre: "holliday", PruebaID: 3 }] }] },
                    { plantillaColor: "", Proceso: "Primario", Color: "", UnidadMinima: 3, UnidadMaxima: 5, Pruebas: "Detalle pruebas", Accion: 1, ListaColor: [], listadoPruebas: [{ Prueba: "PullOff", NumeroPruebas: 2, ListaPruebas: [{ Nombre: "Espesores", PruebaID: 1 }, { Nombre: "Adherencia", PruebaID: 2 }, { Nombre: "holliday", PruebaID: 3 }] }] },
                    { plantillaColor: "", Proceso: "Intermedio", Color: "Rojo", UnidadMinima: 2, UnidadMaxima: 4, Pruebas: "Detalle pruebas", Accion: 1, ListaColor: [{ Nombre: "Rojo", ColorID: 1 }, { Nombre: "Azul", ColorID: 2 }, { Nombre: "Verde", ColorID: 3 }], listadoPruebas: [{ Prueba: "Adherencia", NumeroPruebas: 2, ListaPruebas: [{ Nombre: "Espesores", PruebaID: 1 }, { Nombre: "Adherencia", PruebaID: 2,  }, { Nombre: "holliday", PruebaID: 3 }] }] },
                    { plantillaColor: "", Proceso: "Acabado", Color: "Azul, Verde", UnidadMinima: 1, UnidadMaxima: 10, Pruebas: "Detalle pruebas", Accion: 1, ListaColor: [{ Nombre: "Rojo", ColorID: 1 }, { Nombre: "Azul", ColorID: 2 }, { Nombre: "Verde", ColorID: 3 }], listadoPruebas: [{ Prueba: "Espesores", NumeroPruebas: 2, ListaPruebas: [{ Nombre: "Espesores", PruebaID: 1 }, { Nombre: "Adherencia", PruebaID: 2 }, { Nombre: "holliday", PruebaID: 3 }] }, { Prueba: "holliday", NumeroPruebas: 2, ListaPruebas: [{ Nombre: "Espesores", PruebaID: 1 }, { Nombre: "Adherencia", PruebaID: 2 }, { Nombre: "holliday", PruebaID: 3 }] }] },
            ],
            schema: {
                model: {
                    fields: {
                        Proceso: { type: "string", editable: false },
                        UnidadMinima: { type: "number", editable: true },
                        UnidadMaxima: { type: "number", editable: true },
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
            { field: "Proceso", title: "Proceso", filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "Color", title: "Color", filterable: getGridFilterableCellMaftec(), width: "110px", editor: RenderMultiselectColor, template: "<span>#=plantillaColor#</span>" },
            { field: "UnidadMinima", title: "U. min", filterable: getGridFilterableCellNumberMaftec(), width: "50px", attributes: { style: "text-align:right;" } },
            { field: "UnidadMaxima", title: "U max", filterable: getGridFilterableCellNumberMaftec(), width: "50px", attributes: { style: "text-align:right;" } },
            { field: "Pruebas", title: "Pruebas", template: "<div class='EnlaceDetallePruebas' style='text-align:center;'><a href='\\#'  > <span>#=Pruebas#</span></a></div>", filterable: getGridFilterableCellNumberMaftec(), width: "90px" },

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
};

function isEditable(fieldName, model) {
    if (fieldName === "Color") {
        if (model.Proceso == "Primario" || model.Proceso == "ShotBlast")
            return false;
        
    }

    return true; // default to editable
}


function cancelarCaptura(e) {
    e.preventDefault();
    var filterValue = $(e.currentTarget).val();
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
    if ($("#language").val() == "es-MX") {
        if ($('#Guardar').text().trim() != "Editar") {
            windowTemplate = kendo.template($("#windowTemplate").html());

            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
                visible: false, //the window will not appear before its .open method is called
                width: "auto",
                height: "auto",
                modal: true,
                animation: {
                    close: false,
                    open: false
                }
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.CapturaReporteModificarNoPlacas[$("#language").data("kendoDropDownList").value()] +
                        "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

            ventanaConfirm.open().center();

            $("#yesButton").click(function () {

                var dataSource = $("#grid").data("kendoGrid").dataSource;

                if (dataItem.Accion == 1) {
                    dataSource.remove(dataItem);
                }
                else {
                    dataItem.Accion = 3;
                }

                $("#grid").data("kendoGrid").dataSource.sync();

                ventanaConfirm.close();
            });
            $("#noButton").click(function () {
                ventanaConfirm.close();
            });

        }
    }
    else {
        if ($('#Guardar').text().trim() != "Edit") {
            windowTemplate = kendo.template($("#windowTemplate").html());

            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
                visible: false, //the window will not appear before its .open method is called
                width: "auto",
                height: "auto",
                modal: true,
                animation: {
                    close: false,
                    open: false
                }
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.CapturaInspeccionPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()] +
                        "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

            ventanaConfirm.open().center();

            $("#yesButton").click(function () {
                var dataSource = $("#grid").data("kendoGrid").dataSource;

                if (dataItem.Accion == 1)
                    dataSource.remove(dataItem);
                else
                    dataItem.Accion == 2;
                dataSource.remove(dataItem);
                $("#grid").data("kendoGrid").dataSource.sync();

                ventanaConfirm.close();
            });
            $("#noButton").click(function () {
                ventanaConfirm.close();
            });
        }
    }

}

function limpiarRenglon(e) {
    e.preventDefault();
    if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

        var itemToClean = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

        if (itemToClean.Accion == 2)
            itemToClean.Accion = 4;


        if (itemToClean.TurnoLaboral != "") {
            var JuntasAsignadasFinal = parseInt(itemToClean.JuntasAsignadas) - parseInt(itemToClean.CantidadJuntas);

            if (!itemToClean.RequiereEquipo) {
                setJuntasAsignatdasCapacidadTurnoProveedor(parseInt(itemToClean.JuntasAsignadas) - parseInt(itemToClean.CantidadJuntas), itemToClean.CapacidadTurnoProveedorAnteriorID);
                itemToClean.CapacidadTurnoProveedorID = 0;
                itemToClean.CapacidadTurnoProveedorAnteriorID = 0;
            }
            else {
                setJuntasAsignatdasCapacidadTurnoEquipo(parseInt(itemToClean.JuntasAsignadas) - parseInt(itemToClean.CantidadJuntas), itemToClean.CapacidadTurnoEquipoAnteriorID);
                itemToClean.CapacidadTurnoEquipoID = 0;
                itemToClean.CapacidadTurnoEquipoAnteriorID = 0;
            }

        }

        itemToClean.TipoPruebaProveedorID = 0;
        itemToClean.HerramientadePruebaID = 0;
        itemToClean.TurnoLaboral = "";
        itemToClean.Proveedor = "";
        itemToClean.Equipo = "";
        itemToClean.JuntasAsignadas = "";
        itemToClean.Capacidad = "";
        var dataSource = $("#grid").data("kendoGrid").dataSource;
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
                        Prueba: { type: "string", editable: true },
                        NumeroPruebas: { type: "number", editable: true },

                    }
                }
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
            { field: "Prueba", title: "Prueba", filterable: getGridFilterableCellMaftecpopUp(), width: "120px", editor: comboBoxPruebas },
            { field: "NumeroPruebas", title: "No. pruebas", filterable: getGridFilterableCellNumberMaftec(), width: "100px", attributes: { style: "text-align:right;" } },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()] }, title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()], width: "50px" },
            { command: { text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()] }, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "50px" }
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
    var array = data.listadoPruebas;
    for (var i = 0; i < array.length; i++) {
        ds.add(array[i]);
    }
    VentanaModal();
}



function VentanaModal() {

    var modalTitle = "";
    modalTitle = _dictionary.lblDetalleJuntas[$("#language").data("kendoDropDownList").value()];
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
