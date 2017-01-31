﻿var proyectoInicial = 0;
var pruebaInicial = 0;
var requisicionOriginal = 0;

function SuscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoAgregar();
    suscribirEventoRequisiciones();
    suscribirEventoChangeRadio();
    suscribirEventoCancelar();
    suscribirEventoTipoPrueba();
    suscribirEventoProyecto();
    suscribirOrdenTrabajo();
    SuscribirEventoSpoolID();
    SuscribirEventosJunta();
    SuscribirEventoOcultarDivJunta();
}

function suscribirEventoChangeRadio() {
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        if ($("#inputProyecto").data("kendoComboBox").value() != "" && $("#inputProyecto").data("kendoComboBox").value() != 0) {
            var tipoPrueba = $("#inputTipoPrueba").data("kendoComboBox").value() == "" ? 0 : $("#inputTipoPrueba").data("kendoComboBox").value();
            var RequisicionID = $("#listaRequisiciones").data("kendoComboBox").value() == "" ? 0 : $("#listaRequisiciones").data("kendoComboBox").value();
            var ProyectoID = $("#inputProyecto").data("kendoComboBox").value() == "" ? 0 : $("#inputProyecto").data("kendoComboBox").value();

            var ds = $("#grid").data("kendoGrid").dataSource;
            if (!existenCambios(ds._data)) {
                AjaxGetListaElementos(RequisicionID, tipoPrueba, ProyectoID, $('input:radio[name=Muestra]:checked').val());
            }
            else {
                var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "auto",
                    height: "auto",
                    modal: true,
                    close: function () {
                        $('input[name="Muestra"][value="Todos"]').prop('checked', true);
                    },
                    actions:[]
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] + "</button><button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    ventanaConfirm.close();
                    AjaxGetListaElementos(RequisicionID, tipoPrueba, ProyectoID, $('input:radio[name=Muestra]:checked').val());
                });

                $("#noButtonProy").click(function () {
                    $('input[name="Muestra"][value="Todos"]').prop('checked', true);
                    ventanaConfirm.close();
                });
            }
        }
    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {
        if ($("#inputProyecto").data("kendoComboBox").value() != "" && $("#inputProyecto").data("kendoComboBox").value() != 0) {
            var tipoPrueba = $("#inputTipoPrueba").data("kendoComboBox").value() == "" ? 0 : $("#inputTipoPrueba").data("kendoComboBox").value();
            var RequisicionID = $("#listaRequisiciones").data("kendoComboBox").value() == "" ? 0 : $("#listaRequisiciones").data("kendoComboBox").value();
            var ProyectoID = $("#inputProyecto").data("kendoComboBox").value() == "" ? 0 : $("#inputProyecto").data("kendoComboBox").value();

            var ds = $("#grid").data("kendoGrid").dataSource;
            if (!existenCambios(ds._data)) {
                AjaxGetListaElementos(RequisicionID, tipoPrueba, ProyectoID, $('input:radio[name=Muestra]:checked').val());
            }
            else {
                var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "auto",
                    height: "auto",
                    modal: true,
                    close: function () {
                        $('input[name="Muestra"][value="SinCaptura"]').prop('checked', true);
                    },
                    actions:[]
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] +" </button><button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] +"</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    AjaxGetListaElementos(RequisicionID, tipoPrueba, ProyectoID, $('input:radio[name=Muestra]:checked').val());
                    ventanaConfirm.close();
                });

                $("#noButtonProy").click(function () {
                    $('input[name="Muestra"][value="SinCaptura"]').prop('checked', true);
                    ventanaConfirm.close();
                });
            }
        }
    });
}

function SuscribirEventoOcultarDivJunta() {
    $('#containerDiv').css('display', 'none');
}

