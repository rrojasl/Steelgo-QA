﻿var ventanaConfirmEdicionSinTipoBusqueda;


function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoSpoolID();
    SuscribirEventoCarro();
    SuscribirEventoCambiarEscenario();
    suscribirEventoWindowsConfirmaCaptura();
    SuscribirEventoGuardarNuevoMedioTransporte();
    SuscribirEventoCerrarNuevoMedioTransporte();
    suscribirEventoAgregarColumna();
    suscribirEventoMostrar();
    SuscribirEventoTipoSeleccion();
    SuscribirEventoAgregar();
    suscribirEventoCodigo();
    suscribirEventoWindowsConfirmaCapturaSinCambiarTipoBusqueda();
    suscribirEventoChangeMostrar();
    SuscribirEventoGuardarCaptura();
}

function suscribirEventoChangeMostrar() {
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        FiltroMostrar(0);
    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {
        FiltroMostrar(1);
    });

}

function suscribirEventoWindowsConfirmaCapturaSinCambiarTipoBusqueda() {
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
        LimpiarInformacionAgregada();
        AjaxObtenerDetalleCargaCarro($("#inputCarro").data("kendoComboBox").select() == -1 ? 0 : $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()).MedioTransporteID, $('input:radio[name=TipoVista]:checked').val(), '');
        ventanaConfirmEdicionSinTipoBusqueda.close();
        editado = false;
    });
    $("#noButtonProySinTipoBusqueda").click(function (e) {
        ventanaConfirmEdicionSinTipoBusqueda.close();
    });
}

function suscribirEventoCodigo() {
    $("#inputCodigo").keydown(function (e) {
        if (e.keyCode == 13) {
            var valorBusqueda = $("#inputCodigo").val() + '~' + "Codigo";
            if ($("#inputProyecto").data("kendoComboBox").select() != 0) {
                AjaxObtenerDetalleCargaCarro($("#inputCarro").data("kendoComboBox").select() == -1 ? 0 : $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()).MedioTransporteID, $('input:radio[name=TipoVista]:checked').val(), valorBusqueda);
            }
            else
                displayNotify("SistemaPinturaMensajeErrorProyecto", "", '1');
        }
    });
}
function SuscribirEventoAgregar() {
    $('#btnAgregar').click(function () {
        if (!InformacionMostrada) {
            displayNotify("PinturaBotonMostrar", "", '1');
        }
        else {
            var valorBusqueda = $('input:radio[name=TipoSeleccion]:checked').val() == "Spool" ? $("#InputID").val() + '~' + "Spool" : $("#inputCodigo").val() + '~' + "Codigo";
            if ($("#inputProyecto").data("kendoComboBox").select() != 0) {
                AjaxObtenerDetalleCargaCarro($("#inputCarro").data("kendoComboBox").select() == -1 ? 0 : $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()).MedioTransporteID, $('input:radio[name=TipoVista]:checked').val(), valorBusqueda);
            }
            else
                displayNotify("SistemaPinturaMensajeErrorProyecto", "", '1');
        }
    });
}

function SuscribirEventoTipoSeleccion() {
    $('input:radio[name=TipoSeleccion]:nth(0)').change(function () {
        $("#InputIDDiv").show();
        $("#divCodigo").hide();
        $("#inputCodigo").val('');

    });

    $('input:radio[name=TipoSeleccion]:nth(1)').change(function () {
        $("#InputIDDiv").hide();
        $("#divCodigo").show();
        $("#InputOrdenTrabajo").val('');
        $("#InputID").data("kendoComboBox").value("");
    });
}

function suscribirEventoMostrar() {
    $('#btnMostrar').click(function (e) {
        InformacionMostrada = true;
        if (!editado) {
            AjaxObtenerDetalleCargaCarro($("#inputCarro").data("kendoComboBox").select() == -1 ? 0 : $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()).MedioTransporteID, $('input:radio[name=TipoVista]:checked').val(), '');
        }
        else {
            ventanaConfirmEdicionSinTipoBusqueda.open().center();
        }
    });
}

function suscribirEventoAgregarColumna() {
    $('#btnAgregarColumna').click(function (e) {
        var grid = $("#grid").data("kendoGrid");
        var dataSource = grid.dataSource;
        var options = grid.options;
        options.columns = $("#grid").data("kendoGrid").columns;
        options.columns.push({ field: 'hola', title: 'hola' });
        grid.destroy();
        $("#grid")
              .empty()
              .kendoGrid(options);

        //genero el for para insertar la informacion.
    });
}

function SuscribirEventoCerrarNuevoMedioTransporte() {
    $('#btnCerrarVentanaCrearMedioTransporte').click(function (e) {
        windowNewCarriage.close();
        $("#InputNombre").blur();
    });
};

