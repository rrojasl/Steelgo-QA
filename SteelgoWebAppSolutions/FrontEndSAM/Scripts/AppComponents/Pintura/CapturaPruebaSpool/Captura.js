IniciarCapturaPruebaSpool();

function IniciarCapturaPruebaSpool() {
    SuscribirEventos();
}


function changeLanguageCall() {
    CargarGrid();
    LlenarCombo();
}

function CargarGrid() {
    //BeforeEdit
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
            var inputName = e.container.find('input');
            inputName.select();

        },
        autoBind: true,
        dataSource: {
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        FechaPrueba: { type: "date", editable: true }, 
                        ValorUnidadMedida: { type: "number", editable: true },
                        Aprobado: { type: "string", editable: false }
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
        filterable: {
            extra: false
        },
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
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "FechaPrueba", title: _dictionary.columnFechaPrueba[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
            { field: "ValorUnidadMedida", editor: RenderAprobado, title: "Valor U. Medida", filterable: getGridFilterableCellNumberMaftec(), width: "170px", attributes: { style: "text-align:right;" } },
            { field: "Aprobado" , title: "Aprobado", filterable: getGridFilterableCellMaftec(), width: "130px", attributes: { style: "text-align:center;" } },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()], width: "50px" },
        ],
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            //isApproved(fieldName, e.model);
        }
    });
    CustomisaGrid($("#grid"));
}

function isApproved(fieldName, model) {
    if (fieldName === "ValorUnidadMedida") {
        alert(model.ValorUnidadMedida)
        //model.Aprobado 
    }
}

function eliminarCaptura(e) {
    e.preventDefault();
    if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {

        var filterValue = $(e.currentTarget).val();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        dataSource.remove(dataItem);
        dataSource.sync();
    }

}

function llenarGrid() {
    var grid = $("#grid").data("kendoGrid").dataSource;

    var ds = [
                  {
                      Accion: 1,
                      FechaPrueba : new Date(),
                      ValorUnidadMedida: 0,
                      Aprobado: ""
                  }
    ]
    grid.data(ds);
    grid.sync();
}

function LlenarCombo(){
    var p = [
        { Proyecto: 0, Nombre: "" },
        { Proyecto: 16, Nombre: "ETILENO XXI" }
    ];

    var sp = [
        { SistPintID: 0, Nombre: "" },
        { SistPintID: 1, Nombre: "A1" },
        { SistPintID: 2, Nombre: "A2" },
        { SistPintID: 3, Nombre: "18.1" }
    ];

    var pp = [
             { ProcesoPinturaID: 0, ProcesoPintura: "" },
             { ProcesoPinturaID: 1, ProcesoPintura: "ShotBlast" },
             { ProcesoPinturaID: 2, ProcesoPintura: "Primario" },
             { ProcesoPinturaID: 3, ProcesoPintura: "Intermedio" },
             { ProcesoPinturaID: 4, ProcesoPintura: "Acabado" }
    ];

    var pr = [
             { PruebaID: 0, Prueba: "" },
             { PruebaID: 1, Prueba: "Adherencia" }
    ];



    //$("#inputProyecto").data("kendoComboBox").dataSource.data([]);
    //$("#inputProyecto").data("kendoComboBox").dataSource.data(p);
    //$("#inputProyecto").data("kendoComboBox").value(16);
    //$("#inputProyecto").data("kendoComboBox").trigger('changes');

    //$("#inputSistemaPintura").data("kendoComboBox").dataSource.data([]);
    //$("#inputSistemaPintura").data("kendoComboBox").dataSource.data(sp);

    $("#inputProceso").data("kendoComboBox").dataSource.data([]);
    $("#inputProceso").data("kendoComboBox").dataSource.data(pp);

    $("#inputPrueba").data("kendoComboBox").dataSource.data([]);
    $("#inputPrueba").data("kendoComboBox").dataSource.data(pr);
}