function suscribirEventoGuardar() {
    $('.accionGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            if ($("#inputProyecto").data("kendoComboBox").value() != 0 && $("#inputProyecto").data("kendoComboBox").value() != "") {
                if ($("#inputTipoPrueba").data("kendoComboBox").value() != 0 && $("#inputTipoPrueba").data("kendoComboBox").value() != "") {
                    AjaxGuardarCaptura(ds._data, 0);
                }
                else
                    displayNotify("MensajeSeleccionaTipoPrueba", "", '1');
            }
            else
                displayNotify("MensajeSeleccionaProyecto", "", '1');
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('.accionGuardarYNuevo').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            if ($("#inputProyecto").data("kendoComboBox").value() != 0 && $("#inputProyecto").data("kendoComboBox").value() != "") {

                if ($("#inputTipoPrueba").data("kendoComboBox").value() != 0)
                    AjaxGuardarCaptura(ds._data, 1);
                else
                    displayNotify("MensajeSeleccionaTipoPrueba", "", '1');
            }
            else
                displayNotify("MensajeSeleccionaProyecto", "", '1');
        }
        else if ($('#botonGuardar').text() == "Editar") {
            if ($("#inputTipoPrueba").data("kendoComboBox").value() != 0)
                AjaxGuardarCaptura(ds._data, 1);
        }
    });
}

function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        Limpiar();
    });
}

function suscribirEventoAgregar() {
    $('#ButtonAgregar').click(function (e) {
        AgregarJuntaNueva();
    });
}

function vaciaTiposDePrueba() {
    $("#inputTipoPrueba").data("kendoComboBox").setDataSource();
    $("#inputTipoPrueba").data("kendoComboBox").value("");
    $("#inputTipoPrueba").data("kendoComboBox").dataSource.data([]);
}

function vaciaRequisiciones() {
    $("#listaRequisiciones").data("kendoComboBox").setDataSource();
    $("#listaRequisiciones").data("kendoComboBox").value("");
    $("#listaRequisiciones").data("kendoComboBox").dataSource.data([]);
}

function suscribirEventoProyecto() {
    var dataItem;
    $("#inputProyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        delay: 10,
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            var ds = $("#grid").data("kendoGrid").dataSource;
            if (!existenCambios(ds._data)) {
                proyectoInicial = $("#inputProyecto").data("kendoComboBox").value();

                if (dataItem != undefined && dataItem.Nombre != "" && dataItem.RequisicionID != 0) {
                    AjaxGetListaTiposDePrueba();

                    var TipoPruebaID = 0;
                    var RequisicionID = 0;
                    var ProyectoID = $("#inputProyecto").data("kendoComboBox").value();

                    if (ProyectoID != "" && ProyectoID != 0)
                        AjaxGetListaElementos(RequisicionID, TipoPruebaID, ProyectoID, $('input:radio[name=Muestra]:checked').val());
                    else
                        $("#grid").data('kendoGrid').dataSource.data([]);

                    //AjaxGetListaRequisiciones(ProyectoID, TipoPruebaID);
                    vaciaRequisiciones();
                    LimpiarRowJunta();
                }
                else {
                    $("#inputProyecto").data("kendoComboBox").value("");
                    $("#inputProyecto").data("kendoComboBox").select(0);
                    proyectoInicial = 0;
                    $("#grid").data('kendoGrid').dataSource.data([]);
                    var ProyectoID = 0;
                    var TipoPruebaID = 0;

                    vaciaRequisiciones();
                    vaciaTiposDePrueba();

                    //AjaxGetListaRequisiciones(ProyectoID, TipoPruebaID);
                }
            }
            else {
                var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "auto",
                    height: "auto",
                    modal: true,
                    close: function () {
                        $("#inputProyecto").data("kendoComboBox").value(proyectoInicial);
                    },
                    actions:[]
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'> "+ _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] +"</button><button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] +"</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    if (dataItem != undefined && dataItem.Nombre != "" && dataItem.RequisicionID != 0) {
                        proyectoInicial = $("#inputProyecto").data("kendoComboBox").value();
                        AjaxGetListaTiposDePrueba();
                        var TipoPruebaID = 0;
                        var RequisicionID = 0;
                        var ProyectoID = $("#inputProyecto").data("kendoComboBox").value();

                        if (ProyectoID != "" && ProyectoID != 0)
                            AjaxGetListaElementos(RequisicionID, TipoPruebaID, ProyectoID, $('input:radio[name=Muestra]:checked').val());
                        else
                            $("#grid").data('kendoGrid').dataSource.data([]);

                        //AjaxGetListaRequisiciones(ProyectoID, TipoPruebaID);
                        vaciaRequisiciones();
                        LimpiarRowJunta();
                    }
                    else {
                        $("#inputProyecto").data("kendoComboBox").value("");
                        $("#inputProyecto").data("kendoComboBox").select(0);
                        proyectoInicial = 0;

                        $("#grid").data('kendoGrid').dataSource.data([]);
                        var ProyectoID = 0;
                        var TipoPruebaID = 0;

                        vaciaRequisiciones();
                        vaciaTiposDePrueba();

                        //AjaxGetListaRequisiciones(ProyectoID, TipoPruebaID);
                    }
                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#inputProyecto").data("kendoComboBox").value(proyectoInicial);
                    ventanaConfirm.close();
                });
            }
        }
    });
}

