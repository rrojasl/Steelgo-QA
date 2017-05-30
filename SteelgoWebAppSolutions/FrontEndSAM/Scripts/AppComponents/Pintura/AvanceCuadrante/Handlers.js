function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoZona();
    SuscribirEventoCuadrante();
    SuscribirEventoSistemaPintura();
    SuscribirEventoOrdenTrabajo();
    SuscribirEventoSpoolID();
    SuscribirEventoMostrar();
    SuscribirEventoGuardar();
    SuscribirEventoColor();
    suscribirEventoSeleccionProcesoPintura();
    suscribirEventoWindowsConfirmaCapturaCambioProcesoPintura();
    suscribirEventoPintor();
    suscribirEventoFechaProceso();
    suscribirEventoWindowsConfirmaLineaCaptura();
    SuscribirEventoAgregar();
};

function SuscribirEventoAgregar() {
    $("#btnAgregar").click(function () {
        if ($("#InputID").data("kendoComboBox").value() > 0) {
            AjaxAgregarSpool($("#InputID").data("kendoComboBox").value());
        }
        else {
            displayNotify("PinturaCargaSeleccionaSpool", "", '1');
        }
    });
}


function suscribirEventoWindowsConfirmaLineaCaptura() {
    ventanaConfirmEdicionCaptura = $("#ventanaConfirmCapturaLineaCaptura").kendoWindow({
        iframe: true,
        title: _dictionary.CapturaArmadoTituloPopup[$("#language").data("kendoDropDownList").value()],
        visible: false,
        width: "auto",
        height: "auto",
        modal: true,
        animation: false,
        actions: []
    }).data("kendoWindow");

    ventanaConfirmEdicionCaptura.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
        "</br><center><button class='btn btn-blue' id='yesButtonProySinTipoBusquedaProyecto'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] + "</button><button class='btn btn-blue' id='noButtonProySinTipoBusquedaProyecto'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");


    $("#yesButtonProySinTipoBusquedaProyecto").click(function (e) {
        ventanaConfirmEdicionCaptura.close();
        editado = false;
        LimpiarDespuesCambioCaptura();
        switch (elementoEjecutoChange) {
            case 1:
                $("#inputProyecto").data("kendoComboBox").trigger("change");
                break;
            case 2:
                $("#inputZona").data("kendoComboBox").trigger("change");
                break;
            case 3:
                $("#inputCuadrante").data("kendoComboBox").trigger("change");
                break;
            case 4:
                $("#inputSistemaPintura").data("kendoComboBox").trigger("change");
                break;
            case 5:
                $("#inputColor").data("kendoComboBox").trigger("change");
                break;
        }
    });
    $("#noButtonProySinTipoBusquedaProyecto").click(function (e) {
        $("#inputProyecto").data("kendoComboBox").value(LineaCaptura.proyectoIDSeleccionado);
        $("#inputZona").data("kendoComboBox").value(LineaCaptura.zonaIDSeleccionado);
        $("#inputCuadrante").data("kendoComboBox").value(LineaCaptura.cuadranteIDSeleccionado);
        $("#inputSistemaPintura").data("kendoComboBox").value(LineaCaptura.sistemaPinturaIDSeleccionado);
        $("#inputColor").data("kendoComboBox").value(LineaCaptura.ColorIDSeleccionado);
        ventanaConfirmEdicionCaptura.close();
    });
}

function suscribirEventoFechaProceso() {
    $("#inputFechaProceso").kendoDatePicker({
        max: new Date(),
        change: function (e) {
            ValidarFechaPrimario(e.sender._value);
        }
    });
}

function suscribirEventoPintor() {

    $("#inputPintor").kendoMultiSelect({
        dataSource: '',
        dataTextField: "Codigo",
        dataValueField: "ObreroID",
        suggest: true,
        filter: "contains"
    }).data("kendoMultiSelect");
}

