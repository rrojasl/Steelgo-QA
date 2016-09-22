﻿function RenderNumeroPlacas(container, options) {
    var dataItem;
    $('<input data-text-field="NumeroPlacas" id=' + options.model.uid + ' data-value-field="NumeroPlacas" data-bind="value:' + options.field + '" onblur="renderDataSourceNumeroPlacas(\'' + options.model.SpoolID + '\', \'' + options.model.JuntaSpoolID + '\',\'' + options.model.OrdenTrabajoID + '\');" />')
    .appendTo(container)
    .kendoNumericTextBox({
        format: "#",
        min: 0
    });
}

function RenderTamano(container, options) {
    var dataItem;
    $('<input data-text-field="Tamano" id=' + options.model.uid + ' data-value-field="Tamano" data-bind="value:' + options.field + '"/>')
    .appendTo(container)
    .kendoNumericTextBox({
        format: "#.0000",
        min: 0
    });
}

function RenderDensidad(container, options) {
    var dataItem;
    $('<input data-text-field="Densidad" id=' + options.model.uid + ' data-value-field="Densidad" data-bind="value:' + options.field + '"/>')
    .appendTo(container)
    .kendoNumericTextBox({
        format: "#.0000",
        min: 0
    });
}

function renderDataSourceNumeroPlacas(spoolJunta, junta, numeroControl) {
    //alert(spoolJunta);
    //var infoResults = new Array($("#grid").data("kendoGrid").dataSource._data.NumeroPlacas);
    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
        if ((spoolJunta == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (junta == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (numeroControl == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
            $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados = new Array($("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas);
            for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas; j++) {
                if (j != ($("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas - 1))
                    $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j] = { ReporteRTResultadosID: 0, ReporteRTID: $("#grid").data("kendoGrid").dataSource._data[i].ReporteRTID, OrdenTrabajoID: $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID, SpoolID: $("#grid").data("kendoGrid").dataSource._data[i].SpoolID, JuntaSpoolID: $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID, NumeroControl: $("#grid").data("kendoGrid").dataSource._data[i].NumeroControl, Ubicacion: j + '-' + (j + 1), Resultado: -1, DetalleResultados: [], Accion: 1 };
                else
                    $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j] = { ReporteRTResultadosID: 0, ReporteRTID: $("#grid").data("kendoGrid").dataSource._data[i].ReporteRTID, OrdenTrabajoID: $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID, SpoolID: $("#grid").data("kendoGrid").dataSource._data[i].SpoolID, JuntaSpoolID: $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID, NumeroControl: $("#grid").data("kendoGrid").dataSource._data[i].NumeroControl, Ubicacion: j + '-' + 0, Resultado: -1, DetalleResultados: [], Accion: 1 };
            }
            break;
        }
    }
}

function renderEnlaceEditar(container, options) {
    $('<a  id=' + options.model.uid + ' "><span >' + _dictionary.ValidacionResultadosEnlaceEditar[$("#language").data("kendoDropDownList").value()] + '</span></a>')
        .appendTo(container)
    //.click(AjaxObtenerRenglonEdicionDefectos(options.model))
        .click(VentanaModal(options.model))
    ;

}

function VentanaModal(model) {

    loadingStart();
    //modeloRenglon = model;
    $("#gridPopUp").data('kendoGrid').dataSource.data(model.DetalleResultados);
    //var ds = $("#gridPopUp").data("kendoGrid").dataSource;
    //var array = model.ListaDetalleDefectos;
    //if (array != null) {
    //    for (var i = 0; i < array.length; i++) {
    //        ds.add(array[i]);
    //    }
    //}
    //VentanaModal();


    var modalTitle = model.SpoolID + "_" + model.JuntaSpoolID + "_" + model.OrdenTrabajoID + "_" + model.Ubicacion;
    //modalTitle = _dictionary.ValidacionResultadosRequisicion[$("#language").data("kendoDropDownList").value()];
    var window = $("#windowGrid");
    var win = window.kendoWindow({
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: true,
        width: "50%",
        minWidth: 30,
        position: {
            top: "1%",
            left: "1%"
        },
        actions: [
            "Pin",
            "Minimize",
            "Maximize",
            "Close"
        ],
    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

    loadingStop();
}

function RenderGridDetalle(container, options) {
    $('<div name=' + options.model.SpoolJunta + '/>')
    .appendTo(container)
    .kendoGrid({
        dataSource: {
            data: options.model.NumeroPlacas == "0" ? "" : options.model.InformacionResultados,
            schema: {
                model: {
                    fields: {
                        Ubicacion: { type: "string", editable: false },
                        Resultado: { type: "number", editable: true },
                        DetalleResultados: { type: "object", editable: true },
                    }
                }
            },
        },
        selectable: true,
        columns: [

          { field: "Ubicacion", title: _dictionary.ValidacionResultadosCabeceraUbicacion[$("#language").data("kendoDropDownList").value()], filterable: true, width: "90px" },
          { field: "Resultado", title: _dictionary.CapturaReportePruebasHeaderResultado[$("#language").data("kendoDropDownList").value()], filterable: true, editor: comboBoxResultado, width: "100px" },
          { field: "DetalleResultados", title: _dictionary.CapturaReportePruebasHeaderDetalleDefectos[$("#language").data("kendoDropDownList").value()], filterable: false, width: "200px", editor: renderEnlaceEditar, template: "Tienes " + "#=DetalleResultados.length#" + " defectos" }
          //,
          //{
          //    command: {
          //        text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
          //        click: function (e) {
          //            e.preventDefault();
          //            dataItem = this.dataItem($(e.currentTarget).closest("tr"));


          //            if (confirm(_dictionary.CapturaEliminar[$("#language").data("kendoDropDownList").value()])) {
          //                var dataSource = this.dataSource;
          //                dataSource.remove(dataItem);
          //            }
          //            options.model.NumeroPlacas = String(dataSource._data.length);

          //            this.dataSource.sync();
          //        }
          //    }, width: "100px"
          //}

        ],
        editable: true,
        navigatable: true,
    });

};


function comboBoxResultado(container, options) {
    var dataItem;

    $('<input required data-text-field="NombreCombo" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            //autoBind: false,
            dataSource: [
                    { ResultadoCombo: 0, NombreCombo: "Rechazado"/*_dictionary.ValidacionResultadosComboRechazado[$("#language").data("kendoDropDownList").value()]*/ },
                    { ResultadoCombo: 1, NombreCombo: "Aceptado"/*_dictionary.ValidacionResultadosComboAceptado[$("#language").data("kendoDropDownList").value()]*/ }
            ],
            dataTextField: "NombreCombo",
            dataValueField: "ResultadoCombo",
            //index: -1,
            select: function (e) {
                //dataItem = this.dataItem(e.item.index());
                //options.model.Nombre = dataItem.Nombre;
                //options.model.Resultado = dataItem.Resultado;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    //    options.model.Nombre = dataItem.Nombre;
                    //    options.model.Resultado = dataItem.Resultado;
                    actualizaResultado(options.model, dataItem);
                }
                //else
                //    options.model.Nombre = ObtenerDescCorrectaResultados(this.dataSource._data, options.model.Resultado);


            }
        }
    );
}

function actualizaResultado(dataItem, nuevoValor) {
    //alert(spoolJunta);
    //var infoResults = new Array($("#grid").data("kendoGrid").dataSource._data.NumeroPlacas);
    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
        if ((dataItem.SpoolID == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (dataItem.JuntaSpoolID == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (dataItem.OrdenTrabajoID == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
            //var ubicacionTemp = '';
            for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas; j++) {

                //if (j != ($("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas - 1))
                //    ubicacionTemp = j + '-' + (j + 1);
                //else 
                //    ubicacionTemp = j + '-' + 0;
                if ($("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].Ubicacion == dataItem.Ubicacion) {
                    $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].Resultado = nuevoValor.ResultadoCombo;
                    break;
                }
            }
            break;
        }
    }
}

function CargarGridPopUp() {

    $("#gridPopUp").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {

                        Defectos: { type: "string", editable: true },
                        InicioMM: { type: "string", editable: true },
                        FinMM: { type: "string", editable: true },
                    }
                }
            }, filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 },
                    { field: "Accion", operator: "eq", value: 0 },
                    { field: "Accion", operator: "eq", value: undefined }
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
                { field: "Defectos", title: _dictionary.CapturaReportePruebasHeaderDefecto[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: comboBoxDefectos, width: "20px" },
                { field: "InicioMM", title: _dictionary.CapturaReportePruebasHeaderInicio[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "15px" },
                { field: "FinMM", title: _dictionary.CapturaReportePruebasHeaderFin[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "15px" }
            ,
            {
                command: {
                    name: "",
                    title: "",
                    text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                    click: function (e) {
                        e.preventDefault();
                        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                        var dataSource = this.dataSource;
                        if (confirm(_dictionary.CapturaReportePruebasMensajeEliminarDefecto[$("#language").data("kendoDropDownList").value()])) {
                            dataItem.Accion = 3;
                            //this.removeRow("tr:eq("+dataItem+")");
                        }
                        dataSource.sync();
                    }
                },
                width: "10px"
            }
        ],
        editable: "incell",
        toolbar: [{ name: "create" }]

    });
    CustomisaGrid($("#gridPopUp"));
};


function comboBoxDefectos(container, options) {
    var dataItem;
    $('<input required data-text-field="DefectoCombo" id=' + options.model.uid + ' data-value-field="DefectoCombo" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataTextField: "DefectoCombo",
            dataValueField: "DefectoIDCombo",
            dataSource: [
                    { DefectoIDCombo: 1, DefectoCombo: "P"/*_dictionary.ValidacionResultadosComboRechazado[$("#language").data("kendoDropDownList").value()]*/ },
                    { DefectoIDCombo: 2, DefectoCombo: "FF"/*_dictionary.ValidacionResultadosComboAceptado[$("#language").data("kendoDropDownList").value()]*/ }
            ],
            //template: "<i class=\"fa fa-#=data.Defectos#\"></i> #=data.Defectos#",
            select: function (e) {
                //dataItem = this.dataItem(e.item.index());
                //options.model.DefectoID = dataItem.DefectoID;
                //options.model.Nombre = dataItem.Nombre;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.DefectoIDCombo = dataItem.DefectoIDCombo;
                    options.model.DefectoCombo = dataItem.DefectoCombo;
                }
                //else
                //    options.model.DefectoCombo = dataItem.DefectoIDCombo;//ObtenerDescCorrectaDefectos(comboDefectos, options.model.DefectoID);

                //actualizaDefectoComboItem(options.model, dataItem);
            }
        }
        );
}

