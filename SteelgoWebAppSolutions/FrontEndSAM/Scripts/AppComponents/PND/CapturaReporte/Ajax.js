
function AjaxProyecto() {


    loadingStart();
    //console.log($CapturaReporteRT);
    $ReporteRT.ReporteRT.read({ token: Cookies.get("token") }).done(function (data) {
        //$Almacenaje.Almacenaje.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {

            /*var data = [{ ProyectoID: 1, Nombre: 'Proyecto 1' }, { ProyectoID: 2, Nombre: 'Proyecto 2' }];*/
            $("#inputProyecto").data("kendoComboBox").value("");
            $("#inputProyecto").data("kendoComboBox").dataSource.data(data);
            if (data.length == 2) {
                $("#inputProyecto").data("kendoComboBox").select(1);
                AjaxProveedor(data[1].ProyectoID, data[1].PatioID)
                AjaxPruebas(data[1].ProyectoID);
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

            if (data.length == 2) {
                $("#inputProveedor").data("kendoComboBox").select(1);
                AjaxRequisicion($("#inputProyecto").data("kendoComboBox").value(), data[1].ProveedorID)
            }
            //else
            //    ajaxGridPrincipal($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
        }
        loadingStop();
    });

}

function AjaxPruebas(ProyectoID) {
    //if ($("#inputProyecto").val() != "") {
    loadingStart();
    $ReporteRT.ReporteRT.read({ token: Cookies.get("token"), proyectoID: ProyectoID, x: $("#language").val(), y:"" }).done(function (data) {
        var tipoPruebaID = 0;
        $("#inputPrueba").data("kendoComboBox").dataSource.data([]);
        $("#inputPrueba").data("kendoComboBox").dataSource.data(data);

    });
    //}
};

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

            if (data.length == 2) {
                $("#inputRequisicion").data("kendoComboBox").select(1);

                $("#inputFuente").data("kendoComboBox").value(data[1].FuenteID);
                $("#inputTurno").data("kendoComboBox").value(data[1].TurnoID);
                $("#inputPrueba").data("kendoComboBox").value(data[1].TipoPruebaID);
            }

            //ajaxGridPrincipal($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());

        }
        loadingStop();
    });

}