function suscribirEventoWindowsConfirmaCapturaCambioProcesoPintura() {
    ventanaConfirmEdicionCambioProcesoPintura = $("#ventanaConfirmCapturaProcesoPintura").kendoWindow({
        iframe: true,
        title: _dictionary.CapturaArmadoTituloPopup[$("#language").data("kendoDropDownList").value()],
        visible: false,
        width: "auto",
        height: "auto",
        modal: true,
        animation: false,
        actions: []
    }).data("kendoWindow");

    ventanaConfirmEdicionCambioProcesoPintura.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
        "</br><center><button class='btn btn-blue' id='yesButtonCambioProcesoPintura'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] + "</button><button class='btn btn-blue' id='noButtonCambioProcesoPintura'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");


    $("#yesButtonCambioProcesoPintura").click(function (e) {
        LimpiarDespuesCambioProcesoPintura();
        ventanaConfirmEdicionCambioProcesoPintura.close();
        editado = false;

        CambiarProcesoPintura();
    });
    $("#noButtonCambioProcesoPintura").click(function (e) {
        eventoRegresarTipoListado();
        ventanaConfirmEdicionCambioProcesoPintura.close();
    });
}


function eventoRegresarTipoListado() {

    switch (procesoPinturaSeleccionadoAnterior) {
        case "1":
            $('input:radio[name=ProcesoPintura]:nth(0)').attr('checked', true);
            $('input:radio[name=ProcesoPintura]:nth(0)').trigger("click");
            break;
        case "2":
            $('input:radio[name=ProcesoPintura]:nth(1)').attr('checked', true);
            $('input:radio[name=ProcesoPintura]:nth(1)').trigger("click");
            break;
        case "3":
            $('input:radio[name=ProcesoPintura]:nth(2)').attr('checked', true);
            $('input:radio[name=ProcesoPintura]:nth(2)').trigger("click");
            break;
        case "4":
            $('input:radio[name=ProcesoPintura]:nth(3)').attr('checked', true);
            $('input:radio[name=ProcesoPintura]:nth(3)').trigger("click");
            break;
    }
}

function suscribirEventoSeleccionProcesoPintura() {
    $('input:radio[name=ProcesoPintura]').change(function () {
        CambiarProcesoPintura();
    });
}

function SuscribirEventoZona() {

    $("#inputZona").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ZonaID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            elementoEjecutoChange = 2;
            if (!editado) {
                if (dataItem != undefined) {
                    
                    LineaCaptura.zonaIDSeleccionado = dataItem.ZonaID;
                    $("#inputCuadrante").data("kendoComboBox").dataSource.data([]);
                    $("#inputCuadrante").data("kendoComboBox").value("");
                    $("#inputSistemaPintura").data("kendoComboBox").value("");
                    $("#inputColor").data("kendoComboBox").value("");
                    AjaxCuadrante(dataItem.ZonaID);
                }
            }
            else {
                ventanaConfirmEdicionCaptura.open().center();
            }
        }
    });
}

function SuscribirEventoCuadrante() {
    $('#inputCuadrante').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID ",
        suggest: true,
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            elementoEjecutoChange = 3;
            if (!editado) {
                if (dataItem != undefined && dataItem.CuadranteID != 0) {
                    LineaCaptura.cuadranteIDSeleccionado = dataItem.CuadranteID;
                    $("#inputSistemaPintura").data("kendoComboBox").value("");
                    $("#inputColor").data("kendoComboBox").value("");
                    AjaxSistemaPintura($("#inputZona").data("kendoComboBox").value(), dataItem.CuadranteID, $("#inputProyecto").data("kendoComboBox").value());
                }
            }
            else {
                ventanaConfirmEdicionCaptura.open().center();
            }
        }
    });
}

function SuscribirEventoSistemaPintura() {
    $('#inputSistemaPintura').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "SistemaPinturaID",
        suggest: true,
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);
            elementoEjecutoChange = 4;
            if (!editado) {
                if (dataItem != undefined) {
                    LineaCaptura.sistemaPinturaIDSeleccionado = dataItem.SistemaPinturaID;
                    $("#inputColor").data("kendoComboBox").value("");
                    AjaxColores($("#inputZona").data("kendoComboBox").value(), $("#inputCuadrante").data("kendoComboBox").value(), dataItem.SistemaPinturaID);
                }
            }
            else {
                ventanaConfirmEdicionCaptura.open().center();
            }
        }

    });
}

