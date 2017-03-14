var editado = false;
var ventanaConfirmEdicion;
var windowNewCarriage;


function changeLanguageCall() {
    SuscribirEventos();
    CargaGrid();
    AjaxCargarCamposPredeterminados();
    AjaxCargarProyecto();
    document.title = _dictionary.PinturaHeaderCargaCarro[$("#language").data("kendoDropDownList").value()];
}


function TryParseInt(str, defaultValue) {
    var retValue = defaultValue;
    if (str !== null) {
        if (str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
}

function LimpiarCargaCarro() {
    $("#grid").data('kendoGrid').dataSource.data([]);

    $("#labelM2").text("");
    $("#labelToneladas").text("");
  
}

function LimpiarCargaProyecto() {
    $("#inputCarro").data("kendoComboBox").dataSource.data([]);
    $("#inputCarro").data("kendoComboBox").value("");
    $("#labelM2").text("");
    $("#labelToneladas").text("");
    $("#grid").data('kendoGrid').dataSource.data([]);
    $("#InputOrdenTrabajo").val("");
    $("#InputID").val("");
    $("#inputCodigo").val("");
    
}

function LimpiarCambioEscenario() {
    $("#inputProyecto").data("kendoComboBox").value("");

    $("#inputCarro").data("kendoComboBox").dataSource.data([]);
    $("#inputCarro").data("kendoComboBox").value("");

    $("#labelM2").text("");
    $("#labelToneladas").text("");
    $("#chkCerrar")[0].checked = false;
    $("#grid").data('kendoGrid').dataSource.data([]);

}

function CargaGrid()
{
    $("#grid").kendoGrid({
        edit: function (e) {
            if ($('#Guardar').text() != _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            }
            else {
                var inputName = e.container.find('input');
                inputName.select();
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
                        EstatusCarga: { type: "boolean", editable: false }
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
            { field: "Prioridad", title: _dictionary.columnPrioridad[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), attributes: { style: "text-align:right;" } },
            { field: "NumeroControl", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "SistemaPintura", title: _dictionary.columnSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "ColorPintura", title: _dictionary.columnColor[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "Cuadrante", title: _dictionary.columnCuadrante[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            { field: "Area", title: _dictionary.columnM2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), format: "{0:n2}", attributes: { style: "text-align:right;" }, aggregates: ["sum"], footerTemplate: "<div style='text-align:right;'>SUM: #= kendo.toString(sum, 'n') #</div>" },
            { field: "Peso", title: _dictionary.columnPeso[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), format: "{0:n2}", attributes: { style: "text-align:right;" }, aggregates: ["sum"], footerTemplate: "<div style='text-align:right;'>SUM: #= kendo.toString(sum, 'n') #</div>" },
            { field: "MedioTransporte", title: _dictionary.columnMedioTransporte[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec() },
            {
                field: "Seleccionado", title: _dictionary.columnSeleccionado[$("#language").data("kendoDropDownList").value()], filterable: {
                    multi: true,
                    messages: {
                        isTrue: _dictionary.lblVerdadero[$("#language").data("kendoDropDownList").value()],
                        isFalse: _dictionary.lblFalso[$("#language").data("kendoDropDownList").value()],
                        style: "max-width:100px;"
                    },
                    dataSource: [{ Seleccionado: true }, { Seleccionado: false }]
                }, template: '<input type="checkbox" #= Seleccionado ? "checked=checked" : "" # class="chkbx"  ></input>', attributes: { style: "text-align:center;" }
            },
            { command: { text: _dictionary.botonDescarga[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: _dictionary.columnDescargar[$("#language").data("kendoDropDownList").value()], attributes: { style: "text-align:center;" } }
        ],
        dataBound: function (e) {
            var ds = $("#grid").data("kendoGrid");
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

    CustomisaGrid($("#grid"));
}

function eliminarCaptura(e) {
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()] && !$("#chkCerrarEscritorio")[0].disabled) {
        var filterValue = $(e.currentTarget).val();
        var dataItem = $("#grid[name='grid-Escritorio']").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        AjaxCargarZona($("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select()).PatioID);
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


function CargaPopupNuevoMedioTransporte(e) {
    $("#InputNombre").val("");

    windowNewCarriage = $("#divNuevoMedioTransporte").kendoWindow({
        iframe: false,
        title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
        visible: false,
        width: "502px",
        height: "auto",
        modal: true,
        draggable: false,
        resizable: false,
        animation: {
            close: false,
            open: false
        },
        actions: [],
        close: function () {
            $("#inputCarro").data("kendoComboBox").value("");
            $("#InputNombre").blur();
        }
    }).data("kendoWindow");

    $("#divNuevoMedioTransporte").data("kendoWindow").title(_dictionary.PinturaCargaNuevoCarro[$("#language").data("kendoDropDownList").value()]);
    $("#divNuevoMedioTransporte").data("kendoWindow").center().open();

    $("#InputNombre").focus();
}

function ImprimirAreaTonelada() {
    var ds = $("#grid").data("kendoGrid").dataSource;
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

        $("#labelM2").css('text-align', 'left');
        $("#labelToneladas").css('text-align', 'left');

        $("#labelM2").text(totalAreaCargada != 0 ? totalAreaCargada.toFixed(2) : "");
        $("#labelToneladas").text(totalToneladasCargadas != 0 ? totalToneladasCargadas.toFixed(2) : "");
    }

    //return totalAreaCargada;
}

function validarInformacion(row) {
    //solo para patio.
    var ds = $("#grid").data("kendoGrid").dataSource;
    var existe = false;

    for (var i = 0; i < ds._data.length; i++) {
        if (ds._data[i]["SpoolID"] == row.SpoolID && ds._data[i]["Accion"] != 3) {
            existe = true;
            break;
        }
    }
    return existe;
}