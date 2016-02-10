function AjaxRequisicionDetalle(requisicionID) {
    loadingStart();
    $CapturaReportePruebas.CapturaReportePruebas.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), requisicion: requisicionID }).done(function (data) {
        if (data.length > 0) {
            $("#TipoPrueba").text(data[0].Nombre);
            $("#Requisicion").text(data[0].Requisicion);
            $("#TurnoLaboral").text(data[0].TurnoLaboral);
            $("#HerramientaPrueba").text(data[0].HerramientaPrueba);
            AjaxReportePruebasDetalle(requisicionID);
        }
        
        loadingStop();
    });
}

function AjaxReportePruebasDetalle(requisicionID) {
    loadingStart();
    $CapturaReportePruebas.CapturaReportePruebas.read({ token: Cookies.get("token"), requisicionID: requisicionID, lenguaje: $("#language").val() }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
            comboDefectos = array[0].listaDetallePruebas[0].ListaDefectos;
        }
        loadingStop();
    });

}


function AjaxObtenerRenglonEdicionDefectos(model) {
    loadingStart();
    modeloRenglon = model;
    $("#gridPopUp").data('kendoGrid').dataSource.data([]);
    var ds = $("#gridPopUp").data("kendoGrid").dataSource;
    var array = model.ListaDetalleDefectos;
    if (array != null) {
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
    }
    VentanaModal();
    loadingStop();
}


function AjaxGuardarCaptura(arregloCaptura, tipoGuardar) {
    Captura = [];
    Captura[0] = { ListadoCapturaRequisicion: "" };
    ListadoCapturaRequisicion = [];
    ListaCaptura = [];
    ListaDefectos = [];
    ListaNumeroPlacas = [];
    var contCaptura = 0;
    var contDefectos = 0;


    for (index = 0; index < arregloCaptura.length; index++) {
        ListaNumeroPlacas[index] = {
            NumeroPlacas: "",
        };
        ListaNumeroPlacas[index].NumeroPlacas = arregloCaptura[index].NumeroPlacas;

        for (indice = 0; indice < arregloCaptura[index].listaDetallePruebas.length; indice++) {
            
            ListaCaptura[contCaptura] = {
                Accion: "",
                RequisicionPruebaElementoID: "",
                PruebaElementoResultadoID: "",
                Tamano: "",
                Densidad: "",
                Ubicacion: "",
                Resultado: ""
            };

            ListaCaptura[contCaptura].Accion = arregloCaptura[index].listaDetallePruebas[indice].Accion;
            ListaCaptura[contCaptura].RequisicionPruebaElementoID = arregloCaptura[index].RequisicionPruebaElementoID;
            ListaCaptura[contCaptura].PruebaElementoResultadoID = arregloCaptura[index].listaDetallePruebas[indice].PruebaElementoResultadoID;
            ListaCaptura[contCaptura].Tamano = arregloCaptura[index].Tamano;
            ListaCaptura[contCaptura].Densidad = arregloCaptura[index].Densidad;
            ListaCaptura[contCaptura].Ubicacion = arregloCaptura[index].listaDetallePruebas[indice].Ubicacion;
            ListaCaptura[contCaptura].Resultado = parseInt(arregloCaptura[index].listaDetallePruebas[indice].Resultado);

            contCaptura++;

            //-------------------------------------------------------------------------------------------------------------------
            for (var j = 0 ; j < arregloCaptura[index].listaDetallePruebas[indice].ListaDetalleDefectos.length; j++) {

                ListaDefectos[contDefectos] = {
                    Accion: "",
                    PruebaElementoDefectoID: "",
                    PruebaElementoResultadoID: "",
                    DefectoID: "",
                    InicioDefecto: "",
                    FinDefecto: "",
                    Ubicacion: "",
                    RequisicionPruebaElemento: ""
                };

                if (arregloCaptura[index].listaDetallePruebas[indice].ListaDetalleDefectos[j].Accion == undefined) {
                    ListaDefectos[contDefectos].Accion = 1;
                    ListaDefectos[contDefectos].PruebaElementoDefectoID = 0;
                    ListaDefectos[contDefectos].PruebaElementoResultadoID = arregloCaptura[index].listaDetallePruebas[indice].PruebaElementoResultadoID;
                }
                else {
                    ListaDefectos[contDefectos].Accion = arregloCaptura[index].listaDetallePruebas[indice].ListaDetalleDefectos[j].Accion;
                    ListaDefectos[contDefectos].PruebaElementoDefectoID = arregloCaptura[index].listaDetallePruebas[indice].ListaDetalleDefectos[j].PruebaElementoDefectoID;
                    ListaDefectos[contDefectos].PruebaElementoResultadoID = arregloCaptura[index].listaDetallePruebas[indice].PruebaElementoResultadoID;

                }
                ListaDefectos[contDefectos].DefectoID = arregloCaptura[index].listaDetallePruebas[indice].ListaDetalleDefectos[j].DefectoID;
                ListaDefectos[contDefectos].InicioDefecto = arregloCaptura[index].listaDetallePruebas[indice].ListaDetalleDefectos[j].InicioDefecto;
                ListaDefectos[contDefectos].FinDefecto = arregloCaptura[index].listaDetallePruebas[indice].ListaDetalleDefectos[j].FinDefecto;
                ListaDefectos[contDefectos].Ubicacion = arregloCaptura[index].listaDetallePruebas[indice].Ubicacion;
                ListaDefectos[contDefectos].RequisicionPruebaElemento = arregloCaptura[index].RequisicionPruebaElementoID;

                contDefectos++;
            }
        }
    }

    if (defectosCorrectos(ListaDefectos)) {
        if(RenglonPrincipalCorrecto(ListaCaptura)){
            if (NumeroPlacasCorrecto(ListaNumeroPlacas)) {

                ListadoCapturaRequisicion[0] = { ListaCaptura: "", ListaDefectos: "" };
                ListadoCapturaRequisicion[0].ListaCaptura = ListaCaptura;
                ListadoCapturaRequisicion[0].ListaDefectos = ListaDefectos;
                Captura[0].ListadoCapturaRequisicion = ListadoCapturaRequisicion;



                loadingStart();
                $CapturaReportePruebas.CapturaReportePruebas.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val(), reqID: requisicionID }).done(function (data) {
                    if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                        //mensaje = "Se guardo correctamente la informacion" + "-0";
                        displayMessage("CapturaSoldaduraMensajeGuardadoExitoso", "", "0");

                        if (tipoGuardar == 1) {
                            Limpiar();
                            AjaxCargarCamposPredeterminados();
                        }
                        else {
                            opcionHabilitarView(true, "FieldSetView");
                            AjaxReportePruebasDetalle(requisicionID);
                        }
                        loadingStop();

                    }
                    else  {
                        displayMessage("CapturaMensajeGuardadoErroneo", "", '1');
                        loadingStop();
                    }
                });
            }
            else {
                displayMessage("CapturaReportePruebasMensajeErrorPlacas", "", "1");
            }
        }
        else {
            displayMessage("CapturaReportePruebasMensajeErrorTamanoDensidad", "", "1");
        }
    }
    else {
        displayMessage("CapturaReportePruebasMensajeErrorDefectos", "", "1");
    }

    
}



