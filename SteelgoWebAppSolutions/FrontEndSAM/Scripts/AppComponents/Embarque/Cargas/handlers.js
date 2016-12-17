﻿var proyectoInicial = 0;
var proveedorInicial = 0;
var planaInicial = 0;

var windowDownloadPaquete;
var ventanaPopup;

function SuscribirEventos() {
    SuscribirEventoMostrar();
    SuscribirEventoProyecto();
    SuscribirEventoSpoolID();
    SuscribirEventoChangeRadioTipoListado();
    SuscribirEventoProveedor();
    SuscribirEventoPlacasPlana();
    SuscribirEventoPaquete();
    SuscribirEventoAgregar();
    SuscribirEventoAgregarPaquete();
    SuscribirEventoActualizarCuadrante();
    SuscribirEventoCancelar();
    SuscribirEventoActualizarPaquete();
    SuscribirEventoCancelarPaquete();
    SuscribirEventoGuardar();
    SuscribirEventoCancelarPopup();
    SuscribirEventoZona();
    SuscribirEventoCuadrante();
    SuscribirEventoGuardarPlana();
    SuscribirEventoGuardarProveedor();
    SuscribirEventoDescargarPaquete();
}
function SuscribirEventoPopUpDescargaPaquete() {
    windowDownloadPaquete = $("#divDescargaPaquete").kendoWindow({
        iframe: true,
        title: _dictionary.EmbarqueCargaTituloPopupDescargaPaquete[$("#language").data("kendoDropDownList").value()],
        modal: true,
        resizable: false,
        visible: false,
        width: "40%",
        height: "auto",
        draggable: false,
        resizable: false,
        animation: {
            close: false,
            open: false
        },
        close: function (e) {
            
        }
    }).data("kendoWindow");
    
    $("#btnDescargarPaquete").click(function (e) {
        var zonaID = $("#inputZonaPaquete").data("kendoComboBox").value();
        var cuadranteID = $("#inputCuadrantePaquete").data("kendoComboBox").value();
        var uid = $("#rowGridDescargaPaquete").val();
        var dataItem = $('#grid').data("kendoGrid").dataSource.getByUid(uid);
        if (zonaID != "" && zonaID != "0") {
            if (cuadranteID != "" && cuadranteID != "0") {
                AjaxDescargarPaquete(dataItem);

            }else
                displayNotify("EmbarqueCargaMsjErrorCuadrante", "", "1");

        } else 
            displayNotify("EmbarqueCargaMsjErrorZona", "", "1");
    });
    $("#btnCerrarPopupPaquete").click(function (e) {
        windowDownloadPaquete.close();
    });
}

function SuscribirEventoPopUpDescargaSpool() {
    ventanaPopup = $("#ventanaPopup").kendoWindow({
        title: _dictionary.EmbarqueCargaTituloPopupCuadrante[$("#language").data("kendoDropDownList").value()],
        visible: false,
        width: "40%",
        height: "auto",
        modal: true,
        draggable: false,
        resizable: false,
        animation: {
            close: false,
            open: false
        },
    }).data("kendoWindow");

    $("#btnDescargar").click(function (e) {
        var Zona = $("#inputZonaPopup").data("kendoComboBox").dataItem($("#inputZonaPopup").data("kendoComboBox").select());
        var Cuadrante = $("#inputCuadrantePopup").data("kendoComboBox").dataItem($("#inputCuadrantePopup").data("kendoComboBox").select());
        var uid = $("#rowGridDescargaSpool").val();
        var dataItem = $('#grid').data("kendoGrid").dataSource.getByUid(uid);

        if (Zona != undefined && Zona.ZonaID != 0) {
            if (Cuadrante != undefined && Cuadrante.CuadranteID != 0) {
                ventanaPopup.close();
                AjaxDescargarSpool(dataItem, Cuadrante);
            } else {
                displayNotify("EmbarqueCargaMsjErrorCuadrante", "", "1");
            }
        } else {
            displayNotify("EmbarqueCargaMsjErrorZona", "", "1");
        }
    });
}

