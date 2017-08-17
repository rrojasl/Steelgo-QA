﻿var previousCurrentItem;

function SuscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoPlanchar();
    suscribirEventoChangeRadioTipo();
    suscribirEventoProyecto();
    suscribirEventoProveedor();
    SuscribirEventoComboPrueba();
    suscribirEventoRequisicion();
    suscribirEventoFuente();
    suscribirEventTurno();
    suscribirEventoDetallePlaca();
    suscribirEventoDetalleDefectoPorPlaca();
}

function suscribirEventoDetallePlaca() {

    $(document).on('click', '.EnlacePorPlaca', function (e) {
        e.preventDefault();
        if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#grid").data("kendoGrid");
            dataItem = grid.dataItem($(e.target).closest("tr"));
            if (dataItem.NumeroPlacas  != null )
                if (dataItem.NumeroPlacas > 0)
                    LlenarGridPopUpDetallePlaca(dataItem);
        }
    });
}

function suscribirEventoDetalleDefectoPorPlaca() {

    $(document).on('click', '.EnlaceDefectoPorPlaca', function (e) {
        e.preventDefault();
        if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#gridPopUp").data("kendoGrid");
            dataItem = grid.dataItem($(e.target).closest("tr"));
            //$("#PlacaID").text(dataItem.OrdenTrabajoID + "°" + dataItem.SpoolID + "°" + dataItem.JuntaSpoolID + "°" + dataItem.Ubicacion + "°" + dataItem.Posicion);
            //OrdenTrabajoID+SpoolID+JuntaSpoolID+Ubicacion+Posicion
            LlenarGridPopUpDetalleDefectoPorPlaca(dataItem);
        }
    });
}


function suscribirEventoGuardar() {

    $('#GuardarPlacas').click(function (e) {
        var ds = $("#gridPopUp").data("kendoGrid").dataSource;
        var window = $("#windowGrid");

        actualizaGridGeneralPorPlaca();
        //if (actualizaGridGeneralPorPlaca())
        //    $("#windowGrid").data("kendoWindow").close();
    });

    $('#GuardarDefectos').click(function (e) {
        var ds = $("#gridPopUpDefectos").data("kendoGrid").dataSource;
        var window = $("#windowGridDefectos");

        actualizaGridGeneralPorDefectos();//if (actualizaGridGeneralPorDefectos())
    });

    $('#CancelarPlacas').click(function (e) {
        $("#windowGrid").data("kendoWindow").close();
    });

    $('#CancelarDefectos').click(function (e) {
        $("#windowGridDefectos").data("kendoWindow").close();
    });


    //GuardarYNuevo
    $("#btnGuardarYNuevo, #btnGuardarYNuevo1").click(function (e) {
        //alert('1');

        if (infoGridTemp != null)
            if ($("#grid").data("kendoGrid").dataSource._data.length != infoGridTemp.length)
                $("#grid").data("kendoGrid").dataSource._data = infoGridTemp;

        if (validarReglasDeLlenado()) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            AjaxGuardarCaptura(ds._data, true);
        }
    });

    //Guardar
    $("#Guardar, #btnGuardar, #Guardar1, #btnGuardar1").click(function (e) {
        //alert('2');

        if (infoGridTemp != null)
            if ($("#grid").data("kendoGrid").dataSource._data.length != infoGridTemp.length)
                $("#grid").data("kendoGrid").dataSource._data = infoGridTemp;

        if (validarReglasDeLlenado()) {
            if ($("#Guardar").text() == _dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]) {
                var ds = $("#grid").data("kendoGrid").dataSource;
                AjaxGuardarCaptura(ds._data, false);
            } else if ($("#Guardar").text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]) {
                disableEnableView(false);
            }
        }
    });

    $('#btnAgregar').click(function (e) {
        var hacerAjax = false;

        if ($('input:radio[name=Muestra]:checked').val() == "SinCaptura") {
            filtraDatosCapturados($('input:radio[name=Muestra]:checked').val());
        }
        else if ($('input:radio[name=Muestra]:checked').val() == "Todos") {
            if ((llamadasATodos >= 1) || (infoGridTemp == null)) {
                if (hayDatosCapturados) {

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

                    ventanaConfirm.content(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()] +
                                "</br><center><button class='btn btn-blue' id='yesButton'>" + _dictionary.EntregaPlacasGraficasbotonSi[$("#language").data("kendoDropDownList").value()] + "</button><button class='btn btn-blue' id='noButton'>" + _dictionary.EntregaPlacasGraficasbotonNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");

                    ventanaConfirm.open().center();

                    $("#yesButton").click(function () {
                        ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
                        infoGridTemp = null;
                        llamadasATodos = 0;

                        hayDatosCapturados = false;
                        ventanaConfirm.close();

                    });
                    $("#noButton").click(function () {
                        //$('#inputProyecto').data("kendoComboBox").value(previousCurrentItem);
                        llamadasATodos++;
                        ventanaConfirm.close();
                    });

                }
                else
                    hacerAjax = true;

                if (hacerAjax) {
                    ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
                    infoGridTemp = null;
                    llamadasATodos = 0;
                    hayDatosCapturados = false;
                }
            }
            else {//Filtra los capturados
                filtraDatosCapturados($('input:radio[name=Muestra]:checked').val());
                llamadasATodos++;
            }
        }

    });
}

