function SuscribirEventos() {
    SuscribirEventoProyecto();
    SuscribirEventoProceso();
    SuscribirEventoSistemaPintura();
    SuscribirEventoPrueba();
    SuscribirEventoFechaLote();
    SuscribirEventoLote();
    suscribirEventoMostrar();
    SuscribirEventoGuardar();
    suscribirEventoElementosAsignados();
    SuscribirEventCerrarWindow();
    SuscribirEventoColor();
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
                $("#inputProceso").data("kendoComboBox").trigger("change");
                break;
            case 3:
                $("#inputCinputSistemaPinturauadrante").data("kendoComboBox").trigger("change");
                break;
            case 4:
                $("#inputPrueba").data("kendoComboBox").trigger("change");
                break;
            case 5:
                $("#inputFechaLote").data("kendoComboBox").trigger("change");
                break;
            case 6:
                $("#inputLote").data("kendoComboBox").trigger("change");
                break;
            case 6:
                BuscarDetalle();
                break;
        }
    });

    $("#noButtonProySinTipoBusquedaProyecto").click(function (e) {
        $("#inputProyecto").data("kendoComboBox").value(LineaCaptura.ProyectoIDSeleccionado);
        $("#inputProceso").data("kendoComboBox").value(LineaCaptura.ProcesoIDSeleccionado);
        $("#inputSistemaPintura").data("kendoComboBox").value(LineaCaptura.SistemaPinturaIDSeleccionado);
        $("#inputPrueba").data("kendoComboBox").value(LineaCaptura.PruebaIDSeleccionado);
        $("#inputFechaLote").val(LineaCaptura.FechaSeleccionada)
        $("#inputLote").data("kendoComboBox").value(LineaCaptura.LoteIDSeleccionada);
        ventanaConfirmEdicionCaptura.close();
    });
}

function SuscribirEventCerrarWindow() {
    $("#GuardarDetallePopup").click(function (e) {
        //  e.preventDefault();

        $("#windowGrid").data("kendoWindow").close();
    });

    $("#CerrarDetallePopup").click(function (e) {
        // e.preventDefault();

        $("#windowGrid").data("kendoWindow").close();
    });
}

function suscribirEventoMostrar() {
    $('#btnBuscar').click(function (e) {
        ajaxBuscarSpool();
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
            if (!editado) {

                $("#inputProceso").data("kendoComboBox").dataSource.data([]);
                $("#inputProceso").data("kendoComboBox").value("");

                $("#inputSistemaPintura").data("kendoComboBox").dataSource.data([]);
                $("#inputSistemaPintura").data("kendoComboBox").value("");

                $("#inputColor").data("kendoComboBox").dataSource.data([]);
                $("#inputColor").data("kendoComboBox").value("");

                $("#inputPrueba").data("kendoComboBox").dataSource.data([]);
                $("#inputPrueba").data("kendoComboBox").value("");

                $("#inputFechaLote").data("kendoDatePicker").value("");


                $("#inputLote").data("kendoComboBox").dataSource.data([]);
                $("#inputLote").data("kendoComboBox").value("");

                if (dataItem != undefined) {
                    LineaCaptura.ProyectoIDSeleccionado = dataItem.ProyectoID;

                    AjaxCargarProcesos();
                }
                else {
                    $("#inputProyecto").data("kendoComboBox").value("");
                }
            }
            else {
                ventanaConfirmEdicionSinTipoBusqueda.open().center();
            }
        }
    });

}