function SuscribirEventoDescargarPaquete() {

    $(document).on('click', '.descargarPaquete', function (e) {
        e.preventDefault();
        if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#grid").data("kendoGrid");
            var dataItem = grid.dataItem($(e.target).closest("tr"));
            
            if (dataItem.Accion == 2) {
                $("#rowGridDescargaPaquete").val(dataItem.uid);
                $("#inputZonaPaquete").data("kendoComboBox").value(dataItem.ZonaPaqueteAnteriorID);
                $("#inputZonaPaquete").data("kendoComboBox").trigger("change");
                CuadrantePaqueteAnterior = dataItem.CuadrantePaqueteAnteriorID;

                windowDownloadPaquete.center().open();
            }
        }
    });
}

function SuscribirEventoCancelarPopup() {
    $('#CancelarNuevoProveedor').click(function (e) {
        $("#inputProveedor").data("kendoComboBox").value("0");
        windowNewProvider.close();
    });
    $('#CancelarNuevaPlana').click(function (e) {
        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value("0");
        windowNewPlate.close();
    });
    $('#btnCerrarPopup').click(function (e) {
        ventanaPopup.close();
    });
}


function SuscribirEventoGuardar() {
    $('#btnGuardarYNuevo').click(function (e) {
        ajaxGuardar($("#grid").data("kendoGrid").dataSource._data, 1);
        Limpiar();
    });
    $('#btnGuardarYNuevo1').click(function (e) {
        ajaxGuardar($("#grid").data("kendoGrid").dataSource._data, 1);
        Limpiar();
    });


    $('.accionGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
            if ($("#inputProveedor").data("kendoComboBox").dataItem($("#inputProveedor").data("kendoComboBox").select()) != undefined) {
                if ($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataItem($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").select()) != undefined) {
                    if (ds._data.length > 0) {
                        ajaxGuardar(ds._data, 0);
                    }
                }
                else {
                    displayNotify("EmbarqueCargaMensajeErrorPlana", "", '2');
                }
            }
            else {
                displayNotify("EmbarqueCargaMensajeErrorProveedor", "", '2');
            }
        }
        else {
            opcionHabilitarView(false, "FieldSetView")
        }
    });

};

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#InputID").data("kendoComboBox").enable(false);
        $("#inputProyecto").data("kendoComboBox").enable(false);
        $("#inputProveedor").data("kendoComboBox").enable(false);
        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").enable(false);
        $('#btnAgregar').prop("disabled", true);
        $('#btnMostrar').prop("disabled", true);
        $("#inputCerrar").prop("disabled", true);
        $('#inputPaquete').data("kendoComboBox").enable(false);
        $('#ButtonCrearPaquete').prop("disabled", true);
        $('#ButtonAgregarPAquete').prop("disabled", true);
        $('.accionGuardar').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('.radioEmbarqueCargaTipoSeleccion').prop("disabled", true);
        $('#InputOrdenTrabajo').prop("disabled", true);
        $('#inputCodigo').prop("disabled", true);
        $('#lblEmbarqueCargaTotalPiezas').text('');

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#InputID").data("kendoComboBox").enable(true);
        $("#inputProyecto").data("kendoComboBox").enable(true);
        $("#inputProveedor").data("kendoComboBox").enable(true);
        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").enable(true);
        $('#btnAgregar').prop("disabled", false);
        $('#btnMostrar').prop("disabled", false);
        $("#inputCerrar").prop("disabled", false);
        $('#inputPaquete').data("kendoComboBox").enable(true);
        $('#ButtonCrearPaquete').prop("disabled", false);
        $('#ButtonAgregarPAquete').prop("disabled", false);
        $('.accionGuardar').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $('.radioEmbarqueCargaTipoSeleccion').prop("disabled", false);
        $('#InputOrdenTrabajo').prop("disabled", false);
        $('#inputCodigo').prop("disabled", false);

    }
}

