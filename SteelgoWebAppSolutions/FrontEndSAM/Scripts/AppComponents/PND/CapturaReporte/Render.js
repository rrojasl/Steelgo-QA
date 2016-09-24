﻿var listaDefectosAuxiliar;
function RenderNumeroPlacas(container, options) {
    var dataItem;
    $('<input data-text-field="NumeroPlacas" id=' + options.model.uid + ' data-value-field="NumeroPlacas" data-bind="value:' + options.field + '" onblur="renderDataSourceNumeroPlacas(\'' + options.model.SpoolID + '\', \'' + options.model.JuntaSpoolID + '\',\'' + options.model.OrdenTrabajoID + '\');" />')
    .appendTo(container)
    .kendoNumericTextBox({
        format: "#",
        min: 0
        //,
        //change: function (e)
        //{
        //    alert("xd");
        //}
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
            $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas = new Array($("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas);
            for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas; j++) {
                if (j != ($("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas - 1))
                    $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j] = { ReporteRTResultadosID: 0, ReporteRTID: $("#grid").data("kendoGrid").dataSource._data[i].ReporteRTID, OrdenTrabajoID: $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID, SpoolID: $("#grid").data("kendoGrid").dataSource._data[i].SpoolID, JuntaSpoolID: $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID, NumeroControl: $("#grid").data("kendoGrid").dataSource._data[i].NumeroControl, Ubicacion: j + '-' + (j + 1), Resultado: '', ListaDetalleDefectos: [], Accion: 1, ListaResultados: $("#grid").data("kendoGrid").dataSource._data[i].ListaResultados, ListaDefectos: $("#grid").data("kendoGrid").dataSource._data[i].ListaDefectos };
                else
                    $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j] = { ReporteRTResultadosID: 0, ReporteRTID: $("#grid").data("kendoGrid").dataSource._data[i].ReporteRTID, OrdenTrabajoID: $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID, SpoolID: $("#grid").data("kendoGrid").dataSource._data[i].SpoolID, JuntaSpoolID: $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID, NumeroControl: $("#grid").data("kendoGrid").dataSource._data[i].NumeroControl, Ubicacion: j + '-' + 0, Resultado: '', ListaDetalleDefectos: [], Accion: 1, ListaResultados: $("#grid").data("kendoGrid").dataSource._data[i].ListaResultados, ListaDefectos: $("#grid").data("kendoGrid").dataSource._data[i].ListaDefectos };
            }
            break;
        }
    }
}

function renderEnlaceEditar(container, options) {
    $('<a  id=' + options.model.uid + ' "><span >' + _dictionary.ValidacionResultadosEnlaceEditar[$("#language").data("kendoDropDownList").value()] + '</span></a>')
        .appendTo(container)
    //.click(AjaxObtenerRenglonEdicionDefectos(options.model))
        .click(VentanaModal(options.model));

    listaDefectosAuxiliar = options.model.ListaDefectos;
}

function renderDataSourceDetalleDefectos(spoolJunta, junta, numeroControl) {
    //alert(spoolJunta);
    //var infoResults = new Array($("#grid").data("kendoGrid").dataSource._data.NumeroPlacas);
    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
        if ((spoolJunta == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (junta == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (numeroControl == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
            $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas = new Array($("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas);
            for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas; j++) {
                if (j != ($("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas - 1))
                    $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j] = { ReporteRTResultadosID: 0, ReporteRTID: $("#grid").data("kendoGrid").dataSource._data[i].ReporteRTID, OrdenTrabajoID: $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID, SpoolID: $("#grid").data("kendoGrid").dataSource._data[i].SpoolID, JuntaSpoolID: $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID, NumeroControl: $("#grid").data("kendoGrid").dataSource._data[i].NumeroControl, Ubicacion: j + '-' + (j + 1), Resultado: '', ListaDetalleDefectos: [], Accion: 1, ListaResultados: $("#grid").data("kendoGrid").dataSource._data[i].ListaResultados, ListaDefectos: $("#grid").data("kendoGrid").dataSource._data[i].ListaDefectos };
                else
                    $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j] = { ReporteRTResultadosID: 0, ReporteRTID: $("#grid").data("kendoGrid").dataSource._data[i].ReporteRTID, OrdenTrabajoID: $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID, SpoolID: $("#grid").data("kendoGrid").dataSource._data[i].SpoolID, JuntaSpoolID: $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID, NumeroControl: $("#grid").data("kendoGrid").dataSource._data[i].NumeroControl, Ubicacion: j + '-' + 0, Resultado: '', ListaDetalleDefectos: [], Accion: 1, ListaResultados: $("#grid").data("kendoGrid").dataSource._data[i].ListaResultados, ListaDefectos: $("#grid").data("kendoGrid").dataSource._data[i].ListaDefectos };
            }
            break;
        }
    }
}

function VentanaModal(model) {
    //modeloRenglon = model;
    //$("#gridPopUp").data('kendoGrid').dataSource.data(model.ListaDetalleDefectos);
    CargarGridPopUp(model.ListaDetalleDefectos, model);
}

function RenderGridDetallePorPlaca(container, options) {
    $('<div name=' + options.model.SpoolJunta + '/>')
    .appendTo(container)
    .kendoGrid({
      dataSource: {
          data: options.model.ListaDetallePorPlacas,
          schema: {
              model: {
                  fields: {
                      Ubicacion: { type: "string", editable: false },
                      Resultado: { type: "String", editable: true },
                      ListaDetalleDefectos: { type: "object", editable: true },
                  }
              }
          },
      },
      selectable: true,
      columns: [

        { field: "Ubicacion", title: _dictionary.ValidacionResultadosCabeceraUbicacion[$("#language").data("kendoDropDownList").value()], filterable: true, width: "90px" },
        { field: "Resultado", title: _dictionary.CapturaReportePruebasHeaderResultado[$("#language").data("kendoDropDownList").value()], filterable: true, editor: comboBoxResultadoDetallePlaca, width: "100px" },
        { field: "ListaDetalleDefectos", title: _dictionary.CapturaReportePruebasHeaderDetalleDefectos[$("#language").data("kendoDropDownList").value()], filterable: false, width: "200px", editor: renderEnlaceEditar, template: "Tienes " + "#=ListaDetalleDefectos.length#" + " defectos" }
      ],
      editable: true,
      navigatable: true,
  });

    //CustomisaGrid($('<div name=' + options.model.SpoolJunta + '/>'));
};


function comboBoxResultadoDetallePlaca(container, options) {
    var dataItem;

    $('<input required data-text-field="Resultado" id=' + options.model.uid + ' data-value-field="Resultado" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaResultados,
            dataTextField: "Resultado",
            dataValueField: "ResultadosID",
            template: "<i class=\"fa fa-#=data.Resultado#\"></i> #=data.Resultado#",
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
                if ($("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].Ubicacion == dataItem.Ubicacion) {
                    $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].Resultado = nuevoValor.Resultado;
                    $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].ResultadoID = nuevoValor.ResultadosID;
                    break;
                }
            }
            break;
        }
    }
}

function CargarGridPopUp(ListaDetalleDefectos, model) {

    $("#gridPopUp").kendoGrid({
        ////autoBind: true,
        dataSource: {
            data: ListaDetalleDefectos,
            schema: {
                model: {
                    fields: {
                        Defectos: { type: "string", editable: true },
                        InicioMM: { type: "string", editable: true },
                        FinMM: { type: "string", editable: true },
                        ListaDefectos: { type: "object", editable: true }
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
        filterable: {
            extra: false
        },
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        autoHeight: true,
        sortable: true,
        scrollable: true,
        columns: [
                { field: "Defectos", title: _dictionary.CapturaReportePruebasHeaderDefecto[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "20px" },
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
        editable: true,
        navigatable: true,
        toolbar: [{ name: "create" }]

    });
    CustomisaGrid($("#gridPopUp"));

    //WindowModalGridDefectoDetalle(model);
};

function WindowModalGridDefectoDetalle(model) {
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
}

function comboBoxDefectos(container, options) {
    var dataItem;
    $('<input required data-text-field="Defecto" id=' + options.model.uid + ' data-value-field="Defecto" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataTextField: "Defecto",
            dataValueField: "DefectoID",
            dataSource: listaDefectosAuxiliar,
            //template: "<i class=\"fa fa-#=data.Defecto#\"></i> #=data.Defecto#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                //    options.model.DefectoIDCombo = dataItem.DefectoIDCombo;
                    //    options.model.DefectoCombo = dataItem.DefectoCombo;
                    //actualizaDefectoComboItem(options.model, dataItem);
                }
                ////else
                //    options.model.DefectoCombo = dataItem.DefectoIDCombo;//ObtenerDescCorrectaDefectos(comboDefectos, options.model.DefectoID);

                
            }
        }
        );
}

function actualizaDefectoComboItem(dataItem, comboBoxItemSelected) {
    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
        if ((dataItem.SpoolID == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (dataItem.JuntaSpoolID == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (dataItem.OrdenTrabajoID == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
            for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas; j++) {
                if ($("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].Ubicacion == dataItem.Ubicacion) {
                    $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].Resultado = comboBoxItemSelected.ResultadoCombo;
                    break;
                }
            }
            break;
        }
    }
}


function actualizaDefectos(dataItemsStr, defectosArray) {
    //alert(spoolJunta);
    //var infoResults = new Array($("#grid").data("kendoGrid").dataSource._data.NumeroPlacas);
    var dataItemsArrays = dataItemsStr.split("_");
    if (dataItemsArrays.length == 4) {
        for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
            if ((dataItemsArrays[0] == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (dataItemsArrays[1] == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (dataItemsArrays[2] == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
                for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas.length; j++) {

                    if ($("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].Ubicacion == dataItemsArrays[3]) {
                        $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].DetalleResultados = new Array(defectosArray.length);
                        for (var k = 0; k < defectosArray.length; k++) {
                            $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].DetalleResultados[k] = { ResultadosDefectoID: 0, ReporteResultadosID: 0, OrdenTrabajoID: $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID, SpoolID: $("#grid").data("kendoGrid").dataSource._data[i].SpoolID, JuntaSpoolID: $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID, DefectoID: defectosArray[k].DefectoIDCombo, InicioMM: defectosArray[k].InicioMM, FinMM: defectosArray[k].FinMM, Accion: 1 };
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

function filtrarDatosParaGuardar() {
    var infoTemp = null;
    if (infoGridTemp != null)
        infoTemp = infoGridTemp;
    else
        infoTemp = $("#grid").data("kendoGrid").dataSource._data;

    $("#grid").data('kendoGrid').dataSource.data([]);

    for (var i = 0; i < infoTemp.length; i++) {
        if (infoTemp[i].NumeroPlacas != 0) {
            $("#grid").data("kendoGrid").dataSource.add(infoTemp[i]);
        }
    }
}

function validarReglasDeLlenado() {
    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
        for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados.length; j++) {
            if ($("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].Resultado == (-1)) {
                alert("Tienes por lo menos un resultado sin evaluar en la junta: " + $("#grid").data("kendoGrid").dataSource._data[i].EtiquetaJunta)
                return false;
            }
            else if ($("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].Resultado == 0) {//Si esta evaluado pero hay que revisar si esta rechazado tiene que tenes defectos
                if (!($("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].DetalleResultados.length > 0)) {
                    alert("Si calificas como rechazado un defecto, tiene que tener por lo menos un resultado, en la junta: " + $("#grid").data("kendoGrid").dataSource._data[i].EtiquetaJunta)
                    return false;
                }
            }
            for (var k = 0; k < $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].DetalleResultados.length; k++) {
                if ($("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].DetalleResultados[k].DefectoID == (-1)) {
                    alert("Tienes por lo menos un defecto sin evaluar en la junta: " + $("#grid").data("kendoGrid").dataSource._data[i].Etiqueta)
                    return false;
                }
            }

        }
    }

    return true;
}

function disableEnableView(disable) {
    if (disable) {

        $("#inputProyecto").data("kendoComboBox").enable(false);
        $("#inputProveedor").data("kendoComboBox").enable(false);
        $("#inputRequisicion").data("kendoComboBox").enable(false);
        $("#inputFuente").data("kendoComboBox").enable(false);
        $("#inputTurno").data("kendoComboBox").enable(false);
        $("#inputPrueba").data("kendoComboBox").enable(false);
        //$("input[name='Muestra']").attr("disabled", true);
        $("#btnAgregar").attr("disabled", true);

        
        $("#Guardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar1').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);

    } else {
        $(".addedSectionInLine").find('*').attr("disabled", false);

        $("#inputProyecto").data("kendoComboBox").enable(true);
        $("#inputProveedor").data("kendoComboBox").enable(true);
        $("#inputRequisicion").data("kendoComboBox").enable(true);
        $("#inputFuente").data("kendoComboBox").enable(true);
        $("#inputTurno").data("kendoComboBox").enable(true);
        $("#inputPrueba").data("kendoComboBox").enable(true);

        $("#btnAgregar").attr("disabled", false);

        
        $("#Guardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar1').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

function cleanView() {
    //var paramReq = getParameterByName('requisicion');

    $("#inputProyecto").data("kendoComboBox").value("");
    $("#inputProveedor").data("kendoComboBox").value("");
    $("#inputRequisicion").data("kendoComboBox").value("");
    $("#inputFuente").data("kendoComboBox").value("");
    $("#inputTurno").data("kendoComboBox").value("");
    $("#inputPrueba").data("kendoComboBox").value("");
    
    $("#grid").data("kendoGrid").dataSource.data([]);
    //if (paramReq == null) {
    //    AjaxCargaListaProyectos();
    //} else {
    //    AjaxObtenerElementoRequisicion(paramReq);
    //}
    disableEnableView(false);
    //AjaxCargarCamposPredeterminados();
}

