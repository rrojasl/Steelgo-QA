var previousCurrentItem;

function SuscribirEventos() {
    suscribirEventoGuardar();
    //suscribirEventoCancelar();
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
            $("#PlacaID").text(dataItem.OrdenTrabajoID + "°" + dataItem.SpoolID + "°" + dataItem.JuntaSpoolID + "°" + dataItem.Ubicacion + "°" + dataItem.Posicion);
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
        //    $("#windowGridDefectos").data("kendoWindow").close();
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
                    //if (confirm(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()])) {
                    //    hacerAjax = true;
                    //}

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
                //else {
                //    llamadasATodos++;
                //    filtraDatosCapturados($('input:radio[name=Muestra]:checked').val());
                //}
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
                    //if (confirm(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()])) {
                    //    hacerAjax = true;
                    //    hayDatosCapturados = false;
                    //}

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
                        AjaxProveedor(dataItem.ProyectoID, dataItem.PatioID);

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
                    AjaxProveedor(dataItem.ProyectoID, dataItem.PatioID);

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
                    //if (confirm(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()])) {
                    //    hacerAjax = true;
                    //    hayDatosCapturados = false;
                    //}
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

                        //$("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
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

                    //$("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
                    $("#inputFuente").data("kendoComboBox").value("");
                    $("#inputTurno").data("kendoComboBox").value("");
                }
                //else
                //    $('#inputProveedor').data("kendoComboBox").value(previousCurrentItem);

            }
            //dataItem = this.dataItem(e.sender.selectedIndex);
            //if (dataItem != undefined && dataItem.Nombre != "") {
            //    AjaxComboRequisicion($("#inputProveedor").data("kendoComboBox").value());
            //}
            //else {
            //    $("#inputProveedor").data("kendoComboBox").value("");
            //}
            //$("#grid").data('kendoGrid').dataSource.data([]);
            //$("#inputRequisicion").data("kendoComboBox").value("");
            //$("#TipoPrueba").text("");
            //$("#Requisicion").text("");
            //$("#TurnoLaboral").text("");
            //$("#HerramientaPrueba").text("");
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
                    //if (confirm(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()])) {
                    //    hacerAjax = true;
                    //    hayDatosCapturados = false;
                    //}
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

                        //$("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
                        $("#inputFuente").data("kendoComboBox").value("");
                        $("#inputTurno").data("kendoComboBox").value("");

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

                    //$("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
                    $("#inputFuente").data("kendoComboBox").value("");
                    $("#inputTurno").data("kendoComboBox").value("");
                }
                //else
                //    $('#inputPrueba').data("kendoComboBox").value(previousCurrentItem);
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
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                var hacerAjax = false;
                if (hayDatosCapturados) {
                    //if (confirm(_dictionary.CapturaReportePruebasMensajeEliminarDatosCapturados[$("#language").data("kendoDropDownList").value()])) {
                    //    hacerAjax = true;
                    //    hayDatosCapturados = false;
                    //}
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

                        //$("#grid").data('kendoGrid').dataSource.data([]);
                        $("#inputFuente").data("kendoComboBox").value(dataItem.FuenteID);
                        $("#inputTurno").data("kendoComboBox").value(dataItem.TurnoID);
                        $("#inputPrueba").data("kendoComboBox").value(dataItem.TipoPruebaID);

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

                    //$("#grid").data('kendoGrid').dataSource.data([]);
                    $("#inputFuente").data("kendoComboBox").value(dataItem.FuenteID);
                    $("#inputTurno").data("kendoComboBox").value(dataItem.TurnoID);
                    $("#inputPrueba").data("kendoComboBox").value(dataItem.TipoPruebaID);
                }
                //else
                //    $('#inputRequisicion').data("kendoComboBox").value(previousCurrentItem);


                //ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
            }

            //if (dataItem != undefined && dataItem.Folio != "") {
            //    AjaxRequisicionDetalle($("#inputRequisicion").data("kendoComboBox").value());
            //}
            //else {
            //    $("#inputRequisicion").data("kendoComboBox").value("");

            //}
            //$("#grid").data('kendoGrid').dataSource.data([]);
            //$("#TipoPrueba").text("");
            //$("#Requisicion").text("");
            //$("#TurnoLaboral").text("");
            //$("#HerramientaPrueba").text("");
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
        index: 3
    });
}

function suscribirEventTurno() {
    $('#inputTurno').kendoComboBox({
        dataTextField: "Turno",
        dataValueField: "TurnoLaboralID",
        suggest: true,
        filter: "contains",
        index: 3
    });
}

