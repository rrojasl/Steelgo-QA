
function AjaxCargarCamposPredeterminados() {

    loadingStart();
    $Soldadura.Soldadura.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            var NewDate = kendo.toString(data.FechaSoldadura, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);

            endRangeDate.val(NewDate);


            if (data.TipoCaptura == "Reporte") {
                $('input:radio[name=TipoAgregado]:nth(0)').trigger("click");
                //$('input:radio[name=TipoAgregado]:nth(1)').removeAttr('checked');
                $("#styleReporte").addClass("active");
                $("#styleListado").removeClass("active");
                $('input:radio[name=TipoAgregado]:nth(0)').attr('checked', true).trigger("change");
            }
            else if (data.TipoCaptura == "Lista") {
                //$('input:radio[name=TipoAgregado]:nth(0)').removeAttr('checked');
                $('input:radio[name=TipoAgregado]:nth(1)').trigger("click");
                $("#styleListado").addClass("active");
                $("#styleReporte").removeClass("active");
                $('input:radio[name=TipoAgregado]:nth(1)').attr('checked', true).trigger("change");
            }
            //eventoCambioTipoListado();
        }
        loadingStop();
    });

};

function AjaxObtenerListaTaller() {
    loadingStart();
    if (Cookies.get("Proyecto") != undefined) {
        $Soldadura.Soldadura.read({ idProyecto: Cookies.get("Proyecto").split('°')[0], token: Cookies.get("token") }).done(function (data) {
            if (Error(data)) {
                $("#inputTaller").data("kendoComboBox").value("");
                $("#inputTaller").data("kendoComboBox").dataSource.data(data);
            }
            loadingStop();
        });
    }
}


function AjaxCargarCamposPredeterminadosCambiaTipoVista() {

    loadingStart();
    $Soldadura.Soldadura.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            var NewDate = kendo.toString(data.FechaSoldadura, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);

            endRangeDate.val(NewDate);

            if (data.Muestra == "Sincaptura") {
                $('input:radio[name=Muestra]:nth(0)').trigger("click");
                //$('input:radio[name=Muestra]:nth(1)').removeAttr('checked');

            }
            else if (data.Muestra == "Todos") {
                //$('input:radio[name=Muestra]:nth(0)').removeAttr('checked');
                $('input:radio[name=Muestra]:nth(1)').trigger("click");

            }

            if (data.Llena == "Todos") {
                $('input:radio[name=LLena]:nth(0)').trigger("click");
                //$('input:radio[name=LLena]:nth(1)').removeAttr('checked');

            }
            else if (data.Llena == "Vacios") {
                //$('input:radio[name=LLena]:nth(0)').removeAttr('checked');
                $('input:radio[name=LLena]:nth(1)').trigger("click");

            }

            //

        }
        loadingStop();
    });
};

function AjaxJunta(spoolID) {
    loadingStart();
    $CapturasRapidas.CapturasRapidas.read({ id: spoolID, sinCaptura: $('input:radio[name=Muestra]:checked').val(), token: Cookies.get("token"), proceso: 2 }).done(function (data) {
        if (Error(data)) {
            $("#Junta").data("kendoComboBox").value("");
            $("#Junta").data("kendoComboBox").dataSource.data(data)
        }
        loadingStop();
    });
};


function AjaxJuntaModoSpool(spoolID) {
    loadingStart();


    $CapturasRapidas.CapturasRapidas.read({ id: spoolID, sinCaptura: $('input:radio[name=Muestra]:checked').val(), token: Cookies.get("token"), proceso: 2 }).done(function (data) {
        if (Error(data)) {
            $("#Junta").data("kendoComboBox").value("");
            $("#Junta").data("kendoComboBox").dataSource.data(data);
        }
        loadingStop();
        AjaxCargarReporteJuntas();
    });
}


