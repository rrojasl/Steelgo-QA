var ventanaConfirmEdicion;
var ventanaConfirmEdicionSinTipoBusqueda;

function SuscribirEventos() {
    SuscribirEventoProyecto();
    suscribirEventoChangeRadioTipoBusqueda();
    SuscribirEventoBusqueda();
    SuscribirEventoGuardar();
    suscribirEventoWindowsConfirmaCaptura();
    suscribirEventoWindowsConfirmaCapturaSinCambiarTipoBusqueda();
}

function suscribirEventoWindowsConfirmaCapturaSinCambiarTipoBusqueda()
{
    ventanaConfirmEdicionSinTipoBusqueda = $("#ventanaConfirmCaptura").kendoWindow({
        iframe: true,
        title: _dictionary.CapturaArmadoTituloPopup[$("#language").data("kendoDropDownList").value()],
        visible: false,
        width: "auto",
        height: "auto",
        modal: true,
        animation: false,
        actions: []
    }).data("kendoWindow");

    ventanaConfirmEdicionSinTipoBusqueda.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
        "</br><center><button class='btn btn-blue' id='yesButtonProySinTipoBusqueda'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] + "</button><button class='btn btn-blue' id='noButtonProySinTipoBusqueda'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");


    $("#yesButtonProySinTipoBusqueda").click(function (e) {
        AjaxConsultarSpoolsConSP();
        ventanaConfirmEdicionSinTipoBusqueda.close();
        editado = false;
    });
    $("#noButtonProySinTipoBusqueda").click(function (e) {
        ventanaConfirmEdicionSinTipoBusqueda.close();
    });
}

function suscribirEventoWindowsConfirmaCaptura() {
    ventanaConfirmEdicion = $("#ventanaConfirmCapturaCambioTipo").kendoWindow({
        iframe: true,
        title: _dictionary.CapturaArmadoTituloPopup[$("#language").data("kendoDropDownList").value()],
        visible: false,
        width: "auto",
        height: "auto",
        modal: true,
        animation: false,
        actions: []
    }).data("kendoWindow");

    ventanaConfirmEdicion.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
        "</br><center><button class='btn btn-blue' id='yesButtonProyTipoB'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] + "</button><button class='btn btn-blue' id='noButtonProyTipoB'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");


    $("#yesButtonProyTipoB").click(function (e) {
        $("#grid").data("kendoGrid").dataSource.data([]);
        eventoCambioTipoListado();
        ventanaConfirmEdicion.close();
        editado = false;
    });
    $("#noButtonProyTipoB").click(function (e) {
        eventoRegresarTipoListado();
        ventanaConfirmEdicion.close();
    });
}

function SuscribirEventoGuardar() {
    $('.accionGuardar').click(function (e) {
        //e.stopPropagation();
        if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
            //opcionHabilitarView(true, "FieldSetView");
            var ds = $("#grid").data("kendoGrid").dataSource;
            AjaxGuardar(ds._data, false);
        }
        else if ($('#Guardar').text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]) {
            opcionHabilitarView(false, "FieldSetView")
        }
    });

    $('.accionGuardarYNuevo').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardar(ds._data, true);
    });
}

function SuscribirEventoProyecto() {
    $("#inputProyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3
    });
}

function suscribirEventoChangeRadioTipoBusqueda() {

    $('input:radio[name=TipoBusqueda]').change(function () {
        if ($('input:radio[name=TipoBusqueda]:checked').val() == "spool") {
            if (!editado) {
                $("#grid").data("kendoGrid").dataSource.data([]);
                eventoCambioTipoListado();
            }
            else {
                ventanaConfirmEdicion.open().center();
            }
        }
        else if ($('input:radio[name=TipoBusqueda]:checked').val() == "nc") {
            if (!editado) {
                $("#grid").data("kendoGrid").dataSource.data([]);
                eventoCambioTipoListado();
            }
            else {
                ventanaConfirmEdicion.open().center();
            }
        }
    });
}

