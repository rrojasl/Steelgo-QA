function AjaxCargarCamposPredeterminados() {
    loadingStart();
    var TipoMuestraPredeterminadoID = 4079;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "sin captura") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
        }
        else if (data == "Todos") {
            $('input:radio[name=Muestra]:nth(1)').trigger("click");
        }
        loadingStop();
    });

}

function AjaxCargarProyecto() {
	loadingStart();
	$Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
		$("#inputProyecto").data("kendoComboBox").dataSource.data([]);
		var proyectoId = 0;

		if (data.length > 0) {
			$("#inputProyecto").data("kendoComboBox").dataSource.data(data);
			if (data.length < 3) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].ProyectoID != 0) {
						proyectoId = data[i].ProyectoID;
					}
				}
				$("#inputProyecto").data("kendoComboBox").value(proyectoId);
				$("#inputProyecto").data("kendoComboBox").trigger("change");
			}
			else
				loadingStop();

		}
		else
			loadingStop();
	});
}

function AjaxCargarProcesos() {
	loadingStart();
	$PruebasPorLote.PruebasPorLote.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), proyectoID: $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select()).ProyectoID }).done(function (data) {
		$("#inputProceso").data("kendoComboBox").dataSource.data([]);
		var datoID = 0;

		if (data.length > 0) {
			$("#inputProceso").data("kendoComboBox").dataSource.data(data);
			if (data.length < 3) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].ProcesoPinturaID != 0) {
						datoID = data[i].ProcesoPinturaID;
					}
				}
				$("#inputProceso").data("kendoComboBox").value(datoID);
				$("#inputProceso").data("kendoComboBox").trigger("change");
			}
			else
				loadingStop();

		}
		else
			loadingStop();
	});
}

function ajaxObtenerSistemasPintura(procesoid, ProyectoiD) {
	loadingStart();
	$PruebasPorLote.PruebasPorLote.read({ token: Cookies.get("token"), ProcesoPinturaID: procesoid, ProyectoID: ProyectoiD }).done(function (data) {
		$("#inputSistemaPintura").data("kendoComboBox").dataSource.data([]);
		var datoID = 0;

		if (data.length > 0) {
			$("#inputSistemaPintura").data("kendoComboBox").dataSource.data(data);
			if (data.length < 3) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].SistemaPinturaID != 0) {
						datoID = data[i].SistemaPinturaID;
					}
				}
				$("#inputSistemaPintura").data("kendoComboBox").value(datoID);
				$("#inputSistemaPintura").data("kendoComboBox").trigger("change");
			}
			else
				loadingStop();

		}
		else
			loadingStop();
	});
}

function AjaxColores(sistemaPinturaProyectoID) {
    loadingStart();
    $AvanceCuadrante.AvanceCuadrante.read({ token: Cookies.get("token"), sistemaPinturaProyectoID: sistemaPinturaProyectoID, lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            $("#inputColor").data("kendoComboBox").dataSource.data(data);
            $("#inputColor").data("kendoComboBox").value("");
            if (data.length == 2) {
                $("#inputColor").data("kendoComboBox").select(1);
                $("#inputColor").data("kendoComboBox").trigger("change");
            }
        }
        loadingStop();
    });
}

function ajaxPruebas(ProcesoPinturaID, SistemaPinturaProyectoID, lenguaje) {
	loadingStart();
	$PruebasPorLote.PruebasPorLote.read({ token: Cookies.get("token"), ProcesoPinturaID: ProcesoPinturaID, SistemaPinturaProyectoID: SistemaPinturaProyectoID, lenguaje: lenguaje }).done(function (data) {
		$("#inputPrueba").data("kendoComboBox").dataSource.data([]);
		var datoID = 0;

		if (data.length > 0) {
			$("#inputPrueba").data("kendoComboBox").dataSource.data(data);
			if (data.length < 3) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].ProyectoID != 0) {
						datoID = data[i].PruebaProcesoPinturaID;
					}
				}
				$("#inputPrueba").data("kendoComboBox").value(datoID);

			//	if ($("#inputFechaLote").val() != "") {
					$("#inputPrueba").data("kendoComboBox").trigger("change");
				//}
				//else
				//	loadingStop();



			}
			else
				loadingStop();

		}
		else
			loadingStop();
	});
}