function actualizaDefectoComboItem(dataItem, nuevoValor) {
    //for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
    //    if ((dataItem.SpoolID == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (dataItem.JuntaSpoolID == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (dataItem.OrdenTrabajoID == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
    //        for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas; j++) {
    //            if ($("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].Ubicacion == dataItem.Ubicacion) {
    //                $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].Resultado = nuevoValor.ResultadoCombo;
    //                break;
    //            }
    //        }
    //        break;
    //    }
    //}
}


function actualizaDefectos(dataItemsStr, defectosArray) {
    //alert(spoolJunta);
    //var infoResults = new Array($("#grid").data("kendoGrid").dataSource._data.NumeroPlacas);
    var dataItemsArrays = dataItemsStr.split("_");
    if (dataItemsArrays.length == 4) {
        for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
            if ((dataItemsArrays[0] == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (dataItemsArrays[1] == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (dataItemsArrays[2] == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
                for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados.length; j++) {

                    if ($("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].Ubicacion == dataItemsArrays[3]) {
                        $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].DetalleResultados = new Array(defectosArray.length);
                        for (var k = 0; k < defectosArray.length; k++) {
                            $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].DetalleResultados[k] = { ResultadosDefectoID: 0, ReporteResultadosID: 0, OrdenTrabajoID: $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID, SpoolID: $("#grid").data("kendoGrid").dataSource._data[i].SpoolID, JuntaSpoolID: $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID, DefectoID: defectosArray[k].DefectoIDCombo, InicioMM: defectosArray[k].InicioMM, FinMM: defectosArray[k].FinMM, Accion: 1 };
                        }
                        //if ($("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].Ubicacion == dataItem.Ubicacion) {
                        //$("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].Resultado = nuevoValor.Resultado;
                        break;
                    }
                }
                break;
            }
        }
    }
}

