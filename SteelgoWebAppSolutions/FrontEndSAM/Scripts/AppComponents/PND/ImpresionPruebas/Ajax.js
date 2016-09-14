var folioGenerado;
var CampoMuestra = 3056;

function AjaxCargarDatos() {
    
    $ImpresionPruebas.ImpresionPruebas.read({ token: Cookies.get("token"), mostrar: $('input:radio[name=Muestra]:checked').val(), RequisicionID: $("#inputRequisicion").val() }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
    });
};


function AjaxImprimir(arregloJuntas) {
    loadingStart();
    Captura = [];
    ReportePath = "";
    ReporteRequisicionID = 0;
    impresionCorrecta = true;
    

    for (var i = 0; i < arregloJuntas.length; i++) {
        if (arregloJuntas[i].Seleccionado) {
            if (arregloJuntas[i].Reporte == "") {
                impresionCorrecta = false;
                break;
            }
            else {
                ReportePath = arregloJuntas[i].Url;
                ReporteRequisicionID = arregloJuntas[i].ReporteRequisicionID;
            }
            
        }
    }



    if (ReportePath != "") {
        if (impresionCorrecta) {

            SolicitarImpresion(ReportePath.replace('***', ReporteRequisicionID));
            loadingStop();
        }
        else {
            displayNotify("", "Hay elementos seleccionados sin asignar en un reporte, imposible imprimir", "1");
            loadingStop();
        }
    }
    else {
        displayNotify("", "No hay elementos seleccionados para imprimir", "1");
        loadingStop();
    }
}

function SolicitarImpresion(url) {
    window.open(url, "_blank");


    //document.location.target = "_blank";
    //document.location.href = url
};


function AjaxGenerarReporte(arregloJuntas) {
    loadingStart();
    Captura = [];
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    contador = 0;
    ReporteIDConsecutivo;
    reporteReqID = 0;

    for (var i = 0; i < arregloJuntas.length; i++) {
        if (arregloJuntas[i].Seleccionado && arregloJuntas[i].ReporteRequisicionID != 0) {
            reporteReqID = arregloJuntas[i].ReporteRequisicionID;
        }
    }

        for (var i = 0; i < arregloJuntas.length; i++) {
            if (arregloJuntas[i].Seleccionado ) {
                ListaDetalles[contador] = { ReporteRequisicionID: "", ElementoPorClasificacionPNDID: "", Accion: "" };
                ListaDetalles[contador].Accion =  arregloJuntas[i].ReporteRequisicionID == 0 ? 1 : 2;
                ListaDetalles[contador].ElementoPorClasificacionPNDID = arregloJuntas[i].ElementoPorClasificacionPNDID;
                ListaDetalles[contador].ReporteRequisicionID = reporteReqID;
                contador++;
            }
        }

        Captura[0].Detalles = ListaDetalles;
        if (Captura[0].Detalles.length > 0) {
            $ImpresionPruebas.ImpresionPruebas.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val(), RequisicionID: $("#inputRequisicion").val() }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                    AjaxCargarDatos();
                    mensaje = "Se guardo correctamente la informacion" + "-0";
                    displayNotify("MensajeGuardadoExistoso", "", '1');
                }
                else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                    mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2"
                    displayNotify("MensajeGuardadoErroneo", data.ReturnMessage[0], '2');
                }
                loadingStop();


            });
        }
        else {
            loadingStop();
        }
   
}



function AjaxObtenerProyectos() {
    loadingStart();

    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#inputProyecto").data("kendoComboBox").value("");
        $("#inputProyecto").data("kendoComboBox").dataSource.data(data);

        if ($("#inputProyecto").data("kendoComboBox").dataSource._data.length == 2) {
            $("#inputProyecto").data("kendoComboBox").select(1);
            $("#inputProyecto").data("kendoComboBox").trigger("change");
        }
        else {
            $("#inputProyecto").data("kendoComboBox").select(0);
            loadingStop();
        }


    });
}


function AjaxPruebas() {
    if ($("#inputProyecto").val() != "") {
        loadingStart();
        $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (Error(data)) {
                $("#inputPrueba").data("kendoComboBox").value("");
                $("#inputPrueba").data("kendoComboBox").dataSource.data(data);

                if ($("#inputPrueba").data("kendoComboBox").dataSource._data.length == 2) {
                    $("#inputPrueba").data("kendoComboBox").select(1);
                }

            }
            
        });
    }
};

function AjaxObtenerProveedor() {
    if ($("#inputPrueba").data("kendoComboBox").value() != "") {
        loadingStart();
        var patioID = $('#inputProyecto').data("kendoComboBox").dataSource._data[$('#inputProyecto').data("kendoComboBox").selectedIndex].PatioID;
        $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), ProyectoID: $("#inputProyecto").data("kendoComboBox").value(), PatioID: patioID, TipoPruebaID: $("#inputPrueba").data("kendoComboBox").value() }).done(function (data) {
            if (Error(data)) {
                $("#inputProveedor").data("kendoComboBox").value("");
                $("#inputProveedor").data("kendoComboBox").dataSource.data(data);

                if ($("#inputProveedor").data("kendoComboBox").dataSource._data.length == 2) {
                    $("#inputProveedor").data("kendoComboBox").select(1);
                    $("#inputProveedor").data("kendoComboBox").trigger("change");
                    var RequiereEquipo = $('#inputPrueba').data("kendoComboBox").dataSource._data[$('#inputPrueba').data("kendoComboBox").selectedIndex].RequiereEquipo;
                    if (!RequiereEquipo) {
                        

                    }
                    else {
                        

                    }
                }
                else {

                }
            }
            loadingStop();
        });
    }
}



function AjaxRequisicion() {
    if ($("#inputPrueba").data("kendoComboBox").value() != "") {
        loadingStart();
        $ImpresionPruebas.ImpresionPruebas.read({ token: Cookies.get("token"), ProyectoID: $("#inputProyecto").data("kendoComboBox").value(), TipoPruebaID: $("#inputPrueba").data("kendoComboBox").value(), ProveedorID: $("#inputProveedor").data("kendoComboBox").value() }).done(function (data) {
            if (Error(data)) {
                $("#inputRequisicion").data("kendoComboBox").value("");
                $("#inputRequisicion").data("kendoComboBox").dataSource.data(data);

                if ($("#inputRequisicion").data("kendoComboBox").dataSource._data.length == 2) {
                    $("#inputRequisicion").data("kendoComboBox").select(1);
                    $("#inputRequisicion").data("kendoComboBox").trigger("change");
                }
            }

        });
    }
};


function AjaxCargarCamposPredeterminados() {
    loadingStart();
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: CampoMuestra }).done(function (data) {
        if (Error(data)) {
            if (data == "sin captura") {
                $('input:radio[name=Muestra]:nth(0)').trigger("click");

                $("#styleSinCaptura").addClass("active");
                $("#styleTodos").removeClass("active");
            }
            else if (data == "Todos") {

                $('input:radio[name=Muestra]:nth(1)').trigger("click");
                $("#styleTodos").addClass("active");
                $("#styleSinCaptura").removeClass("active");
            }

        }
        loadingStop();
    });
}