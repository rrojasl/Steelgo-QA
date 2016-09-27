function AjaxCargarCamposPredeterminados() {
    var TipoMuestraPredeterminadoID = 46;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "Escritorio") {
            $("#styleEscritorio").addClass("active");
            $("#stylePatio").removeClass("active");

            $('input:radio[name=TipoVista]:nth(0)').attr('checked', true);
            $('input:radio[name=TipoVista]:nth(1)').attr('checked', false);

            $("#contenedorPrincipalEscritorio").show();
            $("#contenedorPrincipalPatio").hide();
        }
        else if (data == "Patio") {
            $("#styleEscritorio").removeClass("active");
            $("#stylePatio").addClass("active");

            $('input:radio[name=TipoVista]:nth(0)').attr('checked', false);
            $('input:radio[name=TipoVista]:nth(1)').attr('checked', true);

            $("#contenedorPrincipalEscritorio").hide();
            $("#contenedorPrincipalPatio").show();
        }
        //loadingStop();
    });

    AjaxCargaMostrarPredeterminado();
};

function AjaxCargaMostrarPredeterminado() {
    var TipoMuestraPredeterminadoID = 2048;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "sin captura") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
        }
        else if (data == "Todos") {
            $('input:radio[name=Muestra]:nth(1)').trigger("click");
        }
    });
    
    AjaxCargaTipoSpool();
}

function AjaxCargaTipoSpool() {
    var TipoMuestraPredeterminadoID = 34;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "Spool") {
            $('input:radio[name=TipoSeleccion]:nth(0)').attr('checked', true).trigger("change");
        }
        else if (data == "Codigo") {
            $('input:radio[name=TipoSeleccion]:nth(1)').attr('checked', true).trigger("change");
        }

        //loadingStop();
    });
}

function AjaxCargaProyecto(){
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
        $("#inputProyecto").data("kendoComboBox").dataSource.data(data);

        var proyectoId = 0;

        if (data.length < 3) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].ProyectoID != 0) {
                    proyectoId = data[i].ProyectoID;
                }
            }
        }

        $("#inputProyecto").data("kendoComboBox").value(proyectoId);
        $("#inputProyecto").data("kendoComboBox").trigger("change");
    });
}

function AjaxCargarMedioTransporte(ProyectoID) {
    $PinturaGeneral.PinturaGeneral.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), proyectoID: ProyectoID }).done(function (data) {
        var medioTranporteId = 0;        
        if (data.length < 3) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].MedioTransporteID != 0) {
                    medioTranporteId = data[i].MedioTransporteID;
                }
            }
        }

        data.splice(1, 0, { MedioTransporteID: -1, Nombre: _dictionary.PinturaCargaAgregarNuevoCarro[$("#language").data("kendoDropDownList").value()] });

        if ($("#styleEscritorio").hasClass("active")) {

            $("#inputCarroEscritorio").data("kendoComboBox").dataSource.data(data);

            $("#inputCarroEscritorio").data("kendoComboBox").value(medioTranporteId);
            $("#inputCarroEscritorio").data("kendoComboBox").trigger("change");
        } else {

            $("#inputCarroPatio").data("kendoComboBox").dataSource.data(data);

            $("#inputCarroPatio").data("kendoComboBox").value(medioTranporteId);
            $("#inputCarroPatio").data("kendoComboBox").trigger("change");
        }
        
    });
}

function AjaxGuardarNuevoCarro() {
    try {
        loadingStart();
        var Captura = { Nombre: $("#InputNombre").val(), UsuarioID: 0 };
        var proyectoID = $("#inputProyecto").data("kendoComboBox").value();


        if ($("#InputNombre").val() != "" && $("#InputNombre").val()!=undefined) {
            $PinturaGeneral.PinturaGeneral.create(Captura, { token: Cookies.get("token") }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                    windowNewCarriage.close();
                    setTimeout(function () { AjaxCargarMedioTransporte(proyectoID); }, 1100);
                    displayNotify("PinturaGuardarNuevoCarro", "", '0');
                }
                else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                    displayNotify("PinturaErrorGuardarNuevoCarro", "", '2');
                }

                loadingStop();
            });
        }
        else {
            displayNotify("PinturaGuardarNuevoCarroNombre", "", '1');
            loadingStop();
        }
    } catch (e) {
        loadingStop();
        displayNotify("Mensajes_error", e.message, '0');

    }
}