function suscribirEventoTipoPrueba() {
    var dataItem;
    $("#inputTipoPrueba").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TipoPruebaID",
        delay: 10,
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            var ds = $("#grid").data("kendoGrid").dataSource;
            if (!existenCambios(ds._data)) {
                pruebaInicial = $("#inputTipoPrueba").data("kendoComboBox").value();
                var RequisicionID = 0;
                $("#listaRequisiciones").data("kendoComboBox").value("");
                $('#containerDiv').css('display', 'none');
                LimpiarRowJunta();

                if (dataItem != undefined && dataItem.TipoPruebaID != 0 && dataItem.Nombre != "") {
                    $('#containerDiv').css('display', 'block');
                    if (dataItem.TipoPruebaPorSpool == 1)
                        $('#CapturaRequisicionJunta').css('display', 'none');
                    else
                        $('#CapturaRequisicionJunta').css('display', 'block');

                    var tipoPruebaID = $("#inputTipoPrueba").data("kendoComboBox").value();
                    var ProyectoID = $("#inputProyecto").data("kendoComboBox").value();

                    if (ProyectoID != "" && ProyectoID != 0)
                        AjaxGetListaElementos(RequisicionID, tipoPruebaID, ProyectoID, $('input:radio[name=Muestra]:checked').val());
                    else
                        $("#grid").data('kendoGrid').dataSource.data([]);

                    AjaxGetListaRequisiciones(ProyectoID, tipoPruebaID);
                }
                else {
                    $('#containerDiv').css('display', 'none');
                    vaciaRequisiciones();
                    $("#inputTipoPrueba").data("kendoComboBox").value("");
                    $("#inputTipoPrueba").data("kendoComboBox").select(0);
                    pruebaInicial = 0;
                    var proyectoID = $("#inputProyecto").data("kendoComboBox").value();
                    var tipoPruebaID = 0;

                    if (proyectoID != "" && proyectoID != 0)
                        AjaxGetListaElementos(RequisicionID, tipoPruebaID, proyectoID, $('input:radio[name=Muestra]:checked').val());
                    else
                        $("#grid").data('kendoGrid').dataSource.data([]);
                }
            }
            else {
                var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "auto",
                    height: "auto",
                    modal: true,
                    close: function () {
                        $("#inputTipoPrueba").data("kendoComboBox").value(pruebaInicial);
                    },
                    actions:[]
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] +"</button><button class='btn btn-blue' id='noButtonProy'> "+ _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] +"</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    var RequisicionID = 0;
                    $("#listaRequisiciones").data("kendoComboBox").value("");
                    $('#containerDiv').css('display', 'none');
                    LimpiarRowJunta();

                    if (dataItem != undefined && dataItem.TipoPruebaID != 0 && dataItem.Nombre != "") {
                        $('#containerDiv').css('display', 'block');

                        if (dataItem.TipoPruebaPorSpool == 1)
                            $('#CapturaRequisicionJunta').css('display', 'none');
                        else
                            $('#CapturaRequisicionJunta').css('display', 'block');

                        var tipoPruebaID = $("#inputTipoPrueba").data("kendoComboBox").value();
                        var ProyectoID = $("#inputProyecto").data("kendoComboBox").value();
                        pruebaInicial = $("#inputTipoPrueba").data("kendoComboBox").value();
                        if (ProyectoID != "" && ProyectoID != 0)
                            AjaxGetListaElementos(RequisicionID, tipoPruebaID, ProyectoID, $('input:radio[name=Muestra]:checked').val());
                        else
                            $("#grid").data('kendoGrid').dataSource.data([]);

                        AjaxGetListaRequisiciones(ProyectoID, tipoPruebaID);
                    }
                    else {
                        $('#containerDiv').css('display', 'none');
                        vaciaRequisiciones();
                        $("#inputTipoPrueba").data("kendoComboBox").value("");
                        $("#inputTipoPrueba").data("kendoComboBox").select(0);
                        pruebaInicial = 0;
                        var proyectoID = $("#inputProyecto").data("kendoComboBox").value();
                        var tipoPruebaID = 0;

                        if (proyectoID != "" && proyectoID != 0)
                            AjaxGetListaElementos(RequisicionID, tipoPruebaID, proyectoID, $('input:radio[name=Muestra]:checked').val());
                        else
                            $("#grid").data('kendoGrid').dataSource.data([]);
                    }
                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#inputTipoPrueba").data("kendoComboBox").value(pruebaInicial);
                    ventanaConfirm.close();
                });
            }
        }
    });
}