function SuscribirEventoGuardarNuevoMedioTransporte() {
    $('#btnGuardarCrearMedioTransporte').click(function (e) {
        AjaxGuardarNuevoCarro();
    });

    $('#InputNombre').keydown(function (e) {
        if ($('#InputNombre').val() != "") {
            if (e.keyCode == 13) {
                AjaxGuardarNuevoCarro();
            }
        }
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
        delay: 10
    });

    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                $("#InputID").data("kendoComboBox").enable(false);
                AjaxObtenerSpoolID();
            } catch (e) {
                displayNotify("Mensajes_error", e.message, '2');

            }
        } else {
            displayNotify("CapturaArmadoMensajeOrdenTrabajo", "", '1');
            //$("#InputOrdenTrabajo").focus();
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
                if ($("#inputProyecto").data("kendoComboBox").select() != 0) {
                    if (!InformacionMostrada) {
                        displayNotify("PinturaBotonMostrar", "", '1');
                    }
                    else {
                        var valorBusqueda = $("#InputID").val() + '~' + "Spool";
                        AjaxObtenerDetalleCargaCarro($("#inputCarro").data("kendoComboBox").select() == -1 ? 0 : $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()).MedioTransporteID, $('input:radio[name=TipoVista]:checked').val(), valorBusqueda);
                    }
                }
                else
                    displayNotify("SistemaPinturaMensajeErrorProyecto", "", '1');
            }
            else {
                $("#InputID").data("kendoComboBox").value("");
                displayNotify("PinturaCargaNoExisteSpoolID", '', '2');
            }
        }
    });

    $('#InputID').blur(function (e) {
        var spoollIDValue = $("#InputID").val().trim();
        var listaSpoolID = $("#InputID").data("kendoComboBox").dataSource._data;
        var valorEncontrado = false;
        if (listaSpoolID.length > 0) {
            for (var i = 0; i < listaSpoolID.length; i++) {
                if (TryParseInt(spoollIDValue, 0) != 0 && (TryParseInt(spoollIDValue, 0) == TryParseInt(listaSpoolID[i].IDValido, 0))) {
                    valorEncontrado = true;
                    $("#InputID").data("kendoComboBox").select(0);
                    $("#InputID").data("kendoComboBox").value(listaSpoolID[i].Valor);
                    break;
                }
            }
        }
    });
}

function SuscribirEventoProyecto() {
    $("#inputProyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            LimpiarCargaProyecto();

            if (dataItem != undefined) {
                if (dataItem.ProyectoID != 0) {
                    AjaxCargarMedioTransporte(dataItem.ProyectoID, null);
                }
            } else {
                $("#inputProyecto").data("kendoComboBox").value("");
            }
        }
    });

    $('#inputProyecto').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            AjaxObtenerDetalleCargaCarro($("#inputCarro").data("kendoComboBox").select() == -1 ? 0 : $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()).MedioTransporteID, $('input:radio[name=TipoVista]:checked').val(), '');
        }
    });

}


function SuscribirEventoCarro() {
    $("#inputCarro").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "MedioTransporteID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);


            if (dataItem != undefined) {
                $("#chkCerrar")[0].checked = dataItem.CarroCerrado;
                if (dataItem.MedioTransporteID == -1) {
                    CargaPopupNuevoMedioTransporte();
                } else {
                    // LimpiarCargaCarro();
                    //AjaxObtenerDetalleCargaCarro(dataItem.MedioTransporteID, $('input:radio[name=TipoVista]:checked').val());
                }
            } else {
                $("#inputCarro").data("kendoComboBox").value("");
            }
        }
    });
    //$("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select());
    $('#inputCarro').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            InformacionMostrada = true;
            AjaxObtenerDetalleCargaCarro($("#inputCarro").data("kendoComboBox").select() == -1 ? 0 : $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()).MedioTransporteID, $('input:radio[name=TipoVista]:checked').val(), '');
        }


    });



}

function eventoCambioTipoEscenario() {


    if ($('input:radio[name=TipoVista]:checked').val() == "Escritorio") {
        $("#AgregarSpoolManual").css('display', 'none');
        $("#grid").data("kendoGrid").showColumn("Prioridad");
        $("#grid").data("kendoGrid").showColumn("MedioTransporte");
        $("#grid").data("kendoGrid").showColumn("Seleccionado");
        $("#grid").data("kendoGrid").refresh();
        LimpiarCambioEscenario();
    }
    else if ($('input:radio[name=TipoVista]:checked').val() == "Patio") {
        $("#AgregarSpoolManual").css('display', 'block');
        $("#grid").data("kendoGrid").hideColumn("Prioridad");
        $("#grid").data("kendoGrid").hideColumn("MedioTransporte");
        $("#grid").data("kendoGrid").hideColumn("Seleccionado");
        $("#grid").data("kendoGrid").refresh();
        LimpiarCambioEscenario();
    }
}