function SuscribirEventoProceso() {

    $('#inputProceso').kendoComboBox({
        dataTextField: "ProcesoPintura",
        dataValueField: "ProcesoPinturaID ",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if (!editado) {
                var dataItem = this.dataItem(e.sender.selectedIndex);

                $("#inputSistemaPintura").data("kendoComboBox").dataSource.data([]);
                $("#inputSistemaPintura").data("kendoComboBox").value("");

                $("#inputColor").data("kendoComboBox").dataSource.data([]);
                $("#inputColor").data("kendoComboBox").value("");

                $("#inputPrueba").data("kendoComboBox").dataSource.data([]);
                $("#inputPrueba").data("kendoComboBox").value("");

                $("#inputFechaLote").data("kendoDatePicker").value("");


                $("#inputLote").data("kendoComboBox").dataSource.data([]);
                $("#inputLote").data("kendoComboBox").value("");

                if (dataItem != undefined) {
                    LineaCaptura.ProcesoIDSeleccionado = dataItem.ProcesoPinturaID;
                    if (dataItem.ProcesoPinturaID == 4)
                        $('#divColor').show();
                    else
                        $('#divColor').hide();
                    ajaxObtenerSistemasPintura(dataItem.ProcesoPinturaID, $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select()).ProyectoID);
                }
                else {
                    $("#inputProceso").data("kendoComboBox").value("");
                }
            }
            else {
                ventanaConfirmEdicionSinTipoBusqueda.open().center();
            }
        }
    });
}

function SuscribirEventoSistemaPintura() {
    $("#inputSistemaPintura").kendoComboBox({
        dataTextField: "SistemaPintura",
        dataValueField: "SistemaPinturaID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            if (!editado) {

                $("#inputColor").data("kendoComboBox").dataSource.data([]);
                $("#inputColor").data("kendoComboBox").value("");

                $("#inputPrueba").data("kendoComboBox").dataSource.data([]);
                $("#inputPrueba").data("kendoComboBox").value("");

                $("#inputFechaLote").data("kendoDatePicker").value("");


                $("#inputLote").data("kendoComboBox").dataSource.data([]);
                $("#inputLote").data("kendoComboBox").value("");

                var dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    LineaCaptura.SistemaPinturaIDSeleccionado = dataItem.SistemaPinturaID;

                    if ($("#inputProceso").data("kendoComboBox").dataItem($("#inputProceso").data("kendoComboBox").select()).ProcesoPinturaID == 4)
                        AjaxColores(dataItem.SistemaPinturaProyectoID);
                   
                    ajaxPruebas($("#inputProceso").data("kendoComboBox").dataItem($("#inputProceso").data("kendoComboBox").select()).ProcesoPinturaID, dataItem.SistemaPinturaProyectoID, $("#language").val());
                }
                else {
                    $("#inputSistemaPintura").data("kendoComboBox").value("");
                }
            }
            else {
                ventanaConfirmEdicionSinTipoBusqueda.open().center();
            }

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
            if (!editado) {
                var dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    LineaCaptura.ColorIDSeleccionado = dataItem.ColorID;
                }
                else {
                    $("#inputColor").data("kendoComboBox").value("");
                }
            }
            else {
                ventanaConfirmEdicionSinTipoBusqueda.open().center();
            }
        }
    });
    $('#inputColor').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select()) != undefined) {
                BuscarDetalleCarro();
            }
            else {
                $("#inputCarro").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoPrueba() {

    $('#inputPrueba').kendoComboBox({
        dataTextField: "Prueba",
        dataValueField: "PruebaProcesoPinturaID ",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if (!editado) {
                $("#inputFechaLote").data("kendoDatePicker").value("");


                $("#inputLote").data("kendoComboBox").dataSource.data([]);
                $("#inputLote").data("kendoComboBox").value("");

                var dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    LineaCaptura.PruebaIDSeleccionado = dataItem.PruebaIDSeleccionado;
                    ajaxObtenerFechas($("#inputProceso").data("kendoComboBox").dataItem($("#inputProceso").data("kendoComboBox").select()).ProcesoPinturaID, $("#inputSistemaPintura").data("kendoComboBox").dataItem($("#inputSistemaPintura").data("kendoComboBox").select()).SistemaPinturaProyectoID, dataItem.PruebaProcesoPinturaID, $("#language").val())
                }
                else {
                    $("#inputPrueba").data("kendoComboBox").value("");
                }
            }
            else {
                ventanaConfirmEdicionSinTipoBusqueda.open().center();
            }
        }
    });
}



