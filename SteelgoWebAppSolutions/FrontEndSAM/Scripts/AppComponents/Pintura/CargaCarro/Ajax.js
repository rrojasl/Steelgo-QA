function AjaxGuardarNuevoCarro() {

    try {
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];
         
        var index = 0;

        ListaDetalles[index] = { Nombre: "", ClasificacionID: "", PersistenciaID: "", NumeroVecesUsoMaximo: "", PesoMaximo: "", Area: "", ClasificacionMedioTransporteID: "" };
        ListaDetalles[index].Nombre = $("#inputMedioTransporte").val();
        ListaDetalles[index].ClasificacionMedioTransporteID = 1;
        ListaDetalles[index].ClasificacionID = $("#inputClasificacion").val();
        ListaDetalles[index].PersistenciaID = $("#inputPersistencia").val();
        ListaDetalles[index].NumeroVecesUsoMaximo = $("#inputNumeroVeces").val();
        ListaDetalles[index].PesoMaximo = $("#inputPesoMaximo").val();
        ListaDetalles[index].Area = $("#inputArea").val();


        if (!ValidarDatosNuevoCarro(ListaDetalles[index])) {
            Captura[0].Detalles = ListaDetalles;
            $MedioTransporte.MedioTransporte.create(Captura[0], { token: Cookies.get("token") }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                    displayMessage("PinturaGuardarNuevoCarro", "", '1');
                }
                else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                    displayMessage("PinturaErrorGuardarNuevoCarro", "", '2');
                }
                windowNewCarriage.close();
                setTimeout(function () { AjaxPinturaCargaMedioTransporte(); }, 1100);
                loadingStop();
            });
        }
        else {
            loadingStop();
        }
    } catch (e) {
        loadingStop();
        displayMessage("Mensajes_error", e.message, '0');

    }
}

function AjaxPinturaCargaMedioTransporte() {
    loadingStart();

    $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        $("#inputCarro").data("kendoComboBox").value("");
        $("#inputCarroBacklog").data("kendoComboBox").value("");
        if (data.length > 0) {
            data.unshift({ MedioTransporteID: -1, NombreMedioTransporte: _dictionary.PinturaCargaAgregarNuevoCarro[$("#language").data("kendoDropDownList").value()] });
             
            $("#inputCarro").data("kendoComboBox").dataSource.data(data);
            $("#inputCarroBacklog").data("kendoComboBox").dataSource.data(data);
        } 
        loadingStop();
    });
}

function AjaxObtenerCatalogoClasificacion() {
    $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token"), idCatalogo: 0 }).done(function (data) {
        if (data.length > 0) {
            $("#inputClasificacion").data("kendoComboBox").value("");
            $("#inputClasificacion").data("kendoComboBox").dataSource.data(data);
        } else {
            $("#inputClasificacion").data("kendoComboBox").value("");
        };

        loadingStop();
    });
}

function AjaxObtenerCatalogoPersistencia() {
    $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token"), idCatalogo: 1 }).done(function (data) {

        //Agregar todos los tipos de persistencia
        if (data.length > 0) {
            $("#inputPersistencia").data("kendoComboBox").value("");
            $("#inputPersistencia").data("kendoComboBox").dataSource.data(data);
        } else {
            $("#inputPersistencia").data("kendoComboBox").value("");
        };

        //Agregar exclusivamente la persistencia de cantidad


        loadingStop();
    });
}

function AjaxCargarCamposPredeterminados() {
    loadingStart();
    $MedioTransporte.MedioTransporte.read({ predeterminado: "", token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (data.Vista == "Escritorio") {
            $('input:radio[name=TipoVista]:nth(0)').attr('checked', true);
            $('input:radio[name=TipoVista]:nth(1)').attr('checked', false);
            $("#styleEscritorio").addClass("active");
            $("#stylePatio").removeClass("active");
            $("#contenedorPrincipalCargaCarro").show();
            $("#contenedorPrincipalCargaCarroBacklog").hide();
        }
        else if (data.Vista == "Patio") {
            $('input:radio[name=TipoVista]:nth(0)').attr('checked', false);
            $('input:radio[name=TipoVista]:nth(1)').attr('checked', true);
            $("#styleEscritorio").addClass("active");
            $("#stylePatio").removeClass("active");
            $("#contenedorPrincipalCargaCarro").hide();
            $("#contenedorPrincipalCargaCarroBacklog").show();
        }

        if (data.Opcion == "Spool") {
            $('input:radio[name=PinturaCargaTipoSeleccion]:nth(0)').attr('checked', true).trigger("change");
        }
        else if (data.Opcion == "Codigo") {
            $('input:radio[name=EmbarqueCargaTipoSeleccion]:nth(1)').attr('checked', true).trigger("change");
        }
        loadingStop();
    });

}