function defectosCorrectos(listaDefectos) {
    var bandera = true;
    for (var index = 0; index < listaDefectos.length; index++)
    {
        if (listaDefectos[index].DefectoID == "" || listaDefectos[index].DefectoID == null || listaDefectos[index].DefectoID == undefined) {
            bandera = false;
        }
        if (listaDefectos[index].InicioDefecto == "" || listaDefectos[index].InicioDefecto == null || listaDefectos[index].InicioDefecto == undefined) {
            bandera = false;
        }
        if (listaDefectos[index].FinDefecto == "" || listaDefectos[index].FinDefecto == null || listaDefectos[index].FinDefecto == undefined) {
            bandera = false;
        }
    }
    return bandera;
}


function RenglonPrincipalCorrecto(ListaCaptura) {
    var bandera = true;
    for (var index = 0; index < ListaCaptura.length; index++) {
        if (ListaCaptura[index].Tamano == "" || ListaCaptura[index].Tamano == null || ListaCaptura[index].Tamano == undefined) {
            bandera = false;
        }
        if (ListaCaptura[index].Densidad == "" || ListaCaptura[index].Densidad == null || ListaCaptura[index].Densidad == undefined) {
            bandera = false;
        }
    }
    return bandera;
}


function NumeroPlacasCorrecto(ListaNumeroPlacas) {
    var bandera = true;
    for (var index = 0; index < ListaNumeroPlacas.length; index++) {
        if (ListaNumeroPlacas[index].NumeroPlacas == "" || ListaNumeroPlacas[index].NumeroPlacas == null || ListaNumeroPlacas[index].NumeroPlacas == undefined) {
            bandera = false;
        }
        else {
            try{
                if (parseInt(ListaNumeroPlacas[index].NumeroPlacas) > 0) {
                    bandera = true;
                }
            }
            catch (e) {
                bandera = false;
            }
            
        }
    }
    return bandera;
}