function suscribirEventoRequisiciones() {
    var dataItem;
    $("#listaRequisiciones").kendoComboBox({
        suggest: true,
        delay: 10,
        filter: "contains",
        autoBind: false,
        dataTextField: "NombreRequisicion",
        dataValueField: "RequisicionID",
        select: function (e) {
            dataItem = this.dataItem(e.item.index());
        }, change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            var ds = $("#grid").data("kendoGrid").dataSource;
            if (!existenCambios(ds._data)) {
                if (dataItem == undefined || dataItem.NombreRequisicion == "") {
                    requisicionOriginal = 0;
                    $("#listaRequisiciones").data("kendoComboBox").value("");
                    $("#listaRequisiciones").data("kendoComboBox").select(0);

                    var RequisicionID = 0;
                    var tipoPruebaID = $("#inputTipoPrueba").data("kendoComboBox").value() == "" ? 0 : $("#inputTipoPrueba").data("kendoComboBox").value();
                    var ProyectoID = $("#inputProyecto").data("kendoComboBox").value();
                    AjaxGetListaElementos(RequisicionID, tipoPruebaID, ProyectoID, $('input:radio[name=Muestra]:checked').val());
                }
                else {
                    if (dataItem.RequisicionID == 0) {
                        requisicionOriginal = 0;
                        var RequisicionID = 0;
                        var tipoPruebaID = $("#inputTipoPrueba").data("kendoComboBox").value() == "" ? 0 : $("#inputTipoPrueba").data("kendoComboBox").value();
                        var ProyectoID = $("#inputProyecto").data("kendoComboBox").value();

                        AjaxGetListaElementos(RequisicionID, tipoPruebaID, ProyectoID, $('input:radio[name=Muestra]:checked').val());
                    } else {
                        if ($("#inputProyecto").data("kendoComboBox").value() == "" || $("#inputProyecto").data("kendoComboBox").value() == 0) {
                            requisicionOriginal = 0;
                            displayNotify("", "El campo proyecto es mandatorio", '1');
                            $("#listaRequisiciones").data("kendoComboBox").select(0);
                        }
                        else {
                            AjaxGetListaTiposDePrueba();
                            requisicionOriginal = $("#listaRequisiciones").data("kendoComboBox").value();
                            var proyectoReq = $("#inputProyecto").data("kendoComboBox").value();
                            var tipoPruebaReq = $("#inputTipoPrueba").data("kendoComboBox").value();
                            var requisicionID = $("#listaRequisiciones").data("kendoComboBox").value();

                            if (proyectoReq == "" || proyectoReq == 0) {
                                proyectoReq = $("#listaRequisiciones").data("kendoComboBox").dataItem($("#listaRequisiciones").data("kendoComboBox").select()).ProyectoID;
                            }
                            if (tipoPruebaReq == "" || tipoPruebaReq == 0) {
                                tipoPruebaReq = $("#listaRequisiciones").data("kendoComboBox").dataItem($("#listaRequisiciones").data("kendoComboBox").select()).TipoPruebaID;
                            }

                            $("#inputProyecto").data("kendoComboBox").value(proyectoReq);
                            $("#inputTipoPrueba").data("kendoComboBox").value(tipoPruebaReq);

                            AjaxGetListaElementos(requisicionID, tipoPruebaReq, proyectoReq, $('input:radio[name=Muestra]:checked').val());
                        }
                    }
                    SiguienteProceso(dataItem.RequisicionID);
                }
            }
            else {
                var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "auto",
                    height: "auto",
                    modal: true,
                    close: function () {
                        $("#listaRequisiciones").data("kendoComboBox").value(requisicionOriginal);
                    },
                    actioons:[]
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'> "+ _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] +"</button><button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] +"</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    if (dataItem == undefined || dataItem.NombreRequisicion == "") {
                        requisicionOriginal = 0;
                        $("#listaRequisiciones").data("kendoComboBox").value("");
                        $("#listaRequisiciones").data("kendoComboBox").select(0);

                        var RequisicionID = 0;
                        var tipoPruebaID = $("#inputTipoPrueba").data("kendoComboBox").value() == "" ? 0 : $("#inputTipoPrueba").data("kendoComboBox").value();
                        var ProyectoID = $("#inputProyecto").data("kendoComboBox").value();
                        AjaxGetListaElementos(RequisicionID, tipoPruebaID, ProyectoID, $('input:radio[name=Muestra]:checked').val());
                    }
                    else {
                        if (dataItem.RequisicionID == 0) {
                            requisicionOriginal = 0;
                            var RequisicionID = 0;
                            var tipoPruebaID = $("#inputTipoPrueba").data("kendoComboBox").value() == "" ? 0 : $("#inputTipoPrueba").data("kendoComboBox").value();
                            var ProyectoID = $("#inputProyecto").data("kendoComboBox").value();

                            AjaxGetListaElementos(RequisicionID, tipoPruebaID, ProyectoID, $('input:radio[name=Muestra]:checked').val());
                        } else {
                            if ($("#inputProyecto").data("kendoComboBox").value() == "" || $("#inputProyecto").data("kendoComboBox").value() == 0) {
                                requisicionOriginal = 0;
                                displayNotify("", "El campo proyecto es mandatorio", '1');
                                $("#listaRequisiciones").data("kendoComboBox").select(0);
                            }
                            else {
                                AjaxGetListaTiposDePrueba();
                                requisicionOriginal = $("#listaRequisiciones").data("kendoComboBox").value();
                                var proyectoReq = $("#inputProyecto").data("kendoComboBox").value();
                                var tipoPruebaReq = $("#inputTipoPrueba").data("kendoComboBox").value();
                                var requisicionID = $("#listaRequisiciones").data("kendoComboBox").value();

                                if (proyectoReq == "" || proyectoReq == 0) {
                                    proyectoReq = $("#listaRequisiciones").data("kendoComboBox").dataItem($("#listaRequisiciones").data("kendoComboBox").select()).ProyectoID;
                                }
                                if (tipoPruebaReq == "" || tipoPruebaReq == 0) {
                                    tipoPruebaReq = $("#listaRequisiciones").data("kendoComboBox").dataItem($("#listaRequisiciones").data("kendoComboBox").select()).TipoPruebaID;
                                }

                                $("#inputProyecto").data("kendoComboBox").value(proyectoReq);
                                $("#inputTipoPrueba").data("kendoComboBox").value(tipoPruebaReq);

                                AjaxGetListaElementos(requisicionID, tipoPruebaReq, proyectoReq, $('input:radio[name=Muestra]:checked').val());
                            }
                        }

                        SiguienteProceso(dataItem.RequisicionID);
                    }
                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#listaRequisiciones").data("kendoComboBox").value(requisicionOriginal);
                    ventanaConfirm.close();
                });
            }
        }
    });
}

