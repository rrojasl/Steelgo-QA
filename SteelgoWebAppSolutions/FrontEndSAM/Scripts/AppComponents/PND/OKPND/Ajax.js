var SpoolContiene = "";
var ProyectoIDAnterior = 0;
//var TipoMuestraPredeterminadoID = 3049;
var TipoMuestraPredeterminadoID = 3052;

function AjaxCargarCamposPredeterminados() {
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (Error(data)) {
            if (data == "sin captura") {
                $('input[name="Muestra"][value="SinCaptura"]').prop('checked', true);
            }
            else if (data == "Todos") {
                $('input[name="Muestra"][value="Todos"]').prop('checked', true);
            }
        }
        loadingStop();
    });

    AjaxGetListaProyectos();
};

function AjaxGetListaProyectos() {
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            $("#Proyecto").data("kendoComboBox").dataSource.data(data);

            if ($("#Proyecto").data("kendoComboBox").dataSource._data.length == 2) {
                $("#Proyecto").data("kendoComboBox").select(1);
                $("#Proyecto").data("kendoComboBox").trigger("change");
                ProyectoIDAnterior = data[1].ProyectoID;
            }
            else {
                ProyectoIDAnterior = 0;
            }
        }
    });
}

function AjaxGetNumeroElementos(ProyectoID, NumControl) {
    loadingStart();    
    $OK.OK.read({ token: Cookies.get("token"), ProyectoID: ProyectoID, NumControl: NumControl, Muestra: $('input:radio[name=Muestra]:checked').val() }).done(function (data) {        
        if (data > 100) {
            var ventanaConfirmBusqueda = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.TituloPopupCancelar[$("#language").data("kendoDropDownList").value()],
                visible: false,
                width: "45%",
                height: "auto",
                draggable: false,
                actions: [],
                modal: true,
                animation: {
                    close: true,
                    open: false
                }
            }).data("kendoWindow");

            ventanaConfirmBusqueda.content('<center>' + _dictionary.EmbarqueAlertaCantidadRegistros[$("#language").data("kendoDropDownList").value()] + '</center>' +
                "</br><center><button class='btn btn-blue' id='btnContinuarBusqueda'>" + _dictionary.lblSi[$("#language").data("kendoDropDownList").value()] + "</button> <button class='btn btn-blue' id='btnCancelarBusqueda'>" + _dictionary.lblNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");

            ventanaConfirmBusqueda.open().center();
            $("#btnContinuarBusqueda").click(function (e) {
                ventanaConfirmBusqueda.close();
                AjaxGetListaElementos(ProyectoID, NumControl);
            });

            $("#btnCancelarBusqueda").click(function () {
                ventanaConfirmBusqueda.close();
                loadingStop();
            });
        } else {
            if (parseInt(data) == 0) {
                displayNotify("ErrorNoDatosOtroProyecto", "", "1");
                $("#grid").data("kendoGrid").dataSource.data([]);
                FiltroMostrar(0);
            } else {
                AjaxGetListaElementos(ProyectoID, NumControl);
            }            
        }
    });    
}

function AjaxGetListaElementos(ProyectoID, NumControl) {
    loadingStart();
    SpoolContiene = NumControl;
    try {
        $OK.OK.read({ token: Cookies.get("token"), Lenguaje: $("#language").val(), ProyectoID: ProyectoID, NumControl: NumControl, Muestra: $('input:radio[name=Muestra]:checked').val(), OPC: '1' }).done(function (data) {
            $("#grid").data("kendoGrid").dataSource.data([]);
            var dataSource = $("#grid").data("kendoGrid").dataSource;
            if (Error(data)) {
                $("#InputNumeroControl").val(SpoolContiene.toString().toUpperCase());
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Coincide != 0 && data[i].Coincide > 1) {
                        dataSource.add(data[i]);
                    } else {
                        displayNotify("EmbarqueCargaMsjErrorSpoolAgregarProyectoIncorrecto", "", "1");
                        dataSource.page(0);
                    }
                }
                var mostrar = $('input:radio[name=Muestra]:checked').val();
                if (mostrar == 'SinCaptura')
                    FiltroMostrar(0);
                else FiltroMostrar(1);
            }
            loadingStop();
        });
    } catch (e) {
        displayNotify("", "Error: " + e.message, "2");
    }
}

