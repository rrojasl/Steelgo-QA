function changeLanguageCall() {
    CargarGrid();
    AjaxObtenerCatalogoClasificacion();
    AjaxObtenerCatalogoPersistencia();
    AjaxPinturaCargaMedioTransporte();
    AjaxCargarCamposPredeterminados();
    AjaxCargarSpool(false, 0);
    document.title = _dictionary.PinturaHeaderCargaCarroBacklog[$("#language").data("kendoDropDownList").value()];
};

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
    CustomisaGrid($("#grid"));

    $("#grid .k-grid-content").on("change", ":checkbox", function (e) {
        if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#grid").data("kendoGrid"),
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
    });
};

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

function LimpiarCarro() {
    $("#inputMedioTransporte").val('');
    $("#inputNumeroVeces").val('');
    $("#inputPesoMaximo").val('');
    $("#inputArea").val('');

}