function SuscribirEventoActualizarPaquete() {
    $('#btnActualizarPaquetePopUp').click(function (e) {
        AjaxCrearPaquete($("#grid").data("kendoGrid").dataSource._data, 1, $("#inputPopupPaquete").val());
        ventanaAgregarPaquetePopup.close();
    });
}

function SuscribirEventoActualizarCuadrante() {
    $('#btnActualizarCuadrantePopUp').click(function (e) {
        dataItemSeleccionadoPopup.CuadranteID = parseInt($("#inputPopupCuadrante").val());
        dataItemSeleccionadoPopup.Accion = 3;
        $("#grid").data("kendoGrid").dataSource.sync();
        ventanaPopup.close();
    });
}

function SuscribirEventoCancelarPaquete() {
    $('#btnCancelarPaquetePopUp').click(function (e) {
        ventanaAgregarPaquetePopup.close();
    });
}

function SuscribirEventoCancelar() {
    $('#btnCancelarPopUp').click(function (e) {
        ventanaPopup.close();
    });
}

function SuscribirEventoProyecto() {
    $('#inputProyecto').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            var ds = $("#grid").data("kendoGrid").dataSource;

            if (ds._data.length == 0) {
                proyectoInicial = $("#inputProyecto").data("kendoComboBox").value();
                Limpiar();
                $("#grid").data("kendoGrid").dataSource.data([]);
                $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").setDataSource();
                $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value("");
                $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataSource.data([]);

                $("#inputProveedor").data("kendoComboBox").setDataSource();
                $("#inputProveedor").data("kendoComboBox").value("");
                $("#inputProveedor").data("kendoComboBox").dataSource.data([]);

                $("#inputZonaPaquete").data("kendoComboBox").dataSource.data([]);
                $("#inputZonaPaquete").data("kendoComboBox").value("");
                if (dataItem != undefined) {
                    if (dataItem.ProyectoID != 0) {
                        AjaxEmbarqueCargaProveedores(dataItem.ProyectoID, null);
                        AjaxCargarPaquetes();
                        AjaxCargarZonaPaquete(dataItem.ProyectoID);
                    }
                }
                else {
                    $("#inputProyecto").data("kendoComboBox").value("");
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
                    draggable: false,
                    resizable: false,
                    animation: {
                        close: false,
                        open: false
                    },
                    close: function () {
                        $("#inputProyecto").data("kendoComboBox").value(proyectoInicial);
                    }
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    proyectoInicial = $("#inputProyecto").data("kendoComboBox").value();
                    $("#grid").data("kendoGrid").dataSource.data([]);
                    $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").setDataSource();
                    $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value("");
                    $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataSource.data([]);

                    $("#inputProveedor").data("kendoComboBox").setDataSource();
                    $("#inputProveedor").data("kendoComboBox").value("");
                    $("#inputProveedor").data("kendoComboBox").dataSource.data([]);

                    $("#inputZonaPaquete").data("kendoComboBox").dataSource.data([]);
                    $("#inputZonaPaquete").data("kendoComboBox").value("");

                    if (dataItem != undefined) {
                        if (dataItem.ProyectoID != 0) {
                            AjaxEmbarqueCargaProveedores(dataItem.ProyectoID, null);
                            AjaxCargarPaquetes();
                            AjaxCargarZonaPaquete(dataItem.ProyectoID);
                        }
                    }
                    else {
                        $("#inputProyecto").data("kendoComboBox").value("");
                    }
                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#inputProyecto").data("kendoComboBox").value(proyectoInicial);
                    ventanaConfirm.close();
                });
            }
        },
    });
}

function ObtenerTipoConsulta() {
    var radioButtonsLLena = document.getElementsByName('EmbarqueCargaTipoSeleccion');

    for (var x = 0; x < radioButtonsLLena.length; x++) {
        if (radioButtonsLLena[x].checked) {
            return (x + 1);
        }
    }
    return -1;
}

