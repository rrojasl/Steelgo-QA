var ItemSeleccionado;

function changeLanguageCall() {
    CargarGrid();
    $('#grid').data('kendoGrid').dataSource.read();
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
        dataSource: {
            data: [
                     
            ],
            schema: {
                model: {
                    fields: {
                        DatosJunta: { type: "string", editable: false },
                        Conciliado: { type: "string", editable: true },
                        Nombre: { type: "string", editable: true },
                        Comentario: { type: "string", editable: true },
                        Enlace: { type: "string", editable: true },
                        Ubicacion: { type: "string", editable: false },
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
        click: function (e) {
            ItemSeleccionado = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        },
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            if (!isEditable(fieldName, e.model)) {
                //e.model.Enlace = '<a class="EnlacesValidacionResultados" href="#">Editar</a>';
                e.preventDefault();
            }
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
            { field: "DatosJunta", title: "Datos de junta", filterable: true },
             { field: "Ubicacion", title: "Ubicacion", filterable: false },
            { field: "Conciliado", title: "Conciliación", filterable: true, editor: comboBoxConciliacion },
            { field: "Nombre", title: "Razones de rechazo", filterable: true, editor: comboBoxDefectos},
            { field: "Comentario", title: "Comentario", filterable: true },
            { field: "Enlace", title: "Accion", filterable: false, editor: renderEnlaceEditar, template: "Ver opciones" },
           
        ]
    }).on("click", "tbody td", function (e) {
    });
};

function isEditable(fieldName, model) {
    if (fieldName === "Enlace") {
        // condition for the field "ProductName"
        return model.Conciliado !== "Aceptado";
    }

    return true; // default to editable
}