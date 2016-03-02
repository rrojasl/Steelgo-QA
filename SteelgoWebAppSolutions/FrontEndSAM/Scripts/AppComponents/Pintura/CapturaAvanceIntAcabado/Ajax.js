var ajaxCompleted;


function AjaxCargarCamposPredeterminados() {
    $CapturaAvanceIntAcabado.CapturaAvanceIntAcabado.read({
        id: "0",
        predeterminado: "predeterminado",
        token: Cookies.get("token"),
        lenguaje: $("#language").val()
    }).done(function (data) {

        var NewDate = kendo.toString(data.FechaPintura, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);

        endRangeDate.val(NewDate);

        if (data.Paso.toLowerCase() == "intermedio") {
            $('input:radio[name=PasoTipo]:nth(0)').attr('checked', true).trigger("change");
        }
        else if (data.Paso.toLowerCase() == "acabado") {
            $('input:radio[name=PasoTipo]:nth(1)').attr('checked', true).trigger("change");
        }

        if (data.Llenado.toLowerCase() == "todos") {
            $('input#LlenaTodos').attr('checked', true).trigger("change");
        }
        else if (data.Llenado.toLowerCase() == "vacios") {

            $('input#LlenaVacios').attr('checked', true).trigger("change");

        }
        loadingStop();
    });
}

function AjaxObtenerCuadrante() {

    $CapturaAvanceIntAcabado.CapturaAvanceIntAcabado.read({ token: Cookies.get("token"), id: 0 }).done(function (data) {
        if (data.length > 0) {
            $("#inputCuadrante").data("kendoComboBox").value("");
            $("#inputCuadrante").data("kendoComboBox").dataSource.data(data);
        } else {
            $("#inputCuadrante").data("kendoComboBox").value("");
        };
    });
}

function AjaxObtenerColor() {
    $CapturaAvanceIntAcabado.CapturaAvanceIntAcabado.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (data.length > 0) {
            var color = $("#inputColor");

            $("#inputColor").data("kendoComboBox").value("");
            $("#inputColor").data("kendoComboBox").dataSource.data(data);
        } else {
            $("#inputColor").data("kendoComboBox").value("");
        };
        //      loadingStop();
    });
}

function AjaxObtenerPintores() {
    $CapturaAvanceIntAcabado.CapturaAvanceIntAcabado.read({ token: Cookies.get("token"), tipo: 2, tipoObrero: "Pintor" }).done(function (data) {
        if (data.length > 0) {
            $("#inputPintor").data("kendoMultiSelect").value("");
            $("#inputPintor").data("kendoMultiSelect").dataSource.data(data);
        } else {
            $("#inputPintor").data("kendoMultiSelect").value("");
        };

        //    loadingStop();
    });
}

function AjaxObtenerLote() {
    $CapturaAvanceIntAcabado.CapturaAvanceIntAcabado.read({ lote: 2, token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (data.length > 0) {
            $("#inputLote").data("kendoComboBox").value("");
            $("#inputLote").data("kendoComboBox").dataSource.data(data);
        } else {
            $("#inputLote").data("kendoComboBox").value("");
        };
    });
}

function AjaxMostrarCapturaAvanceIntAcabado(_cuadranteId, _paso) {
    loadingStart();
    $CapturaAvanceIntAcabado.CapturaAvanceIntAcabado.read({ token: Cookies.get("token"), cuadrante: parseInt(_cuadranteId, 10), paso: 3, lenguaje: $("#language").val() }).done(function (data) {
        //  var ds = $("#grid").data("kendoGrid").dataSource.data(data);
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;

        for (var i = 0; i < data.length; i++) {

            ds.add(data[i]);

            var listaDetallePintoresPorSpool = new Array();
            for (var j = 0; j < data[i].ListaDetallePintoresPorSpool.length; j++) {
                listaDetallePintoresPorSpool.push(data[i].ListaDetallePintoresPorSpool[j]);

            }
            data[i].ListaDetallePintoresPorSpool = listaDetallePintoresPorSpool;
            ds._data[i].ListaDetallePintoresPorSpool;
        }

        loadingStop();
    });
}

