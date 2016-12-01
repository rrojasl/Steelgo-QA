function AjaxCargarCamposPredeterminados() {
    loadingStart();
    var TipoMuestraPredeterminadoID = 46;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "Escritorio") {
            $("#styleEscritorio").addClass("active");
            $("#stylePatio").removeClass("active");

            $('input:radio[name=TipoVista]:nth(0)').attr('checked', true);
            $('input:radio[name=TipoVista]:nth(1)').attr('checked', false);

            $("#contenedorPrincipalEscritorio").show();
            $("#contenedorSecundarioEscritorio").show();
            $("#contenedorPrincipalPatio").hide();
            $("#contenedorSecundarioPatio").hide();
        }
        else if (data == "Patio") {
            $("#styleEscritorio").removeClass("active");
            $("#stylePatio").addClass("active");

            $('input:radio[name=TipoVista]:nth(0)').attr('checked', false);
            $('input:radio[name=TipoVista]:nth(1)').attr('checked', true);

            $("#contenedorPrincipalEscritorio").hide();
            $("#contenedorSecundarioEscritorio").hide();
            $("#contenedorPrincipalPatio").show();
            $("#contenedorSecundarioPatio").show();
        }
    });

    AjaxCargaMostrarPredeterminado();
    loadingStop();
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

    });
}

function AjaxCargarProyecto() {
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

function AjaxCargarMedioTransporte(ProyectoID, nuevoCarro) {
    $PinturaGeneral.PinturaGeneral.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), proyectoID: ProyectoID }).done(function (data) {
        var medioTranporteId = 0;
        if (data.length > 0) {

            if (data.length < 3) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].MedioTransporteID != 0) {
                        medioTranporteId = data[i].MedioTransporteID;
                    }
                }
            } else {
                if (nuevoCarro != null) {
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].Nombre == nuevoCarro) {
                            medioTranporteId = data[i].MedioTransporteID;
                        }
                    }
                }
            }
            data.splice(1, 0, {
                MedioTransporteID: -1,
                Nombre: _dictionary.PinturaCargaAgregarNuevoCarro[$("#language").data("kendoDropDownList").value()],
                MedioTransporteCargaID: 0,
                CarroCerrado: false
            });

            if ($("#styleEscritorio").hasClass("active")) {

                $("#inputCarroEscritorio").data("kendoComboBox").dataSource.data(data);

                $("#inputCarroEscritorio").data("kendoComboBox").value(medioTranporteId);
                $("#inputCarroEscritorio").data("kendoComboBox").trigger("change");
            } else {

                $("#inputCarroPatio").data("kendoComboBox").dataSource.data(data);

                $("#inputCarroPatio").data("kendoComboBox").value(medioTranporteId);
                $("#inputCarroPatio").data("kendoComboBox").trigger("change");
            }

        }

    });
}

function AjaxCargarZona(patioID) {
    loadingStart();
    $Zona.Zona.read({ token: Cookies.get("token"), PatioID: patioID }).done(function (data) {
        var ZonaId = 0;
        if (data.length > 0) {
            $("#inputZonaPopup").data("kendoComboBox").dataSource.data(data);

            if (data.length < 3) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].ZonaID != 0) {
                        ZonaId = data[i].ZonaID;
                    }
                }
            }
            $("#inputZonaPopup").data("kendoComboBox").value(ZonaId);
            $("#inputZonaPopup").data("kendoComboBox").trigger("change");
        }

        loadingStop();
    });
}

function AjaxCargarCuadrante(zonaID) {
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), ZonaID: zonaID }).done(function (data) {
        var CuadranteId = 0;

        if (data.length > 0) {
            $("#inputCuadrantePopup").data("kendoComboBox").dataSource.data(data);

            if (data.length < 3) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].CuadranteID != 0) {
                        CuadranteId = data[i].CuadranteID;
                    }
                }
            }

            $("#inputCuadrantePopup").data("kendoComboBox").value(CuadranteId);
            $("#inputCuadrantePopup").data("kendoComboBox").trigger("change");
        }
    });
}
function AjaxGuardarNuevoCarro() {
    try {
        loadingStart();
        var Proyecto = $("#inputProyecto").data("kendoComboBox").dataItem($("#inputProyecto").data("kendoComboBox").select());

        var Captura = { Nombre: $("#InputNombre").val(), UsuarioID: 0, PatioID: Proyecto.PatioID };

        if ($("#InputNombre").val() != "" && $("#InputNombre").val() != null) {
            $PinturaGeneral.PinturaGeneral.create(Captura, { token: Cookies.get("token") }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                    windowNewCarriage.close();
                    setTimeout(function () { AjaxCargarMedioTransporte(Proyecto.ProyectoID, $("#InputNombre").val()); }, 1100);
                    displayNotify("PinturaGuardarNuevoCarro", "", '0');
                }
                else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                    displayNotify("PinturaErrorGuardarNuevoCarro", "", '2');
                }

                loadingStop();
            });
        }
        else {
            displayNotify("PinturaGuardarNuevoCarroNombre", "", '2');
            loadingStop();
        }
    } catch (e) {
        loadingStop();
        displayNotify("Mensajes_error", e.message, '0');

    }
}

