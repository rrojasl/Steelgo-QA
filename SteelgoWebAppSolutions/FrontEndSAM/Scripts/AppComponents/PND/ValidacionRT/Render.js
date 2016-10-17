var listaDefectosAuxiliar;
var infoGridTemp = null;
var llamadasATodos = 0;
var numeroPlacasAnteriorElemento;
var dataItem;

function RenderNumeroPlacas(container, options) {

    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {



        numeroPlacasAnteriorElemento = { NumeroPlacas: options.model.NumeroPlacas, OrdenTrabajoID: options.model.OrdenTrabajoID, SpoolID: options.model.SpoolID, JuntaSpoolID: options.model.JuntaSpoolID, ResultadoConciliacionID: options.model.ResultadoConciliacionID };
        $('<input data-text-field="NumeroPlacas" id=' + options.model.uid + ' data-value-field="NumeroPlacas" data-bind="value:' + options.field + '" />')
        .appendTo(container)
        .kendoNumericTextBox({
            format: "#",
            min: 0
            ,
            change: function (e) {
                var grid = $("#grid").data("kendoGrid");
                dataItem = grid.dataItem($(e.target).closest("tr"));
                hayDatosCapturados = true;

                var value = this.value();
                if (numeroPlacasAnteriorElemento.ResultadoConciliacionID > 1) {//La razon no es Aceptada y se va a evaluar
                    if (numeroPlacasAnteriorElemento.NumeroPlacas != null && numeroPlacasAnteriorElemento.NumeroPlacas > this.value()) {
                        //hayDatosCapturados = true;

                        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                            iframe: true,
                            title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
                            visible: false, //the window will not appear before its .open method is called
                            width: "auto",
                            height: "auto",
                            modal: true,
                            animation: {
                                close: false,
                                open: false
                            }
                        }).data("kendoWindow");

                        ventanaConfirm.content(_dictionary.CapturaReporteModificarNoPlacas[$("#language").data("kendoDropDownList").value()] +
                                    "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

                        ventanaConfirm.open().center();

                        $("#yesButton").click(function () {
                            renderGenerarJsonNumeroPlacas(options.model.SpoolID, options.model.JuntaSpoolID, options.model.OrdenTrabajoID);

                            ventanaConfirm.close();
                        });
                        $("#noButton").click(function () {
                            //dataItem.NumeroPlacas = numeroPlacasAnteriorElemento;
                            for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
                                if ((numeroPlacasAnteriorElemento.SpoolID == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (numeroPlacasAnteriorElemento.JuntaSpoolID == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (numeroPlacasAnteriorElemento.OrdenTrabajoID == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
                                    $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas = numeroPlacasAnteriorElemento.NumeroPlacas;
                                    $("#grid").data("kendoGrid").refresh();
                                    break;
                                }
                            }

                            ventanaConfirm.close();
                        });
                    }
                    else if (numeroPlacasAnteriorElemento.NumeroPlacas == null) {
                        renderGenerarJsonNumeroPlacas(options.model.SpoolID, options.model.JuntaSpoolID, options.model.OrdenTrabajoID);
                    }
                    else {
                        for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
                            if ((numeroPlacasAnteriorElemento.SpoolID == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (numeroPlacasAnteriorElemento.JuntaSpoolID == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (numeroPlacasAnteriorElemento.OrdenTrabajoID == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
                                $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas = numeroPlacasAnteriorElemento.NumeroPlacas;
                                $("#grid").data("kendoGrid").refresh();
                                break;
                            }
                        }
                    }
                }
                else {
                    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
                        if ((numeroPlacasAnteriorElemento.SpoolID == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (numeroPlacasAnteriorElemento.JuntaSpoolID == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (numeroPlacasAnteriorElemento.OrdenTrabajoID == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
                            $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas = numeroPlacasAnteriorElemento.NumeroPlacas;
                            $("#grid").data("kendoGrid").refresh();
                            break;
                        }
                    }
                }
            }
        });
    };
}

var tamanoAnteriorElemento;
function RenderTamano(container, options) {
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

        var dataItem;
        tamanoAnteriorElemento = { NumeroPlacas: options.model.NumeroPlacas, OrdenTrabajoID: options.model.OrdenTrabajoID, SpoolID: options.model.SpoolID, JuntaSpoolID: options.model.JuntaSpoolID, ResultadoConciliacionID: options.model.ResultadoConciliacionID, Tamano: options.model.Tamano};
        $('<input data-text-field="Tamano" id=' + options.model.uid + ' data-value-field="Tamano" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
            format: "#.0000",
            min: 0,
            change: function (e) {
                
                if (tamanoAnteriorElemento.ResultadoConciliacionID > 1) {
                    hayDatosCapturados = true;
                }
                else {
                    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
                        if ((tamanoAnteriorElemento.SpoolID == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (tamanoAnteriorElemento.JuntaSpoolID == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (tamanoAnteriorElemento.OrdenTrabajoID == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
                            $("#grid").data("kendoGrid").dataSource._data[i].Tamano = tamanoAnteriorElemento.Tamano;
                            $("#grid").data("kendoGrid").refresh();
                            break;
                        }
                    }
                }
            }
        });
    };
}

var densidadAnteriorElemento;
function RenderDensidad(container, options) {
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

        var dataItem;
        densidadAnteriorElemento = { NumeroPlacas: options.model.NumeroPlacas, OrdenTrabajoID: options.model.OrdenTrabajoID, SpoolID: options.model.SpoolID, JuntaSpoolID: options.model.JuntaSpoolID, ResultadoConciliacionID: options.model.ResultadoConciliacionID, Densidad: options.model.Densidad };
        $('<input data-text-field="Densidad" id=' + options.model.uid + ' data-value-field="Densidad" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
            format: "#.0000",
            min: 0,
            change: function (e) {
                
                if (densidadAnteriorElemento.ResultadoConciliacionID > 1) {
                    hayDatosCapturados = true;
                }
                else {
                    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
                        if ((densidadAnteriorElemento.SpoolID == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (densidadAnteriorElemento.JuntaSpoolID == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (densidadAnteriorElemento.OrdenTrabajoID == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
                            $("#grid").data("kendoGrid").dataSource._data[i].Densidad = densidadAnteriorElemento.Densidad;
                            $("#grid").data("kendoGrid").refresh();
                            break;
                        }
                    }
                }
            }
        });
    }
}

function RenderInicioMM(container, options) {
    var dataItem;
    $('<input data-text-field="InicioMM" id=' + options.model.uid + ' data-value-field="InicioMM" data-bind="value:' + options.field + '"/>')
    .appendTo(container)
    .kendoNumericTextBox({
        format: "{0: }",
        min: 0
    });

}

function RenderFinMM(container, options) {
    var dataItem;
    $('<input data-text-field="FinMM" id=' + options.model.uid + ' data-value-field="FinMM" data-bind="value:' + options.field + '"/>')
    .appendTo(container)
    .kendoNumericTextBox({
        format: "{0: }",
        min: 0
    });

}

function renderGenerarJsonNumeroPlacas(spoolJunta, junta, numeroControl) {
    //alert(spoolJunta);
    //var infoResults = new Array($("#grid").data("kendoGrid").dataSource._data.NumeroPlacas);
    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
        if ((spoolJunta == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (junta == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (numeroControl == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
            $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas = new Array($("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas);
            for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas; j++) {
                if (j != ($("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas - 1))
                    $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j] = { OrdenTrabajoID: $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID, SpoolID: $("#grid").data("kendoGrid").dataSource._data[i].SpoolID, JuntaSpoolID: $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID, Ubicacion: j + '-' + (j + 1), ResultadoID: undefined, Resultado: '', ListaDetalleDefectos: [], Accion: $("#grid").data("kendoGrid").dataSource._data[i].Accion, ListaResultados: $("#grid").data("kendoGrid").dataSource._data[i].ListaResultados, ListaDefectos: $("#grid").data("kendoGrid").dataSource._data[i].ListaDefectos, TemplateDetallePorPlaca: _dictionary.ServiciosTecnicosCapturaReporteTemplatePlacasDefecto[$("#language").data("kendoDropDownList").value()], Posicion: j };
                else
                    $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j] = { OrdenTrabajoID: $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID, SpoolID: $("#grid").data("kendoGrid").dataSource._data[i].SpoolID, JuntaSpoolID: $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID, Ubicacion: j + '-' + 0, ResultadoID: undefined, Resultado: '', ListaDetalleDefectos: [], Accion: $("#grid").data("kendoGrid").dataSource._data[i].Accion, ListaResultados: $("#grid").data("kendoGrid").dataSource._data[i].ListaResultados, ListaDefectos: $("#grid").data("kendoGrid").dataSource._data[i].ListaDefectos, TemplateDetallePorPlaca: _dictionary.ServiciosTecnicosCapturaReporteTemplatePlacasDefecto[$("#language").data("kendoDropDownList").value()], Posicion: j };
            }
            break;
        }
    }
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

                options.model.ResultadoID = dataItem.ResultadosID;
                options.model.Resultado = dataItem.Resultado;


            }
        }
    );
    $(".k-combobox").parent().on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = $(this).find(".k-combobox")[0];
        if (item != undefined) {
            if (!tieneClase(item)) {
                $(container).trigger(e);
            }
        }
    });
}

function comboBoxResultadoConciliacion(container, options) {
    var dataItem;

    $('<input required data-text-field="Descripcion" id=' + options.model.uid + ' data-value-field="Descripcion" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaResultadoConciliacion,
            dataTextField: "Descripcion",
            dataValueField: "ResultadoConciliacionID",
            template: "<i class=\"fa fa-#=data.Descripcion#\"></i> #=data.Descripcion#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                options.model.ResultadoConciliacionID = dataItem.ResultadoConciliacionID;
                options.model.Descripcion = dataItem.Descripcion;


            }
        }
    );
    $(".k-combobox").parent().on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = $(this).find(".k-combobox")[0];
        if (item != undefined) {
            if (!tieneClase(item)) {
                $(container).trigger(e);
            }
        }
    });
}

