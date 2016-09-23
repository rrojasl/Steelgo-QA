IniciarCapturaCargaCarro();

function IniciarCapturaCargaCarro() {
    SuscribirEventos();
}

function changeLanguageCall() {
    CargarGridEscritorio();
    CargarGridPatio();
}

function getParameterByName(name, url) {

    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function CargarGridEscritorio(){
    $("#grid[name='grid-Escritorio']").kendoGrid({
        edit: function (e) {
            if ($('#Guardar').text() != _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
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
                        NumeroControl: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Color: { type: "string", editable: false },
                        CuadranteMD: { type: "string", editable: false },
                        MedioTransporte: { type: "string", editable: false },
                        Area: { type: "number", editable: false },
                        Peso: { type: "number", editable: false },
                        Seleccionado: { type: "boolean", editable: false }
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
            serverSorting: false,
            aggregate: [
                { field: "Area", aggregate: "sum" },
                { field: "Peso", aggregate: "sum" }
            ]
        },
        navigatable: true,
        editable: false,
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
            { field: "OrdenImportancia", title: _dictionary.columnPrioridad[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "88px", attributes: { style: "text-align:right;" } },
            { field: "NumeroControl", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px" },
            { field: "SistemaPintura", title: _dictionary.columnSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "135px" },
            { field: "Color", title: _dictionary.columnColor[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px" },
            { field: "CuadranteMD", title: _dictionary.columnCuadrante[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px" },
            { field: "Area", title: _dictionary.columnM2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), format: "{0:n2}", width: "95px", attributes: { style: "text-align:right;" }, aggregates: ["sum"], footerTemplate: "<div style='text-align:right;'>SUM: #= kendo.toString(sum, 'n') #</div>" },
            { field: "Peso", title: _dictionary.columnPeso[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), format: "{0:n2}", width: "95px", attributes: { style: "text-align:right;" }, aggregates: ["sum"], footerTemplate: "<div style='text-align:right;'>SUM: #= kendo.toString(sum, 'n') #</div>" },
            { field: "MedioTransporte", title: _dictionary.columnMedioTransporte[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "140px" },
            {
                field: "Seleccionado", title: _dictionary.columnSeleccionado[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Seleccionado: true }, { Seleccionado: false }]
                }, template: '<input type="checkbox" #= Seleccionado ? "checked=checked" : "" # class="chkbx"  ></input>  ', width: "130px", attributes: { style: "text-align:center;" }
            },
            { command: { text: _dictionary.botonDescarga[$("#language").data("kendoDropDownList").value()], click: eliminarCapturaEscritorio }, title: _dictionary.columnDescargar[$("#language").data("kendoDropDownList").value()], width: "70px", attributes: { style: "text-align:center;" } }
        ]
    });

    CustomisaGrid($("#grid[name='grid-Escritorio']"));
}

function CargarGridPatio() {
    $("#grid[name='grid-Patio']").kendoGrid({
        edit: function (e) {

            if ($('#Guardar').text() != _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            }
        },
        dataSource: {
            schema: {
                model: {
                    fields: {
                        NumeroControl: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        ColorPintura: { type: "string", editable: false },
                        CuadranteMD: { type: "string", editable: false },
                        Area: { type: "number", editable: false },
                        Peso: { type: "number", editable: false }
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
            serverSorting: false,
            aggregate: [
                { field: "Area", aggregate: "sum" },
                { field: "Peso", aggregate: "sum" }
            ]
        },
        navigatable: true,
        editable: false,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true
        },
        filterable: getGridFilterableMaftec(),
        columns: [            
            { field: "NumeroControl", title: _dictionary.columnNumeroControl1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "SistemaPintura", title: _dictionary.columnSistemaPintura1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "ColorPintura", title: _dictionary.columnColor1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px" },
            { field: "CuadranteMD", title: _dictionary.columnCuadrante1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px", footerTemplate: "<div style='text-align:right; width:120px;'></div>" },
            { field: "Area", type: 'number', title: _dictionary.columnM21[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px", format: "{0:n2}", attributes: { style: "text-align:right;" }, aggregates: ["sum"], footerTemplate: "<div style='text-align:right;'>SUM: #= kendo.toString(sum, 'n') #</div>" },
            { field: "Peso", type: 'number', title: _dictionary.columnPeso1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px", format: "{0:n2}", attributes: { style: "text-align:right;" }, aggregates: ["sum"], footerTemplate: "<div style='text-align:right;'>SUM: #= kendo.toString(sum, 'n') #</div>" },
            { command: { text: _dictionary.botonDescarga[$("#language").data("kendoDropDownList").value()], click: eliminarCapturaPatio }, title: _dictionary.columnDescargar1[$("#language").data("kendoDropDownList").value()], width: "50px", attributes: { style: "text-align:center;" } }
        ]
    });

    CustomisaGrid($("#grid[name='grid-Patio']"));
}

function eliminarCapturaEscritorio(e) {
    e.preventDefault();
}

function eliminarCapturaPatio(e) {
    e.preventDefault();
}