function SuscribirEventoSpoolID() {
    var dataItem;
    $("#InputID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        suggest: true,
        filter: "contains",
        index: 3,
        delay: 10,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {

            }
            else {
                $("#InputID").data("kendoComboBox").value("");
            }
        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val() != "") {
            if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
                try {
                    AjaxObtenerSpoolID();
                } catch (e) {
                    displayNotify("Mensajes_error", e.message, '2');
                }
            } else {
                $("#InputOrdenTrabajo").val("");
                displayNotify("PinturaCargaMensajeOrdenTrabajo", "", '1');
            }
        }

    });


    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").value("");
        $("#InputID").data("kendoComboBox").setDataSource();
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {

        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();

        }
        else if (e.keyCode == 40) {
            $("#InputID").data("kendoComboBox").select();
        }
        else if (e.keyCode == 13) {
            if ($('#InputID').data("kendoComboBox").value() != undefined) {
                if (!$("#inputCerrar").is(":checked")) {
                    if ($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").text() != '' && $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value() != undefined) {
                        AjaxAgregarCarga();
                    }
                    else {
                        displayNotify('EmarqueCargaMensajeEligePlana', '', '1');
                    }
                }
                else {
                    displayNotify('EmarqueCargaMensajePlanaCerrada', '', '1');
                }
            }
            else {
                $("#InputID").data("kendoComboBox").value("");
                displayNotify("PinturaCargaNoExisteSpoolID", '', '1');
            }

        }
    });

};

function SuscribirEventoChangeRadioTipoListado() {

    $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(0)').change(function () {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").value("");
        $("#divSpool").show();
        $("#divPaquete").hide();
        $("#divCodigo").hide();
    });
    $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(1)').change(function () {
        $("#inputPaquete").data("kendoComboBox").value("");
        $("#divSpool").hide();
        $("#divPaquete").show();
        $("#divCodigo").hide();

    });
    $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(2)').change(function () {
        $("#inputCodigo").val("");
        $("#divSpool").hide();
        $("#divPaquete").hide();
        $("#divCodigo").show();

    });
}

function SuscribirEventoProveedor() {
    $('#inputProveedor').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProveedorID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            var ds = $("#grid").data("kendoGrid").dataSource;

            if (ds._data.length == 0) {
                $("#grid").data("kendoGrid").dataSource.data([]);
                $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").setDataSource();
                $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value("");
                $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataSource.data([]);

                if (dataItem != undefined) {
                    proveedorInicial = $("#inputProveedor").data("kendoComboBox").value();
                    if (dataItem.ProveedorID == -1) {
                        CargaPopupNuevoProveedor();
                    } else {
                        AjaxObtenerPlanas(dataItem.ProveedorID, null);
                    }
                }
                else {
                    $("#inputProveedor").data("kendoComboBox").value("");
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
                    draggable: false,
                    resizable: false,
                    animation: {
                        close: false,
                        open: false
                    },
                    close: function () {
                        $("#inputProveedor").data("kendoComboBox").value(proveedorInicial);
                    }
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    $("#grid").data("kendoGrid").dataSource.data([]);
                    $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").setDataSource();
                    $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value("");
                    $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataSource.data([]);

                    if (dataItem != undefined) {
                        proveedorInicial = $("#inputProveedor").data("kendoComboBox").value();
                        if (dataItem.ProveedorID == -1) {
                            CargaPopupNuevoProveedor();
                        } else {
                            AjaxObtenerPlanas(dataItem.ProveedorID, null);
                        }
                    }
                    else {
                        $("#inputProveedor").data("kendoComboBox").value("");
                    }
                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#inputProveedor").data("kendoComboBox").value(proveedorInicial);
                    ventanaConfirm.close();
                });
            }
        }
    });

}

