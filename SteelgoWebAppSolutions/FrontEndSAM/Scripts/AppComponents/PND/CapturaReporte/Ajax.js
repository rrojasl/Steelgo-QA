var TipoMuestraPredeterminadoID = 3049;
var TipoMuestraPredeterminadoPlanchado = 3065;
var TipoMuestraPredeterminadoSelecTodos = 3062;

function AjaxCargarCamposPredeterminados() {
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (Error(data)) {
            if (data == "sin captura") {
                $('input:radio[name=Muestra]:nth(0)').trigger("click");
            }
            else if (data == "Todos") {
                $('input:radio[name=Muestra]:nth(1)').trigger("click");
            }
            loadingStop();
        }
    });
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoSelecTodos }).done(function (data) {
        if (data == "Si") {
            $('input:radio[name=SelectSector]:nth(0)').trigger("click");
            $('input:radio[name=SelectTodos]:nth(0)').trigger("click");
        }
        else if (data == "No") {
            $('input:radio[name=SelectSector]:nth(1)').trigger("click");
            $('input:radio[name=SelectTodos]:nth(1)').trigger("click");
        }
        else if (data == "Ninguno") {
            $('input:radio[name=SelectSector]:nth(2)').trigger("click");
            $('input:radio[name=SelectTodos]:nth(2)').trigger("click");
        }
        loadingStop();
    });

    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoPlanchado }).done(function (data) {
        if (data == "Todos") {
            $('input:radio[name=LLena]:nth(0)').trigger("click");
        }
        else if (data == "Vacios") {
            $('input:radio[name=LLena]:nth(1)').trigger("click");
        }
        loadingStop();
    });

    AjaxProyecto();
};


function AjaxProyecto() {
    loadingStart();
    $ReporteRT.ReporteRT.read({ token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            $("#inputFuente").data("kendoComboBox").setDataSource();
            $("#inputFuente").data("kendoComboBox").text("");
            $("#inputTurno").data("kendoComboBox").setDataSource();
            $("#inputTurno").data("kendoComboBox").text("");
            
            $("#inputPrueba").data("kendoComboBox").setDataSource();
            $("#inputPrueba").data("kendoComboBox").text("");
            $("#inputProveedor").data("kendoComboBox").setDataSource();
            $("#inputProveedor").data("kendoComboBox").text("");
            $("#inputRequisicion").data("kendoComboBox").setDataSource();
            $("#inputRequisicion").data("kendoComboBox").text("");

            $("#lblTurno").text("");

            $("#inputProyecto").data("kendoComboBox").text("");

            $("#inputPrueba").data("kendoComboBox").dataSource.data([]);
            $("#inputProveedor").data("kendoComboBox").dataSource.data([]);
            $("#inputRequisicion").data("kendoComboBox").dataSource.data([]);

            $("#inputProyecto").data("kendoComboBox").dataSource.data(data);

            if ($("#inputProyecto").data("kendoComboBox").dataSource._data.length == 2) {
                $("#inputProyecto").data("kendoComboBox").select(1);
                AjaxPruebas($("#inputProyecto").data("kendoComboBox").dataSource._data[1].ProyectoID);
            }

            loadingStop();
        }
    });

}