function suscribirEventoProyecto() {
    $('#inputProyecto').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                var hacerAjax = false;
                if (hayDatosCapturados) {


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

                    ventanaConfirm.content(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()] +
                                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

                    ventanaConfirm.open().center();

                    $("#yesButton").click(function () {
                        $("#grid").data('kendoGrid').dataSource.data([]);
                        AjaxPruebas(data[1].ProyectoID);

                        $("#inputRequisicion").data("kendoComboBox").value("");
                        $("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
                        $("#inputFuente").data("kendoComboBox").value("");
                        $("#inputTurno").data("kendoComboBox").value("");
                        hayDatosCapturados = false;
                        ventanaConfirm.close();

                    });
                    $("#noButton").click(function () {
                        $('#inputProyecto').data("kendoComboBox").value(previousCurrentItem);
                        ventanaConfirm.close();
                    });

                }
                else
                    hacerAjax = true;

                if (hacerAjax) {
                    $("#grid").data('kendoGrid').dataSource.data([]);
                    AjaxPruebas(dataItem.ProyectoID);

                    $("#inputRequisicion").data("kendoComboBox").value("");
                    $("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
                    $("#inputFuente").data("kendoComboBox").value("");
                    $("#inputTurno").data("kendoComboBox").value("");
                }
                //else
                //    $('#inputProyecto').data("kendoComboBox").value(previousCurrentItem);
            }
        }
    });

    $("#inputProyecto").data("kendoComboBox").input.on("focus", function () {
        previousCurrentItem = this.value;
    });

}

function suscribirEventoProveedor() {
    $('#inputProveedor').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProveedorID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                var hacerAjax = false;
                if (hayDatosCapturados) {
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

                    ventanaConfirm.content(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()] +
                                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

                    ventanaConfirm.open().center();

                    $("#yesButton").click(function () {
                        $("#grid").data('kendoGrid').dataSource.data([]);
                        AjaxRequisicion($("#inputProyecto").data("kendoComboBox").value(), dataItem.ProveedorID);

                        $("#inputFuente").data("kendoComboBox").value("");
                        $("#inputTurno").data("kendoComboBox").value("");

                        hayDatosCapturados = false;
                        ventanaConfirm.close();

                    });
                    $("#noButton").click(function () {
                        $('#inputProveedor').data("kendoComboBox").value(previousCurrentItem);
                        ventanaConfirm.close();
                    });

                }
                else
                    hacerAjax = true;

                if (hacerAjax) {
                    $("#grid").data('kendoGrid').dataSource.data([]);
                    AjaxRequisicion($("#inputProyecto").data("kendoComboBox").value(), dataItem.ProveedorID);


                    $("#inputFuente").data("kendoComboBox").value("");
                    $("#inputTurno").data("kendoComboBox").value("");
                }
            }

        }
    });

    $("#inputProveedor").data("kendoComboBox").input.on("focus", function () {
        previousCurrentItem = this.value;
    });
}