function SuscribirEventoPlacasPlana() {
    $('#inputEmbarqueCargaPLacaPlana').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PlanaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            var ds = $("#grid").data("kendoGrid").dataSource;

            if (ds._data.length == 0) {
                $("#grid").data("kendoGrid").dataSource.data([]);
                Limpiar();
                if (dataItem != undefined) {
                    planaInicial = $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value();
                    if (dataItem.PlanaID == -1) {
                        if ($("#inputProveedor").data("kendoComboBox").value() != 0 && $("#inputProveedor").data("kendoComboBox").value() != undefined && $("#inputProveedor").data("kendoComboBox").value() != -1)
                            CargaPopupNuevaPlana();
                        else {
                            $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value(0);
                            displayNotify('EmbarqueCargaMsjErrorCrearPlanaSeleccionaProveedor', '', '1');
                        }
                    }
                    else {
                        if (dataItem.StatusCarga) {
                            $('#inputCerrar').prop('checked', true);
                        }
                        else {
                            $('#inputCerrar').prop('checked', false);
                        }
                    }
                }
                else {

                    $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value("");
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
                    draggable: false,
                    resizable: false,
                    animation: {
                        close: false,
                        open: false
                    },
                    close: function () {
                        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value(planaInicial);
                    }
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    ventanaConfirm.close();
                    $("#grid").data("kendoGrid").dataSource.data([]);
                    Limpiar();
                    if (dataItem != undefined) {
                        planaInicial = $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value();

                        if (dataItem.PlanaID == -1) {
                            if ($("#inputProveedor").data("kendoComboBox").value() != 0 && $("#inputProveedor").data("kendoComboBox").value() != undefined && $("#inputProveedor").data("kendoComboBox").value() != -1)
                                CargaPopupNuevaPlana();
                            else {
                                $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value(0);
                                displayNotify('EmbarqueCargaMsjErrorCrearPlanaSeleccionaProveedor', '', '1');
                            }
                        }
                        else {
                            if (dataItem.StatusCarga) {
                                $('#inputCerrar').prop('checked', true);
                            }
                            else {
                                $('#inputCerrar').prop('checked', false);
                            }
                        }
                    }
                    else {
                        $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value("");
                    }
                });
                $("#noButtonProy").click(function () {
                    $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value(planaInicial);
                    ventanaConfirm.close();
                });
            }

        }
    });

    $('#inputEmbarqueCargaPLacaPlana').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").text() != '' && $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value() != undefined) {
                AjaxObtenerGrid();
            }
            else {
                displayNotify('EmarqueCargaMensajeEligePlana', '', '1');
            }
        }

    });
}

function SuscribirEventoPaquete() {
    $('#inputPaquete').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PaqueteID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            
        }
    });
}

function SuscribirEventoAgregar() {
    $('#btnAgregar').click(function (e) {
        if (!$("#inputCerrar").is(":checked")) {
            if ($("#lblEstatus").text().toLowerCase() != "cerrada" && $("#lblEstatus").text().toLowerCase() != "closed") {
                if (ObtenerTipoConsulta() == 1) {
                    if ($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()) != undefined) {
                        if ($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").text() != '' && $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value() != undefined) {
                            AjaxAgregarCarga();
                        }
                        else {
                            displayNotify("EmarqueCargaMensajeEligePlana", "", '1');
                        }

                    }
                    else {
                        $("#InputID").data("kendoComboBox").value("");
                    }
                }
                else if (ObtenerTipoConsulta() == 2) {
                    if ($("#inputPaquete").data("kendoComboBox").dataItem($("#inputPaquete").data("kendoComboBox").select()) != undefined) {
                        if ($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").text() != '' && $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value() != undefined) {
                           AjaxAgregarPaquete();
                        }
                        else {
                            displayNotify("EmarqueCargaMensajeEligePlana", "", '1');
                        }
                    }
                    else {
                        $("#inputPaquete").data("kendoComboBox").value("");
                    }
                }
                else if (ObtenerTipoConsulta() == 3) {
                    if ($("#inputCodigo").val() != "") {
                        if ($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").text() != '' && $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value() != undefined) {
                            AjaxAgregarCarga();
                        }
                        else {
                            displayNotify("EmarqueCargaMensajeEligePlana", "", '1');
                        }
                    }
                }
            }
            else {
                displayNotify("EmbarqueCargaErrorAgregar", "", '1');
            }
        }
        else {
            displayNotify('EmarqueCargaMensajePlanaCerrada', '', '1');
        }
    });
}