function SuscribirEventoOrdenTrabajo() {

    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").value("");
        $("#InputID").data("kendoComboBox").setDataSource();
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
        //,
        //change: function (e) {
        //    dataItem = this.dataItem(e.sender.selectedIndex);
        //    if (!editado) {
        //        if (dataItem != undefined) {

        //        }
        //        else {
        //            $("#InputID").data("kendoComboBox").value("");
        //        }
        //    }
        //    else {
        //        ventanaConfirmEdicionCaptura.open().center();
        //    }
        //}
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {

        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();

        }
        else if (e.keyCode == 40) {
            $("#InputID").data("kendoComboBox").select();
        }
        else if (e.keyCode == 13) {
            if ($("#InputID").data("kendoComboBox").value() > 0) {
                AjaxAgregarSpool($("#InputID").data("kendoComboBox").value());
            }
            else {
                displayNotify("PinturaCargaSeleccionaSpool", "", '1');
            }
        }
    });

}

function SuscribirEventoMostrar() {
    $("#btnMostrar").click(function () {
        BuscarDetalle();
    });
}

function SuscribirEventoGuardar() {
    $("#Guardar, #GuardarPie, #Guardar1, #btnGuardar").click(function () {
        if ($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
            var ds = $("#grid").data("kendoGrid").dataSource;
            var _pasoId;
            if ($("input:radio[name='PasoTipo']:checked").val() == "intermedio") {
                _pasoId = 3;
            }
            else if ($("input:radio[name='PasoTipo']:checked").val() == "acabado") {
                _pasoId = 4;
            }
            ajaxGuardarCaptura(ds._data, _pasoId);
        }
        else if ($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
            opcionHabilitarView(false, "FieldSetView")
        }
    });
}

function SuscribirEventoColor() {
    $('#inputColor').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ColorID",
        suggest: true,
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            elementoEjecutoChange = 5;
            if (!editado) {
                
                if ($("#inputColor").data("kendoComboBox").dataItem($("#inputColor").data("kendoComboBox").select()) != undefined) {
                    LineaCaptura.ColorIDSeleccionado = dataItem.ColorID;
                }
                else {
                    $("#inputColor").data("kendoComboBox").value("");
                }
            }
            else {
                ventanaConfirmEdicionCaptura.open().center();
            }
        }
    });
    $('#inputColor').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputColor").data("kendoComboBox").dataItem($("#inputColor").data("kendoComboBox").select()) != undefined) {
                //PlanchaColor();
            }
            else {
                $("#inputColor").data("kendoComboBox").value("");
            }

        }
    });
}

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("input:radio[name=LLena]").prop('disabled', true);
        $("#inputCuadrante").data("kendoComboBox").enable(false);
        $("#inputColor").data("kendoComboBox").enable(false);
        $("#inputFechaCapturaAvanceIntAcabado").data("kendoDatePicker").enable(false);
        $("#inputPintor").data("kendoMultiSelect").enable(false);
        $("#inputSistemaPintura").data("kendoComboBox").enable(false);
        $("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $('#GuardarPie').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("input:radio[name=LLena]").prop('disabled', false);
        $("#inputCuadrante").data("kendoComboBox").enable(true);
        $("#inputColor").data("kendoComboBox").enable(true);
        $("#inputFechaCapturaAvanceIntAcabado").data("kendoDatePicker").enable(true);
        $("#inputPintor").data("kendoMultiSelect").enable(true);
        $("#inputSistemaPintura").data("kendoComboBox").enable(true);
        $("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#GuardarPie').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
    }
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
            elementoEjecutoChange = 1;
            if (!editado) {
                LimpiarDespuesCambioCaptura();
                if (dataItem != undefined) {
                    if (dataItem.ProyectoID != 0) {
                        LineaCaptura.proyectoIDSeleccionado = dataItem.ProyectoID;
                        AjaxZona();
                    }
                } else {
                    $("#inputProyecto").data("kendoComboBox").value("");
                }
            }
            else {
                ventanaConfirmEdicionCaptura.open().center();
            }
        }
    });

  
}

