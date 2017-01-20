﻿var EmbarquePlanaID = 0;

IniciarCapturaEmbarqueCarga();
function IniciarCapturaEmbarqueCarga() {
    SuscribirEventos();
}

function changeLanguageCall() {
    CargarGrid();
    opcionHabilitarView(false, "FieldSetView");
    document.title = "Revisión Embarque";
    AjaxCargarProyecto();
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
            schema: {
                model: {
                    fields: {
                        NumeroControl: { type: "string", editable: false },
                        Paquete: { type: "string", editable: false },
                        Llego: { type: "boolean", editable: true },
                        LlegoComentario: { type: "boolean", editable: true },
                        NoLlego: { type: "boolean", editable: true },
                        Comentario: { type: "string", editable: true }
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
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "NumeroControl", title: _dictionary.columnSpool[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px" },
            { field: "Paquete", title: _dictionary.columnPaqueteEmbarque[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px" },
            {
                field: "Llego", title: _dictionary.columnLlegoSpool[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:90px;"
                    },
                    dataSource: [{ Llego: true }, { Llego: false }]
                }, template: '<input type="checkbox" name="Llego" #= Llego ? "checked=checked" : "" # class="chkbx" ></input>', width: "130px", attributes: { style: "text-align:center;" }
            },
            {
                field: "LlegoComentario", title: _dictionary.columnLlegoComentariosSpool[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:150px;"
                    },
                    dataSource: [{ LlegoComentario: true }, { LlegoComentario: false }]
                }, template: '<input type="checkbox" name="LlegoComentario" #= LlegoComentario ? "checked=checked" : "" # class="chkbx" ></input>', width: "130px", attributes: { style: "text-align:center;" }
            },
            {
                field: "NoLlego", title: _dictionary.columnNoLlegoSpool[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ NoLlego: true }, { NoLlego: false }]
                }, template: '<input type="checkbox" name="NoLlego" #= NoLlego ? "checked=checked" : "" # class="chkbx" ></input>', width: "130px", attributes: { style: "text-align:center;" }
            },
            { field: "Comentario", title: _dictionary.columnComentario[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "170px" },
        ],
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            //if (!isEditable(fieldName, e.model)) {
            //    e.preventDefault();
            //}
        },
    });
    CustomisaGrid($("#grid"));

    $("#grid .k-grid-content").on("change", "input.chkbx", function (e) {
        if ($('#Guardar').text() == _dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#grid").data("kendoGrid");
            var dataItem = grid.dataItem($(e.target).closest("tr"));
            switch (this.name) {
                case 'Llego':
                    dataItem.set("Llego", this.checked);
                    dataItem.set("NoLlego", false);
                    dataItem.set("LlegoComentario", false);
                    dataItem.Comentario = "";
                    break;
                case 'NoLlego':
                    dataItem.set("Llego", false);
                    dataItem.set("NoLlego", this.checked);
                    dataItem.set("LlegoComentario", false);
                    dataItem.Comentario = "";
                    break;
                case 'LlegoComentario':
                    dataItem.set("Llego", false);
                    dataItem.set("NoLlego", false);
                    dataItem.set("LlegoComentario", this.checked);
                    break;
            }
            grid.dataSource.sync();
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