function AjaxGuardarCaptura(arregloCaptura, pasoId) {

    try {
        loadingStart();
        var banderaColor = true, banderPinturaComponenteComposicion = true, banderaDatosCompletos = true;
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];

        if (arregloCaptura.length > 0) {
            for (index = 0; index < arregloCaptura.length; index++) {

                ListaDetalles[index] = {
                    Accion: "",
                    ColorPinturaID: "",
                    FechaPintura: "",
                    LotePinturaID: "",
                    PasoID: "",
                    PinturaComponenteComposicionID: "",
                    PinturaSpoolID: "",
                    SistemaPinturaID: "",
                    SpoolID: "",
                    ListaPintores: "",
                    Estatus: 1 //1:Completo, 0:Incompleto
                };

                ListaDetalles[index].Accion = arregloCaptura[index].Accion;
                ListaDetalles[index].ColorPinturaID = arregloCaptura[index].ColorID;

                if (arregloCaptura[index].FechaPintura != null) {
                    ListaDetalles[index].FechaPintura = kendo.toString(arregloCaptura[index].FechaPintura,
                        String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim(" ", '')
                }
                ListaDetalles[index].LotePinturaID = arregloCaptura[index].LoteID;
                ListaDetalles[index].PasoID = pasoId;
                ListaDetalles[index].PinturaComponenteComposicionID = arregloCaptura[index].ComponenteID;
                ListaDetalles[index].PinturaSpoolID = arregloCaptura[index].PinturaSpoolID;
                ListaDetalles[index].SistemaPinturaID = arregloCaptura[index].SistemaPinturaID;
                ListaDetalles[index].SpoolID = arregloCaptura[index].SpoolID;

                if (ListaDetalles[index].ColorPinturaID == null || ListaDetalles[index].ColorPinturaID == "" ||
                    ListaDetalles[index].FechaPintura == null || ListaDetalles[index].FechaPintura == "" ||
                    ListaDetalles[index].LotePinturaID == null || ListaDetalles[index].LotePinturaID == "" ||
                    ListaDetalles[index].PinturaComponenteComposicionID == null || ListaDetalles[index].PinturaComponenteComposicionID == "" ||
                    ListaDetalles[index].SistemaPinturaID == null || ListaDetalles[index].SistemaPinturaID == "") {
                    banderaDatosCompletos = false;
                    ListaDetalles[index].Estatus = 0;

                }

                //-----------------------------------Comparar listas--------------------------------------------
                var listaPintoresNueva = arregloCaptura[index].ListaDetallePintoresPorSpool;
                var listaPintoresInicial = arregloCaptura[index].ListaDetallePintoresPorSpoolInicial;
                var listaPintoresFinal = [];


                for (var i = 0; i < listaPintoresInicial.length; i++) {
                    var bandera = false;
                    for (var j = 0 ; j < listaPintoresNueva.length ; j++) {
                        if (listaPintoresInicial[i].ObreroID == listaPintoresNueva[j].ObreroID) {
                            listaPintoresFinal.push(listaPintoresInicial[i]);
                            bandera = true;
                        }
                        if ((listaPintoresNueva.length - 1) == j && bandera == false) {
                            listaPintoresInicial[i].Accion = 3;
                            listaPintoresFinal.push(listaPintoresInicial[i]);
                        }
                    }
                }

                if (listaPintoresInicial.length == 0) {
                    listaPintoresFinal = listaPintoresNueva;
                }
                else {
                    for (var i = 0; i < listaPintoresNueva.length; i++) {
                        var bandera = false;
                        var banderaExistePintor = false;
                        for (var j = 0 ; j < listaPintoresInicial.length ; j++) {
                            if (listaPintoresNueva[i].ObreroID != listaPintoresInicial[j].ObreroID) {
                                bandera = true;
                            }
                            else {
                                banderaExistePintor = true;
                            }
                            if ((listaPintoresInicial.length - 1) == j && !banderaExistePintor && bandera == true && listaPintoresNueva[i].Accion == 1) {
                                listaPintoresFinal.push(listaPintoresNueva[i]);
                            }

                        }

                    }
                }

                ListaPintoresEditados = [];

                for (j = 0; j < listaPintoresFinal.length; j++) {

                    ListaPintoresEditados[j] = {
                        Accion: "",
                        SpoolID: "",
                        PasoID: "",
                        PinturaSpoolID: "",
                        PinturaSpoolObreroID: "",
                        ObreroID: ""
                    }


                    ListaPintoresEditados[j].Accion = listaPintoresFinal[j].Accion;
                    ListaPintoresEditados[j].SpoolID = arregloCaptura[index].SpoolID;
                    ListaPintoresEditados[j].PasoID = pasoId;
                    ListaPintoresEditados[j].PinturaSpoolID = arregloCaptura[index].PinturaSpoolID;
                    ListaPintoresEditados[j].PinturaSpoolObreroID = listaPintoresFinal[j].PinturaSpoolObreroID;
                    ListaPintoresEditados[j].ObreroID = listaPintoresFinal[j].ObreroID;

                }
                ListaDetalles[index].ListaPintores = ListaPintoresEditados;

                if (ListaDetalles[index].ListaPintores.length == 0) {
                    banderaDatosCompletos = false;
                    ListaDetalles[index].Estatus = 0;
                }
                ////----------------------------------------------------------------------------------
            }

            if (banderaDatosCompletos) {
                loadingStart();
                Captura[0].Detalles = ListaDetalles;
                $CapturaAvanceIntAcabado.CapturaAvanceIntAcabado.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                    opcionHabilitarView(true, "FieldSetView");
                    displayNotify("AlertaExitosa", "CapturaSoldaduraMensajeGuardadoExitoso", "", "0");
                    loadingStop();
                    $("#btnMostrar").trigger("click");
                });
            }
            else {
                loadingStop();
                windowTemplate = kendo.template($("#windowTemplate").html());

                ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                    iframe: true,
                    title: _dictionary.CapturaAvanceIntAcabadoMensajeErrorGuardado[$("#language").data("kendoDropDownList").value()],
                    visible: false, //the window will not appear before its .open method is called
                    width: "auto",
                    height: "auto",
                    modal: true
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.CapturaAvanceIntAcabadoMensajePreguntaGuardado[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

                ventanaConfirm.open().center();
                 
                 
                AgregarEstiloError($("#grid"));

                $("#yesButton").click(function () {
                    loadingStart();
                    var ArregloGuardado = new Array();

                    Captura[0].Detalles = ListaDetalles;
                    for (var i = 0; i < Captura[0].Detalles.length; i++) {
                        if (Captura[0].Detalles[i].Estatus == 1) {

                            ArregloGuardado.push(Captura[0].Detalles[i]);
                        }
                    }

                    Captura[0].Detalles = [];
                    Captura[0].Detalles = ArregloGuardado;


                    if (ArregloGuardado.length > 0) {
                        $CapturaAvanceIntAcabado.CapturaAvanceIntAcabado.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                            opcionHabilitarView(true, "FieldSetView");
                            $("#btnMostrar").trigger("click");
                            displayNotify("AlertaExitosa", "CapturaSoldaduraMensajeGuardadoExitoso", "", "0");
                            loadingStop();
                        });
                    }
                    else {
                        loadingStop();
                        displayNotify("AlertaAdvertencia", "AdverteciaExcepcionGuardado", "", '1');
                    }

                    ventanaConfirm.close();
                });
                $("#noButton").click(function () {
                    ventanaConfirm.close();
                });
            }
        }

        else {
            loadingStop();
            displayNotify("AlertaAdvertencia", "AdverteciaExcepcionGuardado", "", '1');
        }
    } catch (e) {
        loadingStop();
        displayNotify("AlertaError", "", e.message, '2');
    }

}

function AjaxSistemaPintura() {
    // el id es solo para identificar que solo me traera el catalog de componente composicion
    $CapturaAvanceIntAcabado.CapturaAvanceIntAcabado.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: 2 }).done(function (data) {
       
        if (data.length > 0) {
            $("#inputSistemaPintura").data("kendoComboBox").value("");
            $("#inputSistemaPintura").data("kendoComboBox").dataSource.data(data); 

        } else {
            $("#inputSistemaPintura").data("kendoComboBox").value("");
        };

    });
}

function AjaxComponenteComposicion() {
    // el id es solo para identificar que solo me traera el catalog de componente composicion
 
    $CapturaAvanceIntAcabado.CapturaAvanceIntAcabado.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), sistemaPinturaID: $("#inputSistemaPintura").data("kendoComboBox").value() }).done(function (data) {
        if (data.length > 0) {
            $("#inputPinturaComponenteComposicion").data("kendoComboBox").dataSource.data([]);
            $("#inputPinturaComponenteComposicion").data("kendoComboBox").dataSource.data(data);

        } else {
            $("#inputPinturaComponenteComposicion").data("kendoComboBox").dataSource.data([]);
        }
    });
}