function suscribirOrdenTrabajo() {
    $("#InputOrdenTrabajo").blur(function (e) {
        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                AjaxObtenerSpoolID();
            } catch (e) {
                displayNotify("Mensajes_error", e.message, '2');
            }
        } else {
            displayNotify("CapturaSoldaduraMensajeOrdenTrabajo", "", '1');
        }
    });

    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").select(0);
        $("#Junta").data("kendoComboBox").setDataSource();
        $("#InputID").data("kendoComboBox").setDataSource();
    });

};
function SuscribirEventoSpoolID() {
    var dataItem;
    $("#InputID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        delay: 10,
        suggest: true,
        filter: "contains",
        index: 3,
        select: function (e) {
            dataItem = this.dataItem(e.item.index());
            if (dataItem != undefined) {
                if (dataItem.Status != "1") {
                    e.preventDefault();
                    $("#InputID").val("");
                    displayNotify("Mensajes_error", dataItem.Status, '1');
                }
                else {
                    $("#InputID").val(dataItem.IDValido);
                    Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                    $("#LabelProyecto").text(dataItem.Proyecto);
                }
            }
        },
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                if ($("#InputID").val().length == 1) {
                    $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
                }
                if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                    Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                    $("#LabelProyecto").text(dataItem.Proyecto);
                    AjaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
                }
            }
        }
    });

    

    $('#InputID').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();
        }
        else if (e.keyCode == 39) {
            $("#Junta").data("kendoComboBox").input.focus();
        }
        else if (e.keyCode == 40 && $("#InputID").data("kendoComboBox").select() != -1) {
            $("#InputID").data("kendoComboBox").select();
            AjaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
        }
        else if (e.keyCode == 13) {
            if ($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select(0)) != undefined) {
                if ($("#InputID").data("kendoComboBox").select() != -1) {
                    AjaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
                }
            }
            else
                displayNotify("NoExisteSpoolID", '', '2');
        }
        else if (e.keyCode == 9) {
            if (tieneClase(e.currentTarget)) {
                $("#InputID").data("kendoComboBox").select(0);
                AjaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
            }
            dataItem = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select());
            if (dataItem != undefined) {
                if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                    Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                    $("#LabelProyecto").text(dataItem.Proyecto);
                    AjaxJunta($("#InputID").val());
                }
            }
        }
    });
};