function AjaxCargarSpoolBacklog(cargarSpoolsDespuesDeCargar, MedioTransporteID) {
    loadingStart();
    var MedioTransporteCargaID = $("#inputCarroEscritorio").attr("mediotransporteid");
    if (MedioTransporteID == 0) {
        MedioTransporteCargaID = 0;
    }

    $CargaCarro.CargaCarro.read({ medioTransporteCargaID: MedioTransporteCargaID, medioTransporteID: MedioTransporteID, token: Cookies.get("token"), proyectoID: $("#inputProyecto").data("kendoComboBox").value(), todos: 1 }).done(function (data) {
        $("#grid[name='grid-Escritorio']").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid[name='grid-Escritorio']").data("kendoGrid").dataSource;
        var array = data;

        if (data.length > 0) {
            for (var i = 0; i < array.length; i++) {
                ds.add(array[i]);
            }

            if (array[0].CarroCerrado && MedioTransporteID != 0) {
                $("#chkCerrarEscritorio")[0].checked = true;
            }

            ImprimirAreaToneladaBackLog();
        }

        loadingStop();
    });
}

function AjaxObtenerDetalleCarroCargado(MedioTransporteID) {
    loadingStart();

    $CargaCarro.CargaCarro.read({ medioTransporteCargaID: 0, medioTransporteID: MedioTransporteID, proyectoID: $("#inputProyecto").data("kendoComboBox").value(), token: Cookies.get("token"), lenguaje: $("#language").val(), todos: 1 }).done(function (data) {
        $("#grid[name='grid-Patio']").data('kendoGrid').dataSource.data([]);
        $("#labelM2P").text("");
        $("#labelToneladasP").text("");

        var ds = $("#grid[name='grid-Patio']").data("kendoGrid").dataSource;

        var carDataSourceSelected = $("#inputCarroPatio").data("kendoComboBox").dataItem($("#inputCarroPatio").data("kendoComboBox").select())
        var array = data;

        if (array.length > 0) {

            for (var i = 0; i < array.length; i++) {
                if (!validarInformacion(array[i])) {
                    ds.add(array[i]);
                }
            }

            if (array[0].CarroCerrado) {
                $("#chkCerrarPatio")[0].checked = true;
            } else {
                $("#chkCerrarPatio")[0].checked = false;
            }

            ImprimirAreaTonelada();
        }


        loadingStop();
    });
}

function AjaxCargarCuadrante(patioID) {
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), PatioID: patioID }).done(function (data) {
        $("#inputCuadrantePopup").data("kendoComboBox").dataSource.data([]);
        $("#inputCuadrantePopup").data("kendoComboBox").dataSource.data(data);

    });
}