function AjaxCargarReporteJuntas() {

    var listadoReporte = ArregloListadoReporte();
    var elementoNoEncontrado = false;

    CapturaJuntas = [];
    CapturaJuntas[0] = { Detalles: "" };
    ListaDetalles = [];

    ListaDetalles = listadoReporte;
    CapturaJuntas[0].Detalles = ListaDetalles;


    if (listadoReporte.length > 0) {
        loadingStart();
        $Soldadura.Soldadura.read({ JsonCaptura: JSON.stringify(listadoReporte[0]), isReporte: true, lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
            if (Error(data)) {
                var elementosModificados = "";
                var elementosNoModificados = "";
                var ds = $("#grid").data("kendoGrid").dataSource;
                var array = JSON.parse(data);

                for (var i = 0; i < array.length; i++) {
                    if (!ExisteJuntaEnSpool(array[i])) {
                        ds.insert(0, array[i]);

                        if (array[i].FechaSoldadura != null) {
                            array[i].FechaSoldadura = new Date(ObtenerDato(array[i].FechaSoldadura, 1), ObtenerDato(array[i].FechaSoldadura, 2), ObtenerDato(array[i].FechaSoldadura, 3));//año, mes, dia
                        }
                        elementoNoEncontrado = true;

                        if (elementosModificados != "")
                            elementosModificados += ", " + array[i].Junta;
                        else
                            elementosModificados = array[i].Junta;
                    }
                    else {
                        for (var j = 0; j < ds._data.length; j++) {
                            if (array[i].SpoolID == ds._data[j].SpoolID && array[i].JuntaID == ds._data[j].JuntaID && ds._data[j].Accion == 3) {
                                ds._data[j].DetalleJunta = array[i].DetalleJunta;
                                ds._data[j].TemplateSoldadoresRaiz = array[i].TemplateSoldadoresRaiz;
                                ds._data[j].TemplateSoldadoresRelleno = array[i].TemplateSoldadoresRelleno;
                                ds._data[j].TipoJuntaID = array[i].TipoJuntaID;
                                ds._data[j].Accion = array[i].Accion;
                                ds._data[j].procesoSoldaduraRaizID = array[i].procesoSoldaduraRaizID;
                                ds._data[j].procesoSoldaduraRellenoID = array[i].procesoSoldaduraRellenoID;
                                ds._data[j].procesoSoldaduraRaiz = array[i].procesoSoldaduraRaiz;
                                ds._data[j].procesoSoldaduraRelleno = array[i].procesoSoldaduraRelleno;
                                ds._data[j].Proyecto = array[i].Proyecto;
                                ds._data[j].IDProyecto = array[i].IDProyecto;
                                ds._data[j].IdOrdenTrabajo = array[i].IdOrdenTrabajo;
                                ds._data[j].OrdenTrabajo = array[i].OrdenTrabajo;
                                ds._data[j].idVal = array[i].idVal;
                                ds._data[j].idText = array[i].idText;
                                ds._data[j].SpoolID = array[i].SpoolID;
                                ds._data[j].JuntaID = array[i].JuntaID;
                                ds._data[j].Junta = array[i].Junta;
                                ds._data[j].TipoJunta = array[i].TipoJunta;
                                ds._data[j].Cedula = array[i].Cedula;
                                ds._data[j].Diametro = array[i].Diametro;
                                ds._data[j].TallerID = array[i].TallerID;
                                ds._data[j].Taller = array[i].Taller;
                                ds._data[j].TemplateTrabajosAdicionales = array[i].TemplateTrabajosAdicionales;
                                ds._data[j].FechaSoldadura = array[i].FechaSoldadura;
                                ds._data[j].listaTrabajosAdicionalesSoldadura = array[i].listaTrabajosAdicionalesSoldadura;
                                ds._data[j].ListaTaller = array[i].ListaTaller;
                                ds._data[j].ListaWPS = array[i].ListaWPS;
                                ds._data[j].ListaCedulas = array[i].ListaCedulas;

                                if (array[i].FechaSoldadura != null) {
                                    ds._data[j].FechaSoldadura = new Date(ObtenerDato(array[i].FechaSoldadura, 1), ObtenerDato(array[i].FechaSoldadura, 2), ObtenerDato(array[i].FechaSoldadura, 3));//año, mes, dia
                                }

                                if (elementosModificados != "")
                                    elementosModificados += ", " + array[i].Junta;
                                else
                                    elementosModificados = array[i].Junta;

                                var elementgrid = ds._data.splice(j, 1);
                                ds._data.unshift(elementgrid[0]);

                                elementoNoEncontrado = true;
                            }
                            else if (array[i].SpoolID == ds._data[j].SpoolID && array[i].JuntaID == ds._data[j].JuntaID) {
                                //Elementos no agregados
                                if (elementosNoModificados != "")
                                    elementosNoModificados += ", " + array[i].Junta;
                                else
                                    elementosNoModificados = array[i].Junta;
                            }
                        }

                    }
                }
                $("#grid").data("kendoGrid").dataSource.sync();

                loadingStop();
                $("#InputID").data("kendoComboBox").value("");

                if (elementosModificados != "") {
                    displayNotify("", _dictionary.CapturaSoldaduraMsgExiste[$("#language").data("kendoDropDownList").value()] +
                        elementosModificados + _dictionary.CapturaArmadoMsgNuevoEnReporte[$("#language").data("kendoDropDownList").value()], '0');
                }
                if (elementosNoModificados != "") {
                    displayNotify("", _dictionary.CapturaSoldaduraMsgExiste[$("#language").data("kendoDropDownList").value()] +
                        elementosNoModificados + _dictionary.CapturaArmadoMsgExisteReporte[$("#language").data("kendoDropDownList").value()], '2');
                }
            }
        });
    } else {
        if ($('input:radio[name=Muestra]:checked').val() == "Sin Capturar") {
            displayNotify("CapturaSoldaduraNoExistenJuntasSpool", "", "1");
        } else {
            displayNotify("CapturaSoldaduraNoTieneJuntas", "", "2");
        }
    }
    $('#ButtonAgregar').prop("disabled", false);
}



