var cuadranteSave = 0;
function AjaxCargarCamposPredeterminados() {
    var campoPredeterminado = 3067;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: campoPredeterminado }).done(function (data) {
        if (data == "Spool") {
            $('input:radio[name=TipoCarga]:nth(0)').trigger("click");
        }
        else if (data == "Codigo") {
            $('input:radio[name=TipoCarga]:nth(1)').trigger("click");
        }
        loadingStop();
    });
}

function AjaxCargarProyectos() {
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#InputProyecto").data("kendoComboBox").dataSource.data([]);
        var proyectoId = 0;

        if (data.length > 0) {
            $("#InputProyecto").data("kendoComboBox").dataSource.data(data);

            if (data.length < 3) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].ProyectoID != 0) {
                        proyectoId = data[i].ProyectoID;
                    }
                }
            }
            $("#InputProyecto").data("kendoComboBox").value(proyectoId);
            $("#InputProyecto").data("kendoComboBox").trigger("change");
        }
    });
}

function AjaxObtenerSpoolID() {
    try {
        loadingStart();
        $CapturasRapidas.CapturasRapidas.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (Error(data)) {
                $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
                $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus)
                Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
                loadingStop();
            }
        });
    } catch (e) {
        displayNotify("Mensajes_error", e.message, '2');
    }
}

function AjaxCargarPaquetes(proyectoID, paqueteID) {
    loadingStart();
    $Empaquetado.Empaquetado.read({ token: Cookies.get("token"), ProyectoID: proyectoID, lenguaje: $("#language").val() }).done(function (data) {
        if (data.length > 0) {
            $("#InputPaquete").data("kendoComboBox").dataSource.data(data);

            if (data.length < 3 && paqueteID == 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].PaqueteID != 0) {
                        paqueteID = data[i].PaqueteID;
                    }
                }
            }

            $("#InputPaquete").data("kendoComboBox").value(paqueteID);
            $("#InputPaquete").data("kendoComboBox").trigger("change");
        }
        loadingStop();
    });
}

function AjaxCargarZona(patioID) {
    loadingStart();    
    $Zona.Zona.read({ token: Cookies.get("token"), PatioID: patioID }).done(function (data) {
        $("#InputZonaPaquete").data("kendoComboBox").dataSource.data([]);
        $("#InputZonaDescarga").data("kendoComboBox").dataSource.data([]);
        if (data.length > 0) {
            var zonaID = 0;
            $("#InputZonaPaquete").data("kendoComboBox").dataSource.data(data);
            $("#InputZonaDescarga").data("kendoComboBox").dataSource.data(data);

            if (data.length < 3) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].ZonaID != 0) {
                        zonaID = data[i].ZonaID;
                    }
                }
            }
            $("#InputZonaPaquete").data("kendoComboBox").value(zonaID);
            $("#InputZonaPaquete").data("kendoComboBox").trigger("change");


            $("#InputZonaDescarga").data("kendoComboBox").value(zonaID);
            $("#InputZonaDescarga").data("kendoComboBox").trigger("change");
        }

        loadingStop();
    });
}

function AjaxCargarCuadranteDescarga(zonaID) {
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), ZonaID: zonaID }).done(function (data) {
        var CuadranteId = 0;        
        if (data.length > 0) {
            $("#InputCuadranteDescarga").data("kendoComboBox").dataSource.data(data);

            if (data.length < 3) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].CuadranteID != 0) {
                        CuadranteId = data[i].CuadranteID;
                    }
                }
            }

            $("#InputCuadranteDescarga").data("kendoComboBox").value(CuadranteId);
            $("#InputCuadranteDescarga").data("kendoComboBox").trigger("change");
        }
    });
}

function AjaxCargarCuadranteGuardado(zonaID) {
    loadingStart();
    $Empaquetado.Empaquetado.read({ token: Cookies.get("token"), ZonaID: zonaID }).done(function (data) {
        if (data.length > 0) {
            var cuadranteID = 0;
            $("#InputCuadrantePaquete").data("kendoComboBox").dataSource.data(data);

            if (data.length < 3 && cuadranteSave == 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].CuadranteID != 0) {
                        cuadranteID = data[i].CuadranteID;
                    }
                }
            } else {
                cuadranteID = cuadranteSave;
            }
            $("#InputCuadrantePaquete").data("kendoComboBox").value(cuadranteID);
            $("#InputCuadrantePaquete").data("kendoComboBox").trigger("change");
        }

        loadingStop();
    });
}


