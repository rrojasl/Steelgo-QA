IniciarEdicionSistemaPintura();

function IniciarEdicionSistemaPintura() {
    SuscribirEventos();
}

function changeLanguageCall() {
    CargarGrid();
    CargarGridDetalle();
    //document.title = _dictionary.PinturaHeaderCargaCarro[$("#language").data("kendoDropDownList").value()];
    InsertRows();
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
                        "<th scope='col' colspan='3' class='k-header'></th><th width='auto'  colspan='3' class='k-header' style='text-align: center;'><span id=''>" + _dictionary.lblShotblast[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                        "<th width='auto'  colspan='3' class='k-header' style='text-align: center;'><span>" + _dictionary.lblPrimario[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                        "<th width='auto'  colspan='3' class='k-header' style='text-align: center;'><span id=''>" + _dictionary.lblIntermedio[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                        "<th width='auto'  colspan='3' class='k-header' style='text-align: center;'><span id=''>" + _dictionary.lblAcabado[$("#language").data("kendoDropDownList").value()] + "</span></th>" +
                        "<th width='auto'  colspan='2' class='k-header' style='text-align: center;'><span id=''></span></th>" +
                        "</tr>");
                }
        },
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        SistemaPinturaID: { type: "number", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        ProyectoID: { type: "number", editable: false },
                        Proyecto: { type: "string", editable: false },
                        ColorID: { type: "number", editable: false },
                        Color: { type: "string", editable: false },
                        PruebaPorLoteShotblast: { type: "number", editable: false },
                        MetrosPorLoteShotblast: { type: "number", editable: false },
                        PruebaShotblast: { type: "string", editable: false },
                        PruebaPorLotePrimario: { type: "number", editable: false },
                        MetrosPorLotePrimario: { type: "number", editable: false },
                        PruebaPrimario: { type: "string", editable: false },
                        PruebaPorLoteIntermedio: { type: "number", editable: false },
                        MetrosPorLoteIntermedio: { type: "number", editable: false },
                        PruebaIntermedio: { type: "string", editable: false },
                        PruebaPorLoteAcabado: { type: "number", editable: false },
                        MetrosPorLoteAcabado: { type: "number", editable: false },
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
            { field: "Proyecto", title: _dictionary.columnProyecto[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "135px" },
            { field: "Color", title: _dictionary.columnColor[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "135px" },
            { field: "PruebaShotblast", title: _dictionary.columnPrueba[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px", template: "<div class='EnlacePorPlaca' style='text-align:center;'><a href='\\#'  > <span >#=PruebaShotblast#</span></a></div> " },
            { field: "PruebaPorLoteShotblast", title: _dictionary.columnPruebasPorLote[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), format: "{0:n2}", width: "130px", attributes: { style: "text-align:right;" } },
            { field: "MetrosPorLoteShotblast", title: _dictionary.columnMetrosPorLote[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), format: "{0:n2}", width: "120px", attributes: { style: "text-align:right;" } },
            { field: "PruebaPrimario", title: _dictionary.columnPrueba1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px", template: "<div class='EnlacePorPlaca' style='text-align:center;'><a href='\\#'  > <span>#=PruebaShotblast#</span></a></div> " },
            { field: "PruebaPorLotePrimario", title: _dictionary.columnPruebasPorLote1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), format: "{0:n2}", width: "130px", attributes: { style: "text-align:right;" } },
            { field: "MetrosPorLotePrimario", title: _dictionary.columnMetrosPorLote1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), format: "{0:n2}", width: "120px", attributes: { style: "text-align:right;" } },
            { field: "PruebaIntermedio", title: _dictionary.columnPrueba2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px", template: "<div class='EnlacePorPlaca' style='text-align:center;'><a href='\\#'  > <span>#=PruebaShotblast#</span></a></div> " },
            { field: "PruebaPorLoteIntermedio", title: _dictionary.columnPruebasPorLote2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), format: "{0:n2}", width: "130px", attributes: { style: "text-align:right;" } },
            { field: "MetrosPorLoteIntermedio", title: _dictionary.columnMetrosPorLote2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), format: "{0:n2}", width: "120px", attributes: { style: "text-align:right;" } },
            { field: "PruebaAcabado", title: _dictionary.columnPrueba3[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px", template: "<div class='EnlacePorPlaca' style='text-align:center;'><a href='\\#'  > <span>#=PruebaAcabado#</span></a></div> " },
            { field: "PruebaPorLoteAcabado", title: _dictionary.columnPruebasPorLote3[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), format: "{0:n2}", width: "130px", attributes: { style: "text-align:right;" } },
            { field: "MetrosPorLoteAcabado", title: _dictionary.columnMetrosPorLote3[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), format: "{0:n2}", width: "120px", attributes: { style: "text-align:right;" } },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()], width: "50px" },
            { command: { text: _dictionary.botonEditar1[$("#language").data("kendoDropDownList").value()], click: editaSistemaPintura }, title: _dictionary.columnEditar[$("#language").data("kendoDropDownList").value()], width: "50px" }
        ],
        editable: true,
        navigatable: true
    });

    CustomisaGrid($("#grid"));
}