function AjaxObtenerSpoolID() {
    $CapturaArmado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
        $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
        Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
    });
}

function AjaxCerrarCarro() {

    loadingStart();
    var haySpoolsEnElMedioDeTransporte = $("#grid").data("kendoGrid").dataSource._data;

    var ListaDetalles = [];

    ListaDetalles[0] = { MedioTransporteID: $('#inputCarro').attr("mediotransporteid"), CerrarCarro: 0 };

    if (haySpoolsEnElMedioDeTransporte.length > 0) {
        if ($("#inputCarro").val() != "-1") {
            $MedioTransporte.MedioTransporte.update(ListaDetalles[0], { token: Cookies.get("token") }).done(function (data) {

                displayMessage("PinturaCerrarCarro", "", '1');

                Limpiar();
                loadingStop();
            });
        }
        else {
            loadingStop();
            displayMessage("ErrorGuardarAntesElCarro", "", '2');
        }
    }
    else {
        loadingStop();
        displayMessage("PinturaCargaNoHaySpoolsEnElCarro", "", '2');
    }
}

function AjaxAgregarCarga() {
    if ($("#inputCarro").data("kendoComboBox").value() != "-1" && $("#inputCarro").data("kendoComboBox").value() != "") {
        if (ObtenerTipoConsulta() == 1 && $("#InputID").val() > -1 || ObtenerTipoConsulta() == 2 && $("#inputCodigo").val() != "") {
            loadingStart();

            Captura = [];
            Captura[0] = { Detalles: "" };
            ListaDetalles = [];

            var index = 0;

            ListaDetalles[index] = { TipoConsulta: "", OrdenTrabajoSpoolID: "", Codigo: "" };
            ListaDetalles[index].TipoConsulta = ObtenerTipoConsulta();
            switch (ListaDetalles[index].TipoConsulta) {
                case 1: //spool
                    ListaDetalles[index].OrdenTrabajoSpoolID = $("#InputID").val();
                    ListaDetalles[index].Codigo = 0;
                    break;//paquete
                case 2://codigo
                    ListaDetalles[index].OrdenTrabajoSpoolID = 0;
                    ListaDetalles[index].Codigo = $("#inputCodigo").val();
                    break;
                case -1:
                    ListaDetalles[index].OrdenTrabajoSpoolID = 0;
                    ListaDetalles[index].Codigo = 0;
                    break;

            }

            $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token"), TipoConsulta: ListaDetalles[index].TipoConsulta, OrdenTrabajoSpoolID: ListaDetalles[index].OrdenTrabajoSpoolID, Codigo: ListaDetalles[index].Codigo, lenguaje: $("#language").val(), medioTransporteID: $("#inputCarro").val() }).done(function (data) {

                var ds = $("#grid").data("kendoGrid").dataSource;
                //var carDataSourceSelected = $("#inputCarro").data("kendoDropDownList").dataItem($("#inputCarro").data("kendoDropDownList").select())
                var carDataSourceSelected = $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select())
                var array = data;

                if (array.length > 0) {

                    for (var i = 0; i < array.length; i++) {
                        if (!validarInformacion(array[i])) {
                            if ((carDataSourceSelected.AreaPermitidoMedioTransporte) > (SumarArea() + array[i].Area))
                                if ((carDataSourceSelected.PesoMaximoPermitido) > (SumarTonelada() + array[i].Peso))
                                    ds.add(array[i]);
                                else {
                                    displayMessage("PinturaCargaSpoolToneladaSuperiorPermididoCarro", "", '2');
                                }
                            else {
                                displayMessage("PinturaCargaSpoolAreaSuperiorPermididoCarro", "", '2');
                            }

                        }
                    }

                    ImprimirAreaTonelada();
                } else
                    displayMessage("PinturaCargaSpoolNoEncontrado", "", '2');


                loadingStop();
            });
        }
        else {
            if (ObtenerTipoConsulta() == 1) {
                displayMessage("PinturaCargaSeleccionaSpool", "", '2');
            }
            else {
                displayMessage("PinturaCargaSeleccionaCodigo", "", '2');
            }
        }
    }
    else {
        displayMessage("PinturaSeleccionarCarro", "", '2');
    }
}

function ImprimirAreaTonelada() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var array = ds._data;
    var totalAreaCargada = 0;
    var totalToneladasCargadas = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i]["Accion"] == 1 || array[i]["Accion"] == 2) {
            totalAreaCargada += parseFloat(array[i]["Area"], 10);
            totalToneladasCargadas += parseFloat(array[i]["Peso"], 10);
        }
    }
 
    $("#labelM2").text(totalAreaCargada.toFixed(2));
    $("#labelToneladas").text(totalToneladasCargadas.toFixed(4));
    return totalAreaCargada;
}

