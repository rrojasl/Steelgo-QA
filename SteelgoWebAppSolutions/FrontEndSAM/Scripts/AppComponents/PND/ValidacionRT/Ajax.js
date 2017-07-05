function AjaxProyecto() {
    loadingStart();
    $ValidacionRT.ValidacionRT.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {            
            $("#inputProyecto").data("kendoComboBox").value("");
            $("#inputProyecto").data("kendoComboBox").dataSource.data(data);
            if (data.length == 2) {
                $("#inputProyecto").data("kendoComboBox").select(1);
                //AjaxProveedor(data[1].ProyectoID, data[1].TipoPruebaID)
                //AjaxPruebas(data[1].ProyectoID);
            }            
        }
        loadingStop();
    });
}

function AjaxProveedor(proyectoID, tipoPruebaID) {
    loadingStart();    
    $ValidacionRT.ValidacionRT.read({ token: Cookies.get("token"), ProyectoID: proyectoID, TipoPruebaID: tipoPruebaID }).done(function (data) {
        if (Error(data)) {            
            $("#inputProveedor").data("kendoComboBox").value("");
            $("#inputProveedor").data("kendoComboBox").dataSource.data(data);
            $("#inputProveedor").data("kendoComboBox").select(1);
            //AjaxRequisicion($("#inputProyecto").data("kendoComboBox").value(), data[0].ProveedorID)            
        }
        loadingStop();
    });
}

function AjaxPruebas(ProyectoID) {    
    loadingStart();
    $ValidacionRT.ValidacionRT.read({ token: Cookies.get("token"), ProyectoID: ProyectoID }).done(function (data) {
        var tipoPruebaID = 0;        
        $("#inputPrueba").data("kendoComboBox").dataSource.data([]);
        $("#inputPrueba").data("kendoComboBox").dataSource.data(data);
    });    
};

function AjaxRequisicion(proyectoID, proveedorID) {
    loadingStart();    
    $ValidacionRT.ValidacionRT.read({ token: Cookies.get("token"), ProyectoID: proyectoID, ProveedorID: proveedorID, Flag: true }).done(function (data) {
        if (Error(data)) {
            $("#inputRequisicion").data("kendoComboBox").value("");
            $("#inputRequisicion").data("kendoComboBox").dataSource.data(data);
            //$("#inputRequisicion").data("kendoComboBox").select(1);
            $("#inputFuente").data("kendoComboBox").value(data[1].FuenteID);
            $("#inputTurno").data("kendoComboBox").value(data[1].TurnoID);
            $("#inputPrueba").data("kendoComboBox").value(data[1].TipoPruebaID);        
            //$("#btnAgregar").trigger("click");            
        }
        loadingStop();
    });
}

function AjaxFuente(tipoPruebaID, proveedorID) {//Equipo
    loadingStart();    
    $ValidacionRT.ValidacionRT.read({ token: Cookies.get("token"), TipoPruebaID: tipoPruebaID, ProveedorID: proveedorID, lenguaje: "es-MX", x: "" }).done(function (data) {
        if (Error(data)) {            
            $("#inputFuente").data("kendoComboBox").value("");
            $("#inputFuente").data("kendoComboBox").dataSource.data(data);
        }
        loadingStop();
    });
}

function AjaxTurno(tipoPruebaID, proveedorID, equipoID) {
    loadingStart();    
    $ValidacionRT.ValidacionRT.read({ token: Cookies.get("token"), TipoPruebaID: tipoPruebaID, ProveedorID: proveedorID, EquipoID: equipoID, lenguaje: "es-MX", Flag: true }).done(function (data) {
        if (Error(data)) {
            $("#inputTurno").data("kendoComboBox").value("");
            $("#inputTurno").data("kendoComboBox").dataSource.data(data);
        }
        loadingStop();
    });
}

