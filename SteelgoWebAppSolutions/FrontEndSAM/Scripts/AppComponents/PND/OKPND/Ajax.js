var SpoolContiene = "";
var ProyectoIDAnterior = 0;
var TipoMuestraPredeterminadoID = 3049;

function AjaxCargarCamposPredeterminados() {
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "sin captura") {
            $('input[name="Muestra"][value="SinCaptura"]').prop('checked', true);
        }
        else if (data == "Todos") {
            $('input[name="Muestra"][value="Todos"]').prop('checked', true);
        }
        loadingStop();
    });

    AjaxGetListaProyectos();
};

function AjaxGetListaProyectos() {
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#Proyecto").data("kendoComboBox").dataSource.data(data);

        if ($("#Proyecto").data("kendoComboBox").dataSource._data.length == 2) {
            $("#Proyecto").data("kendoComboBox").select(1);
            $("#Proyecto").data("kendoComboBox").trigger("change");
            ProyectoIDAnterior = data[1].ProyectoID;
        }
        else {
            ProyectoIDAnterior = 0;
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
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    dataSource.add(data[i]);
                }
                dataSource.page(1);
            } else {
                displayNotify("MensajeNoResultados", "", "1");
                dataSource.page(0);
            }
            var mostrar = $('input:radio[name=Muestra]:checked').val();
            if (mostrar == 'SinCaptura')
                FiltroMostrar(0);
            else FiltroMostrar(1);
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
            SpoolWorkStatusID: 0,
            OrdenTrabajoSpoolID: 0,
            SpoolID: 0,
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
    if (proyectoID != 0 && proyectoID != undefined && proyectoID != "") {
        if (Captura[0].Detalle.length > 0) {
            $("#InputNumeroControl").val(SpoolContiene);
            $OK.OK.create(Captura[0], { lenguaje: $("#language").val(), ProyectoID: proyectoID, OPC: '1', token: Cookies.get("token"), param: true }).done(function (data) {
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
            });
        } else {
            displayNotify("EditarRequisicionExcepcionGuardado", "", "1");
        }
    }
}

function AjaxGuardadoMasivo(data) {
    CapturaMasiva = [];
    CapturaMasiva[0] = { Detalle: "" };
    CapturaMasiva[0].Detalle = JSON.stringify(data);
    var proyectoID = $("#Proyecto").data("kendoComboBox").value();    
    //--------MANDO OPC PARA EJECUTAR EL IF DEL STORE CUANDO SEA OK PND----------//
    $OK.OK.create(CapturaMasiva[0], { lenguaje: $("#language").val(), token: Cookies.get("token"), ProyectoID: proyectoID, OPC: '1' }).done(function (data) { 
        //if (data) {
        download(data, "ResultadoCargaMasiva.csv", "text/csv");
        displayNotify("MensajeGuardadoExistoso", "", "0");
        //}
    });    
};

function AjaxObtenerJuntas(SpoolID) {
    try {
        if (SpoolID != undefined || SpoolID != "" || SpoolID != null) {
            $OK.OK.read({ token: Cookies.get("token"), Lenguaje: $("#language").val(), SpoolID: SpoolID }).done(function (data) {
                //LlenarGridPopUp(data.ListaDetalles);
                LlenarGridPopUp(data);
            });
        }
    } catch (e) {
        displayNotify("", "Ocurrion un Error: " + e.message, "2");
        return;
    }
}