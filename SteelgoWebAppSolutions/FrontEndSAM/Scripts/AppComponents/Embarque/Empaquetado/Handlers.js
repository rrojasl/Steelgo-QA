var proyectoInicial = 0;
var paqueteInicial = 0;
var windowSave;
var windowDownload;
var windowPackageEmpty;

function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoPaquete();
    SuscribirEventoZona();
    SuscribirEventoCuadrante();
    SuscribirEventoMostrar();
    SuscribirEventoChangeTipoCarga();
    SuscribirEventoSpoolID();
    SuscribirEventoAgregar();
    SuscribirEventoFecha();
    SuscribirEventoGuardar();
    SuscribirEventoEstatusPaquete();
    SuscribirEventoEliminarPaquete();
}

function SuscribirEventoWindowsPopup()
{
    windowSave = $("#windowSave").kendoWindow({
        iframe: true,
        title: _dictionary.EmbarqueEmpaquetadoNuevoPaquete[$("#language").data("kendoDropDownList").value()],
        visible: false,
        width: "35%",
        height: "auto",
        modal: true,
        draggable: false,
        resizable: false,
        animation: {
            close: false,
            open: false
        },
        actions:[]
    }).data("kendoWindow");

    $("#btnGuardarPopUp").click(function (e) {
        if ($("#InputNombre").val() != "") {
            if ($("#InputFechaPaquete").val() != "") {
                if ($('#InputZonaPaquete').data("kendoComboBox").value() != "" && $('#InputZonaPaquete').data("kendoComboBox").value() != "0") {
                    if ($('#InputCuadrantePaquete').data("kendoComboBox").value() != "" && $('#InputCuadrantePaquete').data("kendoComboBox").value() != "0") {
                        var cerrarPaquete = $("#InputCerrar").is(":checked") ? 1 : 0;
                        var tipoGuardado = $("#InputTipoGuardado").val();
                        var ds = $("#grid").data("kendoGrid").dataSource._data;
                        var Paquete = $("#InputPaquete").data("kendoComboBox").dataItem($("#InputPaquete").data("kendoComboBox").select());
                        var Proyecto = $("#InputProyecto").data("kendoComboBox").dataItem($("#InputProyecto").data("kendoComboBox").select());
                        AjaxGuardarCaptura(ds, tipoGuardado, cerrarPaquete, Paquete, Proyecto);
                    } else {
                        displayNotify("EmbarqueEmpaquetadoMsjErrorCuadrante", "", '2');
                    }
                } else {
                    displayNotify("EmbarqueEmpaquetadoMsjErrorZona", "", '2');
                }
            } else {
                displayNotify("EmbarqueEmpaquetadoMsjErrorFechaPaquete", "", '2');
            }
        } else {
            displayNotify("EmbarqueEmpaquetadoMsjErrorNombrePaquete", "", '2');
        }
    });
    $("#btnCerrarPopUpSave").click(function (e) {
        windowSave.close();
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
    $("#btnDescargarPaquete").click(function (e) {
        var zonaID = $("#inputZonaPaqueteDescarga").data("kendoComboBox").value();
        var cuadranteID = $("#inputCuadrantePaqueteDescarga").data("kendoComboBox").value();
        var Paquete = $("#InputPaquete").data("kendoComboBox").dataItem($("#InputPaquete").data("kendoComboBox").select());
        if (zonaID != "" && zonaID != "0") {
            if (cuadranteID != "" && cuadranteID != "0") {
                windowPackageEmpty.close();
                AjaxDescargarPaquete(Paquete);
            } else
                displayNotify("EmbarqueCargaMsjErrorCuadrante", "", "1");

        } else
            displayNotify("EmbarqueCargaMsjErrorZona", "", "1");
    });
    $("#btnEliminarPaqueteVacio").click(function (e) {
        windowPackageEmpty.close();
        var Paquete = $("#InputPaquete").data("kendoComboBox").dataItem($("#InputPaquete").data("kendoComboBox").select());
        AjaxEliminarPaquete(Paquete);
    });
}

function SuscribirEventoPopupDescaga() {

    windowDownload = $("#windowDownload").kendoWindow({
        title: _dictionary.EmbarqueCargaTituloPopupCuadrante[$("#language").data("kendoDropDownList").value()],
        visible: false,
        width: "auto",
        height: "auto",
        draggable: false,
        resizable: false,
        modal: true,
        animation: {
            close: false,
            open: false
        },
        actions: []
    }).data("kendoWindow");
    $("#btnDescargar").click(function (e) {
        var zonaID = $("#InputZonaDescarga").data("kendoComboBox").value();
        var cuadranteID = $("#InputCuadranteDescarga").data("kendoComboBox").value();
        if (zonaID != "" && zonaID != "0") {
            if (cuadranteID != "" && cuadranteID != "0") {
                var Paquete = $("#InputPaquete").data("kendoComboBox").dataItem($("#InputPaquete").data("kendoComboBox").select());
                var uid = $("#InputUidRow").val();
                var dataItem = $('#grid').data("kendoGrid").dataSource.getByUid(uid);
                AjaxDescargarSpool(dataItem, Paquete);
            } else {
                displayNotify("EmbarqueCargaMsjErrorCuadrante", "", "2");
            }
        } else {
            displayNotify("EmbarqueCargaMsjErrorZona", "", "2");
        }
    });

    $("#btnCerrarPopup").click(function (e) {
        $("#InputZonaDescarga").data("kendoComboBox").value("");
        $("#InputCuadranteDescarga").data("kendoComboBox").value("");
        $("#InputCuadranteDescarga").data("kendoComboBox").dataSource.data([]);
        windowDownload.close();
    });
}

function SuscribirEventoProyecto() {
    $("#InputProyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            var ds = $("#grid").data("kendoGrid").dataSource._data;
            if (ds.length == 0) {
                if (dataItem != undefined) {
                    proyectoInicial = parseInt($("#InputProyecto").data("kendoComboBox").value());
                    LimpiarSelectProyecto();
                    if (dataItem.ProyectoID != 0) {
                        AjaxCargarPaquetes(dataItem.ProyectoID, 0);
                        AjaxCargarZona(dataItem.PatioID);
                    }
                } else {
                    $("#InputProyecto").data("kendoComboBox").value("");
                    proyectoInicial = 0;
                }
            }
            else {
                ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.TituloPopupCancelar[$("#language").data("kendoDropDownList").value()],
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
                    if (dataItem != undefined) {
                        proyectoInicial = parseInt($("#InputProyecto").data("kendoComboBox").value());
                        LimpiarSelectProyecto();
                        if (dataItem.ProyectoID != 0) {
                            AjaxCargarPaquetes(dataItem.ProyectoID, 0);
                            AjaxCargarZona(dataItem.PatioID);
                        }
                    } else {
                        $("#InputProyecto").data("kendoComboBox").value("");
                        proyectoInicial = 0;
                    }
                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#InputProyecto").data("kendoComboBox").value(proyectoInicial);
                    ventanaConfirm.close();
                });
            }
        }
    });
}

