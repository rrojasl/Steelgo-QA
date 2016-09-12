
function AjaxProyecto() {


    loadingStart();
    //console.log($CapturaReporteRT);
    $ReporteRT.ReporteRT.read({ token: Cookies.get("token") }).done(function (data) {
        //$Almacenaje.Almacenaje.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {

            /*var data = [{ ProyectoID: 1, Nombre: 'Proyecto 1' }, { ProyectoID: 2, Nombre: 'Proyecto 2' }];*/
            $("#inputProyecto").data("kendoComboBox").value("");
            $("#inputProyecto").data("kendoComboBox").dataSource.data(data);
            if (data.length == 1) {
                $("#inputProyecto").data("kendoComboBox").select(0);
                AjaxProveedor(data[0].ProyectoID, data[0].PatioID)
            }
            //else
            //    ajaxGridPrincipal($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
        }
        loadingStop();
    });


    //var token = Cookies.get("token");
    //var respuesta = 1;
    //$EntregaPlacasGraficas.EntregaPlacasGraficas.read({ token: token, numeroCatalogo: respuesta }).done(function (data) {
    //    alert('xD');
    //    //$("#inputDocumentoRecibido").data("kendoComboBox").dataSource.data([]);
    //    //$("#inputDocumentoRecibido").data("kendoComboBox").dataSource.data(data);
    //    //AjaxCargaListaDocumentoEstatus();
    //});
}



function AjaxProveedor(proyectoID, patioID) {
    loadingStart();
    //console.log($CapturaReporteRT);
    $ReporteRT.ReporteRT.read({ token: Cookies.get("token"), proyectoID: proyectoID, patioID: patioID }).done(function (data) {
        //$Almacenaje.Almacenaje.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {

            //var data = null;
            //data = [{ ProveedorID: 1, Nombre: 'Juan 1.1' }, { ProveedorID: 2, Nombre: 'Juan 1.2' }, { ProveedorID: 3, Nombre: 'Juan 1.3' }];
            
            $("#inputProveedor").data("kendoComboBox").value("");
            $("#inputProveedor").data("kendoComboBox").dataSource.data(data);

            if (data.length == 1) {
                $("#inputProveedor").data("kendoComboBox").select(0);
                AjaxRequisicion($("#inputProyecto").data("kendoComboBox").value(), data[0].ProveedorID)
            }
            //else
            //    ajaxGridPrincipal($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
        }
        loadingStop();
    });

}

function AjaxRequisicion(proyectoID, proveedorID) {
    loadingStart();
    //console.log($CapturaReporteRT);
    $ReporteRT.ReporteRT.read({ token: Cookies.get("token"), proyectoID: proyectoID, proveedorID: proveedorID, distinct: 0 }).done(function (data) {
        //$Almacenaje.Almacenaje.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {

            //var data = null;
            //data = [{ RequisicionID: 1, Folio: 'Folio 1', FuenteID: 1, TurnoID: 1 }, { RequisicionID: 2, Folio: 'Folio 2', FuenteID: 2, TurnoID: 2 }, { RequisicionID: 3, Folio: 'Folio 3', FuenteID: 2, TurnoID: 3 }, { RequisicionID: 4, Folio: 'Folio 4', FuenteID: 1, TurnoID: '' }];

            $("#inputRequisicion").data("kendoComboBox").value("");
            $("#inputRequisicion").data("kendoComboBox").dataSource.data(data);

            if (data.length == 1) {
                $("#inputRequisicion").data("kendoComboBox").select(0);

                $("#inputFuente").data("kendoComboBox").value(data[0].FuenteID);
                $("#inputTurno").data("kendoComboBox").value(data[0].TurnoID);
            }

            //ajaxGridPrincipal($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());

        }
        loadingStop();
    });

}

