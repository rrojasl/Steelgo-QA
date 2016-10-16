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

function AjaxGetListaElementos(proyectoID, numControl) {
    loadingStart();
    SpoolContiene = numControl;

    $OKPND.OKPND.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), ProyectoID: proyectoID, NumControl: numControl, muestra: $('input:radio[name=Muestra]:checked').val() }).done(function (data) {
        $("#grid").data("kendoGrid").dataSource.data([]);

        var ds = $("#grid").data("kendoGrid").dataSource;

        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
            }
            ds.page(1);
        } else {
            displayNotify("MensajeNoResultados", "", "1");
            ds.page(0);
        }
        ds.sync();
        loadingStop();
    });
}

function AjaxGuardarCaptura(arregloCaptura, tipoGuardado) {
    Captura = [];
    Captura[0] = {
        Detalle: ""
    };
    ListaCaptura = [];

    var cont = 0;
    for (index = 0; index < arregloCaptura.length; index++) {
        if (arregloCaptura[index].OkPND == true || arregloCaptura[index].OKPNDID != 0) {

            ListaCaptura[cont] = {
                OKPNDID: 0,
                SpoolID: 0,
                OrdenTrabajoSpoolID: 0,
                OkPND: false
            };

            ListaCaptura[cont].OKPNDID = arregloCaptura[index].OKPNDID;
            ListaCaptura[cont].OrdenTrabajoSpoolID = arregloCaptura[index].OrdenTrabajoSpoolID;
            ListaCaptura[cont].SpoolID = arregloCaptura[index].SpoolID;
            ListaCaptura[cont].OkPND = arregloCaptura[index].OkPND;

            cont++;
        }
    }

    Captura[0].Detalle = ListaCaptura;

    var ds = $("#grid").data("kendoGrid").dataSource;

    if (Captura[0].Detalle.length > 0) {
        $("#InputNumeroControl").val(SpoolContiene);
        $OKPND.OKPND.create(Captura[0], { lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
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
            }
            else {
                opcionHabilitarView(false, "FieldSetView");
            }
        });
    }
    else {
        displayNotify("EditarRequisicionExcepcionGuardado", "", "1");
    }
}

function AjaxGuardadoMasivo(data) {
    CapturaMasiva = [];
    CapturaMasiva[0] = { Detalle: "" };
    CapturaMasiva[0].Detalle = JSON.stringify(data);
    var proyectoID = $("#Proyecto").data("kendoComboBox").value();
    $OKPND.OKPND.create(CapturaMasiva[0], { lenguaje: $("#language").val(), token: Cookies.get("token"), ProyectoID: proyectoID }).done(function (data) {
        //if (data) {
        download(data, "ResultadoCargaMasiva.csv", "text/csv");
        displayNotify("MensajeGuardadoExistoso", "", "0");
        //}
    });
};