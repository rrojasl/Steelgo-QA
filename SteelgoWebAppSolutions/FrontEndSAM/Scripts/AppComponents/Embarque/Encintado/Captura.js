function changeLanguageCall() {
    CargarGrid();
    
    //AjaxCargarArea();
    //AjaxCampoPredeterminadoImpreso();
    document.title = "Encintado";
    
    opcionHabilitarView(false, "FieldSetView")
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
        autoSync: true,
        edit: function (e) {
            if ($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
                this.closeCell();
            }

        },
        dataSource: {
            data: [
                 {
                     Accion: 1,
                     SpoolID: "X001-001",
                     Cuadrante: "ZZ0-001 PT",
                     ColorCinta: "Verde",
                     Encintando:false,
                     Etiquetado: true
                 }
            ],
            schema: {
                model: {
                    fields: {
                        SpoolID: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        ColorCinta: { type: "string", editable: true },
                        Encintado: { type: "boolean", editable: false },
                        Etiquetado: { type: "boolean", editable: false }
                    }
                }
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 20],
            info: false,
            input: false,
            numeric: true,
            // buttonCount: 2
        },
        navigatable: true,
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        selectable: true,
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "SpoolID", title: _dictionary.columnSpoolIDEmbarque[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "Proyecto", title: _dictionary.columnProyecto[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "Cuadrante", title: _dictionary.columnCuadranteEmbarque[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "ColorCinta", title: _dictionary.columnColorCintaEmbarque[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },

            {
                field: "Encintado", title: _dictionary.columnEncintadoEmbarque[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                }, template: "<input name='fullyPaid' class='chk-agregar' type='checkbox' data-bind='checked: Encintado' #= Encintado ? checked='checked' : '' #/>", width: "50px", attributes: { style: "text-align:center;" }
            },

             {
                 field: "Etiquetado", title: _dictionary.columnEtiquetadoEmbarque[$("#language").data("kendoDropDownList").value()], filterable: {
                     multi: true,
                     messages: {
                         isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                         isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                         style: "max-width:100px;"
                     },
                     dataSource: [{ Etiquetado: true }, { Etiquetado: false }]
                 }, template: "<input name='fullyPaid' class='chk-agregar' type='checkbox' data-bind='checked: Etiquetado' #= Etiquetado ? checked='checked' : '' #/>", width: "50px", attributes: { style: "text-align:center;" }
             }

        ]
    });
    CustomisaGrid($("#grid"));

    $("#grid .k-grid-content").on("change", "input.chk-conCinta", function (e) {
        if ($("#language").val() == "es-MX") {
            if ($('#Guardar').text() != "Editar") {
                var grid = $("#grid").data("kendoGrid")
                dataItem = grid.dataItem($(e.target).closest("tr"));
                if ($(this)[0].checked) {
                    dataItem.ConCinta = true;
                }
                else {
                    dataItem.ConCinta = false;
                    dataItem.ColorCintaID = 0;
                    dataItem.ColorCinta = "";
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
            if ($('#Guardar').text() != "Edit") {
                var grid = $("#grid").data("kendoGrid")
                dataItem = grid.dataItem($(e.target).closest("tr"));
                if ($(this)[0].checked) {
                    dataItem.ConCinta = true;
                }
                else {
                    dataItem.ConCinta = false;
                    dataItem.ColorCintaID = 0;
                    dataItem.ColorCinta = "";
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

    $("#grid .k-grid-content").on("change", "input.chk-etiquetado", function (e) {

        if ($("#language").val() == "es-MX") {
            if ($('#Guardar').text() != "Editar") {
                var grid = $("#grid").data("kendoGrid");
                dataItem = grid.dataItem($(e.target).closest("tr"));
                if ($(this)[0].checked) {
                    dataItem.Etiquetado = true;
                }
                else {
                    dataItem.Etiquetado = false;
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
            if ($('#Guardar').text() != "Edit") {
                var grid = $("#grid").data("kendoGrid");
                dataItem = grid.dataItem($(e.target).closest("tr"));
                if ($(this)[0].checked) {
                    dataItem.Etiquetado = true;
                }
                else {
                    dataItem.Etiquetado = false;
                }
                $("#grid").data("kendoGrid").dataSource.sync();
            }
            else {
                var grid = $("#grid").data("kendoGrid");
                dataItem = grid.dataItem($(e.target).closest("tr"));
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
    return true;
}



