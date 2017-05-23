var esNormal;

function changeLanguageCall() {
  

    
    CargarGrid();
    CargarGridPopUp();
    setTimeout(function () {
        AjaxCargarFechasSpool();
    }, 500);
    
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
        save: function (e) {
            
            $('tr[data-uid="' + e.model.uid + '"] ').css("background-color", "#ffcccc");
            e.model.Modificado = true;
            e.model.RowOk = false;
        },
        edit: function (e) {
            setTimeout(function () {
                var inputName = e.container.find('input');

                inputName.select();
            });
            if ($('#botonGuardar').text() != _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {//|| e.model.Accion == 2) {
                this.closeCell();
            }
        },

        dataSource: {
            schema: {
                model: {
                    fields: {
                        NumeroControl: { type: "string", editable: false },
                        Proyecto: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Prioridad: { type: "number", editable: false },
                        Diametro: { type: "string", editable: false },
                        Area: { type: "string", editable: false },
                        Cedula: { type: "string", editable: false },
                        FechaUno: { type: "date", editable: true },
                        FechaDos: { type: "date", editable: true },
                        FechaTres: { type: "date", editable: true },
                        FechaCuatro: { type: "date", editable: true },
                        FechaCinco: { type: "date", editable: true },
                        FechaSeis: { type: "date", editable: true },
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
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "NumeroControl", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "Proyecto", title: _dictionary.columnProyecto[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px" },
            { field: "Cuadrante", title: _dictionary.columnCuadrante[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "115px" },
            { field: "Prioridad", title: _dictionary.columnPrioridad[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "80px", attributes: { style: "text-align:right;" } },
            { field: "Diametro", title: _dictionary.columnDiametro[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "75px", attributes: { style: "text-align:right;" } },
            { field: "Area", title: _dictionary.columnArea[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "60px", attributes: { style: "text-align:right;" } },
            { field: "Cedula", title: _dictionary.columnCedula[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "90px" },
            { field: "FechaUno", title: "Fecha 1", filterable: getGridFilterableCellMaftec(), width: "90px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "FechaDos", title: "Fecha 2", filterable: getGridFilterableCellMaftec(), width: "90px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "FechaTres", title: "Fecha 3", filterable: getGridFilterableCellMaftec(), width: "90px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "FechaCuatro", title: "Fecha 4", filterable: getGridFilterableCellMaftec(), width: "90px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "FechaCinco", title: "Fecha 5", filterable: getGridFilterableCellMaftec(), width: "90px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "FechaSeis", title: "Fecha 6", filterable: getGridFilterableCellMaftec(), width: "90px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { command: { text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()],  }, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "50px", attributes: { style: "text-align:center;" } }
        ],
        dataBound: function () {
            var grid = $("#grid").data("kendoGrid");
            var gridData = grid.dataSource.view();

            for (var i = 0; i < gridData.length; i++) {
                var currentUid = gridData[i].uid;
                if (gridData[i].RowOk == false) {
                    grid.table.find("tr[data-uid='" + currentUid + "']").removeClass("k-alt");
                    grid.table.find("tr[data-uid='" + currentUid + "']").addClass("kRowError");

                }
                else if (gridData[i].RowOk) {
                    if (i % 2 == 0)
                        grid.table.find("tr[data-uid='" + currentUid + "']").removeClass("k-alt");

                    grid.table.find("tr[data-uid='" + currentUid + "']").removeClass("kRowError");
                }

            }

            if (esNormal) {
                $(".k-grid-content td").css("white-space", "normal");
            }
            else {
                $(".k-grid-content td").css("white-space", "nowrap");
            }

        },
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
    if (fieldName === "FechaUno") {
        if (!model.Fecha1) {
            return false;
        }
    }

    else if (fieldName === "FechaDos") {
        if (!model.Fecha2) {
            return false;
        }
    }
    else if (fieldName === "FechaTres") {
        if (!model.Fecha3) {
            return false;
        }
    }
    else if (fieldName === "FechaCuatro") {
        if (!model.Fecha4) {
            return false;
        }
    }
    else if (fieldName === "FechaCinco") {
        if (!model.Fecha5) {
            return false;
        }
    }
    else if (fieldName === "FechaSeis") {
        if (!model.Fecha6) {
            return false;
        }
    }

    return true; // default to editable
}



function CargarGridPopUp() {

    $("#gridPopUp").kendoGrid({
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        NumeroControl: { type: "string", editable: false },
                        Proyecto: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Prioridad: { type: "number", editable: false },
                        Diametro: { type: "string", editable: false },
                        Area: { type: "string", editable: false },
                        Cedula: { type: "string", editable: false },
                        FechaUno: { type: "date", editable: true },
                        FechaDos: { type: "date", editable: true },
                        FechaTres: { type: "date", editable: true },
                        FechaCuatro: { type: "date", editable: true },
                        FechaCinco: { type: "date", editable: true },
                        FechaSeis: { type: "date", editable: true },
                    }
                }
            },
            pageSize: 10,
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
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        selectable: true,
        filterable: getGridFilterableMaftec(),

        columns: [
            { field: "NumeroControl", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "Proyecto", title: _dictionary.columnProyecto[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px" },
            { field: "Cuadrante", title: _dictionary.columnCuadrante[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "115px" },
            { field: "Prioridad", title: _dictionary.columnPrioridad[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "80px", attributes: { style: "text-align:right;" } },
            { field: "Diametro", title: _dictionary.columnDiametro[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "75px", attributes: { style: "text-align:right;" } },
            { field: "Area", title: _dictionary.columnArea[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "60px", attributes: { style: "text-align:right;" } },
            { field: "Cedula", title: _dictionary.columnCedula[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "90px" },
            { field: "FechaUno", title: "Fecha 1", filterable: getGridFilterableCellMaftec(), width: "90px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "FechaDos", title: "Fecha 2", filterable: getGridFilterableCellMaftec(), width: "90px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "FechaTres", title: "Fecha 3", filterable: getGridFilterableCellMaftec(), width: "90px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "FechaCuatro", title: "Fecha 4", filterable: getGridFilterableCellMaftec(), width: "90px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "FechaCinco", title: "Fecha 5", filterable: getGridFilterableCellMaftec(), width: "90px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "FechaSeis", title: "Fecha 6", filterable: getGridFilterableCellMaftec(), width: "90px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
        ],
        editable: false,
        navigatable: true,
      
    });
    CustomisaGrid($("#gridPopUp"));
};



function LlenarGridPopUp(data) {
    $("#gridPopUp").data('kendoGrid').dataSource.data([]);
    var ds = $("#gridPopUp").data("kendoGrid").dataSource;
    var array = data;
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
        width: "95%",
        minWidth: 30,
        position: {
            top: "10px",
            left: "10px"
        },
        animation: {
            close: false,
            open: false
        },
        actions: [],

    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};