function ajaxObtenerFechas(ProcesoPinturaID, SistemaPinturaProyectoID, PruebaProcesoPinturaID, lenguaje) {
	loadingStart();
	$PruebasPorLote.PruebasPorLote.read({ token: Cookies.get("token"), ProcesoPinturaID: ProcesoPinturaID, SistemaPinturaProyectoID: SistemaPinturaProyectoID, PruebaProcesoPinturaID: PruebaProcesoPinturaID, lenguaje: lenguaje }).done(function (data) {
		
		var arrayDates = [];

		if (data.length > 0) {
			for (var i = 0; i < data.length; i++) {
				arrayDates[i] = new Date(ObtenerDato(data[i].Fecha, 1), ObtenerDato(data[i].Fecha, 2), ObtenerDato(data[i].Fecha, 3));
			}

			$("#inputFechaLote").data("kendoDatePicker").setOptions({
				dates: arrayDates
			});

			if (arrayDates.length == 1)
			{
				
				$("#inputFechaLote").data("kendoDatePicker").value(kendo.toString(arrayDates[0], String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim());
				
			}
			$("#inputFechaLote").data("kendoDatePicker").trigger("change");
		}
		else
			loadingStop();
	});
}

function ajaxLlenarLote(ProcesoPinturaID, SistemaPinturaProyectoID, PruebaProcesoPinturaID, FechaLote, lenguaje) {
	loadingStart();
	$PruebasPorLote.PruebasPorLote.read({ token: Cookies.get("token"), ProcesoPinturaID: ProcesoPinturaID, SistemaPinturaProyectoID: SistemaPinturaProyectoID, PruebaProcesoPinturaID: PruebaProcesoPinturaID, FechaLote: FechaLote, lenguaje: lenguaje }).done(function (data) {
		$("#inputLote").data("kendoComboBox").dataSource.data([]);
		var datoID = 0;

		if (data.length > 0) {
			$("#inputLote").data("kendoComboBox").dataSource.data(data);
			if (data.length < 3) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].ProyectoID != 0) {
						datoID = data[i].LoteID;
					}
				}
				$("#inputLote").data("kendoComboBox").value(datoID);
			}
			else
				loadingStop();

			//$("#inputLote").data("kendoComboBox").trigger("change");
		}
		else
			loadingStop();
	});

}


function ajaxGuardar(data) {
	//loadingStart();
	//displayNotify("", "se guardo correctamente la informacion", '0');
	//opcionHabilitarView(true, "FieldSetView");
	//loadingStop();
};

function ajaxBuscarSpool() {
	//var array = [
	//                {
	//                    Accion: 2,
	//                    NombreSpool: "X002-006",
	//                    SistemaPintura: "A4",
	//                    Color: "ALUMINIO",
	//                    M2: "4.12",
	//                    PruebasReq: 2,
	//                    PruebasEjec: 0,
	//                    NombreCuadrante: "Comdistral",
	//                    CapturaPrueba: "Ver Prueba"
	//                },
	//                 {
	//                     Accion: 2,
	//                     NombreSpool: "X002-002",
	//                     SistemaPintura: "A4",
	//                     Color: "ALUMINIO",
	//                     M2: "4.12",
	//                     PruebasReq: 2,
	//                     PruebasEjec: 0,
	//                     NombreCuadrante: "Comdistral",
	//                     CapturaPrueba: "Ver Prueba"
	//                 }
	//];

    //$("#grid").data('kendoGrid').dataSource.data(array);

    loadingStart();
    $PruebasPorLote.PruebasPorLote.read({ token: Cookies.get("token"), procesoPinturaID: procesoPinturaID, sistemaPinturaProyectoID: sistemaPinturaProyectoID, pruebaID: pruebaID, loteID: LoteID, lenguaje: lenguaje }).done(function (data) {
        if (data.length > 0) {
                $("#grid").data("kendoGrid").dataSource.data([]);
                $("#grid").data("kendoGrid").dataSource.data(data);
                editado = true;
        }
        loadingStop();
    });

}