function SuscribirEventoPaquete() {
    $('#InputPaquete').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PaqueteID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            var ds = $("#grid").data("kendoGrid").dataSource._data;
            if (ds.length == 0) {
                if (dataItem != undefined) {
                    paqueteInicial = dataItem.PaqueteID;
                    ChangeEstatusPaquete(dataItem.Cerrado);
                    LimpiarSelectPaquete();
                }
                else {
                    $("#InputPaquete").data("kendoComboBox").value("");
                    $("#InputCerrar")[0].checked = false;
                    paqueteInicial = 0;
                }
            } else {
                ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.TituloPopupCancelar[$("#language").data("kendoDropDownList").value()],
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

                    if (dataItem != undefined) {
                        paqueteInicial = dataItem.PaqueteID;
                        ChangeEstatusPaquete(dataItem.Cerrado);
                        LimpiarSelectPaquete();
                    }
                    else {
                        $("#InputPaquete").data("kendoComboBox").value("");
                        $("#InputCerrar")[0].checked = false;
                        paqueteInicial = 0;
                    }
                });
                $("#noButtonProy").click(function () {
                    $("#InputPaquete").data("kendoComboBox").value(paqueteInicial);
                    ventanaConfirm.close();
                });
            }
        }
    });

    $('#InputPaquete').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            var Paquete = $("#InputPaquete").data("kendoComboBox").dataItem($("#InputPaquete").data("kendoComboBox").select());
            var ds = $("#grid").data("kendoGrid").dataSource._data;

            if (ds.length == 0) {
                LimpiarSelectPaquete();
                if (Paquete != undefined && Paquete.PaqueteID != 0) {
                    paqueteInicial = Paquete.PaqueteID;
                    ChangeEstatusPaquete(Paquete.Cerrado);
                    AjaxCargarDetalleEmpaquetado(Paquete.PaqueteID, 1);
                }
                else {
                    $("#InputPaquete").data("kendoComboBox").value("");
                    $("#InputCerrar")[0].checked = false;
                    paqueteInicial = 0;
                }
            } else {
                ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.TituloPopupCancelar[$("#language").data("kendoDropDownList").value()],
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
                    LimpiarSelectPaquete();
                    if (Paquete != undefined && Paquete.PaqueteID != 0) {
                        paqueteInicial = Paquete.PaqueteID;
                        ChangeEstatusPaquete(Paquete.Cerrado);
                        AjaxCargarDetalleEmpaquetado(Paquete.PaqueteID, 1);
                    }
                    else {
                        $("#InputPaquete").data("kendoComboBox").value("");
                        $("#InputCerrar")[0].checked = false;
                        paqueteInicial = 0;
                    }
                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#InputPaquete").data("kendoComboBox").value(paqueteInicial);
                    ventanaConfirm.close();
                });
            }
        }
    });
}