function AjaxObtenerListadoWPS(dataItem) {

    loadingStart();
    $Soldadura.Soldadura.read({ ProyectoID: Cookies.get("Proyecto").split('°')[0], ProcesoRaizID: dataItem.procesoSoldaduraRaizID, ProcesoRellenoID: dataItem.procesoSoldaduraRellenoID, Espesor: dataItem.Espesor, lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            dataItem.ListaWPS = data;
        }
        loadingStop();
    });
}


function AjaxObtenerListadoSoldadores(dataItem, TipoProceso) {

    if (TipoProceso == 0)
        procesoSoldadura = dataItem.procesoSoldaduraRellenoID;
    else
        procesoSoldadura = dataItem.procesoSoldaduraRaizID;
    loadingStart();
    $Soldadura.Soldadura.read({ TipoProceso: TipoProceso, ProcesoSoldadura: procesoSoldadura, Espesor: dataItem.Espesor, Diametro: dataItem.Diametro, lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            if (TipoProceso == 0) {
                listadoSoldadoresParaRelleno = data;
                GridPopupSoldadoresRellenoCapturados(dataItem);

            }
            else {
                listadoSoldadoresParaRaiz = data;
                GridPopupSoldadoresRaizCapturados(dataItem);
            }
        }
        loadingStop();
    });
}

function AjaxObtenerListadoColadas(dataItem, TipoProceso) {

    if (TipoProceso == 0)
        procesoSoldadura = dataItem.procesoSoldaduraRellenoID;
    else
        procesoSoldadura = dataItem.procesoSoldaduraRaizID;
    loadingStart();
    $Soldadura.Soldadura.read({ ProcesoSoldadura: procesoSoldadura, esRaiz: TipoProceso, WPSID: dataItem.WPSID, FamiliaMaterialID: dataItem.FamiliaMaterialID, lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            listadoColada = data;
            AjaxObtenerListadoSoldadores(dataItem, TipoProceso);
        }
        loadingStop();
    });
}



