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
        index: 3

    });

}


function SuscribirEventoProceso() {

    $('#inputProceso').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProcesoID ",
        suggest: true,
        filter: "contains",
        index: 3,
		change: function (e) {

			var dataItem = this.dataItem(e.sender.selectedIndex);
			if (dataItem != undefined) {
				ajaxObtenerSistemasPintura(dataItem.ProcesoID);
			}
			else {
				$("#inputProceso").data("kendoComboBox").value("");
			}
        }
    });
}

function SuscribirEventoSistemaPintura() {
    $("#inputSistemaPintura").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "SistemaPinturaID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
		change: function (e) {
			var dataItem = this.dataItem(e.sender.selectedIndex);
			if (dataItem != undefined) {
				ajaxPruebas(dataItem.SistPintID, $("#inputProceso").data("kendoComboBox").dataItem($("#inputProceso").data("kendoComboBox").select()).ProcesoID)
			}
			else {
				$("#inputSistemaPintura").data("kendoComboBox").value("");
			}
 
        }
    });
}


function SuscribirEventoPrueba() {

    $('#inputPrueba').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PruebaID ",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) { }
    });
}

function SuscribirEventoLote() {

    $('#inputLote').kendoComboBox({
        dataTextField: "NumeroLote",
        dataValueField: "LotePinturaID ",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) { }
    });
}


function SuscribirEventoFechaLote() {
    $("#inputFechaLote").kendoDatePicker({
        max: new Date()
    }).closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
        }
    });



    $("#inputFechaLote").blur(function (e) {

        ajaxLlenarLote($("#inputSistemaPintura").data("kendoComboBox").dataItem($("#inputSistemaPintura").data("kendoComboBox").select()).SistPintID);
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
			case 6:
				BuscarDetalle();
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