function AjaxFuente() {//Equipo
    loadingStart();
    //console.log($CapturaReporteRT);
    $ReporteRT.ReporteRT.read({ token: Cookies.get("token"), tipoPruebaID: 1, proveedorID: 0, lenguaje: "es-MX" }).done(function (data) {
        //$Almacenaje.Almacenaje.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            //var data = [{ FuenteID: 1, Fuente: 'Fuente 1' }, { FuenteID: 2, Fuente: 'Fuente 2' }, { FuenteID: 3, Fuente: 'Fuente 3' }];
            $("#inputFuente").data("kendoComboBox").value("");
            $("#inputFuente").data("kendoComboBox").dataSource.data(data);
        }
        loadingStop();
    });

}


function AjaxTurno() {
    loadingStart();
    //console.log($CapturaReporteRT);
    $ReporteRT.ReporteRT.read({ token: Cookies.get("token"), tipoPruebaID: 1, proveedorID: 0, equipoID: 1, lenguaje: "es-MX" }).done(function (data) {
        //$Almacenaje.Almacenaje.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            //var data = [{ TurnoID: 1, Turno: 'Turno 1' }, { TurnoID: 2, Turno: 'Turno 2' }, { TurnoID: 3, Turno: 'Turno 3' }, { TurnoID: 4, Turno: 'Turno 4' }];
            $("#inputTurno").data("kendoComboBox").value("");
            $("#inputTurno").data("kendoComboBox").dataSource.data(data);
        }
        loadingStop();
    });

}


function ajaxGridPrincipal(proyectoID, proveedorID, requisicionID) {
    loadingStart();

    if ($('input:radio[name=Muestra]:checked').val() == "SinCaptura") {
        //alert('SinCaptura');
    }
    else if ($('input:radio[name=Muestra]:checked').val() == "Todos") {
        //alert('Todos');

        $ReporteRT.ReporteRT.read({ token: Cookies.get("token"), proyectoID: (($("#inputProyecto").data("kendoComboBox").value() != "") ? ($("#inputProyecto").data("kendoComboBox").value()) : (0)), proveedorID: (($("#inputProveedor").data("kendoComboBox").value() != "") ? ($("#inputProveedor").data("kendoComboBox").value()) : (0)), requisicionID: (($("#inputRequisicion").data("kendoComboBox").value() != "") ? ($("#inputRequisicion").data("kendoComboBox").value()) : (0)), equipoID: (($("#inputFuente").data("kendoComboBox").value() != "") ? ($("#inputFuente").data("kendoComboBox").value()) : (0)), turnoID: (($("#inputTurno").data("kendoComboBox").value() != "") ? ($("#inputTurno").data("kendoComboBox").value()) : (0)) }).done(function (data) {
            data = jQuery.parseJSON(data);
            if (Error(data)) {
                $("#grid").data('kendoGrid').dataSource.data([]);
                var ds = $("#grid").data("kendoGrid").dataSource;
                for (var i = 0; i < data.length; i++) {
                    ds.add(data[i]);
                }
            }
            
        });
    }

    //var data = [];

    //if((proyectoID != "")&&(proveedorID == "")&&(requisicionID == ""))
    //    data = [{ SpoolJunta: 'X005-001', Junta: '1', NumeroControl: '001', EtiquetaJunta: 'Etiqueta 1', ClasificacionPND: 'ClasificacionPND 1', TipoPrueba: 'TipoPrueba 1', Observaciones: 'Observa 1', CodigoAsme: 'CodigoAsme 1', NumeroPlacas: 0, Densidad: 0, Tamano: 0, ResultadoConciliacion: 'N/A', RazonNoConciliacion: 'N/A', InformacionResultados: [] }, { SpoolJunta: 'X005-002', Junta: '2', NumeroControl: '002', EtiquetaJunta: 'Etiqueta 2', ClasificacionPND: 'ClasificacionPND 2', TipoPrueba: 'TipoPrueba 2', Observaciones: 'Observa 2', CodigoAsme: 'CodigoAsme 2', NumeroPlacas: 0, Densidad: 0, Tamano: 0, ResultadoConciliacion: 'N/A', RazonNoConciliacion: 'N/A', InformacionResultados: [] }, { SpoolJunta: 'X005-003', Junta: '3', NumeroControl: '003', EtiquetaJunta: 'Etiqueta 3', ClasificacionPND: 'ClasificacionPND 3', TipoPrueba: 'TipoPrueba 3', Observaciones: 'Observa 3', CodigoAsme: 'CodigoAsme 3', NumeroPlacas: 0, Densidad: 0, Tamano: 0, ResultadoConciliacion: 'N/A', RazonNoConciliacion: 'N/A', InformacionResultados: [] }];
    //else if ((proyectoID != "") && (proveedorID != "") && (requisicionID == ""))
    //    data = [{ SpoolJunta: 'X005-001', Junta: '1', NumeroControl: '001', EtiquetaJunta: 'Etiqueta 1', ClasificacionPND: 'ClasificacionPND 1', TipoPrueba: 'TipoPrueba 1', Observaciones: 'Observa 1', CodigoAsme: 'CodigoAsme 1', NumeroPlacas: 0, Densidad: 0, Tamano: 0, ResultadoConciliacion: 'N/A', RazonNoConciliacion: 'N/A', InformacionResultados: [] }, { SpoolJunta: 'X005-002', Junta: '2', NumeroControl: '002', EtiquetaJunta: 'Etiqueta 2', ClasificacionPND: 'ClasificacionPND 2', TipoPrueba: 'TipoPrueba 2', Observaciones: 'Observa 2', CodigoAsme: 'CodigoAsme 2', NumeroPlacas: 0, Densidad: 0, Tamano: 0, ResultadoConciliacion: 'N/A', RazonNoConciliacion: 'N/A', InformacionResultados: [] }];
    //else if ((proyectoID != "") && (proveedorID != "") && (requisicionID != ""))
    //    data = [{ SpoolJunta: 'X005-001', Junta: '1', NumeroControl: '001', EtiquetaJunta: 'Etiqueta 1', ClasificacionPND: 'ClasificacionPND 1', TipoPrueba: 'TipoPrueba 1', Observaciones: 'Observa 1', CodigoAsme: 'CodigoAsme 1', NumeroPlacas: 0, Densidad: 0, Tamano: 0, ResultadoConciliacion: 'N/A', RazonNoConciliacion: 'N/A', InformacionResultados: [] }];


    

    loadingStop();
}

