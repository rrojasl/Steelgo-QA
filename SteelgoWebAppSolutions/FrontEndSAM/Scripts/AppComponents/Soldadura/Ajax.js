
function AjaxJunta(spoolID) {
    loadingStart();
    $CapturasRapidas.CapturasRapidas.read({ id: spoolID, sinCaptura: $('input:radio[name=Muestra]:checked').val(), token: Cookies.get("token"), proceso: 2 }).done(function (data) {
        console.log("fecha nueva" + data.FechaSoldadura);
        $("#Junta").data("kendoComboBox").value("");
        $("#Junta").data("kendoComboBox").dataSource.data(data)
        loadingStop();
    });
}

function AjaxObtenerListaTaller() {
    loadingStart();
    if (Cookies.get("Proyecto") != undefined) {
        $Taller.Taller.read({ idProyecto: Cookies.get("Proyecto").split('°')[0], token: Cookies.get("token") }).done(function (data) {
            $("#inputTaller").data("kendoComboBox").value("");
            $("#inputTaller").data("kendoComboBox").dataSource.data(data);
            loadingStop();
        });
    }
}


function AjaxObtenerListaProcesos() {
    loadingStart();
    $CapturaSoldadura.Soldadura.read({ token: Cookies.get("token") }).done(function (data) {
        $("#inputProcesoRelleno").data("kendoDropDownList").value("");
        $("#inputProcesoRaiz").data("kendoDropDownList").value("");
        $("#inputProcesoRaiz").data("kendoDropDownList").setDataSource(data);
        $("#inputProcesoRelleno").data("kendoDropDownList").setDataSource(data);

        loadingStop();
    });
}



function ObtenerJSonGridSoldadura() {

    if (ExisteJunta()) {
        try {
            getGridSoldadura();

        } catch (e) {
            loadingStop();
           // alert("error:" + e.message);
        }
    }
    else
        displayMessage("CapturaArmadoMensajeJuntaExistente", "", '1');



}


function getGridSoldadura() {
    loadingStart();
    $CapturaSoldadura.Soldadura.read({ JsonCaptura: JSON.stringify(ArregloListadoCaptura()), lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = JSON.parse(data);
        for (var i = 0; i < array.length; i++) {
            array[i].FechaSoldadura  = new Date(ObtenerDato(array[i].FechaSoldadura, 1), ObtenerDato(array[i].FechaSoldadura, 2), ObtenerDato(array[i].FechaSoldadura, 3));//año, mes, dia
            ds.add(array[i]);
            if (!array[i].PermiteTerminadoRaiz)
                ds._data[i].procesoSoldaduraRaiz;
            if (!array[i].PermiteTerminadoRelleno)
                ds._data[i].procesoSoldaduraRelleno;

        }
        loadingStop();
    });
}

function ObtenerDato(fecha,tipoDatoObtener)
{
    var cultura = $("#language").val();
  
    switch (tipoDatoObtener) {
        case 1://anho
            return fecha.split('/')[2]
            break;
        case 2://mes
            if (cultura = 'es-MX')
                return fecha.split('/')[1]
            else
                return fecha.split('/')[0]
            break;
        case 3://dia
            if (cultura = 'es-MX')
                return fecha.split('/')[0]
            else
                return fecha.split('/')[1]
            break;
    }
}