function AjaxCargarDetalleEmpaquetado(paqueteID, todos) {
    loadingStart();
    $Empaquetado.Empaquetado.read({ token: Cookies.get("token"), PaqueteID: paqueteID, Todos: todos }).done(function (data) {
        $("#grid").data("kendoGrid").dataSource.data([]);
        if (data!= null) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
            }
            ImprimirTotalToneladas(ds._data);
            ImprimirTotalPiezas(ds._data);
        }
        loadingStop();
    });
}

function AjaxObtenerDetalleSpool(tipoConsulta, spoolID, codigo) {
    loadingStart();
    var ProyectoID = parseInt($("#InputProyecto").data("kendoComboBox").value());
    $Empaquetado.Empaquetado.read({ token: Cookies.get("token"), TipoConsulta: tipoConsulta, OrdenTrabajoSpoolID: spoolID, Codigo: codigo }).done(function (data) {
        if (data != null) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            for (var i = 0; i < data.length; i++) {
                if (!validarInformacion(data[i])) {
                    if (data[i].ProyectoID === ProyectoID) {
                        if (data[i].Empaquetado === 0) {
                            ds.add(data[i]);
                        } else {
                            displayNotify("", _dictionary.EmbarqueEmpaquetadoErrorSpoolPaquete[$("#language").data("kendoDropDownList").value()] +
                                data[i].Paquete, '2');
                        }
                    } else {
                        displayNotify("EmbarqueEmpaquetadoErrorProyectoDiferente", "", '2');
                    }
                } else {
                    displayNotify("SpoolIDExistente", "", '2');
                }
            }

            ImprimirTotalToneladas(ds._data);
            ImprimirTotalPiezas(ds._data);
        }
        loadingStop();
    });
}