function comboBoxRazonNoConciliacion(container, options) {
    var dataItem;

    $('<input required data-text-field="Descripcion" id=' + options.model.uid + ' data-value-field="Descripcion" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaRazonNoConciliacion,
            dataTextField: "Descripcion",
            dataValueField: "RazonNoConciliacionID",
            template: "<i class=\"fa fa-#=data.Descripcion#\"></i> #=data.Descripcion#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                options.model.RazonNoConciliacionID = dataItem.RazonNoConciliacionID;
                options.model.Descripcion = dataItem.Descripcion;


            }
        }
    );
    $(".k-combobox").parent().on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = $(this).find(".k-combobox")[0];
        if (item != undefined) {
            if (!tieneClase(item)) {
                $(container).trigger(e);
            }
        }
    });
}



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
                if (dataItem != undefined && dataItem.DefectoID != 0) {
                    options.model.DefectoID = dataItem.DefectoID;
                    options.model.Defecto = dataItem.Defecto;
                    //OrdenTrabajoID+SpoolID+JuntaSpoolID+Ubicacion+Posicion
                    var itemPlaca = $("#PlacaID").text().split("°")
                    options.model.OrdenTrabajoID = itemPlaca[0];
                    options.model.SpoolID = itemPlaca[1];
                    options.model.JuntaSpoolID = itemPlaca[2];
                    options.model.Ubicacion = itemPlaca[3];
                    options.model.Posicion = itemPlaca[4];
                }
            }
        }
        );

    $(".k-combobox").parent().on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = $(this).find(".k-combobox")[0];
        if (item != undefined) {
            if (!tieneClase(item)) {
                $(container).trigger(e);
            }
        }
    });
}