function eventoCambioTipoListado() {
    if ($('input:radio[name=TipoBusqueda]:checked').val() == "spool") {
        $("#divNc").css('display', 'none');
        $("#divSpool").css('display', 'block');
        $("#inputSpool").val("");
        $("#inputNc").val("");

        $("#inputProyecto").data("kendoComboBox").value("");
    }
    else if ($('input:radio[name=TipoBusqueda]:checked').val() == "nc") {
        $("#divNc").css('display', 'block');
        $("#divSpool").css('display', 'none');
        $("#inputSpool").val("");
        $("#inputNc").val("");
        $("#inputProyecto").data("kendoComboBox").value("");
    }
}

function eventoRegresarTipoListado() {
    if ($('input:radio[name=TipoBusqueda]:checked').val() == "spool") {
        $("#divSpool").removeClass("active");
        $("#divNc").addClass("active");
        $('input:radio[name=TipoBusqueda]:nth(1)').attr('checked', true);
        $('input:radio[name=TipoBusqueda]:nth(1)').trigger("click");
    }
    else if ($('input:radio[name=TipoBusqueda]:checked').val() == "nc") {
        $("#divSpool").addClass("active");
        $("#divNc").removeClass("active");
        $('input:radio[name=TipoBusqueda]:nth(0)').attr('checked', true);
        $('input:radio[name=TipoBusqueda]:nth(0)').trigger("click");
    }
}

function SuscribirEventoBusqueda() {
    $("#btnBuscar").click(function (e) {
        if (!editado) {
            var Proyecto = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select());
            var tipoBusqueda = 0;
            var cadena = "";

            if (Proyecto != undefined && Proyecto.ProyectoID != "" && Proyecto.ProyectoID != 0) {
                if ($("#styleSpool").hasClass("active")) {
                    $("#inputSpool").attr("saAttr", $("#inputSpool").val());
                    if ($("#inputSpool").val() != null && $("#inputSpool").val() != "") {
                        tipoBusqueda = 1;
                        cadena = $("#inputSpool").val().trim();
                        //AjaxCargarNumeroElementosPorBusqueda(Proyecto.ProyectoID, tipoBusqueda, cadena);
                        AjaxConsultarSpoolsConSP();
                    } else {
                        displayNotify("SPAMensajeIngresaSpool", "", '1');
                    }
                } else if ($("#styleNc").hasClass("active")) {
                    $("#inputNc").attr("ncaAttr", $("#inputNc").val());
                    if ($("#inputNc").val() != null && $("#inputNc").val() != "") {
                        tipoBusqueda = 2;
                        cadena = $("#inputNc").val().trim();
                        //AjaxCargarNumeroElementosPorBusqueda(Proyecto.ProyectoID, tipoBusqueda, cadena);
                        AjaxConsultarSpoolsConSP();
                    } else {
                        displayNotify("SPAMensajeIngresaNc", "", '1');
                    }
                }

            } else {
                displayNotify("MensajeSeleccionaProyecto", "", '1');
            }
        }
        else {
            ventanaConfirmEdicionSinTipoBusqueda.open().center();
        }
    });

    $("#inputSpool").keydown(function (e) {
        var Proyecto = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select());
        if (e.keyCode == 13) {
            if (!editado) {
                $("#inputSpool").attr("saAttr", $("#inputSpool").val());
                if ($('#inputSpool').val() != "") {
                    // AjaxCargarNumeroElementosPorBusqueda(Proyecto.ProyectoID, 1, $('#inputSpool').val());
                    AjaxConsultarSpoolsConSP();
                } else {
                    $("#grid").data("kendoGrid").dataSource.data([]);
                }
            }
            else {
                ventanaConfirmEdicionSinTipoBusqueda.open().center();
            }
        }
    });


    $("#inputNc").keydown(function (e) {
        var Proyecto = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select());
        if (e.keyCode == 13) {
            if (!editado) {
                $("#inputNc").attr("ncaAttr", $("#inputNc").val());
                if ($('#inputNc').val() != "") {
                    //AjaxCargarNumeroElementosPorBusqueda(Proyecto.ProyectoID, 2, $('#inputNc').val());
                    AjaxConsultarSpoolsConSP();
                } else {
                    $("#grid").data("kendoGrid").dataSource.data([]);
                }
            }
            else {
                ventanaConfirmEdicionSinTipoBusqueda.open().center();
            }
        }
    });
}