function AjaxGuardarCaptura(arregloCaptura,tipoGuardar){
    try {
        var bandera = true, banderaProcesoRaiz = true, banderaProcesoRelleno = true;
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];


        for (index = 0; index < arregloCaptura.length; index++) {

            ListaDetalles[index] = {
                Accion: "", OrdenTrabajoSpoolID: "", JuntaSpoolID: "",
                TipoJuntaID: "", EtiquetaJunta: "", EtiquetaMaterial1: "", EtiquetaMaterial2: "",
                JuntaSoldaduraID: "", NumeroUnico1ID: "", NumeroUnico2ID: "", TallerID: "",
                ProcesoSoldaduraRaizID: "", ProcesoSoldaduraRellenoID: "", FechaSoldadura: "", ListaSoldaduraRaiz: "",
                ListaSoldaduraRelleno: "", ListaDetalleTrabajoAdicional: "", FechaReporte: "",
            };

            ListaDetalles[index].Accion = arregloCaptura[index].Accion;
            ListaDetalles[index].OrdenTrabajoSpoolID = arregloCaptura[index].idVal;
            ListaDetalles[index].JuntaSpoolID = arregloCaptura[index].JuntaID;
            ListaDetalles[index].TipoJuntaID = arregloCaptura[index].TipoJuntaID;
            ListaDetalles[index].EtiquetaJunta = arregloCaptura[index].Junta;
            ListaDetalles[index].EtiquetaMaterial1 = arregloCaptura[index].EtiquetaMaterial1;
            ListaDetalles[index].EtiquetaMaterial2 = arregloCaptura[index].EtiquetaMaterial2;
            ListaDetalles[index].JuntaSoldaduraID = arregloCaptura[index].JuntaSoldaduraID;
            ListaDetalles[index].NumeroUnico1ID = arregloCaptura[index].NumeroUnico1ID;
            ListaDetalles[index].NumeroUnico2ID = arregloCaptura[index].NumeroUnico2ID;
            ListaDetalles[index].TallerID = arregloCaptura[index].TallerID;
            ListaDetalles[index].ProcesoSoldaduraRaizID = arregloCaptura[index].procesoSoldaduraRaizID;
            ListaDetalles[index].ProcesoSoldaduraRellenoID = arregloCaptura[index].procesoSoldaduraRellenoID;
            ListaDetalles[index].FechaSoldadura = kendo.toString(arregloCaptura[index].FechaSoldadura, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim();

            if (ListaDetalles[index].TallerID == null || ListaDetalles[index].TallerID == "" || ListaDetalles[index].TallerID == undefined)
                bandera = false;
            if (arregloCaptura[index].PermiteTerminadoRaiz) {
                if (ListaDetalles[index].ProcesoSoldaduraRaizID == null || ListaDetalles[index].ProcesoSoldaduraRaizID == "" || ListaDetalles[index].ProcesoSoldaduraRaizID == undefined || ListaDetalles[index].ProcesoSoldaduraRaizID == 0)
                    banderaProcesoRaiz = false;
            }
            if (arregloCaptura[index].PermiteTerminadoRelleno) {
                if (ListaDetalles[index].ProcesoSoldaduraRellenoID == null || ListaDetalles[index].ProcesoSoldaduraRellenoID == "" || ListaDetalles[index].ProcesoSoldaduraRellenoID == undefined || ListaDetalles[index].ProcesoSoldaduraRellenoID == 0)
                    banderaProcesoRelleno = false;
            }



            ListaTrabajosAdicionalesEditados = [];
            for (j = 0; j < arregloCaptura[index].DetalleAdicional.length; j++) {

                ListaTrabajosAdicionalesEditados[j] = {
                    JuntaSpoolID: "", TallerID: "",
                    Accion: "", JuntaID: "", SoldaduraTrabajoAdicionalID: "", JuntaSoldaduraID: "",
                    TrabajoAdicionalID: "", ObreroID: "", Observacion: ""
                }

                if (arregloCaptura[index].DetalleAdicional[j].TrabajoAdicionalID == 0 || arregloCaptura[index].DetalleAdicional[j].ObreroID == 0)
                    ListaTrabajosAdicionalesEditados[j].Accion = 0;
                else {
                    ListaTrabajosAdicionalesEditados[j].Accion = arregloCaptura[index].DetalleAdicional[j].Accion;
                }


                ListaTrabajosAdicionalesEditados[j].JuntaID = arregloCaptura[index].DetalleAdicional[j].JuntaID;
                ListaTrabajosAdicionalesEditados[j].SoldaduraTrabajoAdicionalID = arregloCaptura[index].DetalleAdicional[j].SoldaduraTrabajoAdicionalID;
                ListaTrabajosAdicionalesEditados[j].JuntaSoldaduraID = arregloCaptura[index].JuntaSoldaduraID;
                ListaTrabajosAdicionalesEditados[j].JuntaSpoolID = arregloCaptura[index].DetalleAdicional[j].JuntaSpoolID;
                ListaTrabajosAdicionalesEditados[j].TrabajoAdicionalID = arregloCaptura[index].DetalleAdicional[j].TrabajoAdicionalID;
                ListaTrabajosAdicionalesEditados[j].TallerID = arregloCaptura[index].DetalleAdicional[j].TallerID
                ListaTrabajosAdicionalesEditados[j].ObreroID = arregloCaptura[index].DetalleAdicional[j].ObreroID;
                ListaTrabajosAdicionalesEditados[j].Observacion = arregloCaptura[index].DetalleAdicional[j].Observacion;
            }


            ListaRaizEditados = [];
            for (j = 0; j < arregloCaptura[index].Raiz.length; j++) {

                ListaRaizEditados[j] = {
                    Accion: "", JuntaSpoolID: "",
                    SoldaduraTrabajoAdicionalID: "", JuntaSoldaduraID: "",
                    TipoSoldaduraID: "", ObreroID: ""
                };
                if (arregloCaptura[index].Raiz[j].ObreroID == 0 || arregloCaptura[index].PermiteTerminadoRelleno)
                    ListaRaizEditados[j].Accion = 0;
                else {
                    ListaRaizEditados[j].Accion = arregloCaptura[index].Raiz[j].Accion;
                }


                ListaRaizEditados[j].JuntaSoldaduraSoldadoID = arregloCaptura[index].Raiz[j].JuntaSoldaduraSoldadoID;
                ListaRaizEditados[j].JuntaSoldaduraID = arregloCaptura[index].JuntaSoldaduraID;
                ListaRaizEditados[j].TipoSoldaduraID = arregloCaptura[index].procesoSoldaduraRaizID;
                ListaRaizEditados[j].ObreroID = arregloCaptura[index].Raiz[j].ObreroID;
                ListaRaizEditados[j].JuntaSpoolID = arregloCaptura[index].JuntaID;
            }

            ListaRellenoEditados = [];
            for (j = 0; j < arregloCaptura[index].Relleno.length; j++) {

                ListaRellenoEditados[j] = {
                    Accion: "", JuntaSpoolID: "", SoldaduraTrabajoAdicionalID: "",
                    JuntaSoldaduraID: "", ObreroID: "", TipoSoldaduraID: "",
                };
                if (arregloCaptura[index].Raiz[j].ObreroID == 0 || arregloCaptura[index].PermiteTerminadoRaiz)
                    ListaRellenoEditados[j].Accion = 0;
                else {
                    ListaRellenoEditados[j].Accion = arregloCaptura[index].Relleno[j].Accion;
                }


                ListaRellenoEditados[j].JuntaSoldaduraSoldadoID = arregloCaptura[index].Relleno[j].JuntaSoldaduraSoldadoID;
                ListaRellenoEditados[j].JuntaSoldaduraID = arregloCaptura[index].JuntaSoldaduraID;
                ListaRellenoEditados[j].TipoSoldaduraID = arregloCaptura[index].procesoSoldaduraRellenoID;
                ListaRellenoEditados[j].ObreroID = arregloCaptura[index].Relleno[j].ObreroID;
                ListaRellenoEditados[j].JuntaSpoolID = arregloCaptura[index].JuntaID;
            }

            ListaDetalles[index].ListaSoldaduraRelleno = ListaRellenoEditados;
            ListaDetalles[index].ListaSoldaduraRaiz = ListaRaizEditados;
            ListaDetalles[index].ListaDetalleTrabajoAdicional = ListaTrabajosAdicionalesEditados;
        }

        Captura[0].Detalles = ListaDetalles;
        if (banderaProcesoRaiz) {
            if (banderaProcesoRelleno) {
                if (bandera) {
                    if (Captura[0].Detalles.length > 0) {
                        loadingStart();
                        $CapturaSoldadura.Soldadura.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                            $CapturaSoldadura.Soldadura.read({ JsonCaptura: JSON.stringify(ArregloListadoSpoolID()), lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (result) {
                                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                                    //mensaje = "Se guardo correctamente la informacion" + "-0";
                                    displayMessage("CapturaSoldaduraMensajeGuardadoExitoso", "", "0");

                                    if (tipoGuardar == 1) {
                                        Limpiar();
                                        AjaxCargarCamposPredeterminados();
                                    }

                                    else {
                                        opcionHabilitarView(true, "FieldSetView");
                                        $("#grid").data("kendoGrid").dataSource.data([]);
                                        var ds = $("#grid").data("kendoGrid").dataSource;
                                        var array = JSON.parse(result);
                                        for (var i = 0; i < array.length; i++) {
                                            array[i].FechaSoldadura  = new Date(ObtenerDato(array[i].FechaSoldadura, 1), ObtenerDato(array[i].FechaSoldadura, 2), ObtenerDato(array[i].FechaSoldadura, 3));//año, mes, dia
                                            ds.add(array[i]);
                                        }
                                    }
                                    loadingStop();

                                }
                                else  /*(data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") */ {
                                    //mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2";
                                    displayMessage("CapturaMensajeGuardadoErroneo", data.ReturnMessage[0], '1');
                                    loadingStop();

                                }
                            });
                        });
                    }
                    
                }
                else {
                    displayMessage("CapturaSoldaduraMensajeErrorTaller", "", '1');
                }
            }
            else {
                displayMessage("CapturaSoldaduraMensajeErrorProcesoRelleno", "", '1');
            }
        }
        else {
            displayMessage("CapturaSoldaduraMensajeErrorProcesoRaiz", "", '1');
        }
    } catch (e) {
        displayMessage("Mensajes_error", e.message, '2');
    }

};


