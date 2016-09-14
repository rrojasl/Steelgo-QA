﻿
function RenderNumeroPlacas(container, options) {
    var dataItem;
    $('<input data-text-field="NumeroPlacas" id=' + options.model.uid + ' data-value-field="NumeroPlacas" data-bind="value:' + options.field + '" onblur="renderDataSourceNumeroPlacas(\'' + options.model.SpoolJunta + '\', \'' + options.model.Junta + '\',\'' + options.model.NumeroControl + '\');" />')
    .appendTo(container)
    .kendoNumericTextBox({
        format: "#",
        min: 0
    });
}

function renderDataSourceNumeroPlacas(spoolJunta, junta, numeroControl) {
    //alert(spoolJunta);
    //var infoResults = new Array($("#grid").data("kendoGrid").dataSource._data.NumeroPlacas);
    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
        if ((spoolJunta == $("#grid").data("kendoGrid").dataSource._data[i].SpoolJunta) && (junta == $("#grid").data("kendoGrid").dataSource._data[i].Junta) && (numeroControl == $("#grid").data("kendoGrid").dataSource._data[i].NumeroControl)) {
            $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados = new Array($("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas);
            for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas; j++) {
                if (j != ($("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas - 1))
                    $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j] = { SpoolJunta: $("#grid").data("kendoGrid").dataSource._data[i].SpoolJunta, Junta: $("#grid").data("kendoGrid").dataSource._data[i].Junta, NumeroControl: $("#grid").data("kendoGrid").dataSource._data[i].NumeroControl, Ubicacion: j + '-' + (j + 1), Resultado: 0, DetalleResultados: [] };
                else
                    $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j] = { SpoolJunta: $("#grid").data("kendoGrid").dataSource._data[i].SpoolJunta, Junta: $("#grid").data("kendoGrid").dataSource._data[i].Junta, NumeroControl: $("#grid").data("kendoGrid").dataSource._data[i].NumeroControl, Ubicacion: j + '-' + 0, Resultado: 0, DetalleResultados: [] };
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
    

    var modalTitle = model.SpoolJunta + "_" + model.Junta + "_" + model.NumeroControl + "_" + model.Ubicacion;
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
            autoBind: false,
            dataSource: [
                    { ResultadoCombo: 0, NombreCombo: _dictionary.ValidacionResultadosComboRechazado[$("#language").data("kendoDropDownList").value()] },
                    { ResultadoCombo: 1, NombreCombo: _dictionary.ValidacionResultadosComboAceptado[$("#language").data("kendoDropDownList").value()] }
            ],
            dataTextField: "NombreCombo",
            dataValueField: "ResultadoCombo",
            //index: 0,
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
        if ((dataItem.SpoolJunta == $("#grid").data("kendoGrid").dataSource._data[i].SpoolJunta) && (dataItem.Junta == $("#grid").data("kendoGrid").dataSource._data[i].Junta) && (dataItem.NumeroControl == $("#grid").data("kendoGrid").dataSource._data[i].NumeroControl)) {
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
                //dataItem = this.dataItem(e.sender.selectedIndex);
                //if (dataItem != undefined) {
                //    options.model.DefectoID = dataItem.DefectoID;
                //    options.model.Nombre = dataItem.Nombre;
                //}
                //else
                //    options.model.Nombre = ObtenerDescCorrectaDefectos(comboDefectos, options.model.DefectoID);
            }
        }
        );
}

function actualizaDefectos(dataItemsStr, defectosArray) {
    //alert(spoolJunta);
    //var infoResults = new Array($("#grid").data("kendoGrid").dataSource._data.NumeroPlacas);
    var dataItemsArrays = dataItemsStr.split("_");
    if (dataItemsArrays.length == 4) {
        for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
            if ((dataItemsArrays[0] == $("#grid").data("kendoGrid").dataSource._data[i].SpoolJunta) && (dataItemsArrays[1] == $("#grid").data("kendoGrid").dataSource._data[i].Junta) && (dataItemsArrays[2] == $("#grid").data("kendoGrid").dataSource._data[i].NumeroControl)) {
                for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados.length; j++) {

                    if ($("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].Ubicacion == dataItemsArrays[3]) {
                        $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].DetalleResultados = new Array(defectosArray.length);
                        for (var k = 0; k < defectosArray.length; k++) {
                            $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].DetalleResultados[k] = { Defectos: defectosArray[k].Defectos, InicioMM: defectosArray[k].InicioMM, FinMM: defectosArray[k].FinMM };
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