function AjaxProveedor(proyectoID, patioID) {
    loadingStart();
    $ReporteRT.ReporteRT.read({ token: Cookies.get("token"), proyectoID: proyectoID, tipoPruebaID: $("#inputPrueba").data("kendoComboBox").value(), patioID: patioID }).done(function (data) {
        if (Error(data)) {
            $("#inputFuente").data("kendoComboBox").setDataSource();
            $("#inputFuente").data("kendoComboBox").text("");
            $("#inputTurno").data("kendoComboBox").setDataSource();
            $("#inputTurno").data("kendoComboBox").text("");
            $("#inputRequisicion").data("kendoComboBox").setDataSource();
            $("#inputRequisicion").data("kendoComboBox").text("");
            
            

            $("#lblTurno").text("");
            if (Error(data)) {
                $("#inputRequisicion").data("kendoComboBox").value("");
                $("#inputProveedor").data("kendoComboBox").dataSource.data([]);
                $("#inputProveedor").data("kendoComboBox").dataSource.data(data);
                if ($("#inputProveedor").data("kendoComboBox").dataSource._data.length == 2) {
                    $("#inputProveedor").data("kendoComboBox").select(1);
                    AjaxRequisicion($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").dataSource._data[1].ProveedorID);
                }

            }
        }
        loadingStop();
    });

}

function AjaxPruebas(ProyectoID) {
    loadingStart();
    $ReporteRT.ReporteRT.read({ token: Cookies.get("token"), proyectoID: ProyectoID, x: $("#language").val(), y: "" }).done(function (data) {
        if (Error(data)) {
            $("#inputFuente").data("kendoComboBox").setDataSource();
            $("#inputFuente").data("kendoComboBox").text("");
            $("#inputTurno").data("kendoComboBox").setDataSource();
            $("#inputTurno").data("kendoComboBox").text("");

            $("#inputProveedor").data("kendoComboBox").setDataSource();
            $("#inputProveedor").data("kendoComboBox").text("");
            $("#inputProveedor").data("kendoComboBox").dataSource.data([]);

            $("#inputRequisicion").data("kendoComboBox").setDataSource();
            $("#inputRequisicion").data("kendoComboBox").text("");

            var tipoPruebaID = 0;
            $("#lblTurno").text("");
            
            $("#inputPrueba").data("kendoComboBox").dataSource.data([]);
            $("#inputPrueba").data("kendoComboBox").dataSource.data(data);


            if ($("#inputPrueba").data("kendoComboBox").dataSource._data.length == 2) {
                $("#inputPrueba").data("kendoComboBox").select(1);
                AjaxProveedor($("#inputProyecto").data("kendoComboBox").dataSource._data[1].ProyectoID, $("#inputProyecto").data("kendoComboBox").dataSource._data[1].PatioID);
            }
        }
    });
};

function AjaxRequisicion(proyectoID, proveedorID) {
    loadingStart();

    $ReporteRT.ReporteRT.read({ token: Cookies.get("token"), proyectoID: proyectoID, proveedorID: proveedorID }).done(function (data) {
        if (Error(data)) {
            $("#inputFuente").data("kendoComboBox").setDataSource();
            $("#inputFuente").data("kendoComboBox").text("");
            $("#inputTurno").data("kendoComboBox").setDataSource();
            $("#inputTurno").data("kendoComboBox").text("");

            $("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
            $("#inputRequisicion").data("kendoComboBox").dataSource.data(data);
            $("#lblTurno").text("");
            if ($("#inputRequisicion").data("kendoComboBox").dataSource._data.length == 2) {
                $("#inputRequisicion").data("kendoComboBox").select(1);
                $("#lblTurno").text($("#inputRequisicion").data("kendoComboBox").dataItem($("#inputRequisicion").data("kendoComboBox").select()).TurnoLaboral);

                if ($("#inputPrueba").data("kendoComboBox").dataItem($("#inputPrueba").data("kendoComboBox").select()).RequiereEquipoCaptura) {
                    AjaxFuente();
                    $("#inputFuente").data("kendoComboBox").enable(true);
                }
                else {
                    AjaxTurno();
                    $("#inputFuente").data("kendoComboBox").enable(false);
                }
            }
        }
        loadingStop();
    });

}

function AjaxFuente() {//Equipo
    loadingStart();

    $ReporteRT.ReporteRT.read({
        token: Cookies.get("token"), TipoPruebaID: $("#inputPrueba").data("kendoComboBox").value(),
        ProveedorID: $("#inputProveedor").data("kendoComboBox").value(), lenguaje: "es-MX",
    }).done(function (data) {
        if (Error(data)) {
            $("#inputFuente").data("kendoComboBox").value("");
            $("#inputFuente").data("kendoComboBox").dataSource.data(data);
            $("#inputTurno").data("kendoComboBox").text("");
            $("#inputTurno").data("kendoComboBox").dataSource.data([]);
            listadoTurno = data;
        }
        loadingStop();
    });

}

function AjaxTurno() {
    
    if ($("#inputFuente").data("kendoComboBox").text() != "" || $("#inputPrueba").data("kendoComboBox").text().indexOf("RT") === -1) {
        loadingStart();
        $ReporteRT.ReporteRT.read({
            token: Cookies.get("token"),
            TipoPruebaID: $("#inputPrueba").data("kendoComboBox").value(),
            ProveedorID: $("#inputProveedor").data("kendoComboBox").value(),
            EquipoID: $("#inputFuente").data("kendoComboBox").value() == "" ? 0 : $("#inputFuente").data("kendoComboBox").value(),
            lenguaje: "es-MX"
        }).done(function (data) {
            if (Error(data)) {
                $("#inputTurno").data("kendoComboBox").value("");
                $("#inputTurno").data("kendoComboBox").dataSource.data(data);
            }
            loadingStop();
        });
    }
}

function ajaxResultadosDetalle(proyectoID, proveedorID, requisicionID) {
    loadingStart();

    $ReporteRT.ReporteRT.read({
        token: Cookies.get("token"),
        proyectoID: (($("#inputProyecto").data("kendoComboBox").value() != "") ? ($("#inputProyecto").data("kendoComboBox").value()) : (0)),
        tipoPruebaID: (($("#inputPrueba").data("kendoComboBox").value() != "") ? ($("#inputPrueba").data("kendoComboBox").value()) : (0)),
        proveedorID: (($("#inputProveedor").data("kendoComboBox").value() != "") ? ($("#inputProveedor").data("kendoComboBox").value()) : (0)),
        requisicionID: (($("#inputRequisicion").data("kendoComboBox").value() != "") ? ($("#inputRequisicion").data("kendoComboBox").value()) : (0)),
        equipoID: (($("#inputFuente").data("kendoComboBox").value() != "") ? ($("#inputFuente").data("kendoComboBox").value()) : (0)),
        turnoID: (($("#inputTurno").data("kendoComboBox").value() != "") ? ($("#inputTurno").data("kendoComboBox").value()) : (0)),
        lenguaje: $("#language").val()
    }).done(function (data) {
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
    if (ds.length > 0) {
        var RequisicionID = 0;
        var Captura = [];
        Captura[0] = { Detalles: "" }
        var listaDetalles = [];
        var listaErrores = "";
        var cont = 0;
        for (var i = 0; i < ds.length; i++) {
            //valida que tenga numero de placas y se ha capturado tamaño y densidad

            listaDetalles[cont] = {
                ReporteRTID: 0,
                RequisicionID: 0,
                OrdenTrabajoID: 0,
                SpoolID: 0,
                JuntaSpoolID: 0,
                Accion: "",
                Estatus: 0,
                Junta: "",
                ClasificacionPND: "",
                TipoPrueba: "",
                Observaciones: "",
                CodigoAsme: "",
                NumeroPlacas: 0,
                Densidad: 0,
                Tamano: 0,
                NumeroControl: "",
                ResultadoConciliacionID: 0,
                RazonNoConciliacionID: 0,
                ListaDetallePorPlacas: [],
                Estatus: 1
            };

            listaDetalles[cont].ReporteRTID = ds[i].ReporteRTID;
            listaDetalles[cont].RequisicionID = ds[i].RequisicionID;
            listaDetalles[cont].OrdenTrabajoID = ds[i].OrdenTrabajoID;
            listaDetalles[cont].SpoolID = ds[i].SpoolID;
            listaDetalles[cont].JuntaSpoolID = ds[i].JuntaSpoolID;
            listaDetalles[cont].Accion = ds[i].Accion;
            listaDetalles[cont].Junta = ds[i].Junta;
            listaDetalles[cont].ClasificacionPND = ds[i].ClasificacionPND;
            listaDetalles[cont].TipoPrueba = ds[i].TipoPrueba;
            listaDetalles[cont].Observaciones = ds[i].Observaciones;
            listaDetalles[cont].CodigoAsme = ds[i].CodigoAsme;
            listaDetalles[cont].NumeroPlacas = ds[i].NumeroPlacas;
            listaDetalles[cont].Densidad = ds[i].Densidad;
            listaDetalles[cont].Tamano = ds[i].Tamano;
            listaDetalles[cont].ResultadoConciliacion = ds[i].ResultadoConciliacion;
            listaDetalles[cont].ResultadoConciliacion = ds[i].ResultadoConciliacion;


            var informacion = [];
            for (var j = 0; j < ds[i].ListaDetallePorPlacas.length; j++) {
                informacion[j] = { ReporteRTResultadosID: 0, ReporteRTID: 0, OrdenTrabajoID: 0, SpoolID: 0, JuntaSpoolID: 0, SpoolJunta: "", Junta: "", EtiquetaJunta: "", NumeroControl: "", Ubicacion: "", Resultado: "", Accion: "" }
                informacion[j].ReporteRTID = ds[i].ListaDetallePorPlacas[j].ReporteRTID;
                informacion[j].OrdenTrabajoID = ds[i].ListaDetallePorPlacas[j].OrdenTrabajoID;
                informacion[j].SpoolID = ds[i].ListaDetallePorPlacas[j].SpoolID;
                informacion[j].JuntaSpoolID = ds[i].ListaDetallePorPlacas[j].JuntaSpoolID;
                informacion[j].ResultadoID = ds[i].ListaDetallePorPlacas[j].ResultadoID;
                informacion[j].Resultado = ds[i].ListaDetallePorPlacas[j].Resultado;
                informacion[j].Ubicacion = ds[i].ListaDetallePorPlacas[j].Ubicacion;
                informacion[j].Accion = ds[i].ListaDetallePorPlacas[j].Accion;
                listaDetalles[cont].ListaDetallePorPlacas = informacion;

                var detalles = [];
                for (var k = 0; k < ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos.length; k++) {
                    detalles[k] = { ResultadosDefectoID: 0, ReporteResultadosID: 0, OrdenTrabajoID: 0, SpoolID: 0, JuntaSpoolID: 0, DefectoID: 0, InicioMM: 0, FinMM: 0, Accion: 1 }
                    detalles[k].OrdenTrabajoID = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].OrdenTrabajoID;
                    detalles[k].SpoolID = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].SpoolID;
                    detalles[k].JuntaSpoolID = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].JuntaSpoolID;
                    detalles[k].DefectoID = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].DefectoID;
                    detalles[k].Defecto = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].Defecto;
                    detalles[k].InicioMM = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].InicioMM;
                    detalles[k].FinMM = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].FinMM;
                    detalles[k].Accion = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].Accion;
                    detalles[k].Posicion = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].Posicion;
                    detalles[k].Ubicacion = ds[i].ListaDetallePorPlacas[j].ListaDetalleDefectos[k].Ubicacion;
                }
                listaDetalles[cont].ListaDetallePorPlacas[j].ListaDetalleDefectos = detalles;
            }


            //listaErrores += ds[i].NumeroControl + ",";
            if ((ds[i].NumeroPlacas > 0)) {

                if (ds[i].ListaDetallePorPlacas.length > 0) {
                    for (var l = 0; l < ds[i].ListaDetallePorPlacas.length; l++) {
                        if (!(($.isNumeric(ds[i].ListaDetallePorPlacas[l].ResultadoID)) || ($.isNumeric(ds[i].ListaDetallePorPlacas[l].ResultadoID != 0)))) {
                            listaDetalles[cont].Estatus = 0 //el elemento esta mal.
                            $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#ffcccc");
                            //listaErrores += "Te falta asignar resultados las placas,";
                            break;
                        }
                        else {
                            listaDetalles[cont].Estatus = 1 // el elemento esta bien.
                            $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#FFFFFF"); // si antes estaba rojo , lo completa el usuario entonces ya se pone de color blanco.

                            //if (ds[i].ListaDetallePorPlacas[l].ListaDetalleDefectos.length > 0) {
                            //    listaDetalles[cont].Estatus = 1 // el elemento esta bien.
                            //    $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#FFFFFF"); // si antes estaba rojo , lo completa el usuario entonces ya se pone de color blanco.
                            //}
                            //else {
                            //    listaDetalles[cont].Estatus = 0 //el elemento esta mal.
                            //    $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#ffcccc");
                            //    break;
                            //}
                        }

                    }
                }
                else {
                    listaDetalles[cont].Estatus = 0 //el elemento esta mal.
                    $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#ffcccc");
                    //listaErrores += "No tiene placas,";
                }

            }
            else {
                listaDetalles[cont].Estatus = 0 //el elemento esta mal.
                $('tr[data-uid="' + ds[i].uid + '"] ').css("background-color", "#ffcccc");
                //listaErrores += "Te falta llenar el tamaño o la densidad,";
            }
            //listaErrores += "|";
            cont++;


            Captura[0].Detalles = listaDetalles;
        }

        if (!ExistRowEmpty(listaDetalles)) {

            loadingStart();
            setTimeout(function () {
                disableEnableView(true);
                displayNotify("EntregaPlacasGraficasMensajeGuardadoExistoso", "", '0');
                loadingStop();
            }, 700);

            //$ReporteRT.ReporteRT.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            //    if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {

            //        if (guardarYNuevo) {
            //            cleanView();
            //        } else {
            //            $("#grid").data('kendoGrid').dataSource.data([]);
            //            //AjaxObtieneDetalleRequisicion();
            //            ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
            //            disableEnableView(true);
            //        }

            //        displayNotify("EntregaPlacasGraficasMensajeGuardadoExistoso", "", '0');
            //    } else {
            //        displayNotify("CapturaReporteGuardadoErroneo", "", '2');
            //    }

            //});
        } else {

            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
                visible: false,
                width: "auto",
                height: "auto",
                modal: true,
                animation: {
                    close: false,
                    open: false
                }
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.ListadoCatalogos0011[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'>No</button></center>");

            ventanaConfirm.open().center();
            $("#yesButton").click(function () {

                var elemento = 0;

                while (elemento < Captura[0].Detalles.length && Captura[0].Detalles.length != 0) {
                    if (Captura[0].Detalles[elemento].Estatus == 0) {
                        Captura[0].Detalles.pop(Captura[0].Detalles[elemento]);
                    }
                    else
                        elemento++;
                }

                if (Captura[0].Detalles.length > 0) {

                    loadingStart();
                    ventanaConfirm.close();
                    setTimeout(function () {
                        disableEnableView(true);
                        displayNotify("EntregaPlacasGraficasMensajeGuardadoExistoso", "", '0');
                        loadingStop();
                    }, 700);

                    //$ReporteRT.ReporteRT.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                    //    if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {

                    //        if (guardarYNuevo) {
                    //            cleanView();
                    //        } else {

                    //            //AjaxObtieneDetalleRequisicion();
                    //            ajaxResultadosDetalle($("#inputProyecto").data("kendoComboBox").value(), $("#inputProveedor").data("kendoComboBox").value(), $("#inputRequisicion").data("kendoComboBox").value());
                    //            disableEnableView(true);
                    //        }

                    //        displayNotify("ReporteRTMensajeGuardadoExistoso", "", '0');
                    //    } else {
                    //        displayNotify("ReporteRTMensajeGuardadoErroneo", "", '2');
                    //    }
                    //    ventanaConfirm.close();
                    //});
                } else {
                    ventanaConfirm.close();
                    displayNotify("ReporteRTExcepcionGuardado", "", '1');
                }

            });
            $("#noButton").click(function () {
                ventanaConfirm.close();
            });
        }
    }
}