function AjaxObtenerDetalleCargaCarro(MedioTransporteID) {
    loadingStart();
    $CargaCarro.CargaCarro.read({ medioTransporteID: MedioTransporteID, proyectoID: $("#inputProyecto").data("kendoComboBox").value(), token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        var ds = $("#grid[name='grid-Patio']").data("kendoGrid").dataSource;
        var array = data;

        if (array.length > 0) {

            for (var i = 0; i < array.length; i++) {
                if (!validarInformacion(array[i])) {
                    ds.add(array[i]);
                }
            }
            ImprimirAreaTonelada();
        }
        //opcionHabilitarView(true, null);
        loadingStop();
    });
}

function AjaxObtenerDetalleCargaCarroBacklog(MedioTransporte) {
    loadingStart();
    $CargaCarro.CargaCarro.read({ medioTransporteCargaID: MedioTransporte.MedioTransporteCargaID, medioTransporteID: MedioTransporte.MedioTransporteID, token: Cookies.get("token"), proyectoID: $("#inputProyecto").data("kendoComboBox").value(), lenguaje: $("#language").val() }).done(function (data) {
        var ds = $("#grid[name='grid-Escritorio']").data("kendoGrid").dataSource;
        var array = data;

        if (data.length > 0) {
            for (var i = 0; i < array.length; i++) {
                ds.add(array[i]);
            }

            ImprimirAreaToneladaBackLog();
        }

        loadingStop();
    });
}

function ajaxGuardar(data) {


    loadingStart();
    displayNotify("", "se guardo correctamente la informacion", '0');
    opcionHabilitarView(true, "FieldSetView");

    var grid = $("#grid[name='grid-Escritorio']").data("kendoGrid");

    for (var i = 0; i < grid.dataSource._data.length; i++) {
        if (grid.dataSource._data[i].Seleccionado)
            grid.dataSource._data[i].MedioTransporte = $("#inputCarroEscritorio").data("kendoComboBox").dataItem($("#inputCarroEscritorio").data("kendoComboBox").select()).Nombre;
    }

    $("#grid").data('kendoGrid').dataSource.sync();
    loadingStop();



};

function AjaxObtenerSpoolID() {

    var OrdenTrabajoOrigianl = $("#InputOrdenTrabajo").val();
    $Armado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        dataSpoolArray = data;
        if (Error(data)) {
            if (data.OrdenTrabajo != "") {
                $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
            }
            else {
                $("#InputOrdenTrabajo").val(OrdenTrabajoOrigianl);
                displayNotify("CapturaArmadoMensajeOrdenTrabajoNoEncontrada", "", '1');
            }

            $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
            Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
            $("#InputID").data("kendoComboBox").enable(true);
            $("#InputID").data("kendoComboBox").input.focus();
        }
    });
}

function AjaxAgregarSpool() {
    var array = [
            {
                "Accion": 1,
                "MedioTransporteCargaDetalleID": 0,
                "OrdenTrabajoID": 958,
                "SpoolID": 41701,
                "Prioridad": 1,
                "NumeroControl": "X002-004",
                "SistemaPinturaID": 0,
                "SistemaPintura": "A5",
                "ColorPintura": "Azul",
                "CuadranteID": 41,
                "CuadranteAnteriorID": 0,
                "Cuadrante": "Comdistral",
                "Area": 0.63,
                "Peso": 129.70,
                "MedioTransporte": null,
                "CarroCerrado": false,
                "Seleccionado": false,
                "EstatusCaptura": 0
            }
    ];
    
    $("#grid[name='grid-Patio']").data('kendoGrid').dataSource.data(array);
    ImprimirAreaTonelada();
}
