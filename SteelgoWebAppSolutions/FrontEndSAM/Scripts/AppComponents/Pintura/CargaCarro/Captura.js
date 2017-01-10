IniciarCapturaCargaCarro();

function IniciarCapturaCargaCarro() {
    SuscribirEventos();

   // opcionHabilitarViewBacklog(true, null);
}

function changeLanguageCall() {
    CargarGridEscritorio();
    CargarGridPatio();
    AjaxCargarCamposPredeterminados();
    AjaxCargarProyecto();
    document.title = _dictionary.PinturaHeaderCargaCarro[$("#language").data("kendoDropDownList").value()];

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
            schema: {
                model: {
                    fields: {
                        Accion: { type: "number", editable: false },
                        MedioTransporteCargaDetalleID: { type: "number", editable: false },
                        OrdenTrabajoID: { type: "number", editable: false },
                        SpoolID: { type: "number", editable: false },
                        Prioridad: { type: "number", editable: false },
                        NumeroControl: { type: "string", editable: false },
                        SistemaPinturaID: { type: "number", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        ColorPintura: { type: "string", editable: false },
                        CuadranteID: { type: "number", editable: false },
                        CuadranteAnteriorID: { type: "number", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Area: { type: "number", editable: false },
                        Peso: { type: "number", editable: false },
                        MedioTransporte: { type: "string", editable: false },
                        Seleccionado: { type: "boolean", editable: false },
                        EstatusCaptura: { type: "number", editable: false },
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
            { field: "Prioridad", title: _dictionary.columnPrioridad[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "88px", attributes: { style: "text-align:right;" } },
            { field: "NumeroControl", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px" },
            { field: "SistemaPintura", title: _dictionary.columnSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "135px" },
            { field: "ColorPintura", title: _dictionary.columnColor[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "110px" },
            { field: "Cuadrante", title: _dictionary.columnCuadrante[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px" },
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
                }, template: '<input type="checkbox" #= Seleccionado ? "checked=checked" : "" # class="chkbx"  ></input>', width: "130px", attributes: { style: "text-align:center;" }
            },
            { command: { text: _dictionary.botonDescarga[$("#language").data("kendoDropDownList").value()], click: eliminarCapturaEscritorio }, title: _dictionary.columnDescargar[$("#language").data("kendoDropDownList").value()], width: "60px", attributes: { style: "text-align:center;" } }
        ],
        dataBound: function (e) {
            var ds = $("#grid[name='grid-Escritorio']").data("kendoGrid");
            var gridData = ds.dataSource.view();

            if (gridData.length > 0) {
                for (var i = 0; i < gridData.length; i++) {
                    var currentUid = gridData[i].uid;
                    if (gridData[i].Accion != 2) {
                        var currenRow = ds.table.find("tr[data-uid='" + currentUid + "']");
                        var editButton = $(currenRow).find(".k-button");
                        editButton.hide();
                    }
                }
            }

        }
    });
    $("#grid[name='grid-Escritorio'] .k-grid-content").on("change", ":checkbox", function (e) {
        if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()] && !$("#grid[name='grid-Escritorio']")[0].disabled) {
            if($("#inputCarroEscritorio").data("kendoComboBox").value()!="" && $("#inputCarroEscritorio").data("kendoComboBox").value()!="0"){
                var grid = $("#grid[name='grid-Escritorio']").data("kendoGrid");
                var dataItem = grid.dataItem($(e.target).closest("tr"));
                var SistemaPintura = ValidarExisteSeleccionadoSistemaPintura(); ;
                if (SistemaPintura==undefined || SistemaPintura == dataItem.SistemaPintura) {
                    if (!dataItem.Status) {
                        if ($(this)[0].checked) {
                            dataItem.Seleccionado = true;
                            
                        } else {
                            dataItem.Seleccionado = false;
                        }
                    } else {
                        $(this)[0].checked = true;
                    }
                } else {
                    $(this)[0].checked = false;
                    displayNotify("", _dictionary.PinturaCargaBackLogMensajeErrorServicioPintura[$("#language").data("kendoDropDownList").value()] + SistemaPintura, "1");
                }
            } else {
                $(this)[0].checked = false;
                displayNotify("PinturaSeleccionaCarro","", "1");
            }
            ImprimirAreaToneladaBackLog();
        } else {
            var grid = $("#grid[name='grid-Escritorio']").data("kendoGrid");
            var dataItem = grid.dataItem($(e.target).closest("tr"));
            dataItem.closeCell();
        }
    });
    CustomisaGrid($("#grid[name='grid-Escritorio']"));
}

function ValidarExisteSeleccionadoSistemaPintura() {
    var grid = $("#grid[name='grid-Escritorio']").data("kendoGrid");

    for (var i = 0; i < grid.dataSource._data.length; i++) {
        if(grid.dataSource._data[i].Seleccionado)
            return grid.dataSource._data[i].SistemaPintura
    }
    return undefined
};
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
                        Accion: { type: "number", editable: false },
                        MedioTransporteCargaDetalleID: { type: "number", editable: false },
                        EstatusCarga: { type: "boolean", editable: false },
                        OrdenTrabajoID: { type: "number", editable: false },
                        SpoolID: { type: "number", editable: false },
                        NumeroControl: { type: "string", editable: false },
                        SistemaPinturaID: { type: "number", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        ColorPintura: { type: "string", editable: false },
                        CuadranteID: { type: "number", editable: false },
                        CuadranteAnteriorID: { type: "number", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Area: { type: "number", editable: false },
                        Peso: { type: "number", editable: false },
                        EstatusCaptura: { type: "number", editable: false }
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
            { field: "Cuadrante", title: _dictionary.columnCuadrante1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px", footerTemplate: "<div style='text-align:right; width:120px;'></div>" },
            { field: "Area", type: 'number', title: _dictionary.columnM21[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px", format: "{0:n2}", attributes: { style: "text-align:right;" }, aggregates: ["sum"], footerTemplate: "<div style='text-align:right;'>SUM: #= kendo.toString(sum, 'n') #</div>" },
            { field: "Peso", type: 'number', title: _dictionary.columnPeso1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px", format: "{0:n2}", attributes: { style: "text-align:right;" }, aggregates: ["sum"], footerTemplate: "<div style='text-align:right;'>SUM: #= kendo.toString(sum, 'n') #</div>" },
            { command: { text: _dictionary.botonDescarga[$("#language").data("kendoDropDownList").value()], click: eliminarCapturaPatio }, title: _dictionary.columnDescargar1[$("#language").data("kendoDropDownList").value()], width: "50px", attributes: { style: "text-align:center;" } }
        ],
        dataBound: function (e) {
        var ds = $("#grid[name='grid-Escritorio']").data("kendoGrid");
        var gridData = ds.dataSource.view();

        if (gridData.length > 0) {
            for (var i = 0; i < gridData.length; i++) {
                var currentUid = gridData[i].uid;
                if (gridData[i].Accion != 2) {
                    var currenRow = ds.table.find("tr[data-uid='" + currentUid + "']");
                    var editButton = $(currenRow).find(".k-button");
                    editButton.hide();
                }
            }
        }

    }
    });

    CustomisaGrid($("#grid[name='grid-Patio']"));
}

function eliminarCapturaEscritorio(e) {    
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()] && !$("#chkCerrarEscritorio")[0].disabled) {
        var filterValue = $(e.currentTarget).val();
        var dataItem = $("#grid[name='grid-Escritorio']").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        if (dataItem.Accion != 1 && $("#inputCarroEscritorio").data("kendoComboBox").value() != "0" && $("#inputCarroEscritorio").data("kendoComboBox").value() != "") {
            windowDownload = $("#windowDownload").kendoWindow({
                iframe: true,
                title: _dictionary.PinturaCargaTitulo[$("#language").data("kendoDropDownList").value()],
                visible: false,
                width: "auto",
                height: "auto",
                modal: true,
                animation: {
                    close: false,
                    open: false
                },
                actions: [
                    "Close"
                ],
            }).data("kendoWindow");


            windowDownload.open().center();

            $("#btnDescargar").click(function (handler) {
                var dataSource = $("#grid[name='grid-Escritorio']").data("kendoGrid").dataSource;
                if ($("#inputCuadrantePopup").data("kendoComboBox").value() != "") {
                    if (dataItem.Accion === 1) {
                        dataSource.remove(dataItem);
                    }
                    else {
                        dataItem.CuadranteID = $("#inputCuadrantePopup").data("kendoComboBox").value();
                        dataItem.Accion = 3;
                    }

                    windowDownload.close();
                    ImprimirAreaToneladaBackLog();
                    dataSource.sync();

                } else {
                    displayNotify("PinturaCargaCuadrante", '', '1');
                }

            });

            $("#btnCerrarPopup").click(function () {
                windowDownload.close();
            });
        }
    }
}

function eliminarCapturaPatio(e) {
    e.preventDefault();
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
    }
}

function FiltroMostrar(mostrar) {
    var ds = $("#grid[name='grid-Patio']").data("kendoGrid").dataSource;

    if (mostrar == 0) {
        var curr_filters = ds.filter().filters;
        if (curr_filters[0].filters != undefined)
            ds.filter(curr_filters[0].filters[0])
        else
            ds.filter(curr_filters[0])
        ds.sync();

        if (ds._data.length > 0) {
            ImprimirAreaTonelada();
        } else {
            $("#labelM2P").text("");
            $("#labelToneladasP").text("");
        }

    }
    else {

        var curr_filters = ds.filter().filters;
        ds.filter(curr_filters[0])
        ds.sync();
        var filters = ds.filter();
        filters.logic = "or"

        filters.filters.push({ field: "Accion", operator: "eq", value: 2 });
        ds.sync();

        ImprimirAreaTonelada();
    }
}

function FiltroMostrarBack(mostrar) {
    var ds = $("#grid[name='grid-Escritorio']").data("kendoGrid").dataSource;

    if (mostrar == 0) {
        var curr_filters = ds.filter().filters;
        if (curr_filters[0].filters != undefined)
            ds.filter(curr_filters[0].filters[0])
        else
            ds.filter(curr_filters[0])
        ds.sync();

        if (ds._data.length > 0) {
            ImprimirAreaToneladaBackLog();
        } else {
            $("#labelM2P").text("");
            $("#labelToneladasP").text("");
        }

    }
    else {

        var curr_filters = ds.filter().filters;
        ds.filter(curr_filters[0])
        ds.sync();
        var filters = ds.filter();
        filters.logic = "or"

        filters.filters.push({ field: "Accion", operator: "eq", value: 2 });
        ds.sync();

        ImprimirAreaToneladaBackLog();
    }
}

function ImprimirAreaTonelada() {
    var ds = $("#grid[name='grid-Patio']").data("kendoGrid").dataSource;
    var array = ds._data;
    var totalAreaCargada = 0;
    var totalToneladasCargadas = 0;
    var curr_filters = ds.filter().filters;

    if (ds._data.length > 0) {

        for (var i = 0; i < array.length; i++) {
            if (curr_filters.length > 1) {
                if (array[i]["Accion"] == 1 || array[i]["Accion"] == 2) {
                    totalAreaCargada += parseFloat(array[i]["Area"], 10);
                    totalToneladasCargadas += parseFloat(array[i]["Peso"], 10);
                }
            } else {
                if (array[i]["Accion"] == 1) {
                    totalAreaCargada += parseFloat(array[i]["Area"], 10);
                    totalToneladasCargadas += parseFloat(array[i]["Peso"], 10);
                }
            }
        }

        totalToneladasCargadas = totalToneladasCargadas / 1000;

        $("#labelM2P").css('text-align', 'left');
        $("#labelToneladasP").css('text-align', 'left');

        $("#labelM2P").text(totalAreaCargada != 0 ? totalAreaCargada.toFixed(2) : "");
        $("#labelToneladasP").text(totalToneladasCargadas != 0 ? totalToneladasCargadas.toFixed(2) : "");
    }

    //return totalAreaCargada;
}

function ImprimirAreaToneladaBackLog() {
    var ds = $("#grid[name='grid-Escritorio']").data("kendoGrid").dataSource;
    var array = ds._data;
    var totalAreaCargada = 0;
    var totalToneladasCargadas = 0;
    var curr_filters = ds.filter().filters;

    if (ds._data.length > 0) {
        for (var i = 0; i < array.length; i++) {
            if (curr_filters.length > 1) {
                if ((array[i]["Accion"] == 1 || array[i]["Accion"] == 2) && array[i].Seleccionado) {
                    totalAreaCargada += parseFloat(array[i]["Area"], 10);
                    totalToneladasCargadas += parseFloat(array[i]["Peso"], 10);
                }
            } else {
                if (array[i]["Accion"] == 1 && array[i].Seleccionado) {
                    totalAreaCargada += parseFloat(array[i]["Area"], 10);
                    totalToneladasCargadas += parseFloat(array[i]["Peso"], 10);
                }
            }
        }
        totalToneladasCargadas = totalToneladasCargadas / 1000;

        $("#labelM2E").css('text-align', 'left');
        $("#labelToneladasE").css('text-align', 'left');

        $("#labelM2E").text(totalAreaCargada != 0 ? totalAreaCargada.toFixed(2) : "");
        $("#labelToneladasE").text(totalToneladasCargadas != 0 ? totalToneladasCargadas.toFixed(2) : "");
    }
    //return totalAreaCargada;
}

function validarInformacion(row) {
    var ds = $("#grid[name='grid-Patio']").data("kendoGrid").dataSource;
    var existe = false;

    for (var i = 0; i < ds._data.length; i++) {
        if (ds._data[i]["SpoolID"] == row.SpoolID && ds._data[i]["Accion"] != 3) {
            existe = true;
            break;
        }
    }
    return existe;
}