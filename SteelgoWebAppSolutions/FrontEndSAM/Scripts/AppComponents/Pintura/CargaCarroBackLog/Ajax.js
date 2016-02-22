function AjaxCargarSpool(cargarSpoolsDespuesDeCargar, MedioTransporteCargaID) {
    loadingStart();
 
    if (MedioTransporteCargaID == 0 && $('#inputCarro').val() != "") MedioTransporteCargaID = $('#inputCarro').val();
 
    $CargaCarroBackLog.CargaCarroBackLog.read({ medioTransporteID: MedioTransporteCargaID, token: Cookies.get("token") }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
 
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
         
        if (cargarSpoolsDespuesDeCargar) {
            opcionHabilitarView(true, "FieldSetView"); 
        }

        
        loadingStop();
    });
}

function AjaxPinturaCargaMedioTransporte() {
    loadingStart();
   
    $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        loadingStart();
        $("#inputCarro, #inputCarroBacklog").data("kendoComboBox").value("");

        if (data.length > 0) {
            data.unshift({ MedioTransporteID: -1, NombreMedioTransporte: _dictionary.PinturaCargaAgregarNuevoCarro[$("#language").data("kendoDropDownList").value()] });
            $("#inputCarro, #inputCarroBacklog").data("kendoComboBox").dataSource.data(data);
        }

        loadingStop();
    });
}
 
function AjaxSubirSpool(listaSpool, guardarYNuevo) { 
    var contSave = 0;
    var medioTransporteID;
    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    ListaGuardarDetalles = [];

    if ($('#inputCarro').attr("mediotransporteid") != undefined) {
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
                    MedioTransporteCargaID: $('#inputCarro').val()
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
                    MedioTransporteID = $("#inputCarro").data("kendoComboBox").value();
                    Captura[0].Detalles = ListaGuardarDetalles;

                    loadingStart();
                    $MedioTransporte.MedioTransporte.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val(), medioTransporteID: $('#inputCarro').attr("mediotransporteid"), cerrar: disponible }).done(function (data) {

                        displayMessage("PinturaCargaBackLogMensajeGuardadoExitoso", "", "0");

                        if (disponible == 0) {
                            AjaxPinturaCargaMedioTransporte();
                            AjaxCargarSpool(true, 0);
                         
                        }
                        else {
                            var guardar = false;
                            if (!guardarYNuevo) {
                                guardar = true;
                            }
                            AjaxCargarSpool(true,0);
                            
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
    var carDataSourceSelected = $("#inputCarro").data("kendoComboBox").dataItem($("#inputCarro").data("kendoComboBox").select());

    for (var i = 0; i < ListaDetalles.length; i++) {
        if ((carDataSourceSelected.AreaPermitidoMedioTransporte - carDataSourceSelected.AreaMaximoOcupado) > (SumarArea())) {
            if ((carDataSourceSelected.PesoMaximoPermitido - carDataSourceSelected.PesoMaximoOcupado) > (SumarTonelada())) {
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

function SumarArea() {
    var grid = $("#grid").data("kendoGrid");

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

function SumarTonelada() {
    var grid = $("#grid").data("kendoGrid");

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

function AjaxCargarCamposPredeterminados() {

    loadingStart();
    $CargaCarroBackLog.CargaCarroBackLog.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {

        if (data.Cerrar == "No") {
            $('#chkCerrar').attr('checked', false);
        }
        else if (data.Cerrar == "Si") {
            $('#chkCerrar').attr('checked', true);
        }

        loadingStop();
    });
}

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
        if (data.length > 0) {
            $("#inputPersistencia").data("kendoComboBox").value("");
            $("#inputPersistencia").data("kendoComboBox").dataSource.data(data);
        } else {
            $("#inputPersistencia").data("kendoComboBox").value("");
        };
        loadingStop();
    });
}


function SetDisabledBooleanEnGrid(deshabilitar) {
    var $grid = $("#grid");
 
    $("tr", $grid).each(function (index) {
        var $row = $(this);
 
        var $td = $row.find(':checkbox');
  
        $td.attr("disabled", deshabilitar);
   
    }); 
}