function SuscribirEventoMostrar() {
    $('#btnMostrar').click(function (e) {
        if ($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").text() != '' && $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value() != undefined) {
            AjaxObtenerGrid();
        }
        else {
            displayNotify('EmarqueCargaMensajeEligePlana', '', '1');
        }
    });
}


function SuscribirEventoCrearPaquete() {
    $('#ButtonCrearPaquete').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if (ExistenSeleccionados(ds._data)) {
            if (!validarExisteSpoolSeleccionadoSinPaquete()) {
                var ds = $("#grid").data("kendoGrid").dataSource;
                AjaxCrearPaquete(ds._data, undefined, 0);
            }
        }
        else {
            displayNotify("EmbarqueCargaMsjErrorPaqueteAgregarExiste", "", '1');
            existe = true;
            return existe;
        }
    });

}

function SuscribirEventoAgregarPaquete() {
    $('#ButtonAgregarPAquete').click(function (e) {
        if (validarExistaSoloUnpaqueteSeleccionado()) {
            // alert('entro asiganr paquete con uno seleccionado');
            AsignarValorPaqueteASinPaquete();

        }//falta
        else if (validarSoloSeleccionadoSinPaquete()) {
            //  alert('entro solo seleccionado sin paquete');
            ventanaAgregarPaquetePopup.open().center();

        }
        else {
            displayNotify("EmbarqueCargaSeAgregaPaquete", "", '2');
        }
    });

}


function SuscribirEventoZona() {
    $('#inputZonaPopup').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ZonaID",
        suggest: true,
        filter: "contains",
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            $("#inputCuadrantePopup").data("kendoComboBox").dataSource.data([]);
            $("#inputCuadrantePopup").data("kendoComboBox").value("");

            if (dataItem != undefined) {
                if (dataItem.ZonaID != 0) {
                    AjaxCargarCuadrante(dataItem.ZonaID, 1);
                }
            }
            else {
                $("#inputZonaPopup").data("kendoComboBox").value("");
            }
        }
    });

    $('#inputZonaPaquete').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ZonaID",
        suggest: true,
        filter: "contains",
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            $("#inputCuadrantePaquete").data("kendoComboBox").dataSource.data([]);
            $("#inputCuadrantePaquete").data("kendoComboBox").value("");

            if (dataItem != undefined) {
                if (dataItem.ZonaID != 0) {
                    AjaxCargarCuadrante(dataItem.ZonaID, 0);
                }
            }
            else {
                $("#inputZonaPaquete").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoCuadrante() {
    $('#inputCuadrantePopup').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {

            }
            else {
                $("#inputCuadrantePopup").data("kendoComboBox").value("");
            }
        }
    });

    $('#inputCuadrantePaquete').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {

            }
            else {
                $("#inputCuadrantePaquete").data("kendoComboBox").value("");
            }
        }
    });
}


function SuscribirEventoGuardarPlana() {
    $('#GuardarNuevaPlana').click(function (e) {
        if ($("#inputNombreNuevaPlana").val() != "") {
            GuardarNuevaPlana();
        }
        else {
            displayNotify('EmbarqueCargaMsjErrorNombreProveedor', '', '1');
        }
    });
}

function SuscribirEventoGuardarProveedor() {
    $('#GuardarNuevoProveedor').click(function (e) {
        if ($("#inputNombreNuevoProveedor").val() != "") {
            GuardarNuevoProveedor();
        }
        else {
            displayNotify('EmbarqueCargaMsjErrorNombreProveedor', '', '1');
        }
    });
}

function Limpiar() {
    $('#lblEmbarqueCargaTotalPiezas').text("");
    $('#lblEmbarqueCargaToneladasCargadas').text("");

    $("#InputOrdenTrabajo").val("");
    $("#inputCodigo").val("");
    $("#InputID").data("kendoComboBox").value("");
    opcionHabilitarView(false, "")
}