function hayDatosCapturados() {
    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
        if ($("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas != 0) {
            for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados.length; j++) {

                if ($("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].DetalleResultados.length != 0) {
                    return true;
                    //for (var k = 0; k < defectosArray.length; k++) {
                    //    $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].DetalleResultados[k] = { Defectos: defectosArray[k].Defectos, InicioMM: defectosArray[k].InicioMM, FinMM: defectosArray[k].FinMM };
                    //}
                }
            }
        }
    }

    return false;
}

var infoGridTemp = null;
var llamadasATodos = 0;
function filtraDatosCapturados(tipoFiltro) {
    loadingStart();

    if (infoGridTemp == null)
        infoGridTemp = $("#grid").data("kendoGrid").dataSource._data;

    $("#grid").data('kendoGrid').dataSource.data([]);

    if (tipoFiltro == "SinCaptura") {
        for (var i = 0; i < infoGridTemp.length; i++) {
            if (infoGridTemp[i].NumeroPlacas == 0) {
                $("#grid").data("kendoGrid").dataSource.add(infoGridTemp[i]);
            }
        }
    }
    else if (tipoFiltro == "Todos") {
        for (var i = 0; i < infoGridTemp.length; i++) {
            //if (infoGridTemp[i].NumeroPlacas != 0) {
            $("#grid").data("kendoGrid").dataSource.add(infoGridTemp[i]);
            //}
        }
    }

    loadingStop();
}