function SuscribirEventoZona() {
    $('#InputZonaPaquete').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ZonaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            $("#InputCuadrantePaquete").data("kendoComboBox").dataSource.data([]);
            $("#InputCuadrantePaquete").data("kendoComboBox").value("");

            if (dataItem != undefined) {
                if (dataItem.ZonaID != 0) {
                    AjaxCargarCuadranteGuardado(dataItem.ZonaID);
                }
            }
            else {
                $("#InputZonaPaquete").data("kendoComboBox").value("");
            }
        }
    });

    $('#InputZonaDescarga').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ZonaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            $("#InputCuadranteDescarga").data("kendoComboBox").dataSource.data([]);
            $("#InputCuadranteDescarga").data("kendoComboBox").value("");
            if (dataItem != undefined) {
                if (dataItem.ZonaID != 0) {
                    AjaxCargarCuadranteDescarga(dataItem.ZonaID);
                }
            }
            else {
                $("#InputZonaDescarga").data("kendoComboBox").value("");
            }
        }
    });

    $('#inputZonaPaqueteDescarga').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ZonaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            $("#inputCuadrantePaqueteDescarga").data("kendoComboBox").dataSource.data([]);
            $("#inputCuadrantePaqueteDescarga").data("kendoComboBox").value("");

            if (dataItem != undefined) {
                if (dataItem.ZonaID != 0) {
                    AjaxCargarCuadrantePaquete(dataItem.ZonaID);
                }
            }
            else {
                $("#inputZonaPaqueteDescarga").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoCuadrante() {
    $('#InputCuadrantePaquete').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {

            }
            else {
                $("#InputCuadrantePaquete").data("kendoComboBox").value("");
            }
        }
    });

    $('#InputCuadranteDescarga').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {

            }
            else {
                $("#InputCuadranteDescarga").data("kendoComboBox").value("");
            }
        }
    });

    $('#inputCuadrantePaqueteDescarga').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        index: 3,
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

function SuscribirEventoMostrar() {
    $('#btnMostrar').click(function (e) {
        var Proyecto = $("#InputProyecto").data("kendoComboBox").dataItem($("#InputProyecto").data("kendoComboBox").select());
        var Paquete = $("#InputPaquete").data("kendoComboBox").dataItem($("#InputPaquete").data("kendoComboBox").select());
        var ds = $("#grid").data("kendoGrid").dataSource._data;
        if (ds.length == 0) {
            $("#InputOrdenTrabajo").val("");
            $("#InputID").data("kendoComboBox").dataSource.data([]);
            $("#InputID").data("kendoComboBox").value("");
            $("#inputCodigo").val("");
            $("#grid").data("kendoGrid").dataSource.data([]);

            if (Proyecto != undefined && Proyecto.ProyectoID != 0) {
                $("#grid").data('kendoGrid').dataSource.data([]);
                AjaxCargarDetalleEmpaquetado(Paquete.PaqueteID, 1);
            } else {
                displayNotify("MensajeSeleccionaProyecto", "", '2');
            }
        } else {
            ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                iframe: true,
                title: _dictionary.TituloPopupCancelar[$("#language").data("kendoDropDownList").value()],
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

                $("#InputOrdenTrabajo").val("");
                $("#InputID").data("kendoComboBox").value("");
                $("#InputID").data("kendoComboBox").dataSource.data([]);
                $("#inputCodigo").val("");
                $("#grid").data("kendoGrid").dataSource.data([]);

                if (Proyecto != undefined && Proyecto.ProyectoID != 0) {
                    $("#grid").data('kendoGrid').dataSource.data([]);
                    AjaxCargarDetalleEmpaquetado(Paquete.PaqueteID, 1);
                } else {
                    displayNotify("MensajeSeleccionaProyecto", "", '2');
                }
            });
            $("#noButtonProy").click(function () {
                ventanaConfirm.close();
            });
        }
    });
}