function AjaxDetalleRequisicion(proyectoID, tipoPruebaID, proveedorID, requisicionID, equipoID, turnoID) {
    loadingStart();
    $ValidacionRT.ValidacionRT.read({ token: Cookies.get("token"), ProyectoID: proyectoID, TipoPruebaID: tipoPruebaID, ProveedorID: proveedorID, RequisicionID: requisicionID, EquipoID: equipoID, TurnoID: turnoID, Lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            $("#grid").data('kendoGrid').dataSource.data([]);
            var ds = $("#grid").data("kendoGrid").dataSource;
            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
            }
        }
        loadingStop();
    });
}

function AjaxGuardarCaptura(ds, guardarYNuevo) {
    loadingStart();
    if (guardarYNuevo) {
        setTimeout(function (e) {
            loadingStop();
            Limpiar();
            displayNotify("MensajeGuardadoExistoso", "", "0");
        }, 700);
    } else {
        setTimeout(function (e) {
            loadingStop();
            opcionHabilitarView(true, '');
            displayNotify("MensajeGuardadoExistoso", "", "0");
        }, 700);
    }


    //if (ds.length > 0) {
    //    var RequisicionID = 0;
    //    var Captura = [];
    //    Captura[0] = { Detalles: "" }
    //    var CapturaValidacion = [];
    //    CapturaValidacion[0] = { Detalles: "" }
    //    var listaDetalles = [];
    //    var listaDetallesValidacion = [];
    //    var cont = 0;
    //    for (var i = 0; i < ds.length; i++) {
    //        //valida que tenga numero de placas y se ha capturado tamaño y densidad

    //        listaDetalles[cont] = {
    //            ReporteRTID: 0,
    //            RequisicionID: 0,
    //            OrdenTrabajoID: 0,
    //            SpoolID: 0,
    //            JuntaSpoolID: 0,
    //            Accion: "",
    //            Estatus: 0,
    //            Junta: "",
    //            ClasificacionPND: "",
    //            TipoPrueba: "",
    //            Observaciones: "",
    //            CodigoAsme: "",
    //            NumeroPlacas: 0,
    //            Densidad: 0,
    //            Tamano: 0,
    //            NumeroControl: "",
    //            ResultadoConciliacionID: 0,
    //            RazonNoConciliacionID: 0,
    //            ListaDetallePorPlacas: [],
    //            Estatus: 1
    //        };

            
    //        listaDetallesValidacion[cont] = {
    //            Accion: "",
    //            Estatus: 0,
    //            ReporteRTID: 0,
    //            ResultadoConciliacionID: 0,
    //            RazonNoConciliacionID: 0,
    //            ComentarioValidacion: "",
    //            UsuarioIDConciliacion: 0,
    //            ProveedorIDConciliacion: 0
    //        };


    //        listaDetalles[cont].ReporteRTID = ds[i].ReporteRTID;
    //        listaDetalles[cont].RequisicionID = ds[i].RequisicionID;
    //        listaDetalles[cont].OrdenTrabajoID = ds[i].OrdenTrabajoID;
    //        listaDetalles[cont].SpoolID = ds[i].SpoolID;
    //        listaDetalles[cont].JuntaSpoolID = ds[i].JuntaSpoolID;
    //        listaDetalles[cont].Accion = ds[i].Accion;
    //        listaDetalles[cont].Junta = ds[i].Junta;
    //        listaDetalles[cont].ClasificacionPND = ds[i].ClasificacionPND;
    //        listaDetalles[cont].TipoPrueba = ds[i].TipoPrueba;
    //        listaDetalles[cont].Observaciones = ds[i].Observaciones;
    //        listaDetalles[cont].CodigoAsme = ds[i].CodigoAsme;
    //        listaDetalles[cont].NumeroPlacas = ds[i].NumeroPlacas;
    //        listaDetalles[cont].Densidad = ds[i].Densidad;
    //        listaDetalles[cont].Tamano = ds[i].Tamano;
    //        listaDetalles[cont].ResultadoConciliacion = ds[i].ResultadoConciliacion;
    //        listaDetalles[cont].ResultadoConciliacion = ds[i].ResultadoConciliacion;

    //        listaDetallesValidacion[cont].Accion = ds[i].Accion;
    //        listaDetallesValidacion[cont].Estatus = ds[i].EstatusRequisicion;
    //        listaDetallesValidacion[cont].ReporteRTID = ds[i].RequisicionID;
    //        listaDetallesValidacion[cont].ResultadoConciliacionID = ds[i].ResultadoConciliacionID;
    //        listaDetallesValidacion[cont].RazonNoConciliacionID = ds[i].RazonNoConciliacionID;
    //        listaDetallesValidacion[cont].ComentarioValidacion = ds[i].Comentarios;
    //        listaDetallesValidacion[cont].UsuarioIDConciliacion = 0;
    //        listaDetallesValidacion[cont].ProveedorIDConciliacion = ((currentUsuarioProveedor == null) ? (0) : (currentUsuarioProveedor.ProveedorID));

    //        var informacion = [];
    //        for (var j = 0; j < ds[i].ListaDetallePorPlacas.length; j++) {
    //            informacion[j] = { ReporteRTResultadosID: 0, ReporteRTID: 0, OrdenTrabajoID: 0, SpoolID: 0, JuntaSpoolID: 0, SpoolJunta: "", Junta: "", EtiquetaJunta: "", NumeroControl: "", Ubicacion: "", Resultado: "", Accion: "" }
    //            informacion[j].ReporteRTID = ds[i].ListaDetallePorPlacas[j].ReporteRTID;
    //            informacion[j].OrdenTrabajoID = ds[i].ListaDetallePorPlacas[j].OrdenTrabajoID;
    //            informacion[j].SpoolID = ds[i].ListaDetallePorPlacas[j].SpoolID;
    //            informacion[j].JuntaSpoolID = ds[i].ListaDetallePorPlacas[j].JuntaSpoolID;
    //            informacion[j].ResultadoID = ds[i].ListaDetallePorPlacas[j].ResultadoID;
    //            informacion[j].Resultado = ds[i].ListaDetallePorPlacas[j].Resultado;
    //            informacion[j].Ubicacion = ds[i].ListaDetallePorPlacas[j].Ubicacion;
    //            informacion[j].Accion = ds[i].ListaDetallePorPlacas[j].Accion;
    //            listaDetalles[cont].ListaDetallePorPlacas = informacion;

    //            var detalles = [];
    //            for (var k = 0; k < ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos.length; k++) {
    //                detalles[k] = { ResultadosDefectoID: 0, ReporteResultadosID: 0, OrdenTrabajoID: 0, SpoolID: 0, JuntaSpoolID: 0, DefectoID: 0, InicioMM: 0, FinMM: 0, Accion: 1 }
    //                detalles[k].OrdenTrabajoID = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].OrdenTrabajoID;
    //                detalles[k].SpoolID = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].SpoolID;
    //                detalles[k].JuntaSpoolID = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].JuntaSpoolID;
    //                detalles[k].DefectoID = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].DefectoID;
    //                detalles[k].Defecto = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].Defecto;
    //                detalles[k].InicioMM = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].InicioMM;
    //                detalles[k].FinMM = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].FinMM;
    //                detalles[k].Accion = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].Accion;
    //                detalles[k].Posicion = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].Posicion;
    //                detalles[k].Ubicacion = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].Ubicacion;
    //            }
    //            listaDetalles[cont].ListaDetallePorPlacas[j].ListaDetalleDefectos = detalles;
    //        }
            
    //        if ((ds[i].NumeroPlacas > 0) && ($.isNumeric(ds[i].Tamano)) && ($.isNumeric(ds[i].Densidad)) && ds[i].Tamano > 0 && ds[i].Densidad > 0 && (ds[i].ResultadoConciliacionID != 0) && (ds[i].RazonNoConciliacionID != 0) && (ds[i].Comentarios != "")) {
                
    //            if (ds[i].ListaDetallePorPlacas.length > 0) {
    //                for (var l = 0; l < ds[i].ListaDetallePorPlacas.length; l++) {
    //                    if (!(($.isNumeric(ds[i].ListaDetallePorPlacas[l].ResultadoID)) || ($.isNumeric(ds[i].ListaDetallePorPlacas[l].ResultadoID != 0)))) {
    //                        listaDetalles[cont].Estatus = 0 //el elemento esta mal.
    //                        $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#ffcccc");
                            
    //                        break;
    //                    }
    //                    else {
    //                        listaDetalles[cont].Estatus = 1 // el elemento esta bien.
    //                        $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#FFFFFF"); // si antes estaba rojo , lo completa el usuario entonces ya se pone de color blanco.

    //                    }

    //                }
    //            }
    //            else {
    //                listaDetalles[cont].Estatus = 0 //el elemento esta mal.
    //                $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#ffcccc");
                    
    //            }
                
    //        }
    //        else {
    //            listaDetalles[cont].Estatus = 0 //el elemento esta mal.
    //            $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#ffcccc");
                
    //        }
            
    //        cont++;


    //        Captura[0].Detalles = listaDetalles;

    //        CapturaValidacion[0].Detalles = listaDetallesValidacion;
    //    }

    //    if (!ExistRowEmpty(listaDetalles)) {
    //        $ReporteRT.ReporteRT.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
    //            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {

    //                $ValidacionRT.ValidacionRT.create(CapturaValidacion[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data2) {
    //                    if (data2.ReturnMessage.length > 0 && data2.ReturnMessage[0] == "Ok") {


    //                        if (guardarYNuevo) {
    //                            cleanView();
    //                        } else {

    //                            //AjaxObtieneDetalleRequisicion();
    //                            ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
    //                            disableEnableView(true);
    //                        }

    //                        displayNotify("EntregaPlacasGraficasMensajeGuardadoExistoso", "", '0');
    //                    }
    //                });
    //            } else {
    //                displayNotify("CapturaReporteGuardadoErroneo", "", '2');
    //            }

    //        });
    //    } else {

    //        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
    //            iframe: true,
    //            title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
    //            visible: false,
    //            width: "auto",
    //            height: "auto",
    //            modal: true,
    //            animation: {
    //                close: false,
    //                open: false
    //            }
    //        }).data("kendoWindow");

    //        ventanaConfirm.content(_dictionary.ListadoCatalogos0011[$("#language").data("kendoDropDownList").value()] +
    //            "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'>No</button></center>");

    //        ventanaConfirm.open().center();
    //        $("#yesButton").click(function () {

    //            var elemento = 0;

    //            while (elemento < Captura[0].Detalles.length &&  Captura[0].Detalles.length !=0 ) {
    //                if (Captura[0].Detalles[elemento].Estatus == 0) {
    //                    Captura[0].Detalles.pop(Captura[0].Detalles[elemento]);
    //                }
    //                else
    //                    elemento++;
    //            }

    //            if (Captura[0].Detalles.length > 0) {
    //                $ReporteRT.ReporteRT.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
    //                    if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {

    //                        if (guardarYNuevo) {
    //                            cleanView();
    //                        } else {

    //                            //AjaxObtieneDetalleRequisicion();
    //                            ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
    //                            disableEnableView(true);
    //                        }

    //                        displayNotify("ReporteRTMensajeGuardadoExistoso", "", '0');
    //                    } else {
    //                        displayNotify("ReporteRTMensajeGuardadoErroneo", "", '2');
    //                    }
    //                    ventanaConfirm.close();
    //                });
    //            } else {
    //                ventanaConfirm.close();
    //                displayNotify("ReporteRTExcepcionGuardado", "", '1');
    //            }

    //        });
    //        $("#noButton").click(function () {
    //            ventanaConfirm.close();
    //        });
    //    }
    //}
}