function ObtenerJSonGridSoldadura() {
    try {

        loadingStart();
        $Soldadura.Soldadura.read({ JsonCaptura: JSON.stringify(ArregloListadoCaptura()), isReporte: false, lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
            if (Error(data)) {
                var ds = $("#grid").data("kendoGrid").dataSource;
                var array = JSON.parse(data);
                var elementoNoEncontrado = false;

                if (ExisteJunta(array[0])) {
                    // Proceso validar accion
                    for (var j = 0; j < ds._data.length; j++) {
                        if (array[0].SpoolID == ds._data[j].SpoolID && array[0].JuntaID == ds._data[j].JuntaID && ds._data[j].Accion == 3) { //SPOOL JUNTA ACCION
                            ds._data[j].DetalleJunta = array[0].DetalleJunta;
                            ds._data[j].TemplateSoldadoresRaiz = array[0].TemplateSoldadoresRaiz;
                            ds._data[j].TemplateSoldadoresRelleno = array[0].TemplateSoldadoresRelleno;
                            ds._data[j].TipoJuntaID = array[0].TipoJuntaID;
                            ds._data[j].Accion = array[0].Accion;
                            ds._data[j].procesoSoldaduraRaizID = array[0].procesoSoldaduraRaizID;
                            ds._data[j].procesoSoldaduraRellenoID = array[0].procesoSoldaduraRellenoID;
                            ds._data[j].procesoSoldaduraRaiz = array[0].procesoSoldaduraRaiz;
                            ds._data[j].procesoSoldaduraRelleno = array[0].procesoSoldaduraRelleno;
                            ds._data[j].Proyecto = array[0].Proyecto;
                            ds._data[j].IDProyecto = array[0].IDProyecto;
                            ds._data[j].IdOrdenTrabajo = array[0].IdOrdenTrabajo;
                            ds._data[j].OrdenTrabajo = array[0].OrdenTrabajo;
                            ds._data[j].idVal = array[0].idVal;
                            ds._data[j].idText = array[0].idText;
                            ds._data[j].SpoolID = array[0].SpoolID;
                            ds._data[j].JuntaID = array[0].JuntaID;
                            ds._data[j].Junta = array[0].Junta;
                            ds._data[j].TipoJunta = array[0].TipoJunta;
                            ds._data[j].Cedula = array[0].Cedula;
                            ds._data[j].Diametro = array[0].Diametro;
                            ds._data[j].TallerID = array[0].TallerID;
                            ds._data[j].Taller = array[0].Taller;
                            ds._data[j].TemplateTrabajosAdicionales = array[0].TemplateTrabajosAdicionales;
                            ds._data[j].FechaSoldadura = array[0].FechaSoldadura;
                            ds._data[j].listaTrabajosAdicionalesSoldadura = array[0].listaTrabajosAdicionalesSoldadura;
                            ds._data[j].ListaTaller = array[0].ListaTaller;
                            ds._data[j].ListaWPS = array[0].ListaWPS;
                            ds._data[j].ListaCedulas = array[0].ListaCedulas;

                            if (array[0].FechaSoldadura != null) {
                                ds._data[j].FechaSoldadura = new Date(ObtenerDato(array[0].FechaSoldadura, 1), ObtenerDato(array[0].FechaSoldadura, 2), ObtenerDato(array[0].FechaSoldadura, 3));//año, mes, dia
                            }

                            var elementgrid = ds._data.splice(j, 1);
                            ds._data.unshift(elementgrid[0]);

                            displayNotify("",
                            _dictionary.CapturaSoldaduraMsgExiste[$("#language").data("kendoDropDownList").value()] +
                            array[0].Junta +
                            _dictionary.CapturaSoldaduraMsgNuevoEnListado[$("#language").data("kendoDropDownList").value()], '0');

                            elementoNoEncontrado = true;
                        }
                    }
                    if (!elementoNoEncontrado)
                        displayNotify("",
                        _dictionary.CapturaSoldaduraMsgExiste[$("#language").data("kendoDropDownList").value()] +
                        array[0].Junta +
                        _dictionary.CapturaSoldaduraMsgExisteListado[$("#language").data("kendoDropDownList").value()], '2');
                }
                else {
                    //Proceso insertar elemento
                    for (var i = 0; i < array.length; i++) {
                        if (array[i].FechaSoldadura != null) {
                            array[i].FechaSoldadura = new Date(ObtenerDato(array[i].FechaSoldadura, 1), ObtenerDato(array[i].FechaSoldadura, 2), ObtenerDato(array[i].FechaSoldadura, 3));//año, mes, dia
                        }
                        $("#Junta").val("");
                    }



                    $("#Junta").data("kendoComboBox").value("");

                    ds.insert(0, array[0]);


                    if (array.length == 0) {
                        displayNotify("",
                            _dictionary.CapturaSoldaduraJuntaCapturada[$("#language").data("kendoDropDownList").value()], '1');
                    }
                    else {
                        displayNotify("",
                            _dictionary.CapturaSoldaduraMsgExiste[$("#language").data("kendoDropDownList").value()] +
                            array[0].Junta +
                            _dictionary.CapturaSoldaduraMsgNuevoEnListado[$("#language").data("kendoDropDownList").value()], '0');
                    }

                    //displayNotify("", 'La junta ' + $('#Junta').data("kendoComboBox").value() + ' ya existe en el listado', '2');
                    $('#ButtonAgregar').prop("disabled", false);
                }
            }
            loadingStop();
        });
        //$('#ButtonAgregar').prop("disabled", false);
    } catch (e) {
        loadingStop();
        displayNotify("Mensajes_error", e.message, '1');
        //$('#ButtonAgregar').prop("disabled", false);
    }
}


function ObtenerDato(fecha, tipoDatoObtener) {
    var cultura = $("#language").val();

    switch (tipoDatoObtener) {
        case 1://anho
            return fecha.split('/')[2]
            break;
        case 2://mes
            if (cultura == 'es-MX')
                return fecha.split('/')[1] - 1
            else
                return fecha.split('/')[0] - 1
            break;
        case 3://dia
            if (cultura == 'es-MX')
                return fecha.split('/')[0]
            else
                return fecha.split('/')[1]
            break;
    }
}