function SuscribirEventoChangeTipoCarga() {

    $('input:radio[name=TipoCarga]:nth(0)').change(function () {
        $("#divCodigo").hide();
        $("#divSpool").show();
    });
    $('input:radio[name=TipoCarga]:nth(1)').change(function () {
        $("#divSpool").hide();
        $("#divCodigo").show();

    });
}

function SuscribirEventoSpoolID() {

    var dataItem;
    $("#InputID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        suggest: true,
        filter: "contains",
        index: 3,
        select: function (e) {
            var dataItem = this.dataItem(e.item.index());

            if (dataItem != undefined) {
                if (dataItem.Status != "1") {
                    $("#InputID").data("kendoComboBox").value("");
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
            var dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                if ($("#InputID").val().length == 1) {
                    $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
                }
                if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                    Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                    $("#LabelProyecto").text(dataItem.Proyecto);

                }
            }
            else { $("#InputID").data("kendoComboBox").value(""); }
        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                AjaxObtenerSpoolID();
            } catch (e) {
                displayNotify("Mensajes_error", e.message, '2');
            }
        } else {
            displayNotify("MensajeOrdenTrabajoNoValida", "", '1');
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
            if ($('#InputProyecto').data("kendoComboBox").value() != "" && $('#InputProyecto').data("kendoComboBox").value() != "0") {
                if ($("#InputOrdenTrabajo").val() != "") {
                    if ($('#InputID').data("kendoComboBox").value() != "") {
                        AjaxObtenerDetalleSpool(1, $('#InputID').data("kendoComboBox").value(), null);
                    }
                }
            } else {

                displayNotify("MensajeSeleccionaProyecto", "", '2');
            }
        }
    });

};

function SuscribirEventoAgregar() {

    $('#btnAgregar').click(function (e) {
        var tipoConsulta = $('input:radio[name=TipoCarga]:checked').val() == "Spool" ? 1 : 2;

        if ($('input:radio[name=TipoCarga]:checked').val() === "Spool") {
            if ($('#InputProyecto').data("kendoComboBox").value() != "" && $('#InputProyecto').data("kendoComboBox").value() != "0") {

                if ($("#InputOrdenTrabajo").val() != "" && $('#InputID').data("kendoComboBox").value() != "") {
                    AjaxObtenerDetalleSpool(tipoConsulta, $('#InputID').data("kendoComboBox").value(), null);
                } else {
                    displayNotify("EmbarqueEmpaquetadoMsjErrorSpoolID", "", '2');
                }
            } else {
                displayNotify("MensajeSeleccionaProyecto", "", '2');
            }
        } else if ($('input:radio[name=TipoCarga]:checked').val() === "Codigo") {
            if ($('#InputProyecto').data("kendoComboBox").value() != "" && $('#InputProyecto').data("kendoComboBox").value() != "0") {

                if ($("#inputCodigo").val() != "") {
                    AjaxObtenerDetalleSpool(tipoConsulta, null, $("#inputCodigo").val());
                } else {
                    displayNotify("EmbarqueEmpaquetadoMsjErrorCodigo", "", '2');
                }
            } else {
                displayNotify("MensajeSeleccionaProyecto", "", '2');
            }
        } else {

        }
    });
}

function SuscribirEventoFecha() {
    FechaPaquete = $("#InputFechaPaquete").kendoDatePicker({
        max: new Date(),
        change: function (e) {
            ValidarFecha(e.sender._value)
        }
    });
}

