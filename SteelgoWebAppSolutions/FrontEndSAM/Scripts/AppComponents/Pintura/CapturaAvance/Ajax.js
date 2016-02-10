function AjaxCargarCamposPredeterminados() {

    loadingStart();
     
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        var NewDate = kendo.toString(data.FechaShotblast, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
        endRangeDateShotblast.val(NewDate);
        var NewDate2 = kendo.toString(data.FechaPrimario, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
        endRangeDatePrimario.val(NewDate2);
         
        if (data.Llenado.toLowerCase() == "todos") {
            $('input#LlenaTodos').attr('checked', true).trigger("change");
        }
        else if (data.Llenado.toLowerCase() == "vacios") {
            $('input#LlenaVacios').attr('checked', true).trigger("change");
        }

        loadingStop();
    });
}

function AjaxCargarCuadrante(area) {
    loadingStart();
    $Cuadrante.Cuadrante.read({ token: Cookies.get("token"), AreaID: area }).done(function (data) {
        $("#inputCuadrante").data("kendoComboBox").value("");
        $("#inputCuadrante").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}

function AjaxCargarCarrosCargados() {

    loadingStart();
     
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), cargado: 1 }).done(function (data) { 
        $("#inputCarro").data("kendoComboBox").value("");
        $("#inputCarro").data("kendoComboBox").setDataSource(data); 
        loadingStop();
    });
}
 
function AjaxCargarPintor() {

    loadingStart();
     
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), tipo: 2, tipoObrero: "Pintor" }).done(function (data) {

        $("#inputPintor").data("kendoMultiSelect").setDataSource(data);
        loadingStop();
    });
}
 
function AjaxCargarShotBlastero() {

    loadingStart();
     
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), tipo: 2, tipoObrero: "ShotBlastero" }).done(function (data) {

        $("#inputShotBlastero").data("kendoMultiSelect").setDataSource(data);
        loadingStop();
    });
}

function AjaxCargarOrdenTrabajo() {
    loadingStart();
    $CapturaSoldadura.Soldadura.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
        $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
        loadingStop();
    });
}

function AjaxCargarSpool(medioTransporteCargaID) {
    loadingStart();
 
    $CapturaAvance.CapturaAvance.read({ token: Cookies.get("token"), medioTransporteCargaID: medioTransporteCargaID, lenguaje: $("#language").val() }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data.listaCapturaAvance;
  
        for (var i = 0; i < array.length; i++) {
            array[i].plantillaShotblastero = _dictionary.CapturaAvancePintoresShotblastExistentes[$("#language").data("kendoDropDownList").value()] + array[i].ListaShotblasteroGuargado.length;
            array[i].plantillaPintor = _dictionary.CapturaAvancePintoresPrimariosExistentes[$("#language").data("kendoDropDownList").value()] + array[i].ListaPintorGuargado.length;
            ds.add(array[i]);
        }

        $("#inputComponente").data("kendoComboBox").value("");
        $("#inputComponente").data("kendoComboBox").dataSource.data(data.listaComponenteDetalle);

        loadingStop();
    });
}