var hayDatosCapturados = false;
//function hayDatosCapturados() {
//    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
//        if ($("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas != 0) {
//            for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados.length; j++) {

//                if ($("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].DetalleResultados.length != 0) {
//                    return true;
//                    //for (var k = 0; k < defectosArray.length; k++) {
//                    //    $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].DetalleResultados[k] = { Defectos: defectosArray[k].Defectos, InicioMM: defectosArray[k].InicioMM, FinMM: defectosArray[k].FinMM };
//                    //}
//                }
//            }
//        }
//    }

//    return false;
//}

function filtraDatosCapturados(tipoFiltro) {
    loadingStart();

    if (infoGridTemp == null)
        infoGridTemp = $("#grid").data("kendoGrid").dataSource._data;

    $("#grid").data('kendoGrid').dataSource.data([]);

    if (tipoFiltro == "SinCaptura") {
        for (var i = 0; i < infoGridTemp.length; i++) {
            if ((infoGridTemp[i].NumeroPlacas == 0) || (infoGridTemp[i].NumeroPlacas == null)) {
                $("#grid").data("kendoGrid").dataSource.add(infoGridTemp[i]);
            }
        }
        llamadasATodos = 0;
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

function disableEnableView(disable) {
    if (disable) {

        $("#inputProyecto").data("kendoComboBox").enable(false);
        $("#inputProveedor").data("kendoComboBox").enable(false);
        $("#inputRequisicion").data("kendoComboBox").enable(false);
        $("#inputFuente").data("kendoComboBox").enable(false);
        $("#inputTurno").data("kendoComboBox").enable(false);
        $("#inputPrueba").data("kendoComboBox").enable(false);
        $("#inputUsuarioVR").data("kendoComboBox").enable(false);
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
        $("#inputUsuarioVR").data("kendoComboBox").enable(true);

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
    $("#inputUsuarioVR").data("kendoComboBox").value("");

    $("#grid").data("kendoGrid").dataSource.data([]);
    //if (paramReq == null) {
    //    AjaxCargaListaProyectos();
    //} else {
    //    AjaxObtenerElementoRequisicion(paramReq);
    //}
    disableEnableView(false);
    //AjaxCargarCamposPredeterminados();
}

function tieneClase(item) {
    for (var i = 0; i < item.classList.length; i++) {
        if (item.classList[i] == "k-state-border-up" || item.classList[i] == "k-state-border-down") {
            return true;
        }
    }
    return false
}