function ajaxGuardar(arregloCaptura, guardarYNuevo) {
    try {
        var mediosDeTransporteEnElGrid = $("#grid[name='grid-Patio']").data("kendoGrid").dataSource._data;
        var carroCerrado = $("#inputCarroPatio").attr("mediotransportecerrado");
        var proyectoID = $("#inputProyecto").data("kendoComboBox").value() != undefined ? $("#inputProyecto").data("kendoComboBox").value() : "";
        var medioTransporteID = $("#inputCarroPatio").data("kendoComboBox").value() != undefined ? $("#inputCarroPatio").data("kendoComboBox").value() : "";
        var medioTransporteCargaID = $("#inputCarroPatio").attr("mediotransporteid");

        if (proyectoID != "" && proyectoID != "0") {
            if (medioTransporteID != "" && medioTransporteID != "0" && medioTransporteID != "-1") {
                if (mediosDeTransporteEnElGrid.length > 0) {
                    loadingStart();
                    Captura = [];
                    Captura[0] = { Detalles: "" };
                    ListaGuardarDetalles = [];

                    for (index = 0; index < arregloCaptura.length; index++) {
                        ListaGuardarDetalles[index] = { SpoolID: "", MedioTransporteCargaID: 0, Accion: "", CuadranteID: 0 };
                        ListaGuardarDetalles[index].Accion = arregloCaptura[index].Accion;
                        ListaGuardarDetalles[index].SpoolID = arregloCaptura[index].SpoolID;
                        ListaGuardarDetalles[index].CuadranteID = arregloCaptura[index].CuadranteID;
                        ListaGuardarDetalles[index].MedioTransporteCargaID = arregloCaptura[index].MedioTransporteCargaID;
                    }

                    Captura[0].Detalles = ListaGuardarDetalles;

                    var disponible = 1;
                    if ($('#chkCerrarPatio').is(':checked') && carroCerrado == "false") {
                        disponible = 0;
                    }
                    $CargaCarro.CargaCarro.create(Captura[0], {
                        token: Cookies.get("token"), lenguaje: $("#language").val(), medioTransporteID: medioTransporteID,
                        medioTransporteCargaID: medioTransporteCargaID, cerrar: disponible
                    }).done(function (data) {

                        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                            if (!guardarYNuevo) {
                                opcionHabilitarView(true, "FieldSetView");
                                AjaxObtenerDetalleCarroCargado(medioTransporteID);
                                if (disponible = 0) {
                                    displayNotify("PinturaCerrarCarro", "", '0');
                                } else {
                                    displayNotify("PinturaCargaGuardar", "", '0');
                                }

                            } else {
                                Limpiar();
                                displayNotify("PinturaCargaGuardar", "", '0');
                            }

                        } else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                            displayNotify("PinturaGuardarErrorGuardar", "", '2');
                        }
                        loadingStop();
                    });
                }

            }
        }
    } catch (e) {
        loadingStop();
        displayNotify("", _dictionary.Mensajes_error[$("#language").data("kendoDropDownList").value()] + e.message, '2');

    }
}