function AjaxAgregarSpool(ordenTrabajoSpoolID) {
    loadingStart();

    CapturaNuevo = [];
    CapturaNuevo[0] = { ListaPintorGuargado: "", ListaShotblasteroGuargado: "" };
    ListaPintorGuargado = [];
    ListaShotblasteroGuargado = [];

    var dataPintor = $("#inputPintor").data("kendoMultiSelect")._dataItems;
    for (var i = 0; i < dataPintor.length; i++) {
        ListaPintorGuargado[i] = {
            Accion: "",
            PinturaSpoolObreroID: "",
            ObreroID: "",
            Codigo: ""
        };
        ListaPintorGuargado[i].Accion = 1;
        ListaPintorGuargado[i].PinturaSpoolObreroID = dataPintor[i].PinturaSpoolObreroID;
        ListaPintorGuargado[i].ObreroID = dataPintor[i].ObreroID;
        ListaPintorGuargado[i].Codigo = dataPintor[i].Codigo;
    }
    if (dataPintor.length == 0) {
        ListaPintorGuargado[0] = {
            Accion: "",
            PinturaSpoolObreroID: "",
            ObreroID: "",
            Codigo: ""
        };
        ListaPintorGuargado[0].Accion = 1;
        ListaPintorGuargado[0].PinturaSpoolObreroID = 0;
        ListaPintorGuargado[0].ObreroID = 0;
        ListaPintorGuargado[0].Codigo = "";
    }

    var dataShotBlast = $("#inputShotBlastero").data("kendoMultiSelect")._dataItems;
    for (var i = 0; i < dataShotBlast.length; i++) {
        ListaShotblasteroGuargado[i] = {
            Accion: "",
            PinturaSpoolObreroID: "",
            ObreroID: "",
            Codigo: ""
        };
        ListaShotblasteroGuargado[i].Accion = 1;
        ListaShotblasteroGuargado[i].PinturaSpoolObreroID = dataShotBlast[i].PinturaSpoolObreroID;
        ListaShotblasteroGuargado[i].ObreroID = dataShotBlast[i].ObreroID;
        ListaShotblasteroGuargado[i].Codigo = dataShotBlast[i].Codigo;
    }

    if (dataShotBlast.length == 0) {
        ListaShotblasteroGuargado[0] = {
            Accion: "",
            PinturaSpoolObreroID: "",
            ObreroID: "",
            Codigo: ""
        };
        ListaShotblasteroGuargado[i].Accion = 1;
        ListaShotblasteroGuargado[0].PinturaSpoolObreroID = 0;
        ListaShotblasteroGuargado[0].ObreroID = 0;
        ListaShotblasteroGuargado[0].Codigo = "";
    }


    CapturaNuevo[0].ListaPintorGuargado = ListaPintorGuargado;
    CapturaNuevo[0].ListaShotblasteroGuargado = ListaShotblasteroGuargado;
     
    $CapturaAvance.CapturaAvance.create(CapturaNuevo[0], { token: Cookies.get("token"), OrdenTrabajoSpoolID: ordenTrabajoSpoolID, lenguaje: $("#language").val() }).done(function (data) {

        var ds = $("#grid").data("kendoGrid").dataSource;

        var array = data;
        for (var i = 0; i < array.length; i++) {
            if (!existeSpool(array[i].Spool, ds)) {

                ds.add(array[i]);
            }

        }
        loadingStop();
    });
}

function existeSpool(spool, array) {
    for (var index = 0; index < array._data.length; index++) {
        if (array._data[index].Spool == spool) {
            return true;
        }
    }
    return false;
}

