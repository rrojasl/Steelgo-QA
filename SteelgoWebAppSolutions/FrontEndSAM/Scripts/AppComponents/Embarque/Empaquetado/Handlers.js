var proyectoInicial = 0;
var paqueteInicial = 0;

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
            if (!existenCambios()) {
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
                    close: function () {
                        $('input:radio[name=LLena]:nth(0)').select();
                    }
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.MensajeAdvertenciaDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

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
            if (!existenCambios()) {
                if (dataItem != undefined) {
                    paqueteInicial = dataItem.PaqueteID;
                    ChangeEstatusPaquete(dataItem.Cerrado);
                }
                else {
                    $("#InputPaquete").data("kendoComboBox").value("");
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
                    close: function () {
                        $('input:radio[name=LLena]:nth(0)').select();
                    }
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.MensajeAdvertenciaDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    if (dataItem != undefined) {
                        paqueteInicial = dataItem.PaqueteID;
                        ChangeEstatusPaquete(dataItem.Cerrado);
                    }
                    else {
                        $("#InputPaquete").data("kendoComboBox").value("");
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

            if (dataItem != undefined) {
                if (dataItem.ZonaID != 0) {
                    AjaxCargarCuadranteGuardado(dataItem.ZonaID);
                }                    
            }
            else {
                $("#InputPaquete").data("kendoComboBox").value("");
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
}

function SuscribirEventoMostrar() {
    $('#btnMostrar').click(function (e) {
        var Proyecto = $("#InputProyecto").data("kendoComboBox").dataItem($("#InputProyecto").data("kendoComboBox").select());
        var Paquete = $("#InputPaquete").data("kendoComboBox").dataItem($("#InputPaquete").data("kendoComboBox").select());
        $("#grid").data("kendoGrid").dataSource.data([]);

        if (Proyecto != undefined && Proyecto.ProyectoID != 0) {
            $("#grid").data('kendoGrid').dataSource.data([]);
            AjaxCargarDetalleEmpaquetado(Paquete.PaqueteID, 1);
        } else {
            displayNotify("MensajeSeleccionaProyecto", "", '2');
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
                    //e.preventDefault();
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
            displayNotify("MensajeOrdenTrabajoNoValida", "", '2');
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
                    displayNotify("", "Por favor ingresa el spoolID", '2');
                }
            } else {
                displayNotify("MensajeSeleccionaProyecto", "", '2');
            }
        } else if ($('input:radio[name=TipoCarga]:checked').val() === "Codigo") {
            if ($('#InputProyecto').data("kendoComboBox").value() != "" && $('#InputProyecto').data("kendoComboBox").value() != "0") {

                if ($("#inputCodigo").val()!="") {
                    AjaxObtenerDetalleSpool(tipoConsulta, null, $("#inputCodigo").val());
                } else {
                    displayNotify("", "Por favor ingresa el codigo", '2');
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
        var ds = $("#grid").data("kendoGrid").dataSource;
        var Proyecto = $("#InputProyecto").data("kendoComboBox").dataItem($("#InputProyecto").data("kendoComboBox").select());
        var Paquete = $("#InputPaquete").data("kendoComboBox").dataItem($("#InputPaquete").data("kendoComboBox").select());

        if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {                
            AjaxGuardarCaptura(ds._data, false, Paquete, Proyecto);
        }
        else if ($('#Guardar').text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]) {
            opcionHabilitarView(false, "FieldSetView");
        }
    });

    $("#btnGuardarYNuevo, #btnGuardarYNuevo1").click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        var Proyecto = $("#InputProyecto").data("kendoComboBox").dataItem($("#InputProyecto").data("kendoComboBox").select());
        var Paquete = $("#InputPaquete").data("kendoComboBox").dataItem($("#InputPaquete").data("kendoComboBox").select());

        AjaxGuardarCaptura(ds._data, true, Paquete, Proyecto);
        
    });
}

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $('#FieldSetView2').find('*').attr('disabled', true);
        $("#btnAgregar").prop('disabled', true);

        $("#Guardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar1').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $('#FieldSetView2').find('*').attr('disabled', false);

        $("#Guardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar1').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}

function Limpiar() {

    $("#InputProyecto").data("kendoComboBox").value("");
    $("#InputPaquete").data("kendoComboBox").value("");
    $("#InputPaquete").data("kendoComboBox").dataSource.data([]);
    $("#InputCerrar")[0].checked = false;
    $("#TotalPiezas").text("");
    $("#TotalToneladas").text("");

    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").value("");
    $("#InputID").data("kendoComboBox").dataSource.data([]);
    $("#inputCodigo").val("");
    $("#grid").data("kendoGrid").dataSource.data([]);

    AjaxCargarCamposPredeterminados();
    AjaxCargarProyectos();
    cuadranteSave = 0;
}

function LimpiarSelectProyecto() {
    $("#InputPaquete").data("kendoComboBox").dataSource.data([]);
    $("#InputPaquete").data("kendoComboBox").value("");

    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").value("");
    $("#InputID").data("kendoComboBox").dataSource.data([]);
    $("#inputCodigo").val("");
}

function ChangeEstatusPaquete(cerrado) {
    if (cerrado) {
        $("#InputCerrar")[0].checked = true;
    }else{
        $("#InputCerrar")[0].checked = false;
    }
}

function SuscribirEventoEstatusPaquete() {
    $("#InputCerrar").click(function (e) {
        var Paquete = $("#InputPaquete").data("kendoComboBox").dataItem($("#InputPaquete").data("kendoComboBox").select());

        if(Paquete.Cerrado){
            $(this)[0].checked = true;
        }
    });
}