function AjaxGuardarCaptura(arregloCaptura, tipoGuardado) {
    var proyectoID = $("#Proyecto").data("kendoComboBox").value();
    Captura = [];
    Captura[0] = { Detalle: "" };
    ListaCaptura = [];
    var cont = 0;
    for (var i = 0; i < arregloCaptura.length; i++) {
        ListaCaptura[cont] = {
            //SpoolWorkStatusID: 0,
            SpoolID: 0,
            OrdenTrabajoSpoolID: 0,            
            OK: 0,
        }
        //ListaCaptura[cont].SpoolWorkStatusID = arregloCaptura[i].SpoolWorkStatusID;
        ListaCaptura[cont].SpoolID = arregloCaptura[i].SpoolID;
        ListaCaptura[cont].OrdenTrabajoSpoolID = arregloCaptura[i].OrdenTrabajoSpoolID;
        ListaCaptura[cont].OK = arregloCaptura[i].OK;
        cont++;
    }

    Captura[0].Detalle = ListaCaptura;
    var ds = $("#grid").data("kendoGrid").dataSource;
    if (ds._data.length > 0) {
        if (Captura[0].Detalle.length > 0) {
            $("#InputNumeroControl").val(SpoolContiene);
            $OK.OK.create(Captura[0], { lenguaje: $("#language").val(), ProyectoID: proyectoID, OPC: '1', token: Cookies.get("token"), param: true }).done(function (data) {
                if (Error(data)) {
                    if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "OK") {
                        if (data.ReturnMessage[0] != undefined) {
                            if (tipoGuardado == 1) {
                                Limpiar();
                                opcionHabilitarView(false, "FieldSetView");
                            }
                            else {
                                $('input[name="Muestra"][value="Todos"]').prop('checked', true);
                                AjaxGetListaElementos($("#Proyecto").data("kendoComboBox").value(), $("#InputNumeroControl").val(), $('input:radio[name=Muestra]:checked').val());
                                opcionHabilitarView(true, "FieldSetView");
                            }

                            displayNotify("MensajeGuardadoExistoso", "", "0");
                        }
                    } else {
                        opcionHabilitarView(false, "FieldSetView");
                    }
                }
            });
        } else {
            displayNotify("EditarRequisicionExcepcionGuardado", "", "1");
        }
    } else {
        displayNotify("EditarRequisicionExcepcionGuardado", "", "1");
    }
}

function AjaxGuardadoMasivo(data) {
    var OK = false;
    CapturaMasiva = [];
    CapturaMasiva[0] = { Detalle: "" };
    CapturaMasiva[0].Detalle = JSON.stringify(data);
    var proyectoID = $("#Proyecto").data("kendoComboBox").value();
    //--------MANDO OPC PARA EJECUTAR EL IF DEL STORE CUANDO SEA OK PND----------//
    $OK.OK.create(CapturaMasiva[0], { lenguaje: $("#language").val(), token: Cookies.get("token"), ProyectoID: proyectoID, OPC: '1' }).done(function (data) {
        if (Error(data)) {
            download(data, "ResultadoCargaMasiva.csv", "text/csv");
            $("#grid").data("kendoGrid").dataSource.data([]);
            displayNotify("MensajeGuardadoExistoso", "", "0");
            OK = true;
        }
    });
    return OK;
};

function AjaxObtenerJuntas(SpoolID) {
    try {
        if (SpoolID != undefined || SpoolID != "" || SpoolID != null) {
            $OK.OK.read({ token: Cookies.get("token"), Lenguaje: $("#language").val(), SpoolID: SpoolID }).done(function (data) {                
                //LlenarGridPopUp(data.ListaDetalles);
                if (Error) {
                    LlenarGridPopUp(data);
                }
            });
        }
    } catch (e) {
        displayNotify("", "Ocurrion un Error: " + e.message, "2");
        return;
    }
}