function SuscribirEventosJunta() {
    $('#Junta').kendoComboBox({
        dataTextField: "Etiqueta",
        dataValueField: "JuntaSpoolID",
        delay: 10,
        suggest: true,
        filter: "contains",
        index: 3
    });

    $('#Junta').closest('.k-widget').keydown(function (e) {

        if (e.keyCode == 37) {
            $("#InputID").data("kendoComboBox").input.focus();
            $("#Junta").val("");
        }
        else if (e.keyCode == 39) {
            $("#ButtonAgregar").focus();
        }
        else if (e.keyCode == 13) {
            if ($("#Junta").data("kendoComboBox").dataItem($("#Junta").data("kendoComboBox").select()) != undefined) {

                AgregarJuntaNueva();
            }
            else
                $("#Junta").data("kendoComboBox").value("");
        }
    });
}

function Limpiar() {
    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").value("");
    $("#Junta").data("kendoComboBox").value("");

    vaciaTiposDePrueba();
    vaciaRequisiciones();

    $("#grid").data('kendoGrid').dataSource.data([]);

    AjaxCargarCamposPredeterminados();

    //$("#Fecha").data("kendoDatePicker").value("");

}

function LimpiarRowJunta() {
    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").value("");
    $("#Junta").data("kendoComboBox").value("");
}

function opcionHabilitarView(valor, name) {
    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#inputProyecto").data("kendoComboBox").enable(false);
        $("#inputTipoPrueba").data("kendoComboBox").enable(false);
        $("#listaRequisiciones").data("kendoComboBox").enable(false);

        $("#InputID").data("kendoComboBox").enable(false);
        $("#Junta").data("kendoComboBox").enable(false);
        //$("#Fecha").data("kendoDatePicker").enable(false);
        $('#botonGuardar').text("Editar");
        $("#DetalleAvisoLlegada0017").text("Editar");

        $("#botonGuardar2").text("Editar");
        $('#botonGuardar').text("Editar");
        $('#botonGuardar4').text("Editar");
        $('#botonGuardar3').text("Editar");

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#inputProyecto").data("kendoComboBox").enable(true);
        $("#inputTipoPrueba").data("kendoComboBox").enable(true);
        $("#listaRequisiciones").data("kendoComboBox").enable(true);

        $("#InputID").data("kendoComboBox").enable(true);
        $("#Junta").data("kendoComboBox").enable(true);
        $('#botonGuardar').text("Guardar");
        $("#DetalleAvisoLlegada0017").text("Guardar");

        $("#botonGuardar2").text("Guardar");
        $('#botonGuardar').text("Guardar");
        $('#botonGuardar4').text("Guardar");
        $('#botonGuardar3').text("Guardar");
    }
}