function SuscribirEventoCambiarEscenario() {

    $('input:radio[name=TipoVista]').change(function () {
        if ($('input:radio[name=TipoVista]:checked').val() == "Escritorio") {
            if (!editado) {
                $("#grid").data("kendoGrid").dataSource.data([]);
                eventoCambioTipoEscenario();
            }
            else {
                ventanaConfirmEdicion.open().center();
            }
        }
        else if ($('input:radio[name=TipoVista]:checked').val() == "Patio") {
            if (!editado) {
                $("#grid").data("kendoGrid").dataSource.data([]);
                eventoCambioTipoEscenario();
            }
            else {
                ventanaConfirmEdicion.open().center();
            }
        }
    });
}

function suscribirEventoWindowsConfirmaCaptura() {
    ventanaConfirmEdicion = $("#ventanaCambioVista").kendoWindow({
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
        "</br><center><button class='btn btn-blue' id='yesButtonProy'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] + "</button><button class='btn btn-blue' id='noButtonProy'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");


    $("#yesButtonProy").click(function (e) {
        $("#grid").data("kendoGrid").dataSource.data([]);
        eventoCambioTipoEscenario();
        LimpiarCambioEscenario();
        ventanaConfirmEdicion.close();
        editado = false;
    });
    $("#noButtonProy").click(function (e) {
        eventoRegresarTipoListado();
        ventanaConfirmEdicion.close();
    });
}

function eventoRegresarTipoListado() {

    if ($('input:radio[name=TipoVista]:checked').val() == "Escritorio") {
        $('input:radio[name=TipoVista]:nth(1)').attr('checked', true);
        $('input:radio[name=TipoVista]:nth(1)').trigger("click");
    }
    else if ($('input:radio[name=TipoVista]:checked').val() == "Patio") {
        $('input:radio[name=TipoVista]:nth(0)').attr('checked', true);
        $('input:radio[name=TipoVista]:nth(0)').trigger("click");
    }
}

function SuscribirEventoGuardarCaptura() {
    $('#btnGuardarYNuevo').click(function (e) {
        if ($("#grid").data("kendoGrid").dataSource._data.length > 0) {
            ajaxGuardarEscritorio($("#grid").data("kendoGrid").dataSource._data, true);
            $('#btnCancelar').trigger("click");
        }
    });

    $('#btnGuardar,#Guardar, #btnGuardar1, #Guardar1 ').click(function (e) {
        if ($('input:radio[name=TipoVista]:checked').val() == "Escritorio") {
            if ($('#btnGuardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                ajaxGuardarEscritorio($("#grid").data("kendoGrid").dataSource._data,false);
            }
            else if ($('#btnGuardar').text() == "Editar") {
                opcionHabilitarView(false, "FieldSetView")
            }
        }
        else if ($('input:radio[name=TipoVista]:checked').val() == "Patio") {
            if ($('#btnGuardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
                ajaxGuardarPatio($("#grid").data("kendoGrid").dataSource._data,false);
            }
            else if ($('#btnGuardar').text() == "Editar") {
                opcionHabilitarView(false, "FieldSetView")
            }
        }
    });
};

function opcionHabilitarView(valor, name) {


    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#inputProyecto").data("kendoComboBox").enable(false);
        $("#styleEscritorio").attr("disabled", true);
        $("#stylePatio").attr("disabled", true);
        $("input[name='Muestra']").attr("disabled", true);
        $("input[name='TipoSeleccion']").attr("disabled", true);
        $("#inputCarro").data("kendoComboBox").enable(false);
        $("#chkCerrar").attr("disabled", true);
        $("#btnMostrar").attr("disabled", true);
        $("#InputOrdenTrabajo").attr("disabled", true);
        $("#InputID").data("kendoComboBox").enable(false);

        $("#btnAgregar").attr("disabled", true);
        $("#Guardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#GuardarPie').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#inputProyecto").data("kendoComboBox").enable(true);
        $("#styleEscritorio").attr("disabled", false);
        $("#stylePatio").attr("disabled", false);
        $("input[name='Muestra']").attr("disabled", false);
        $("input[name='TipoSeleccion']").attr("disabled", false);
        $("#inputCarro").data("kendoComboBox").enable(true);
        $("#chkCerrar").attr("disabled", false);
        $("#btnMostrar").attr("disabled", false);
        $("#InputOrdenTrabajo").attr("disabled", false);
        $("#InputID").data("kendoComboBox").enable(true);

        $("#btnAgregar").attr("disabled", false);
        $("#Guardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#GuardarPie').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}


