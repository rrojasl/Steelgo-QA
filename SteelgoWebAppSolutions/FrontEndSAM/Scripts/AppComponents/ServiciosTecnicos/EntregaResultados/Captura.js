function changeLanguageCall() {
    CargarGrid();
    $('#grid').data('kendoGrid').dataSource.read();
    document.title = _dictionary.EntregaResultadosHeader[$("#language").data("kendoDropDownList").value()];
    AjaxCargarEntregaResultados();
};

IniciarEntregaResultados();

function IniciarEntregaResultados() {
    SuscribirEventos();
   setTimeout(function () { AjaxCargarEntregaResultados() }, 1000);
    
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
        autoBind: true,
        edit: function (e) {

            if ($('#botonGuardar').text() != _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            }
        },
        dataSource: {
            schema: {
                model: {
                    fields: {
                        DatosJunta: { type: "string", editable: false },
                        FOLIO: { type: "string", editable: false },
                        DESCRIPCION: { type: "string", editable: false },
                        RECIBIDO: { type: "boolean" },
                        CONDICIONESFISICAS: { type: "string", editable: true },
                        DEFECTOS: { type: "string", editable: true  }
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
        editable:true,
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
            { field: "FOLIO", title: _dictionary.ServiciosTecnicosFolio[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
            { field: "DatosJunta", title: _dictionary.ServiciosDatosJunta[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
            { field: "DESCRIPCION", title: _dictionary.ServiciosTecnicosDescripcion[$("#language").data("kendoDropDownList").value()], filterable: true, width: "150px" },
            { field: "RECIBIDO", title: _dictionary.ServiciosTecnicosRECIBIDO[$("#language").data("kendoDropDownList").value()], filterable: true, template: '<input type="checkbox" #= RECIBIDO ? "checked=checked" : "" # class="chkbx"  ></input>', width: "130px" },
            { field: "CONDICIONESFISICAS", title: _dictionary.ServiciosTecnicosCondicionesFisicas[$("#language").data("kendoDropDownList").value()], editor: RenderComboBoxCondicionFisica, filterable: true, width: "150px" },
            { field: "DEFECTOS", title: _dictionary.ServiciosTecnicosDefectos[$("#language").data("kendoDropDownList").value()], editor: RenderComboBoxDefectos, filterable: true, width: "130px" } //editor: RenderComboBoxDefectos,
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

    $("#grid .k-grid-content").on("change", "input.chkbx", function (e) {

        if ($("#language").val() == "es-MX") {
            if ($('#botonGuardar').text() != "Editar") {
                var grid = $("#grid").data("kendoGrid")
                dataItem = grid.dataItem($(e.target).closest("tr"));
                if ($(this)[0].checked) {
                    dataItem.set("RECIBIDO", this.checked);
                }
                else {
                    dataItem.set("RECIBIDO", false);
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
        else {
            if ($('#botonGuardar').text() != "Edit") {
                var grid = $("#grid").data("kendoGrid")
                dataItem = grid.dataItem($(e.target).closest("tr"));
                if ($(this)[0].checked) {
                    dataItem.set("RECIBIDO", this.checked);
                }
                else {
                    dataItem.set("RECIBIDO", false);
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
        
    });
};



function isEditable(fieldName, model) {
    if (fieldName === "DEFECTOS") {
        
        return model.CONDICIONESFISICASID !== 1 ;
    }

    return true; 
}

