var proyectoInicial = 0;
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
        width: "auto",
        height: "auto",
        draggable: false,
        resizable: false,
        animation: {
            close: false,
            open: false
        },
        actions:[]
    }).data("kendoWindow");
    
    $("#btnDescargarPaquete").click(function (e) {
        var zonaID = $("#inputZonaPaquete").data("kendoComboBox").value();
        var cuadranteID = $("#inputCuadrantePaquete").data("kendoComboBox").value();
        var uid = $("#rowGridDescargaPaquete").val();
        var dataItem = $('#grid').data("kendoGrid").dataSource.getByUid(uid);
        if (zonaID != "" && zonaID != "0") {
            if (cuadranteID != "" && cuadranteID != "0") {
                windowDownloadPaquete.close();
                AjaxDescargarPaquete(dataItem.PaqueteID, 1);

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

            if (dataItem.PaqueteID != 0) {
                if (!$("#inputCerrar").is(":checked")) {
                    if (dataItem.Accion == 2) {
                        $("#rowGridDescargaPaquete").val(dataItem.uid);
                        $("#inputZonaPaquete").data("kendoComboBox").value(dataItem.ZonaPaqueteAnteriorID);
                        $("#inputZonaPaquete").data("kendoComboBox").trigger("change");
                        CuadrantePaqueteAnterior = dataItem.CuadrantePaqueteAnteriorID;

                        windowDownloadPaquete.center().open();
                    }
                } else 
                    displayNotify("EmbarqueCargaMsjDescargaPaquetePlanaCerrada", "", "1");
            }
        }
    });
}