function SumarArea() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var array = ds._data;
    var totalAreaCargada = 0;
    for (var i = 0; i < array.length; i++) {
        totalAreaCargada += parseFloat(array[i]["Area"]);
    }

    return totalAreaCargada;
}

function SumarAreaBacklog() {
    var grid = $("#grid[nombre='grid-backlog']").data("kendoGrid");

    var sel = $("input:checked", grid.tbody).closest("tr");

    var detalle = [];
    $.each(sel, function (idx, spool) {
        var item = grid.dataItem(spool);
        detalle.push(item);
    });

    var totalAreaCargada = 0;
    for (var i = 0; i < detalle.length; i++) {
        totalAreaCargada += parseFloat(detalle[i]["Metros2"]);
    }

    return totalAreaCargada;
}

function SumarToneladaBacklog() {
    var grid = $("#grid[nombre='grid-backlog']").data("kendoGrid");

    var sel = $("input:checked", grid.tbody).closest("tr");

    var detalle = [];
    $.each(sel, function (idx, spool) {
        var item = grid.dataItem(spool);
        detalle.push(item);
    });

    var totalToneladasCargadas = 0;
    for (var i = 0; i < detalle.length; i++) {
        totalToneladasCargadas += parseFloat(detalle[i]["Peso"]);

    }

    return totalToneladasCargadas;
}

function AjaxObtenerDetalleCarroCargado(MedioTransporteID) {
    loadingStart();

    $MedioTransporte.MedioTransporte.read({ idMedioTransporteCarga: MedioTransporteID, token: Cookies.get("token"), lenguaje: $("#language").val(), statusCarga: 0 }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        $("#labelM2").text('');
        $("#labelToneladas").text('');
        var ds = $("#grid").data("kendoGrid").dataSource;
         
        var carDataSourceSelected = $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select())
        var array = data;

        if (array.length > 0) {

            for (var i = 0; i < array.length; i++) {
                if (!validarInformacion(array[i])) {
                    if (carDataSourceSelected.AreaPermitidoMedioTransporte > (SumarArea() + array[i].Area))
                        if (carDataSourceSelected.PesoMaximoPermitido > (SumarTonelada() + array[i].Peso)) {
                            ds.add(array[i]);
                        }
                        else {
                            displayMessage("PinturaCargaSpoolToneladaSuperiorPermididoCarro", "", '2');
                        }
                    else {
                        displayMessage("PinturaCargaSpoolAreaSuperiorPermididoCarro", "", '2');
                    }

                }
            }

            ImprimirAreaTonelada();
        }


        loadingStop();
    });
}

function SumarTonelada() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    var array = ds._data;
    var totalToneladasCargadas = 0;
    for (var i = 0; i < array.length; i++) {
        totalToneladasCargadas += parseFloat(array[i]["Peso"]);

    }

    return totalToneladasCargadas;
}

function ajaxGuardar(arregloCaptura, guardarYNuevo) {
    try {
        var guardadoExitoso = false;
        var mediosDeTransporteEnElGrid = $("#grid").data("kendoGrid").dataSource._data;
        if (mediosDeTransporteEnElGrid.length > 0) {
            loadingStart();
            Captura = [];
            Captura[0] = { Detalles: "" };
            ListaDetalles = [];



            for (index = 0; index < arregloCaptura.length; index++) {
                ListaDetalles[index] = { SpoolID: "", MedioTransporteCargaID: $("#inputCarro").val(), Accion: "" };
                ListaDetalles[index].Accion = arregloCaptura[index].Accion;
                ListaDetalles[index].SpoolID = arregloCaptura[index].SpoolID;
            }
             
            Captura[0].Detalles = ListaDetalles;

            $MedioTransporte.MedioTransporte.create(Captura[0], {
                token: Cookies.get("token"),
                lenguaje: $("#language").val(),
                medioTransporteID: $('#inputCarro').attr("mediotransporteid"),
                cerrar: 1
            }).done(function (data) { 
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                    displayMessage("PinturaGuardarGuardar", "", '1');
                }
                else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                    displayMessage("PinturaGuardarErrorGuardar", "", '2');
                }

                $("#grid").data("kendoGrid").dataSource.sync();

                if(!guardarYNuevo) opcionHabilitarView(true, "FieldSetView");
                loadingStop();
            });
        }
        else {
            loadingStop();
            displayMessage("PinturaCargaNoHaySpoolsEnElCarro", "", '2');

        }
    } catch (e) {
        loadingStop();
        displayMessage("Mensajes_error", e.message, '0');

    }
};