function AjaxGuardarCaptura(ds, nuevo, Paquete, Proyecto) {
    var fechaPredeterminada;    
    cuadranteSave = Paquete.CuadranteUbicacion == null ? 0 : Paquete.CuadranteUbicacion;
    
    var cerrarPaquete = $("#InputCerrar").is(":checked")?1:0;
    if (Paquete.PaqueteID == 0) {
        $("#InputNombre").val("");
        $("#InputNombre").attr("disabled", false);
        $("#InputZonaPaquete").data("kendoComboBox").value(0);
        $("#InputZonaPaquete").data("kendoComboBox").trigger("change");

        var idFechaPaquete = 3068;
        $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: idFechaPaquete }).done(function (data) {
            fechaPredeterminada = kendo.toString(data, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
            $("#InputFechaPaquete").val(fechaPredeterminada);
        });
    } else {
        $("#InputNombre").val(Paquete.Nombre);
        $("#InputNombre").attr("disabled", true);
        $("#InputZonaPaquete").data("kendoComboBox").value(Paquete.ZonaID);
        $("#InputZonaPaquete").data("kendoComboBox").trigger("change");
        fechaPredeterminada = kendo.toString(Paquete.FechaCreacion, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
        $("#InputFechaPaquete").val(fechaPredeterminada);
        
    }

    windowSave = $("#windowSave").kendoWindow({
        iframe: true,
        title: _dictionary.EmbarqueEmpaquetadoNuevoPaquete[$("#language").data("kendoDropDownList").value()],
        visible: false,
        width: "40%",
        height: "auto",
        modal: true,
        draggable: false,
        resizable: false,
        animation: {
            close: false,
            open: false
        }
    }).data("kendoWindow");

    $("#btnGuardarPopUp").click(function (e) {
        windowSave.close();
        var Captura = {
            listaDetalle: ""
        };
        var Detalle = [];
        var cont = 0;
        if (ds.length != null) {           
            for (var i = 0; i < ds.length; i++) {
                Detalle[i] = {
                    Accion: "", SpoolID: "", CuadranteActualSam2ID: "", CuadranteActualSam3ID: ""
                }
                Detalle[i].Accion = ds[i].Accion;
                Detalle[i].SpoolID = ds[i].SpoolID;
                Detalle[i].SpoolID = ds[i].SpoolID;
                Detalle[i].CuadranteActualSam2ID = ds[i].CuadranteSam2ID;
                Detalle[i].CuadranteActualSam3ID = ds[i].CuadranteSam3ID;
            }
        } else {
            Detalle[0] = {
                Accion: 0, SpoolID: 0, CuadranteActualSam2ID: 0, CuadranteActualSam3ID: 0
            }
        }
        Captura.listaDetalle = Detalle;
        if ($('#InputZonaPaquete').data("kendoComboBox").value() != "" && $('#InputZonaPaquete').data("kendoComboBox").value() != "0") {
            if ($('#InputCuadrantePaquete').data("kendoComboBox").value() != "" && $('#InputCuadrantePaquete').data("kendoComboBox").value() != "0") {
                $Empaquetado.Empaquetado.create(Captura, {
                    token: Cookies.get("token"), lenguaje: $("#language").val(),
                    PaqueteID: Paquete.PaqueteID, NombrePaquete: $("#InputNombre").val(), CuadranteID: $("#InputCuadrantePaquete").data("kendoComboBox").value(),
                    Cerrado: cerrarPaquete, FechaPaquete: $("#InputFechaPaquete").val(), CuadrantePaqueteSam2ID: Paquete.CuadrantePaqueteSam2ID,
                    CuadrantePaqueteSam3ID: Paquete.CuadrantePaqueteSam3ID
                }).done(function (data) {
                    if (Error(data)) {
                        if (data.ReturnMessage.length == 2 && data.ReturnMessage[0] == "Ok") {
                            if (nuevo) {
                                Limpiar();
                            } else {
                                var paqueteID = parseInt(data.ReturnMessage[1])
                                opcionHabilitarView(true, "FieldSetView");
                                AjaxCargarPaquetes(Proyecto.ProyectoID, paqueteID);
                                AjaxCargarDetalleEmpaquetado(paqueteID, 1);
                            }
                            displayNotify("MensajeGuardadoExistoso", "", '0');
                        } else if (data.ReturnMessage.length == 1 && data.ReturnMessage[0] == "Paquete Existe") {
                            displayNotify("EmbarqueEmpaquetadoErrorPaqueteExiste", "", '2');
                        } else {
                            displayNotify("MensajeGuardadoErroneo", "", '2');
                        }
                    } else {
                        displayNotify("MensajeGuardadoErroneo", "", '2');
                    }

                });
            } else {
                displayNotify("EmbarqueEmpaquetadoMsjErrorCuadrante", "", '2');
            }
        } else {

            displayNotify("EmbarqueEmpaquetadoMsjErrorZona", "", '2');
        }
        
    });
    $("#btnCerrarPopUpSave").click(function (e) {
        windowSave.close();
    });

    windowSave.open().center();
}

function AjaxDescargarSpool(dataItem) {
    loadingStart();
    var dataSource = $("#grid").data("kendoGrid").dataSource;
    var cuadranteID = $("#InputCuadranteDescarga").data("kendoComboBox").value();

    $Empaquetado.Empaquetado.read({
        token: Cookies.get("token"), EmpaquetadoID: dataItem.EmpaquetadoID, SpoolID: dataItem.SpoolID,
        CuadranteID: cuadranteID, CuadranteAnteriorSam2: dataItem.CuadranteSam2ID,
        CuadranteAnteriorSam3: dataItem.CuadranteSam3ID
    }).done(function (data) {
        if (Error(data)) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                dataSource.remove(dataItem);
                dataSource.sync();
                displayNotify("EmbarqueEmpaquetadoMsjDescargaSpoolExito", "", "0");
            } else {
                displayNotify("EmbarqueEmpaquetadoMsjDescargaSpoolError", "", "2");
            }
            ImprimirTotalToneladas(dataSource._data);
            ImprimirTotalPiezas(dataSource._data);
        } else {
            displayNotify("EmbarqueEmpaquetadoMsjDescargaSpoolError", "", "2");
        }
        loadingStop();
    });
}