function AjaxCargarReporteJuntas() {
    loadingStart();
    if (ExisteJunta()) {
        var listadoReporte = ArregloListadoReporte();
        var todosRepetidos = false;
       
            for (var i = 0; i < listadoReporte.length; i++) {
                if (ExisteJuntaReporte(listadoReporte[i].JuntaID)) {
                    todosRepetidos = true;
                    $CapturaSoldadura.Soldadura.read({ JsonCaptura: JSON.stringify(listadoReporte[i]), lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
                        var ds = $("#grid").data("kendoGrid").dataSource;
                        var array = JSON.parse(data);
                        for (var i = 0; i < array.length; i++) {
                            array[i].FechaSoldadura = new Date(ObtenerDato(array[i].FechaSoldadura, 1), ObtenerDato(array[i].FechaSoldadura, 2), ObtenerDato(array[i].FechaSoldadura, 3));//año, mes, dia
                            ds.add(array[i]);
                        }
                        loadingStop();
                    });
                }
            }
            if(!todosRepetidos)
                loadingStop();
       
    }
    else {
        displayMessage("CapturaArmadoMensajeJuntaExistente", "", '1');
        loadingStop();
    }
}


function AjaxCargarCamposPredeterminados() {
    
    loadingStart();
    $CapturaSoldadura.Soldadura.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {

        var NewDate = kendo.toString(data.FechaSoldadura, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);

        endRangeDate.val(NewDate);

      
        if (data.TipoCaptura == "Reporte") {
            $('input:radio[name=TipoAgregado]:nth(0)').attr('checked', true);
            $('input:radio[name=TipoAgregado]:nth(1)').removeAttr('checked');
            $("#styleReporte").addClass("active");
            $("#styleListado").removeClass("active");
            $('input:radio[name=TipoAgregado]:nth(0)').attr('checked', true).trigger("change");
        }
        else if (data.TipoCaptura == "Lista") {
            $('input:radio[name=TipoAgregado]:nth(0)').removeAttr('checked');
            $('input:radio[name=TipoAgregado]:nth(1)').attr('checked', true);
            $("#styleListado").addClass("active");
            $("#styleReporte").removeClass("active");
            $('input:radio[name=TipoAgregado]:nth(1)').attr('checked', true).trigger("change");
        }
        //eventoCambioTipoListado();
        loadingStop();
    });

};

