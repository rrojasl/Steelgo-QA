IniciarEdicionSistemaPintura();

function IniciarEdicionSistemaPintura() {
    SuscribirEventos();
}

function changeLanguageCall() {
    CargarGrid();
    //document.title = _dictionary.PinturaHeaderCargaCarro[$("#language").data("kendoDropDownList").value()];

}

function CargarGrid() {
    $("#grid").kendoGrid({
        edit: function (e) {
            if ($('#Guardar').text() != _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            }
        },
        dataBound: function () {
                var myElem = document.getElementById('trParentHeader');
                if (myElem == null) {
                    $("#grid").find("th.k-header").parent().before("<tr id='trParentHeader'> " +
                        "<th scope='col' colspan='1' class='k-header'></th><th width='auto'  colspan='3' class='k-header' style='text-align: center;'><span id=''>" + _dictionary.lblShotblast[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                        "<th width='auto'  colspan='3' class='k-header' style='text-align: center;'><span>" + _dictionary.lblPrimario[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                        "<th width='auto'  colspan='4' class='k-header' style='text-align: center;'><span id=''>" + _dictionary.lblIntermedio[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                        "<th width='auto'  colspan='4' class='k-header' style='text-align: center;'><span id=''>" + _dictionary.lblAcabado[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                        "<th width='auto'  colspan='1' class='k-header' style='text-align: center;'><span id=''></span></th>" +
                        "</tr>");
                }
        },
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        SistemaPinturaID: { type: "number", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        UnidadMinShotblast: { type: "number", editable: false },
                        UnidadMAxShotblast: { type: "number", editable: false },
                        PruebaShotblast: { type: "string", editable: false },
                        UnidadMinPrimario: { type: "number", editable: false },
                        UnidadMaxPrimario: { type: "number", editable: false },
                        PruebaPrimario: { type: "string", editable: false },
                        ColorIntermedio: { type: "string", editable: false },
                        UnidadMinIntermedio: { type: "number", editable: false },
                        UnidadMaxIntermedio: { type: "number", editable: false },
                        PruebaIntermedio: { type: "string", editable: false },
                        ColorAcabado: { type: "string", editable: false },
                        UnidadMinAcabado: { type: "number", editable: false },
                        UnidadMaxAcabado: { type: "number", editable: false },
                        PruebaAcabado: { type: "string", editable: false },
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 2 }
                ]
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false,
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
            { field: "SistemaPintura", title: _dictionary.columnSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "135px" },
            { field: "UnidadMinShotblast", title: _dictionary.columnUnidadMinima[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), format: "{0:n2}", width: "130px", attributes: { style: "text-align:right;" } },
            { field: "UnidadMAxShotblast", title: _dictionary.columnUnidadMaxima[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), format: "{0:n2}", width: "130px", attributes: { style: "text-align:right;" } },
            { field: "PruebaShotblast", title: _dictionary.columnPrueba[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px" },
            { field: "UnidadMinPrimario", title: _dictionary.columnUnidadMinima1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), format: "{0:n2}", width: "130px", attributes: { style: "text-align:right;" } },
            { field: "UnidadMaxPrimario", title: _dictionary.columnUnidadMaxima1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), format: "{0:n2}", width: "130px", attributes: { style: "text-align:right;" } },
            { field: "PruebaPrimario", title: _dictionary.columnPrueba1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px" },
            { field: "ColorIntermedio", title: _dictionary.columnColor[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "135px" },
            { field: "UnidadMinIntermedio", title: _dictionary.columnUnidadMinima2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), format: "{0:n2}", width: "130px", attributes: { style: "text-align:right;" } },
            { field: "UnidadMaxIntermedio", title: _dictionary.columnUnidadMaxima2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), format: "{0:n2}", width: "130px", attributes: { style: "text-align:right;" } },
            { field: "PruebaIntermedio", title: _dictionary.columnPrueba2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px" },
            { field: "ColorAcabado", title: _dictionary.columnColor1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "135px" },
            { field: "UnidadMinAcabado", title: _dictionary.columnUnidadMinima3[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), format: "{0:n2}", width: "130px", attributes: { style: "text-align:right;" } },
            { field: "UnidadMaxAcabado", title: _dictionary.columnUnidadMaxima3[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), format: "{0:n2}", width: "130px", attributes: { style: "text-align:right;" } },
            { field: "PruebaAcabado", title: _dictionary.columnPrueba3[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px" },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()], width: "50px" },
        ]
    });
}

function eliminarCaptura(e) {

}