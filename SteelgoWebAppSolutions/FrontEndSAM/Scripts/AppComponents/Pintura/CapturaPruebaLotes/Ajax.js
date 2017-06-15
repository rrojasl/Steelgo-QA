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
			}
			$("#inputProyecto").data("kendoComboBox").value(proyectoId);
			$("#inputProyecto").data("kendoComboBox").trigger("change");
		}
	});
}

function AjaxCargarProcesos() {
	loadingStart();
	$PruebasPorLote.PruebasPorLote.read({ token: Cookies.get("token"), ProcesoPinturaID: ProyectoiD, ProyectoID: procesoid }).done(function (data) {
		$("#inputProceso").data("kendoComboBox").dataSource.data([]);
		var datoID = 0;

		if (data.length > 0) {
			$("#inputProceso").data("kendoComboBox").dataSource.data(data);
			if (data.length < 3) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].ProyectoID != 0) {
						datoID = data[i].ProyectoID;
					}
				}
				$("#inputProceso").data("kendoComboBox").value(datoID);
				$("#inputProceso").data("kendoComboBox").trigger("change");
			}
			else
				loadingStop();

		}
	});
}

function ajaxObtenerSistemasPintura(procesoid, ProyectoiD) {
	loadingStart();
	$PruebasPorLote.PruebasPorLote.read({ token: Cookies.get("token"), ProcesoPinturaID: ProyectoiD, ProyectoID: procesoid }).done(function (data) {
		$("#inputSistemaPintura").data("kendoComboBox").dataSource.data([]);
		var datoID = 0;

		if (data.length > 0) {
			$("#inputProyecto").data("kendoComboBox").dataSource.data(data);
			if (data.length < 3) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].ProyectoID != 0) {
						datoID = data[i].ProyectoID;
					}
				}
				$("#inputSistemaPintura").data("kendoComboBox").value(datoID);
				$("#inputSistemaPintura").data("kendoComboBox").trigger("change");
			}
			else
				loadingStop();

		}
	});
}

function ajaxPruebas(ProcesoPinturaID, SistemaPinturaProyectoID, lenguaje) {
	loadingStart();
	$PruebasPorLote.PruebasPorLote.read({ token: Cookies.get("token"), ProcesoPinturaID: ProcesoPinturaID, SistemaPinturaProyectoID: SistemaPinturaProyectoID, lenguaje: lenguaje }).done(function (data) {
		$("#inputPrueba").data("kendoComboBox").dataSource.data([]);
		var datoID = 0;

		if (data.length > 0) {
			$("#inputProyecto").data("kendoComboBox").dataSource.data(data);
			if (data.length < 3) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].ProyectoID != 0) {
						datoID = data[i].ProyectoID;
					}
				}
				$("#inputPrueba").data("kendoComboBox").value(datoID);
				$("#inputPrueba").data("kendoComboBox").trigger("change");
			}
			else
				loadingStop();

		}
	});
}

function ajaxLlenarLote(ProcesoPinturaID, SistemaPinturaProyectoID, PruebaProcesoID, FechaLote) {
	loadingStart();
	$PruebasPorLote.PruebasPorLote.read({ token: Cookies.get("token"), ProcesoPinturaID: ProcesoPinturaID, SistemaPinturaProyectoID: SistemaPinturaProyectoID, PruebaProcesoID: PruebaProcesoID, FechaLote: FechaLote, lenguaje: lenguaje }).done(function (data) {
		$("#inputLote").data("kendoComboBox").dataSource.data([]);
		var datoID = 0;

		if (data.length > 0) {
			$("#inputProyecto").data("kendoComboBox").dataSource.data(data);
			if (data.length < 3) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].ProyectoID != 0) {
						datoID = data[i].ProyectoID;
					}
				}
				$("#inputLote").data("kendoComboBox").value(datoID);
			}
			else
				loadingStop();

			//$("#inputLote").data("kendoComboBox").trigger("change");
		}
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
}