function SuscribirEventoFechaLote() {
    //var disabledDays = [
    //	new Date(2000, 01, 01),
    //	new Date(2000, 01, 02)
    //];

    $("#inputFechaLote").kendoDatePicker({
        format: _dictionary.FormatoFecha2[$("#language").data("kendoDropDownList").value()],
        //dates: disabledDays,
        value: new Date(),
        max: new Date(),
        change: function (e) {
            if (!editado) {
                $("#inputLote").data("kendoComboBox").dataSource.data([]);
                $("#inputLote").data("kendoComboBox").value("");

                var dataItem = e.sender._oldText;
                if (dataItem != "" && $("#inputPrueba").data("kendoComboBox").select()>0) {
                    LineaCaptura.FechaSeleccionada = e.sender._oldText;
                    var ProcesoPinturaID = $("#inputProceso").data("kendoComboBox").dataItem($("#inputProceso").data("kendoComboBox").select()).ProcesoPinturaID;
                    var SistemaPinturaProyectoID = $("#inputSistemaPintura").data("kendoComboBox").dataItem($("#inputSistemaPintura").data("kendoComboBox").select()).SistemaPinturaProyectoID;
                    var PruebaProcesoPinturaID = $("#inputPrueba").data("kendoComboBox").dataItem($("#inputPrueba").data("kendoComboBox").select()).PruebaProcesoPinturaID;
                    var fecha = e.sender._oldText;
                    ajaxLlenarLote(ProcesoPinturaID, SistemaPinturaProyectoID, PruebaProcesoPinturaID, fecha, $("#language").val());
                }
                else {
                    $("#inputPrueba").data("kendoComboBox").value("");
                }
            }
            else {
                ventanaConfirmEdicionSinTipoBusqueda.open().center();
            }
        },
        month: {
            content: $("#cell-template").html()
        }

    }).data("kendoDatePicker");

}

function SuscribirEventoLote() {

    $('#inputLote').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "LoteID ",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if (!editado) {
                var dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined && $("#inputLote").val() != "") {
                    LineaCaptura.LoteIDSeleccionada = dataItem.LoteID;
                }
                else {
                    $("#inputPrueba").data("kendoComboBox").value("");
                }
            }
            else {
                ventanaConfirmEdicionSinTipoBusqueda.open().center();
            }
        }
    });
}


function SuscribirEventoGuardar() {
    $('#btnGuardarYNuevo').click(function (e) {
        ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);
        Limpiar();
    });

    $('#Guardar').click(function (e) {
        if ($('#Guardar').text() == "Guardar") {
            ajaxGuardar($("#grid").data("kendoGrid").dataSource._data);
        }
        else if ($('#Guardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });
};



function opcionHabilitarView(valor, name) {



    if (valor) {

        $('#FieldSetView').find('*').attr('disabled', true);
        $("#inputSistemaPintura").data("kendoComboBox").enable(false);
        $("#inputLote").data("kendoComboBox").enable(false);
        $('#Guardar').text("Editar");
        $("#DetalleAvisoLlegada0017").text("Editar");

    }

    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#inputSistemaPintura").data("kendoComboBox").enable(true);
        $("#inputLote").data("kendoComboBox").enable(true);
        $('#Guardar').text("Guardar");
        $("#DetalleAvisoLlegada0017").text("Guardar");

    }

}

function suscribirEventoElementosAsignados() {
    $(document).on('click', '.EnlaceDetallePrueba', function (e) {
        e.preventDefault();
        if ($('#Guardar').text() == _dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#grid").data("kendoGrid"),
				dataItem = grid.dataItem($(e.target).closest("tr"))
            LlenarGridPopUp();
        }
    });
}