function AjaxCargarCamposPredeterminadosCambiaTipoVista() {
    
    loadingStart();
    $CapturaSoldadura.Soldadura.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {

        var NewDate = kendo.toString(data.FechaSoldadura, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);

        endRangeDate.val(NewDate);

        if (data.Muestra == "Sincaptura") {
            $('input:radio[name=Muestra]:nth(0)').attr('checked');
            $('input:radio[name=Muestra]:nth(1)').removeAttr('checked');

        }
        else if (data.Muestra == "Todos") {
            $('input:radio[name=Muestra]:nth(0)').removeAttr('checked');
            $('input:radio[name=Muestra]:nth(1)').attr('checked', true);

        }

        if (data.Llena == "Todos") {
            $('input:radio[name=LLena]:nth(0)').attr('checked', true);
            $('input:radio[name=LLena]:nth(1)').removeAttr('checked');

        }
        else if (data.Llena == "Vacios") {
            $('input:radio[name=LLena]:nth(0)').removeAttr('checked');
            $('input:radio[name=LLena]:nth(1)').attr('checked', true);

        }
        
        //
       

        loadingStop();
    });
}


function AjaxActualizaSoldadoresRaiz(ProcesoSoldaduraID, tipoJunta, diametro, espesor, cedula) {
    loadingStart();
    $CapturaSoldadura.Soldadura.read({ token: Cookies.get("token"), procesoSoldaduraID: ProcesoSoldaduraID, tipoJunta: tipoJunta, diametro: diametro, espesor: espesor, cedula: cedula, proceso: 1, idProyecto: Cookies.get("Proyecto").split('°')[0] }).done(function (data) {
        ItemSeleccionado.ListadoRaiz = data;
        loadingStop();
    });
}

function AjaxActualizaSoldadoresRelleno(ProcesoSoldaduraID, tipoJunta, diametro, espesor, cedula) {
    loadingStart();
    $CapturaSoldadura.Soldadura.read({ token: Cookies.get("token"), procesoSoldaduraID: ProcesoSoldaduraID, tipoJunta: tipoJunta, diametro: diametro, espesor: espesor, cedula: cedula, proceso: 0, idProyecto: Cookies.get("Proyecto").split('°')[0] }).done(function (data) {
        ItemSeleccionado.ListadoRelleno = data;
        loadingStop();
    });
}