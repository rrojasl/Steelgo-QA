function AjaxCargarSpool() {
    loadingStart();
    var MedioTransporteID = $('#inputCarro').attr("mediotransporteid");
    
    $CargaCarroBackLog.CargaCarroBackLog.read({ medioTransporteID: MedioTransporteID, token: Cookies.get("token") }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
        
        loadingStop();
    });
}

function AjaxPinturaCargaMedioTransporte() {
    loadingStart();

    $MedioTransporte.MedioTransporte.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        loadingStart();
        $("#inputCarro").data("kendoComboBox").value("");
        $("#inputCarro").data("kendoComboBox").dataSource.data(data);

    //    $("#inputCarro").data("kendoComboBox").trigger("change");

        loadingStop();
    });
}


function AjaxSubirSpool(listaSpool) {
    

    var contSave = 0;
    var medioTransporteID;
    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    ListaGuardarDetalles = [];
   
    if ($('#inputCarro').attr("mediotransporteid")!=undefined) {
        for (var index = 0 ; index < listaSpool.length; index++) {
            if (listaSpool[index].Seleccionado) {
                ListaDetalles[contSave] = {
                    Spool: "",
                    SistemaPintura: "",
                    Peso: "",
                    Area: ""
                };

                ListaGuardarDetalles[contSave] = {
                    Accion: 1,
                    SpoolID: ""
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
                   
                        AjaxPinturaCargaMedioTransporte();
                        //    opcionHabilitarView(true, "FieldSetView");
                        Limpiar();
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
            $('#chkCerrar').attr('checked',true);
        }
        
        loadingStop();
    });
}