function AjaxSubirSpool(listaSpool, guardarYNuevo) {
    var contSave = 0;
    var medioTransporteID;
    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    ListaGuardarDetalles = [];

    if ($('#inputCarroBacklog').attr("mediotransporteid") != undefined) {
        for (var index = 0 ; index < listaSpool.length; index++) {
            if (listaSpool[index].Seleccionado && !listaSpool[index].Status) {
                ListaDetalles[contSave] = {
                    Spool: "",
                    SistemaPintura: "",
                    Peso: "",
                    Area: ""
                };

                ListaGuardarDetalles[contSave] = {
                    Accion: listaSpool[index].Accion,
                    SpoolID: "",
                    MedioTransporteCargaID: $('#inputCarroBacklog').val()
                };

                ListaDetalles[contSave].Spool = listaSpool[index].SpoolID;
                ListaDetalles[contSave].SistemaPintura = listaSpool[index].SistemaPintura;
                ListaDetalles[contSave].Area = listaSpool[index].Metros2;
                ListaDetalles[contSave].Peso = listaSpool[index].Peso;

                ListaGuardarDetalles[contSave].SpoolID = listaSpool[index].SpoolID;
                contSave++;
            }
        }
        var disponible = 1;
        if ($('#chkCerrar').is(':checked')) {
            disponible = 0;
        }
        if (ListaDetalles.length != 0) {
            if (ServicioPinturaCorrecto(ListaDetalles)) {
                if (AreaYPesoPermitido(ListaDetalles)) {
                    MedioTransporteID = $("#inputCarroBacklog").data("kendoComboBox").value();
                    Captura[0].Detalles = ListaGuardarDetalles;

                    loadingStart();
                    $MedioTransporte.MedioTransporte.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val(), medioTransporteID: $('#inputCarro').attr("mediotransporteid"), cerrar: disponible }).done(function (data) {

                        displayMessage("PinturaCargaBackLogMensajeGuardadoExitoso", "", "0");

                        if (disponible == 0) {
                            AjaxPinturaCargaMedioTransporte();
                            AjaxCargarSpoolBacklog(true, 0);

                        }
                        else {
                            var guardar = false;
                            if (!guardarYNuevo) {
                                guardar = true;
                            }
                            AjaxCargarSpoolBacklog(true, 0);

                        }

                        loadingStop();
                    });
                }
            }
            else {
                displayMessage("PinturaCargaBackLogMensajeErrorServicioPintura", "", "1");
            }
        }
        else {
            displayMessage("PinturaCargaBackLogMensajeSeleccionaSpool", "", "1");
        }

    }
}

function AjaxCargarSpoolBacklog(cargarSpoolsDespuesDeCargar, MedioTransporteCargaID) {
    loadingStart();
    
    if (MedioTransporteCargaID == 0 && $('#inputCarro').val() != "") MedioTransporteCargaID = $('#inputCarro').val();

    $CargaCarroBackLog.CargaCarroBackLog.read({ medioTransporteID: MedioTransporteCargaID, token: Cookies.get("token") }).done(function (data) {
        $("#grid[nombre='grid-backlog']").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid[nombre='grid-backlog']").data("kendoGrid").dataSource;
        var array = data;

        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }

        if (cargarSpoolsDespuesDeCargar) {
            opcionHabilitarViewBacklog(true, "FieldSetView");
        }


        loadingStop();
    });
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

function AreaYPesoPermitido(ListaDetalles) {
    var carDataSourceSelected = $("#inputCarroBacklog").data("kendoComboBox").dataItem($("#inputCarroBacklog").data("kendoComboBox").select());

    for (var i = 0; i < ListaDetalles.length; i++) {
        if ((carDataSourceSelected.AreaPermitidoMedioTransporte - carDataSourceSelected.AreaMaximoOcupado) > (SumarAreaBacklog())) {
            if ((carDataSourceSelected.PesoMaximoPermitido - carDataSourceSelected.PesoMaximoOcupado) > (SumarToneladaBacklog())) {
                return true;
            }
            else {
                displayMessage("PinturaCargaSpoolToneladaSuperiorPermididoCarro", "", '2');
                return false;
            }
        }
        else {
            displayMessage("PinturaCargaSpoolAreaSuperiorPermididoCarro", "", '2');
            return false;
        }
    }
}

function SetDisabledBooleanEnGrid(deshabilitar) {
    var $grid = $("#grid[nombre='grid-backlog']");

    $("tr", $grid).each(function (index) {
        var $row = $(this);

        var $td = $row.find(':checkbox');

        $td.attr("disabled", deshabilitar);

    });
}