function AjaxFuente() {//Equipo
    loadingStart();
    //console.log($CapturaReporteRT);
    $ReporteRT.ReporteRT.read({ token: Cookies.get("token"), lenguaje: "es-MX", x: "" }).done(function (data) {
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

    $ReporteRT.ReporteRT.read({ token: Cookies.get("token"), proyectoID: (($("#inputProyecto").data("kendoComboBox").value() != "") ? ($("#inputProyecto").data("kendoComboBox").value()) : (0)), tipoPruebaID: (($("#inputPrueba").data("kendoComboBox").value() != "") ? ($("#inputPrueba").data("kendoComboBox").value()) : (0)), proveedorID: (($("#inputProveedor").data("kendoComboBox").value() != "") ? ($("#inputProveedor").data("kendoComboBox").value()) : (0)), requisicionID: (($("#inputRequisicion").data("kendoComboBox").value() != "") ? ($("#inputRequisicion").data("kendoComboBox").value()) : (0)), equipoID: (($("#inputFuente").data("kendoComboBox").value() != "") ? ($("#inputFuente").data("kendoComboBox").value()) : (0)), turnoID: (($("#inputTurno").data("kendoComboBox").value() != "") ? ($("#inputTurno").data("kendoComboBox").value()) : (0)), lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            $("#grid").data('kendoGrid').dataSource.data([]);
            var ds = $("#grid").data("kendoGrid").dataSource;
            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
            }
        }
        loadingStop();
    });


    //var data = [];

    //if((proyectoID != "")&&(proveedorID == "")&&(requisicionID == ""))
    //    data = [{ SpoolJunta: 'X005-001', Junta: '1', NumeroControl: '001', EtiquetaJunta: 'Etiqueta 1', ClasificacionPND: 'ClasificacionPND 1', TipoPrueba: 'TipoPrueba 1', Observaciones: 'Observa 1', CodigoAsme: 'CodigoAsme 1', NumeroPlacas: 0, Densidad: 0, Tamano: 0, ResultadoConciliacion: 'N/A', RazonNoConciliacion: 'N/A', InformacionResultados: [] }, { SpoolJunta: 'X005-002', Junta: '2', NumeroControl: '002', EtiquetaJunta: 'Etiqueta 2', ClasificacionPND: 'ClasificacionPND 2', TipoPrueba: 'TipoPrueba 2', Observaciones: 'Observa 2', CodigoAsme: 'CodigoAsme 2', NumeroPlacas: 0, Densidad: 0, Tamano: 0, ResultadoConciliacion: 'N/A', RazonNoConciliacion: 'N/A', InformacionResultados: [] }, { SpoolJunta: 'X005-003', Junta: '3', NumeroControl: '003', EtiquetaJunta: 'Etiqueta 3', ClasificacionPND: 'ClasificacionPND 3', TipoPrueba: 'TipoPrueba 3', Observaciones: 'Observa 3', CodigoAsme: 'CodigoAsme 3', NumeroPlacas: 0, Densidad: 0, Tamano: 0, ResultadoConciliacion: 'N/A', RazonNoConciliacion: 'N/A', InformacionResultados: [] }];
    //else if ((proyectoID != "") && (proveedorID != "") && (requisicionID == ""))
    //    data = [{ SpoolJunta: 'X005-001', Junta: '1', NumeroControl: '001', EtiquetaJunta: 'Etiqueta 1', ClasificacionPND: 'ClasificacionPND 1', TipoPrueba: 'TipoPrueba 1', Observaciones: 'Observa 1', CodigoAsme: 'CodigoAsme 1', NumeroPlacas: 0, Densidad: 0, Tamano: 0, ResultadoConciliacion: 'N/A', RazonNoConciliacion: 'N/A', InformacionResultados: [] }, { SpoolJunta: 'X005-002', Junta: '2', NumeroControl: '002', EtiquetaJunta: 'Etiqueta 2', ClasificacionPND: 'ClasificacionPND 2', TipoPrueba: 'TipoPrueba 2', Observaciones: 'Observa 2', CodigoAsme: 'CodigoAsme 2', NumeroPlacas: 0, Densidad: 0, Tamano: 0, ResultadoConciliacion: 'N/A', RazonNoConciliacion: 'N/A', InformacionResultados: [] }];
    //else if ((proyectoID != "") && (proveedorID != "") && (requisicionID != ""))
    //    data = [{ SpoolJunta: 'X005-001', Junta: '1', NumeroControl: '001', EtiquetaJunta: 'Etiqueta 1', ClasificacionPND: 'ClasificacionPND 1', TipoPrueba: 'TipoPrueba 1', Observaciones: 'Observa 1', CodigoAsme: 'CodigoAsme 1', NumeroPlacas: 0, Densidad: 0, Tamano: 0, ResultadoConciliacion: 'N/A', RazonNoConciliacion: 'N/A', InformacionResultados: [] }];

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
                ReporteRTID: 0,
                RequisicionID: 0,
                OrdenTrabajoID: 0,
                SpoolID: 0,
                JuntaSpoolID: 0,
                Accion: "",
                Estatus: 0,
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
                ResultadoConciliacionID: 0,
                RazonNoConciliacionID: 0,
                MiInformacionResultados: []//,
                //Estatus: 1
            };

            listaDetalles[cont].ReporteRTID= ds[i].ReporteRTID;
            listaDetalles[cont].RequisicionID = ds[i].RequisicionID;
            listaDetalles[cont].OrdenTrabajoID = ds[i].OrdenTrabajoID;
            listaDetalles[cont].SpoolID = ds[i].SpoolID;
            listaDetalles[cont].JuntaSpoolID = ds[i].JuntaSpoolID;
            listaDetalles[cont].Accion = ds[i].Accion;
            listaDetalles[cont].Estatus = ds[i].Estatus;
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
            listaDetalles[cont].ResultadoConciliacionID = ds[i].ResultadoConciliacionID;
            listaDetalles[cont].RazonNoConciliacionID = ds[i].RazonNoConciliacionID;
            
            var informacion = [];
            for (var j = 0; j < ds[i].InformacionResultados.length; j++) {
                informacion[j] = { ReporteRTResultadosID: 0, ReporteRTID: 0, OrdenTrabajoID: 0, SpoolID: 0, JuntaSpoolID: 0, SpoolJunta: "", Junta: "", EtiquetaJunta: "", NumeroControl: "", Ubicacion: "", Resultado: "", Accion: 1 }
                informacion[j].ReporteRTResultadosID = ds[i].InformacionResultados[j].ReporteRTResultadosID;
                informacion[j].ReporteRTID = ds[i].InformacionResultados[j].ReporteRTID;
                informacion[j].OrdenTrabajoID = ds[i].InformacionResultados[j].OrdenTrabajoID;
                informacion[j].SpoolID = ds[i].InformacionResultados[j].SpoolID;
                informacion[j].JuntaSpoolID = ds[i].InformacionResultados[j].JuntaSpoolID;
                
                informacion[j].SpoolJunta = ds[i].InformacionResultados[j].SpoolJunta;
                informacion[j].Junta = ds[i].InformacionResultados[j].Junta;
                informacion[j].EtiquetaJunta = ds[i].InformacionResultados[j].EtiquetaJunta;
                informacion[j].NumeroControl = ds[i].InformacionResultados[j].NumeroControl;
                informacion[j].Ubicacion = ds[i].InformacionResultados[j].Ubicacion;
                informacion[j].Resultado = ds[i].InformacionResultados[j].Resultado;

                informacion[j].Accion = ds[i].InformacionResultados[j].Accion;
                listaDetalles[cont].MiInformacionResultados = informacion;

                var detalles = [];
                for (var k = 0; k < ds[i].InformacionResultados[j].DetalleResultados.length; k++) {
                    detalles[k] = { ResultadosDefectoID: 0, ReporteResultadosID: 0, OrdenTrabajoID: 0, SpoolID: 0, JuntaSpoolID: 0, DefectoID: 0, InicioMM: 0, FinMM: 0, Accion:1 }
                    detalles[k].ResultadosDefectoID = ds[i].InformacionResultados[j].DetalleResultados[k].ResultadosDefectoID;
                    detalles[k].ReporteResultadosID = ds[i].InformacionResultados[j].DetalleResultados[k].ReporteResultadosID;
                    detalles[k].OrdenTrabajoID = ds[i].InformacionResultados[j].DetalleResultados[k].OrdenTrabajoID;
                    detalles[k].SpoolID = ds[i].InformacionResultados[j].DetalleResultados[k].SpoolID;
                    detalles[k].JuntaSpoolID = ds[i].InformacionResultados[j].DetalleResultados[k].JuntaSpoolID;

                    detalles[k].DefectoID = ds[i].InformacionResultados[j].DetalleResultados[k].DefectoID;
                    detalles[k].InicioMM = ds[i].InformacionResultados[j].DetalleResultados[k].InicioMM;
                    detalles[k].FinMM = ds[i].InformacionResultados[j].DetalleResultados[k].FinMM;
                    detalles[k].Accion = ds[i].InformacionResultados[j].DetalleResultados[k].Accion;
                }

                listaDetalles[cont].MiInformacionResultados[j].DetalleResultados = detalles;
            }

            

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
                        cleanView();
                    } else {

                        //AjaxObtieneDetalleRequisicion();
                        ajaxGridPrincipal($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
                        disableEnableView(true);
                    }

                    displayNotify("EntregaPlacasGraficasMensajeGuardadoExistoso", "", '0');
                } else {
                    displayNotify("CapturaReporteGuardadoErroneo", "", '2');
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
                                cleanView();
                            } else {

                                //AjaxObtieneDetalleRequisicion();
                                ajaxGridPrincipal($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
                                disableEnableView(true);
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