function AjaxGuardarCarro(arregloCaptura, guardarYNuevo) {
    Captura = [];
    Captura[0] = { listaDetalleSpool: "" };
    listaDetalleSpool = [];


    var contIndice = 0;
    for (index = 0; index < arregloCaptura.length; index++) {

        listaDetalleSpool[contIndice] = {
            Accion: "",
            SpoolID: "",
            PinturaSpoolID: "",
            PasoID: "",
            SistemaPinturaID: "",
            ColorPinturaID: "",
            LotePinturaID: "",
            PinturaComponenteComposicionID: "",
            Fecha: "", 
            ListaObreros: ""
        };

        //-------------------------------------------Primario--------------------------------------------------------------------------
        var listaPintorNueva = [];
        var listaPintorInicial = [];
        listaPintorNueva = arregloCaptura[index].ListaPintorGuargado;
        listaPintorInicial = arregloCaptura[index].ListaPintorInicial;

        var listaFinalPintor = [];
        var guardarPrimario = [];


        for (var i = 0; i < listaPintorInicial.length; i++) {
            var bandera = false;
            for (var j = 0 ; j < listaPintorNueva.length ; j++) {
                if (listaPintorInicial[i].ObreroID == listaPintorNueva[j].ObreroID) {
                    listaFinalPintor.push(listaPintorInicial[i]);
                    bandera = true;
                }
                if ((listaPintorNueva.length - 1) == j && bandera == false) {
                    listaPintorInicial[i].Accion = 3;
                    listaFinalPintor.push(listaPintorInicial[i]);
                }
            }
        }

        if (listaPintorInicial.length == 0) {
            listaFinalPintor = listaPintorNueva;
        }
        else {
            for (var i = 0; i < listaPintorNueva.length; i++) {
                var bandera = false;
                for (var j = 0 ; j < listaPintorInicial.length ; j++) {
                    if (listaPintorNueva[i].ObreroID != listaPintorInicial[j].ObreroID) {
                        bandera = true;
                    }
                    if ((listaPintorInicial.length - 1) == j && bandera == true && listaPintorNueva[i].Accion == 1) {
                        listaFinalPintor.push(listaPintorNueva[i]);
                    }

                }
            }
        }




        if (listaFinalPintor.length > 0) {



            for (var i = 0; i < listaFinalPintor.length; i++) {
                guardarPrimario[i] = {
                    Accion: "",
                    SpoolID: "",
                    PasoID: "",
                    PinturaSpoolID: "",
                    PinturaSpoolObreroID: "",
                    ObreroID: ""
                }

                guardarPrimario[i].Accion = listaFinalPintor[i].Accion;
                guardarPrimario[i].SpoolID = arregloCaptura[index].SpoolID;
                guardarPrimario[i].PasoID = 2;
                guardarPrimario[i].PinturaSpoolID = arregloCaptura[index].PinturaSpoolIDShotPrimario;
                guardarPrimario[i].PinturaSpoolObreroID = listaFinalPintor[i].PinturaSpoolObreroID;
                guardarPrimario[i].ObreroID = listaFinalPintor[i].ObreroID;
            }

        }
        else {
            guardarPrimario[0] = {
                Accion: "",
                SpoolID: "",
                PasoID: "",
                PinturaSpoolID: "",
                PinturaSpoolObreroID: "",
                ObreroID: ""
            }

            guardarPrimario[0].Accion = 0;
            guardarPrimario[0].SpoolID = 0;
            guardarPrimario[0].PasoID = 0;
            guardarPrimario[0].PinturaSpoolID = 0;
            guardarPrimario[0].PinturaSpoolObreroID = 0;
            guardarPrimario[0].ObreroID = 0;
        }

        /*------------------------------------------------ShotBlast---------------------------------------------------------------------*/

        var listaShotBlastNueva = arregloCaptura[index].ListaShotblasteroGuargado;
        var listaShotBlastInicial = arregloCaptura[index].ListaShotblasteroInicial;
        var listaFinalShotBlast = [];
        var guardarShotblast = [];


        for (var i = 0; i < listaShotBlastInicial.length; i++) {
            var bandera = false;
            for (var j = 0 ; j < listaShotBlastNueva.length ; j++) {
                if (listaShotBlastInicial[i].ObreroID == listaShotBlastNueva[j].ObreroID) {
                    listaFinalShotBlast.push(listaShotBlastInicial[i]);
                    bandera = true;
                }
                if ((listaShotBlastNueva.length - 1) == j && bandera == false) {
                    listaShotBlastInicial[i].Accion = 3;
                    listaFinalShotBlast.push(listaShotBlastInicial[i]);
                }
            }
        }

        if (listaShotBlastInicial.length == 0) {
            listaFinalShotBlast = listaShotBlastNueva;
        }
        else {
            for (var i = 0; i < listaShotBlastNueva.length; i++) {
                var bandera = false;
                for (var j = 0 ; j < listaShotBlastInicial.length ; j++) {
                    if (listaShotBlastNueva[i].ObreroID != listaShotBlastInicial[j].ObreroID) {
                        bandera = true;
                    }
                    if ((listaShotBlastInicial.length - 1) == j && bandera == true && listaShotBlastNueva[i].Accion == 1) {
                        listaFinalShotBlast.push(listaShotBlastNueva[i]);
                    }

                }
            }
        }



        if (listaFinalShotBlast.length > 0) {


            for (var i = 0; i < listaFinalShotBlast.length; i++) {
                guardarShotblast[i] = {
                    Accion: "",
                    SpoolID: "",
                    PasoID: "",
                    PinturaSpoolID: "",
                    PinturaSpoolObreroID: "",
                    ObreroID: ""
                }

                guardarShotblast[i].Accion = listaFinalShotBlast[i].Accion;
                guardarShotblast[i].SpoolID = arregloCaptura[index].SpoolID;
                guardarShotblast[i].PasoID = 1;
                guardarShotblast[i].PinturaSpoolID = arregloCaptura[index].PinturaSpoolIDShotblastero;
                guardarShotblast[i].PinturaSpoolObreroID = listaFinalShotBlast[i].PinturaSpoolObreroID;
                guardarShotblast[i].ObreroID = listaFinalShotBlast[i].ObreroID;

            }



        }
        else {
            guardarShotblast[0] = {
                Accion: "",
                SpoolID: "",
                PasoID: "",
                PinturaSpoolID: "",
                PinturaSpoolObreroID: "",
                ObreroID: ""
            }

            guardarShotblast[0].Accion = 0;
            guardarShotblast[0].SpoolID = 0;
            guardarShotblast[0].PasoID = 1;
            guardarShotblast[0].PinturaSpoolID = 0;
            guardarShotblast[0].PinturaSpoolObreroID = 0;
            guardarShotblast[0].ObreroID = 0;

        }
        //---------------------------------------------------------------------------------------------------------------------        


        listaDetalleSpool[contIndice].Accion = arregloCaptura[index].Accion;
        listaDetalleSpool[contIndice].SpoolID = arregloCaptura[index].SpoolID;
        listaDetalleSpool[contIndice].PinturaSpoolID = arregloCaptura[index].PinturaSpoolIDShotblastero;
        listaDetalleSpool[contIndice].PasoID = 1;
        listaDetalleSpool[contIndice].SistemaPinturaID = arregloCaptura[index].SistemaPinturaID;
        listaDetalleSpool[contIndice].ColorPinturaID = arregloCaptura[index].ColorPinturaID;
        listaDetalleSpool[contIndice].LotePinturaID = 0;
        listaDetalleSpool[contIndice].PinturaComponenteComposicionID = $("#inputComponente").data("kendoComboBox").value();
         
        if (arregloCaptura[index].FechaShotblast != null) {
            listaDetalleSpool[contIndice].Fecha = kendo.toString(arregloCaptura[index].FechaShotblast,
                String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim(" ", '')
        }
        listaDetalleSpool[contIndice].ListaObreros = guardarShotblast;
        contIndice++;


        listaDetalleSpool[contIndice] = {
            Accion: "",
            SpoolID: "",
            PinturaSpoolID: "",
            PasoID: "",
            SistemaPinturaID: "",
            ColorPinturaID: "",
            LotePinturaID: "",
            PinturaComponenteComposicionID: "",
            Fecha: "", 
            ListaObreros: ""
        };

        listaDetalleSpool[contIndice].Accion = arregloCaptura[index].Accion;
        listaDetalleSpool[contIndice].SpoolID = arregloCaptura[index].SpoolID;
        listaDetalleSpool[contIndice].PinturaSpoolID = arregloCaptura[index].PinturaSpoolIDShotPrimario;
        listaDetalleSpool[contIndice].PasoID = 2;
        listaDetalleSpool[contIndice].SistemaPinturaID = arregloCaptura[index].SistemaPinturaID;
        listaDetalleSpool[contIndice].ColorPinturaID = arregloCaptura[index].ColorPinturaID;
        listaDetalleSpool[contIndice].LotePinturaID = 0;
        listaDetalleSpool[contIndice].PinturaComponenteComposicionID = $("#inputComponente").data("kendoComboBox").value();
         
        if (arregloCaptura[index].FechaPrimario != null) {
            listaDetalleSpool[contIndice].Fecha = kendo.toString(arregloCaptura[index].FechaPrimario,
                String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim(" ", '')
        } 
        listaDetalleSpool[contIndice].ListaObreros = guardarPrimario;
        contIndice++;

    }

    Captura[0].listaDetalleSpool = listaDetalleSpool;
     
    loadingStart();
    $CapturaAvance.CapturaAvance.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val(), medioTransporteCargaID: $("#inputCarro").data("kendoComboBox").value() }).done(function (data) {
        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
            AjaxCargarSpool($("#inputCarro").data("kendoComboBox").value());
            opcionHabilitarView(true, "FieldSetView");
            displayMessage("CapturaAvanceGuardadoCorrecto", "", "0");
        }
        else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
            displayMessage("CapturaMensajeGuardadoErroneo", "", '1');
            opcionHabilitarView(false, "FieldSetView");
        }
        loadingStop();
    });
}
 