function SuscribirEventoGuardar() {
    $('#Guardar, #btnGuardar, #Guardar1, #btnGuardar1').click(function (e) {        
        var Paquete = $("#InputPaquete").data("kendoComboBox").dataItem($("#InputPaquete").data("kendoComboBox").select());
        var Proyecto = $("#InputProyecto").data("kendoComboBox").dataItem($("#InputProyecto").data("kendoComboBox").select());
        if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
            if (Proyecto != undefined && Proyecto.ProyectoID != 0)
                AbrirPopUpGuardar(Paquete, 1, Proyecto.PatioID);
            else
                displayNotify("MensajeSeleccionaProyecto", "", '2');
        }
        else if ($('#Guardar').text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]) {
            opcionHabilitarView(false, "FieldSetView");
        }
    });

    $("#btnGuardarYNuevo, #btnGuardarYNuevo1").click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        var Proyecto = $("#InputProyecto").data("kendoComboBox").dataItem($("#InputProyecto").data("kendoComboBox").select());
        var Paquete = $("#InputPaquete").data("kendoComboBox").dataItem($("#InputPaquete").data("kendoComboBox").select());

        AbrirPopUpGuardar(Paquete, 2, Proyecto.PatioID);

    });
}

function SuscribirEventoEstatusPaquete() {
    $("#InputCerrar").click(function (e) {
        var Paquete = $("#InputPaquete").data("kendoComboBox").dataItem($("#InputPaquete").data("kendoComboBox").select());
        var ds = $("#grid").data("kendoGrid").dataSource._data;
        if(Paquete!=undefined){
            if (Paquete.Cerrado) {
                $(this)[0].checked = true;
            } else {
                if ($(this)[0].checked) {
                    if (Paquete.Elementos == 0 && ds.length == 0) {
                        $(this)[0].checked = false;
                        displayNotify("EmbarqueEmpaquetadoErrorPaqueteVacio", "", '2');
                    }
                }
            }
        }
    });
}

function SuscribirEventoEliminarPaquete() {
    $("#btnEliminarPaquete, #btnEliminarPaquete1").click(function (e) {
        var Paquete = $("#InputPaquete").data("kendoComboBox").dataItem($("#InputPaquete").data("kendoComboBox").select());
        if (Paquete.PaqueteID != 0) {
            AjaxEliminarPaquete(Paquete);
        } else {
            displayNotify("EmbarqueEmpaquetadoMsjErrorPaquete", "", '2');
        }
    });
}

function ChangeEstatusPaquete(cerrado) {
    if (cerrado) {
        $("#InputCerrar")[0].checked = true;
    } else {
        $("#InputCerrar")[0].checked = false;
    }
}

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#InputProyecto").data("kendoComboBox").enable(false);
        $("#InputPaquete").data("kendoComboBox").enable(false);
        $("#InputOrdenTrabajo").css('opacity', '0.6');
        $("#InputID").data("kendoComboBox").enable(false);
        $('#FieldSetView2').find('*').attr('disabled', true);
        $("#btnAgregar").prop('disabled', true);

        $("#Guardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar1').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#InputProyecto").data("kendoComboBox").enable(true);
        $("#InputPaquete").data("kendoComboBox").enable(true);
        $("#InputOrdenTrabajo").css('opacity', '1');
        $("#InputID").data("kendoComboBox").enable(true);
        $('#FieldSetView2').find('*').attr('disabled', false);

        $("#Guardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar1').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

function LimpiarSelectProyecto() {
    $("#InputPaquete").data("kendoComboBox").dataSource.data([]);
    $("#InputPaquete").data("kendoComboBox").value("");
    $("#TotalPiezas").text("");
    $("#TotalToneladas").text("");

    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").value("");
    $("#InputID").data("kendoComboBox").dataSource.data([]);
    $("#inputCodigo").val("");

    $("#grid").data("kendoGrid").dataSource.data([]);
}

function LimpiarSelectPaquete() {
    $("#TotalPiezas").text("");
    $("#TotalToneladas").text("");

    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").value("");
    $("#InputID").data("kendoComboBox").dataSource.data([]);
    $("#inputCodigo").val("");
    if (!guardado) {        
        $("#grid").data("kendoGrid").dataSource.data([]);
    }
}

function Limpiar() {

    $("#InputProyecto").data("kendoComboBox").value("");
    $("#InputPaquete").data("kendoComboBox").dataSource.data([]);
    $("#InputPaquete").data("kendoComboBox").value("");
    $("#InputCerrar")[0].checked = false;
    $("#TotalPiezas").text("");
    $("#TotalToneladas").text("");

    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").dataSource.data([]);
    $("#InputID").data("kendoComboBox").value("");
    $("#inputCodigo").val("");
    $("#grid").data("kendoGrid").dataSource.data([]);

    opcionHabilitarView(false, "FieldSetView");
    AjaxCargarCamposPredeterminados();
    AjaxCargarProyectos();
    cuadranteSave = 0;
}