function SuscribirEventoComboPrueba() {
    $('#inputPrueba').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TipoPruebaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                var hacerAjax = false;
                if (hayDatosCapturados) {
                  
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

                    ventanaConfirm.content(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()] +
                                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

                    ventanaConfirm.open().center();

                    $("#yesButton").click(function () {
                        $("#grid").data('kendoGrid').dataSource.data([]);

                        if (dataItem.Nombre.indexOf("RT") !== -1) {
                            $("#grid").data("kendoGrid").showColumn("EsSector");
                            $("#grid").data("kendoGrid").showColumn("NumeroPlacas");
                            $("#grid").data("kendoGrid").showColumn("TemplateDetalleElemento");
                            $("#grid").data("kendoGrid").hideColumn("ResultadoConciliacion");
                            $("#grid").data("kendoGrid").hideColumn("RazonNoConciliacion");
                            $("#divRes").css("display", "none");
                            $("#EvaluacionDiv").css("display", "block");
                            

                        }
                        else {
                            $("#grid").data("kendoGrid").hideColumn("EsSector");
                            $("#grid").data("kendoGrid").hideColumn("NumeroPlacas");
                            $("#grid").data("kendoGrid").hideColumn("TemplateDetalleElemento");
                            $("#grid").data("kendoGrid").showColumn("ResultadoConciliacion");
                            $("#grid").data("kendoGrid").showColumn("RazonNoConciliacion");
                            $("#divRes").css("display", "block");
                            $("#EvaluacionDiv").css("display", "none");
                            
                        }

                        $("#inputFuente").data("kendoComboBox").value("");
                        $("#inputTurno").data("kendoComboBox").value("");
                        AjaxProveedor($("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select()).ProyectoID, $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select()).PatioID)
                        hayDatosCapturados = false;
                        ventanaConfirm.close();

                    });
                    $("#noButton").click(function () {
                        $('#inputPrueba').data("kendoComboBox").value(previousCurrentItem);
                        ventanaConfirm.close();
                    });

                }
                else
                    hacerAjax = true;

                if (hacerAjax) {
                    $("#grid").data('kendoGrid').dataSource.data([]);

                    if (dataItem.Nombre.indexOf("RT") !== -1) {
                        $("#grid").data("kendoGrid").showColumn("EsSector");
                        $("#grid").data("kendoGrid").showColumn("NumeroPlacas");
                        $("#grid").data("kendoGrid").showColumn("TemplateDetalleElemento");
                        $("#grid").data("kendoGrid").hideColumn("ResultadoConciliacion");
                        $("#grid").data("kendoGrid").hideColumn("RazonNoConciliacion");
                        $("#EvaluacionDiv").css("display", "block");
                        $("#divRes").css("display", "none");
                    }
                    else {
                        $("#grid").data("kendoGrid").hideColumn("EsSector");
                        $("#grid").data("kendoGrid").hideColumn("NumeroPlacas");
                        $("#grid").data("kendoGrid").hideColumn("TemplateDetalleElemento");
                        $("#grid").data("kendoGrid").showColumn("ResultadoConciliacion");
                        $("#grid").data("kendoGrid").showColumn("RazonNoConciliacion");
                        $("#EvaluacionDiv").css("display", "none");
                        $("#divRes").css("display", "block");
                    }


                    $("#inputFuente").data("kendoComboBox").value("");
                    $("#inputTurno").data("kendoComboBox").value("");
                    AjaxProveedor($("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select()).ProyectoID, $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select()).PatioID);
                }
            }

        }
    });

    $("#inputPrueba").data("kendoComboBox").input.on("focus", function () {
        previousCurrentItem = this.value;
    });
};

