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
        autoBind: true,
        dataSource: {
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        NombreSpool: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Color: { type: "string", editable: false },
                        M2: { type: "String", editable: false },
                        Lote: { type: "String", editable: false },
                        NombreCuadrante: { type: "string", editable: false },
                        UnidadMedida: { type: "string", editable: false },
                        ValorUnidadMedida: { type: "number", editable: true },
                        Aprobado: { type: "boolean", editable: false }
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
            { field: "NombreSpool", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "SistemaPintura", title: _dictionary.columnSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "Color", title: _dictionary.columnColor[$("#language").data("kendoDropDownList").value()], width: "150px", filterable: getGridFilterableCellMaftec() },
            { field: "M2", title: _dictionary.columnM2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), format: "{0:n2}", width: "95px", attributes: { style: "text-align:right;" } },
            { field: "Lote", title: "Lote", filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "NombreCuadrante", title: _dictionary.columnCuadrante[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "UnidadMedida", title: _dictionary.columnUnidadMedida[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "ValorUnidadMedida", title: "Valor U. Medidad", filterable: getGridFilterableCellMaftec(), width: "170px" },
            {
                field: "Aprobado", title: "Aprobado", filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Aprobado: true }, { Aprobado: false }]
                }, template: '<input type="checkbox" #= Aprobado ? "checked=checked" : "" # class="chkbx" disabled></input>  ', width: "130px", attributes: { style: "text-align:center;" }
            },
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

function llenarGrid() {
    var grid = $("#grid").data("kendoGrid").dataSource;

    var ds = [
                  {
                      Accion: 1,
                      NombreSpool: "X001-001",
                      SistemaPintura: "A1",
                      Color: "AMARILLO",
                      M2: "200",
                      Lote: "Lote 1",
                      NombreCuadrante: "MCS",
                      UnidadMedida: "PLG",
                      ValorUnidadMedida: 0,
                      Aprobado: false
                  },
                  {
                      Accion: 1,
                      NombreSpool: "X001-001",
                      SistemaPintura: "A1",
                      Color: "AMARILLO",
                      M2: "200",
                      Lote: "Lote 1",
                      NombreCuadrante: "MCS",
                      UnidadMedida: "PLG",
                      ValorUnidadMedida: 3,
                      Aprobado: true
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



    $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
    $("#inputProyecto").data("kendoComboBox").dataSource.data(p);
    $("#inputProyecto").data("kendoComboBox").value(16);
    $("#inputProyecto").data("kendoComboBox").trigger('changes');

    $("#inputSistemaPintura").data("kendoComboBox").dataSource.data([]);
    $("#inputSistemaPintura").data("kendoComboBox").dataSource.data(sp);

    $("#inputProceso").data("kendoComboBox").dataSource.data([]);
    $("#inputProceso").data("kendoComboBox").dataSource.data(pp);

    $("#inputPrueba").data("kendoComboBox").dataSource.data([]);
    $("#inputPrueba").data("kendoComboBox").dataSource.data(pr);
}