function AjaxSubirSpool(listaSpool, guardarYNuevo) {
    var count = 0;
    var contSave = 0;
    var proyectoID = $("#inputProyecto").data("kendoComboBox").value() != undefined ? $("#inputProyecto").data("kendoComboBox").value() : "";
    var medioTransporteID = $("#inputCarroEscritorio").data("kendoComboBox").value() != undefined ? $("#inputCarroEscritorio").data("kendoComboBox").value() : "";
    var medioTransporteCargaID = $('#inputCarroEscritorio').attr("mediotransporteid");
    var carroCerrado = $("#inputCarroEscritorio").attr("mediotransportecerrado");

    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    ListaGuardarDetalles = [];
    if (proyectoID != "" && proyectoID != "0") {
        if (medioTransporteID != "" && medioTransporteID != "0" && medioTransporteID != "-1") {
            if (listaSpool.length > 0) {
                for (var index = 0 ; index < listaSpool.length; index++) {
                    if (listaSpool[index].Seleccionado) {
                        ListaGuardarDetalles[contSave] = { SpoolID: "", MedioTransporteCargaID: 0, Accion: "", CuadranteID: 0 };
                        ListaGuardarDetalles[contSave].Accion = listaSpool[index].Accion;
                        ListaGuardarDetalles[contSave].SpoolID = listaSpool[index].SpoolID;
                        ListaGuardarDetalles[contSave].CuadranteID = listaSpool[index].CuadranteID;
                        ListaGuardarDetalles[contSave].MedioTransporteCargaID = listaSpool[index].MedioTransporteCargaID;
                        contSave++;
                    }

                    if (listaSpool[index].Seleccionado && listaSpool[index].Accion != 3) {
                        ListaDetalles[count] = { Spool: "", SistemaPintura: "", Seleccionado: "" };
                        ListaDetalles[count].Spool = listaSpool[index].SpoolID;
                        ListaDetalles[count].SistemaPintura = listaSpool[index].SistemaPintura;
                        ListaDetalles[count].Seleccionado = listaSpool[index].Seleccionado;
                        count++;
                    }
                }

                var disponible = 1;
                if ($('#chkCerrarEscritorio').is(':checked') && carroCerrado == "false") {
                    disponible = 0;
                }

                if (ListaDetalles.length > 0) {
                    if (ListaGuardarDetalles.length != 0) {
                        if (ServicioPinturaCorrecto(ListaDetalles)) {

                            Captura[0].Detalles = ListaGuardarDetalles;

                            loadingStart();
                            $CargaCarro.CargaCarro.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val(), medioTransporteID: medioTransporteID, medioTransporteCargaID: medioTransporteCargaID, cerrar: disponible }).done(function (data) {

                                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {

                                    if (!guardarYNuevo) {
                                        opcionHabilitarViewBacklog(true, "FieldSetView");
                                        AjaxCargarSpoolBacklog(true, medioTransporteID);

                                        if (disponible == 0) {
                                            displayNotify("PinturaCerrarCarro", "", '0');
                                        } else {
                                            displayNotify("PinturaCargaGuardar", "", '0');
                                        }

                                    } else {
                                        Limpiar();
                                        displayNotify("PinturaCargaGuardar", "", '0');
                                    }

                                }
                                else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                                    displayNotify("PinturaGuardarErrorGuardar", "", '2');
                                }
                                loadingStop();
                            });
                        }
                        else {
                            displayNotify("", _dictionary.PinturaCargaBackLogMensajeErrorServicioPintura[$("#language").data("kendoDropDownList").value()] + ListaDetalles[0].SistemaPintura, "1");
                        }
                    }
                } else {
                    displayNotify("PinturaCargaBackLogMensajeSeleccionaSpool", "", "1");
                }
            }
        }
    }
}

