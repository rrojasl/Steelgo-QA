var folioGenerado;
function AjaxCargarDatos() {
    $ImpresionPruebas.ImpresionPruebas.read({ token: Cookies.get("token"), mostrar: "Todos", TipoPruebaID: 10, TipoPruebaProveedorID: 12, RequisicionID: 1 }).done(function (data) {
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
    Captura[0] = { Detalles: "" };
    ListaDetalles = [];
    contador = 0;
    ReporteIDConsecutivo;


    for (var i = 0; i < arregloJuntas.length; i++) {
        if (arregloJuntas[i].Seleccionado && (arregloJuntas[i].ReporteID != null || arregloJuntas[i].ReporteID != undefined)) {
            ListaDetalles[contador] = { RequisicionPruebaElementoID: "", ReporteID: "", ReportePath: "" };
            ListaDetalles[contador].RequisicionPruebaElementoID = arregloJuntas[i].RequisicionPruebaElementoID;
            ListaDetalles[contador].ReporteID = arregloJuntas[i].ReporteID;
            ListaDetalles[contador].Status = arregloJuntas[i].Status;
            ListaDetalles[contador].ReportePath = arregloJuntas[i].ReportePath;
            contador++;
        }
    }



    Captura[0].Detalles = ListaDetalles;
    if (Captura[0].Detalles.length > 0) {
        for (var m = 0; m < Captura[0].Detalles.length; m++) {
            SolicitarImpresion(Captura[0].Detalles[m].ReportePath.replace('?1', $("#language").val()).replace('?2', Captura[0].Detalles[m].RequisicionPruebaElementoID));
        }
        loadingStop();
    }
    else {
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

    if (JuntasSeleccionadasConIDUnico(arregloJuntas) && AsignarIDUnicoXJuntaSeleccionada(arregloJuntas)) {

        for (var i = 0; i < arregloJuntas.length; i++) {
            if (arregloJuntas[i].Seleccionado && (arregloJuntas[i].Status == 'N' || arregloJuntas[i].Status == 'NR' || arregloJuntas[i].Status != 'A')) {
                ListaDetalles[contador] = { RequisicionPruebaElementoID: "", ReporteID: "" };
                ListaDetalles[contador].RequisicionPruebaElementoID = arregloJuntas[i].RequisicionPruebaElementoID;
                ListaDetalles[contador].ReporteID = arregloJuntas[i].ReporteID;
                ListaDetalles[contador].Status = arregloJuntas[i].Status;
                contador++;
            }
        }



        Captura[0].Detalles = ListaDetalles;
        if (Captura[0].Detalles.length > 0) {
            $ImpresionPruebas.ImpresionPruebas.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                    AjaxCargarDatos();
                    mensaje = "Se guardo correctamente la informacion" + "-0";
                    displayMessage("CapturaMensajeGuardadoExitoso", "", '1');
                }
                else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                    mensaje = "No se guardo la informacion el error es: " + data.RetsurnMessage[0] + "-2"
                    displayMessage("CapturaMensajeGuardadoErroneo", "", '1');
                }
                loadingStop();



            });
        }
        else {
            loadingStop();
        }
    }
    else {
        displayMessage("CapturaMensajeJuntasErroneas", "", '1');
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
        $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), ProyectoID: $("#inputProyecto").data("kendoComboBox").value(), PatioID: 6, TipoPruebaID: $("#inputPrueba").data("kendoComboBox").value() }).done(function (data) {
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
        $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), ProyectoID: $("#inputProyecto").data("kendoComboBox").value(), TipoPruebaID: $("#inputPrueba").data("kendoComboBox").value(), estatusID: 2 }).done(function (data) {
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