function AjaxObtenerElementoRequisicion(paramReq) {
    $ReporteRT.ReporteRT.read({ lenguaje: $("#language").val(), token: Cookies.get("token"), RequisicionID: paramReq, Flag: true }).done(function (data) {
        if (data != null) {
            $("#inputProyecto").data("kendoComboBox").dataSource.data([]);
            $("#inputProyecto").data("kendoComboBox").dataSource.data(data.listaProyecto);
            $("#inputProyecto").data("kendoComboBox").value(data.ProyectoID);
            $("#inputProyecto").data("kendoComboBox").select(1);

            $("#inputPrueba").data("kendoComboBox").dataSource.data([]);
            $("#inputPrueba").data("kendoComboBox").dataSource.data(data.listaTipoPrueba);
            $("#inputPrueba").data("kendoComboBox").value(data.TipoPruebaID);
            $("#inputPrueba").data("kendoComboBox").select(1);

            $("#inputProveedor").data("kendoComboBox").dataSource.data([]);
            $("#inputProveedor").data("kendoComboBox").dataSource.data(data.listaProveedor);
            $("#inputProveedor").data("kendoComboBox").value(data.ProveedorID);
            $("#inputProveedor").data("kendoComboBox").select(1);

            $("#inputRequisicion").data("kendoComboBox").dataSource.data([]);
            $("#inputRequisicion").data("kendoComboBox").dataSource.data(data.listaRequisicion);
            $("#inputRequisicion").data("kendoComboBox").value(data.RequisicionID);
            $("#inputRequisicion").data("kendoComboBox").select(1);

            ajaxResultadosDetalle(0, 0, 0);
        }
    });
}