function AjaxGuardarCaptura(ds, guardarYNuevo) {
    if (ds.length > 0) {
        var RequisicionID = 0;
        var Captura = [];
        Captura[0] = { Detalles: "" }
        var listaDetalles = [];
        var cont = 0;
        for (var i = 0; i < ds.length; i++) {

            listaDetalles[cont] = {
                Accion: "",
                SpoolJunta: "",
                Junta: "",
                EtiquetaJunta: "",
                ClasificacionPND: "",
                TipoPrueba: "",
                Observaciones: "",
                CodigoAsme: "",
                NumeroPlacas: 0,
                Densidad: 0,
                Tamano: 0,
                ResultadoConciliacion: "",
                RazonNoConciliacion: "",
                InformacionResultados: [],
                Estatus: 1
            };

            listaDetalles[cont].Accion = ds[i].Accion;
            listaDetalles[cont].SpoolJunta = ds[i].SpoolJunta;
            listaDetalles[cont].Junta = ds[i].Junta;
            listaDetalles[cont].EtiquetaJunta = ds[i].EtiquetaJunta;
            listaDetalles[cont].ClasificacionPND = ds[i].ClasificacionPND;
            listaDetalles[cont].TipoPrueba = ds[i].TipoPrueba;
            listaDetalles[cont].Observaciones = ds[i].Observaciones;
            listaDetalles[cont].CodigoAsme = ds[i].CodigoAsme;
            listaDetalles[cont].NumeroPlacas = ds[i].NumeroPlacas;
            listaDetalles[cont].Densidad = ds[i].Densidad;
            listaDetalles[cont].Tamano = ds[i].Tamano;
            listaDetalles[cont].ResultadoConciliacion = ds[i].ResultadoConciliacion;
            listaDetalles[cont].RazonNoConciliacion = ds[i].RazonNoConciliacion;
            listaDetalles[cont].InformacionResultados = ds[i].InformacionResultados;
            listaDetalles[cont].Estatus = ds[i].Estatus;

            //if ((listaDetalles[cont].DocumentoRecibidoID == 0 || listaDetalles[cont].DocumentoEstatusID == 0 ||
            //    listaDetalles[cont].DocumentoDefectoID == 0) && listaDetalles[cont].Accion != 4) {
            //    if (listaDetalles[cont].Accion == 2) {
            //        listaDetalles[cont].Accion = 4;
            //    } else {

            //        if (listaDetalles[cont].DocumentoRecibidoID == 0) {
            //            listaDetalles[cont].Estatus = 0;
            //            $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#ffcccc");
            //        }
            //        if (listaDetalles[cont].DocumentoEstatusID == 0) {
            //            listaDetalles[cont].Estatus = 0;
            //            $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#ffcccc");
            //        }

            //        if (listaDetalles[cont].DocumentoEstatusID == 2 && listaDetalles[cont].DocumentoDefectoID == 0) {
            //            listaDetalles[cont].Estatus = 0;
            //            $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#ffcccc");
            //        }
            //    }

            //}
            //if (ds[i].Accion != 2 && RequisicionID == 0) {
            //    RequisicionID = $("#inputRequisicion").data("kendoComboBox").value();
            //}
            cont++;
        }

        Captura[0].Detalles = listaDetalles;

        if (true/*!ExistRowEmpty(listaDetalles)*/) {
            $ReporteRT.ReporteRT.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val()}).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {

                    if (guardarYNuevo) {
                        //cleanView();
                    } else {

                        //AjaxObtieneDetalleRequisicion();
                        ajaxGridPrincipal($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
                        //disableEnableView(true);
                    }

                    displayNotify("EntregaPlacasGraficasMensajeGuardadoExistoso", "", '0');
                } else {
                    displayNotify("EntregaPlacasGraficasMensajeGuardadoErroneo", "", '2');
                }

            });
        } else {

            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.CapturaReporteGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                visible: false,
                width: "auto",
                height: "auto",
                modal: true,
                animation: {
                    close: false,
                    open: false
                }
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.CapturaReporteMensajePreguntaGuardado[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'>No</button></center>");

            ventanaConfirm.open().center();
            $("#yesButton").click(function () {

                for (var i = 0; i < Captura[0].Detalles.length; i++) {
                    if (Captura[0].Detalles[i].Estatus == 0) {
                        Captura[0].Detalles.pop(Captura[0].Detalles[i]);
                    }
                }

                if (Captura[0].Detalles.length > 0) {
                    $ReporteRT.ReporteRT.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {

                            if (guardarYNuevo) {
                                //cleanView();
                            } else {

                                //AjaxObtieneDetalleRequisicion();
                                ajaxGridPrincipal($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
                                //disableEnableView(true);
                            }

                            displayNotify("ReporteRTMensajeGuardadoExistoso", "", '0');
                        } else {
                            displayNotify("ReporteRTMensajeGuardadoErroneo", "", '2');
                        }
                        ventanaConfirm.close();
                    });
                } else {
                    ventanaConfirm.close();
                    displayNotify("ReporteRTExcepcionGuardado", "", '1');
                }

            });
            $("#noButton").click(function () {
                ventanaConfirm.close();
            });
        }
    } else {
        displayNotify("ReporteRTExcepcionGuardado", "", '2');
    }
}