function AjaxAgregarCarga() {


    if ($("#inputProyecto").data("kendoComboBox").value() != "-1" && $("#inputProyecto").data("kendoComboBox").value() != "" &&
            $("#inputProyecto").data("kendoComboBox").value() != "0") {
        if ($("#inputCarroPatio").data("kendoComboBox").value() != "-1" && $("#inputCarroPatio").data("kendoComboBox").value() != "" &&
            $("#inputCarroPatio").data("kendoComboBox").value() != "0") {

            if ((ObtenerTipoConsulta() == 1 && $("#InputID").data("kendoComboBox").value() != "") || (ObtenerTipoConsulta() == 2 && $("#inputCodigo").val() != "")) {
                loadingStart();
                var proyectoID = parseInt($("#inputProyecto").data("kendoComboBox").value());
                Captura = [];
                Captura[0] = { Detalles: "" };
                ListaDetalles = [];

                var index = 0;


                ListaDetalles[index] = { TipoConsulta: "", OrdenTrabajoSpoolID: "", Codigo: "" };
                ListaDetalles[index].TipoConsulta = ObtenerTipoConsulta();

                switch (ListaDetalles[index].TipoConsulta) {
                    case 1:
                        ListaDetalles[index].OrdenTrabajoSpoolID = $("#InputID").val();
                        ListaDetalles[index].Codigo = 0;
                        break;
                    case 2:
                        ListaDetalles[index].OrdenTrabajoSpoolID = 0;
                        ListaDetalles[index].Codigo = $("#inputCodigo").val();
                        break;
                    case -1:
                        ListaDetalles[index].OrdenTrabajoSpoolID = 0;
                        ListaDetalles[index].Codigo = 0;
                        break;

                }

                $CargaCarro.CargaCarro.read({ token: Cookies.get("token"), TipoConsulta: ListaDetalles[index].TipoConsulta, OrdenTrabajoSpoolID: ListaDetalles[index].OrdenTrabajoSpoolID, Codigo: ListaDetalles[index].Codigo, lenguaje: $("#language").val(), medioTransporteID: $("#inputCarroPatio").val() }).done(function (data) {

                    var ds = $("#grid").data("kendoGrid").dataSource;
                    var carDataSourceSelected = $("#inputCarroPatio").data("kendoComboBox").dataItem($("#inputCarroPatio").data("kendoComboBox").select())
                    var array = data;

                    if (array.length > 0) {

                        for (var i = 0; i < array.length; i++) {
                            if (!validarInformacion(array[i])) {
                                if (array[i].SpoolID != 0) {
                                    if (ds._data.length == 0) {
                                        if (array[i].NombreMedioTransporte == "") {

                                            if (array[i].ProyectoID == proyectoID) {
                                                ds.insert(0, array[i]);
                                                displayNotify("", _dictionary.PinturaAgregaCargaExito[$("#language").data("kendoDropDownList").value()] + array[i].SpoolJunta, '0');
                                            } else {
                                                displayNotify("PinturaCargaCarroSpoolProyectoEquivocado", "", '1');
                                            }
                                        } else {
                                            displayNotify("", _dictionary.PinturaCargaSpoolCargadoEnCarro[$("#language").data("kendoDropDownList").value()] + array[i].NombreMedioTransporte, "1");
                                        }

                                    }
                                    else {
                                        if (array[i].NombreMedioTransporte == "") {
                                            if (array[i].ProyectoID == proyectoID) {
                                                if (array[i].SistemaPintura == ds._data[ds._data.length - 1].SistemaPintura) {
                                                    ds.insert(0, array[i]);
                                                    displayNotify("", _dictionary.PinturaAgregaCargaExito[$("#language").data("kendoDropDownList").value()] + array[i].SpoolJunta, '0');
                                                } else {
                                                    displayNotify("", _dictionary.PinturaCargaBackLogMensajeErrorServicioPintura[$("#language").data("kendoDropDownList").value()] + ds._data[0].SistemaPintura, "1");
                                                }
                                            } else {
                                                displayNotify("PinturaCargaCarroSpoolProyectoDiferente", "", '1');
                                            }
                                        }
                                        else {
                                            displayNotify("", _dictionary.PinturaCargaSpoolCargadoEnCarro[$("#language").data("kendoDropDownList").value()] + array[i].NombreMedioTransporte, "1");

                                        }
                                    }
                                } else {

                                }

                            } else {
                                displayNotify("", _dictionary.PinturaCargaSpoolCargadoEnCarro[$("#language").data("kendoDropDownList").value()] + array[i].NombreMedioTransporte, "1");
                            }

                        }

                        ImprimirAreaTonelada();
                    } else
                        displayNotify("PinturaCargaSpoolNoEncontrado", "", '2');


                    loadingStop();
                });
            }
            else {
                if (ObtenerTipoConsulta() == 1) {
                    displayNotify("PinturaCargaSeleccionaSpool", "", '2');
                }
                else {
                    displayNotify("PinturaCargaSeleccionaCodigo", "", '2');
                }
            }
        }
        else {
            displayNotify("PinturaSeleccionarCarro", "", '2');
        }
    } else {
        displayNotify("PinturaSeleccionarProyecto", "", '2');
    }
}

function ServicioPinturaCorrecto(ListaDetalles) {
    var sistema;
    for (var i = 0 ; i < ListaDetalles.length ; i++) {
        if (i == 0) {
            sistema = ListaDetalles[0].SistemaPintura;
        }
        if (sistema != ListaDetalles[i].SistemaPintura) {
            return false;
        }
    }
    return true;
}