function eliminarCaptura(e) {
    e.preventDefault();
    if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
        e.preventDefault();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
            
            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.PinturaCargaTitulo[$("#language").data("kendoDropDownList").value()],
                visible: false, //the window will not appear before its .open method is called
                width: "auto",
                height: "auto",
                modal: true,
                animation: {
                    close: false,
                    open: false
                }
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.SistemaPinturaMensajeConfirmaEliminar[$("#language").data("kendoDropDownList").value()] +
                         "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

            ventanaConfirm.open().center();

            $("#yesButton").click(function () {                

                ventanaConfirm.close();
            });
            $("#noButton").click(function () {
                ventanaConfirm.close();
            });
    }
}
function editaSistemaPintura(e) {
    
    if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
        e.preventDefault();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        var SistemaPinturaID = dataItem.SistemaPinturaID;
        var url = '/Pintura/SistemaPintura/?sistPinturaID=' + SistemaPinturaID
        window.location.href = url;
    }
}

function CargarGridDetalle() {
    $("#gridDetalle").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        PruebaID: { type: "number", editable: true },
                        Prueba: { type: "string", editable: true },
                        NumPruebas: { type: "number", editable: true }
                    }
                }
            }, filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 }
                ]
            },
        },
        navigatable: true,
        filterable: {
            extra: false
        },
        click: function (e) {
        },
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        columns: [
                { field: "Prueba", title: _dictionary.lblPrueba[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), /*editor: comboBoxDefectos,*/ width: "20px" },
                { field: "NumPruebas", title: "No. Pruebas", filterable: getGridFilterableCellNumberMaftec(), width: "15px" },
                { field: "UnidadMinShotblast", title: _dictionary.columnUnidadMinima[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), format: "{0:n2}", width: "20px", attributes: { style: "text-align:right;" } },
                { field: "UnidadMAxShotblast", title: _dictionary.columnUnidadMaxima[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), format: "{0:n2}", width: "20px", attributes: { style: "text-align:right;" } },
        ]

    });
    CustomisaGrid($("#gridDetalle"));
}

function InsertRows() {
    var data = {
        Accion: 2,
        SistemaPinturaID: 1,
        SistemaPintura: "A1",
        UnidadMinShotblast: 2,
        UnidadMAxShotblast: 10,
        PruebaShotblast: "Ver detalle",
        UnidadMinPrimario: 2,
        UnidadMaxPrimario: 10,
        PruebaPrimario: "Ver detalle",
        ColorIntermedio: "Verde, Amarrillo",
        UnidadMinIntermedio: 2,
        UnidadMaxIntermedio: 10,
        PruebaIntermedio: "Ver detalle",
        ColorAcabado: "Rojo, Azul",
        UnidadMinAcabado: 2,
        UnidadMaxAcabado: 10,
        PruebaAcabado: "Ver detalle",
    }
    var data1 = {
        Accion: 2,
        SistemaPinturaID: 2,
        SistemaPintura: "A2",
        UnidadMinShotblast: 2,
        UnidadMAxShotblast: 10,
        PruebaShotblast: "Ver detalle",
        UnidadMinPrimario: 2,
        UnidadMaxPrimario: 10,
        PruebaPrimario: "Ver detalle",
        ColorIntermedio: "Verde, Amarrillo",
        UnidadMinIntermedio: 2,
        UnidadMaxIntermedio: 10,
        PruebaIntermedio: "Ver detalle",
        ColorAcabado: "Rojo, Azul",
        UnidadMinAcabado: 2,
        UnidadMaxAcabado: 10,
        PruebaAcabado: "Ver detalle",
    }
    var grid = $("#grid").data("kendoGrid");
    grid.dataSource.add(data);
    grid.dataSource.add(data1);
    grid.dataSource.sync();
}

function showModalDetail(data) {
    $("#spanDetalle").text('');
    $("#PinturaCargaDescargar").text("Guardar");
    windowDetailTest = $("#windowDetailTest").kendoWindow({
        iframe: true,
        modal: true,
        title: "Detalle de Pruebas",
        resizable: false,
        visible: true,
        width: "65%",
        //position: {
        //    left: "25%",
        //    right: "10%",
        //},
        actions: [
            "Close"
        ],
        close: function onClose(e) {
            //var gridDataSource = $("#gridPopUp").data("kendoGrid").dataSource;
            //gridDataSource.filter([]);
        }
    }).data("kendoWindow");
    windowDetailTest.open().center();
};