function SuscribirEventoPopUpPaqueteVacio() {
    windowPackageEmpty = $("#windowPackageEmpty").kendoWindow({
        iframe: true,
        title: _dictionary.EmbarqueEmpaquetadoAdvertenciaPaqueteVacio[$("#language").data("kendoDropDownList").value()],
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
        actions: [],
    }).data("kendoWindow");
    $("#windowPackageEmpty").parent().find(".k-window-action").css("visibility", "hidden");

    $("#btnDescargarPaqueteVacio").click(function (e) {
        var zonaID = $("#inputZonaPaqueteDescarga").data("kendoComboBox").value();
        var cuadranteID = $("#inputCuadrantePaqueteDescarga").data("kendoComboBox").value();
        var paqueteID = $("#detallePaquete").val();

        if (zonaID != "" && zonaID != "0") {
            if (cuadranteID != "" && cuadranteID != "0") {
                windowPackageEmpty.close();
                AjaxDescargarPaquete(paqueteID, 0);
            } else
                displayNotify("EmbarqueCargaMsjErrorCuadrante", "", "1");

        } else
            displayNotify("EmbarqueCargaMsjErrorZona", "", "1");
    });
    $("#btnEliminarPaqueteVacio").click(function (e) {
        windowPackageEmpty.close();

        var uid = $("#detallePaquete").val();
        var dataItem = $('#grid').data("kendoGrid").dataSource.getByUid(uid);
        AjaxEliminarPaquete(dataItem);
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
    $('#btnGuardarYNuevo, #btnGuardarYNuevo1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        var Proyecto = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select());
        var Proveedor = $("#inputProveedor").data("kendoComboBox").dataItem($("#inputProveedor").data("kendoComboBox").select());
        var Plana = $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataItem($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").select());

        if (Proyecto != undefined && Proyecto.ProyectoID != 0) {
            if (Proveedor != undefined && Proveedor.ProveedorID != 0) {
                if (Plana != undefined && Plana.PlanaID != 0) {
                    if (ds._data.length > 0)
                        ajaxGuardar(ds._data, 1);
                    else
                        displayNotify("MensajeAdverteciaExcepcionGuardado", "", '2');
                }
                else
                    displayNotify("EmbarqueCargaMensajeErrorPlana", "", '2');
            }
            else 
                displayNotify("EmbarqueCargaMensajeErrorProveedor", "", '2');
        } else
            displayNotify("EmbarqueCargaMensajeErrorProyecto", "", '2');
        
    });
    $('.accionGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        var Proyecto = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select());
        var Proveedor = $("#inputProveedor").data("kendoComboBox").dataItem($("#inputProveedor").data("kendoComboBox").select());
        var Plana = $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataItem($("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").select());
        if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
            if (Proyecto != undefined && Proyecto.ProyectoID != 0) {
                if (Proveedor != undefined && Proveedor.ProveedorID != 0) {
                    if (Plana != undefined && Plana.PlanaID != 0) {
                        if (ds._data.length > 0) {
                            ajaxGuardar(ds._data, 0);
                        } else {
                            displayNotify("MensajeAdverteciaExcepcionGuardado", "", '2');
                        }
                    }
                    else {
                        displayNotify("EmbarqueCargaMensajeErrorPlana", "", '2');
                    }
                }
                else {
                    displayNotify("EmbarqueCargaMensajeErrorProveedor", "", '2');
                }
            }else
                displayNotify("EmbarqueCargaMensajeErrorProyecto", "", '2');
        }
        else {
            opcionHabilitarView(false, "FieldSetView")
        }
    });

};

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#InputOrdenTrabajo").css('opacity', '0.6');
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
        $("#InputOrdenTrabajo").css('opacity', '0.6');
        $('#inputCodigo').prop("disabled", true);
        $('#lblEmbarqueCargaTotalPiezas').text('');

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#InputOrdenTrabajo").css('opacity', '1');
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
        $("#InputOrdenTrabajo").css('opacity', '1');
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
                $("#inputZonaPaqueteDescarga").data("kendoComboBox").dataSource.data([]);
                $("#inputZonaPaqueteDescarga").data("kendoComboBox").value("");
                if (dataItem != undefined) {
                    if (dataItem.ProyectoID != 0) {
                        AjaxEmbarqueCargaProveedores(dataItem.ProyectoID, null);
                        AjaxCargarPaquetes(dataItem.ProyectoID);
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
                    actions: []
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.MensajeAdvertenciaDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()]
                    + "</button><button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()]
                    + "</button></center>");

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
        }
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
        } else {

            $("#InputID").data("kendoComboBox").dataSource.data([]);
            $("#InputID").data("kendoComboBox").value("");
        }

    });


    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").setDataSource();
        $("#InputID").data("kendoComboBox").value("");
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
                LimpiarSelectProveedor();
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
                    actions: []
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.MensajeAdvertenciaDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()]
                    + "</button><button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()]
                    + "</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    ventanaConfirm.close();
                    $("#grid").data("kendoGrid").dataSource.data([]);
                    LimpiarSelectProveedor();

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
                LimpiarSelectPlana();
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
                    actions: []
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.MensajeAdvertenciaDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()]
                    + "</button><button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()]
                    + "</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    ventanaConfirm.close();
                    $("#grid").data("kendoGrid").dataSource.data([]);
                    LimpiarSelectPlana();
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
                    var Paquete = $("#inputPaquete").data("kendoComboBox").dataItem($("#inputPaquete").data("kendoComboBox").select());
                    if (Paquete != undefined && Paquete.PaqueteID != 0) {
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

    $('#inputZonaPaqueteDescarga').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ZonaID",
        suggest: true,
        filter: "contains",
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            $("#inputCuadrantePaqueteDescarga").data("kendoComboBox").dataSource.data([]);
            $("#inputCuadrantePaqueteDescarga").data("kendoComboBox").value("");

            if (dataItem != undefined) {
                if (dataItem.ZonaID != 0) {
                    AjaxCargarCuadrante(dataItem.ZonaID, 2);
                }
            }
            else {
                $("#inputZonaPaqueteDescarga").data("kendoComboBox").value("");
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

    $('#inputCuadrantePaqueteDescarga').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {

            }
            else {
                $("#inputCuadrantePaqueteDescarga").data("kendoComboBox").value("");
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
    $("#InputID").data("kendoComboBox").dataSource.data([]);
    $("#InputID").data("kendoComboBox").value("");
    $("#inputPaquete").data("kendoComboBox").dataSource.data([]);
    $("#inputPaquete").data("kendoComboBox").value("");
    $("#inputCerrar")[0].checked = false;
    opcionHabilitarView(false, "FieldSetView");
}

function LimpiarSelectPlana() {
    $('#lblEmbarqueCargaTotalPiezas').text("");
    $('#lblEmbarqueCargaToneladasCargadas').text("");

    $("#InputOrdenTrabajo").val("");
    $("#inputCodigo").val("");
    $("#InputID").data("kendoComboBox").dataSource.data([]);
    $("#InputID").data("kendoComboBox").value("");
    $("#inputPaquete").data("kendoComboBox").value("");
}

function LimpiarSelectProveedor() {
    $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").dataSource.data([]);
    $("#inputEmbarqueCargaPLacaPlana").data("kendoComboBox").value("");

    $('#lblEmbarqueCargaTotalPiezas').text("");
    $('#lblEmbarqueCargaToneladasCargadas').text("");

    $("#InputOrdenTrabajo").val("");
    $("#inputCodigo").val("");
    $("#InputID").data("kendoComboBox").dataSource.data([]);
    $("#InputID").data("kendoComboBox").value("");
    $("#inputPaquete").data("kendoComboBox").value("");
}