function removerRepetidos(origArr) {
    var newArr = [],
        origLen = origArr.length,
        found, x, y;

    for (x = 0; x < origLen; x++) {
        found = undefined;
        for (y = 0; y < newArr.length; y++) {
            if (origArr[x] === newArr[y]) {
                found = true;
                break;
            }
        }
        if (!found) {
            newArr.push(origArr[x]);
        }
    }
    return newArr;
}

function ajaxAplicarDescarga(arregloCaptura) {
    try { 
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];
        var index = 0;
        ListaDetalles[index] = { SpoolID: "", Accion: "", medioTransporteID: "", MedioTransporteCargaID: "",CuadranteID: "" };
        ListaDetalles[index].Accion = arregloCaptura.Accion;
        ListaDetalles[index].SpoolID = arregloCaptura.SpoolID;
        ListaDetalles[index].medioTransporteID = arregloCaptura.MedioTransporteID; 
        ListaDetalles[index].CuadranteID = $("#inputCuadrante").val();
        Captura[0].Detalles = ListaDetalles;

        $MedioTransporte.MedioTransporte.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) { 
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                AjaxCargarSpool($("#inputCarro").data("kendoComboBox").value());
                displayMessage("PinturaGuardarDescarga", "", '1');
            }
            else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                displayMessage("PinturaGuardarErrorDesGuardar", "", '2');
            }

            $("#grid").data("kendoGrid").dataSource.sync();
            loadingStop();
        });
    } catch (e) {
        loadingStop();
        displayMessage("Mensajes_error", e.message, '0');

    }
};