function changeLanguageCall() {
    CargarGrid();
    document.title = _dictionary.CapturaAdminComponentesTituloPagina[$("#language").data("kendoDropDownList").value()];
};

function CargarGrid() {
    $("#grid").kendoGrid({
        edit: function (e) {
            if ($('#Guardar').text() != _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            }
        },
        autoBind: true,
        dataSource: {
            schema: {
                model: {
                    fields: {
                        Componente: { type: "string", editable: true },
                        Lote: { type: "string", editable: true },
                        Cantidad: { type: "number", editable: true, validation: { min: 0, required: false } },
                        Unidad: { type: "string", editable: false}
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 },
                  { field: "Accion", operator: "eq", value: 0 },
                  { field: "Accion", operator: "eq", value: 4 },
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
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "Componente", title: _dictionary.columnComponente[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "Lote", title: _dictionary.columnLote[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "80px", attributes: { style: "text-align:left;" } },
            { field: "Cantidad", title: _dictionary.columnCantidad[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "80px", attributes: { style: "text-align:right;" }, editor: renderCantidad },
            { field: "Unidad", title: _dictionary.columnUnidad[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "50px", attributes: { style: "text-align:left;" } },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()], width: "40px", attributes: { style: "text-align:center;" } },
            { command: { text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()], click: limpiarCaptura }, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "40px", attributes: { style: "text-align:center;" }}
        ],
        dataBound: function () {
            var grid = $("#grid").data("kendoGrid");
            var gridData = grid.dataSource.view();

            for (var i = 0; i < gridData.length; i++) {
                var currentUid = gridData[i].uid;
                if (gridData[i].RowOk == false) {
                    grid.table.find("tr[data-uid='" + currentUid + "']").css("background-color", "#ffcccc");
                }
                else if (gridData[i].RowOk) {
                    grid.table.find("tr[data-uid='" + currentUid + "']").css("background-color", "#ffffff");
                }

            }
        },
        toolbar: [{ name: "create" }]
    });

    $("#grid table").on("keydown", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            //var grid = $("#gridPopUp").data("kendoGrid");
            //var length = grid.dataSource.view().length;
            //var currentIndexRow = $("#gridPopUp").data("kendoGrid").items().index($("#gridPopUp").data("kendoGrid").select());
            //if (currentIndexRow == length - 1) {
            var dataSource = $("#grid").data("kendoGrid").dataSource;
            var total = $("#grid").data("kendoGrid").dataSource.data().length;
            $("#grid").data("kendoGrid").dataSource.insert(total, {});
            $("#grid").data("kendoGrid").dataSource.page(dataSource.totalPages());
            $("#grid").data("kendoGrid").editRow($("#grid").data("kendoGrid").tbody.children().last());

            //}
        }
    });
    CustomisaGrid($("#grid"));
};