function suscribirEventoChangeRadioTipo() {

    $('input:radio[name=Muestra]:nth(0)').change(function () {

    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {

    });
}

function suscribirEventoRequisicion() {
    $('#inputRequisicion').kendoComboBox({
        dataTextField: "NombreRequisicion",
        dataValueField: "RequisicionID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            $("#lblTurno").text("");
            dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                var hacerAjax = false;
                if (hayDatosCapturados) {

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

                    ventanaConfirm.content(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()] +
                                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

                    ventanaConfirm.open().center();

                    $("#yesButton").click(function () {
                        $("#grid").data('kendoGrid').dataSource.data([]);
                        
                        
                        $("#lblTurno").text($("#inputRequisicion").data("kendoComboBox").dataItem($("#inputRequisicion").data("kendoComboBox").select()).TurnoLaboral);

                        if ($("#inputPrueba").data("kendoComboBox").dataItem($("#inputPrueba").data("kendoComboBox").select()).RequiereEquipoCaptura) {
                            AjaxFuente();
                            $("#inputFuente").data("kendoComboBox").enable(true);
                        }
                        else {
                            AjaxTurno();
                            $("#inputFuente").data("kendoComboBox").enable(false);
                        }

                        hayDatosCapturados = false;
                        ventanaConfirm.close();

                    });
                    $("#noButton").click(function () {
                        $('#inputPrueba').data("kendoComboBox").value(previousCurrentItem);
                        ventanaConfirm.close();
                    });
                }
                else
                    hacerAjax = true;

                if (hacerAjax) {
                    $("#grid").data('kendoGrid').dataSource.data([]);
                    $("#lblTurno").text("");
                    $("#lblTurno").text($("#inputRequisicion").data("kendoComboBox").dataItem($("#inputRequisicion").data("kendoComboBox").select()).TurnoLaboral);
                    if ($("#inputPrueba").data("kendoComboBox").dataItem($("#inputPrueba").data("kendoComboBox").select()).RequiereEquipoCaptura) {
                        AjaxFuente();
                        $("#inputFuente").data("kendoComboBox").enable(true);
                    }
                    else {
                        AjaxTurno();
                        $("#inputFuente").data("kendoComboBox").enable(false);
                    }

                }
            }
        }
    });

    $("#inputRequisicion").closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            $("#btnAgregar").trigger("click");
        }
    });


    $("#inputRequisicion").data("kendoComboBox").input.on("focus", function () {
        previousCurrentItem = this.value;
    });
}

function suscribirEventoFuente() {
    $('#inputFuente').kendoComboBox({
        dataTextField: "NombreEquipo",
        dataValueField: "EquipoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                if(dataItem.NombreEquipo != "")
                    AjaxTurno();
                else {
                    $("#inputFuente").data("kendoComboBox").text("");
                    $("#inputTurno").data("kendoComboBox").setDataSource();
                    $("#inputTurno").data("kendoComboBox").value("");
                    $("#inputTurno").data("kendoComboBox").dataSource.data([]);
                }
            }
            else {
                
                $("#inputFuente").data("kendoComboBox").text("");
                $("#inputTurno").data("kendoComboBox").setDataSource();
                $("#inputTurno").data("kendoComboBox").value("");
                $("#inputTurno").data("kendoComboBox").dataSource.data([]);
                
            }
        }
    });
}

function suscribirEventTurno() {
    $('#inputTurno').kendoComboBox({
        dataTextField: "Turno",
        dataValueField: "TurnoLaboralID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                $("#inputFuente").data("kendoComboBox").text("");
            }
           
        }
    });
}


function suscribirEventoPlanchar() {
    $("#btnPlanchar").click(function (e) {
        e.preventDefault();

        var Equipo = $("#inputFuente").data("kendoComboBox").dataItem($("#inputFuente").data("kendoComboBox").select());
        var Turno = $("#inputTurno").data("kendoComboBox").dataItem($("#inputTurno").data("kendoComboBox").select());

        var EsSector = $('input:radio[name=SelectSector]:checked').val();
        var Resultado = $('input:radio[name=SelectTodos]:checked').val();

        if ($("#grid").data("kendoGrid").dataSource._data.length > 0) {
            if ($('input:radio[name=LLena]:checked').val() === "Todos") {
                ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                    iframe: true,
                    title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "auto",
                    height: "auto",
                    modal: true,
                    draggable: false,
                    resizable: false,
                    animation: {
                        close: false,
                        open: false
                    },
                    actions: []
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.MensajeAdvertenciaPlancharTodos[$("#language").data("kendoDropDownList").value()] +
                             "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()]
                             + "</button><button class='confirm_yes btn btn-blue' id='noButton'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()]
                             + "</button></center>");

                ventanaConfirm.open().center();

                $("#yesButton").click(function (handler) {
                    if (Equipo != undefined) {
                            PlanchaEquipoTurno(Equipo,Turno);
                    }
                    if (EsSector != "Ninguno") {
                        PlanchaEvaluacion(EsSector);
                    }
                    if (Resultado != "Ninguno") {
                        //PlanchaResultado(Resultado);
                    }
                    ventanaConfirm.close();
                });
                $("#noButton").click(function (handler) {
                    ventanaConfirm.close();
                });
            }
            else {
                if (Equipo != undefined) {
                        PlanchaEquipoTurno(Equipo,Turno);
                }
                if (EsSector != "Ninguno") {
                    PlanchaEvaluacion(EsSector);
                }
                if (Resultado != "Ninguno") {
                    PlanchaResultado(Resultado);
                }

            }
        }
    });
}