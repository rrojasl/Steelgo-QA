var TipoMuestraPredeterminadoID = 3049;

function AjaxCargarCamposPredeterminados() {
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: TipoMuestraPredeterminadoID }).done(function (data) {
        if (data == "sin captura") {
            $('input:radio[name=Muestra]:nth(0)').trigger("click");
        }
        else if (data == "Todos") {
            $('input:radio[name=Muestra]:nth(1)').trigger("click");
        }
        loadingStop();
    });

    AjaxGetListaProyectos();
};

function AjaxGetListaProyectos() {
    $Proyectos.Proyectos.read({ token: Cookies.get("token") }).done(function (data) {
        $("#Proyecto").data("kendoComboBox").value("");
        $("#Proyecto").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}

function AjaxGetListaTiposDePrueba() {
    $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        $("#tipoPrueba").data("kendoComboBox").dataSource.data(data);
    });
}

function AjaxGetListaRequisiciones(proyectoID, tipoPruebaID) {
    $ServiciosTecnicosGeneral.ServiciosTecnicosGeneral.read({ token: Cookies.get("token"), ProyectoID: proyectoID, TipoPruebaID: tipoPruebaID }).done(function (data) {
        $("#listaRequisiciones").data("kendoComboBox").value("");
        $("#listaRequisiciones").data("kendoComboBox").dataSource.data(data);
    });
}

function AjaxGetListaElementos(requisicionID, tipoPruebaID, proyectoID, muestra) {
    $RequisicionPND.RequisicionPND.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), RequisicionID: requisicionID, TipoPruebaID: tipoPruebaID, ProyectoID: proyectoID, Muestra: muestra }).done(function (data) {
        $("#grid").data("kendoGrid").dataSource.data([]);

        var ds = $("#grid").data("kendoGrid").dataSource;

        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
                tipoPrueba = data[i].TipoPruebaID;
            }
        }
        loadingStop();
    });
}

function AjaxGuardarCaptura(arregloCaptura) {
    Captura = [];
    Captura[0] = {
        RequisicionID: 0,
        Requisicion: "",
        ProyectoID: 0,
        TipoPruebaID: 0,
        CodigoAsme: "",
        Observacion: "",
        
        ListaDetalle: ""
    };
    ListaCaptura = [];

    var cont = 0;
    for (index = 0; index < arregloCaptura.length; index++) {
        if (arregloCaptura[index].Agregar == true) {

            ListaCaptura[cont] = {
                RequisicionID: 0,
                ElementoPorClasificacionPNDID: 0
            };

            ListaCaptura[cont].RequisicionID = $("#listaRequisiciones").data("kendoComboBox").value() == "" ? 0 : $("#listaRequisiciones").data("kendoComboBox").value();
            ListaCaptura[cont].ElementoPorClasificacionPNDID = arregloCaptura[index].ElementoPorClasificacionPNDID;

            cont++;
        }

    }

    if (ListaCaptura.length != 0) {
        Captura[0].RequisicionID = $("#listaRequisiciones").data("kendoComboBox").value() == "" ? 0 : $("#listaRequisiciones").data("kendoComboBox").value();
        Captura[0].Requisicion = "";
        Captura[0].ProyectoID = $("#Proyecto").data("kendoComboBox").value();
        Captura[0].TipoPruebaID = $("#tipoPrueba").data("kendoComboBox").dataItem($("#tipoPrueba").data("kendoComboBox").select()).TipoPruebaID;
        Captura[0].CodigoAsme = "CodigoASME";
        Captura[0].Observacion = "OBS";

        Captura[0].ListaDetalle = ListaCaptura;

        loadingStart();

        var tipoPruebaID = $("#tipoPrueba").data("kendoComboBox").dataItem($("#tipoPrueba").data("kendoComboBox").select()).TipoPruebaID;

        //windowTemplate = kendo.template($("#windowTemplate").html());

        VentanaModal();

        loadingStop();
        
        //$RequisicionPND.RequisicionPND.create(Captura[0], { token: Cookies.get("token") }).done(function (data) {
        //    if (data.ReturnMessage.length > 0 && data.ReturnMessage[0].split('|')[0] == "Ok") {
        //        //mensaje = "Se guardo correctamente la informacion" + "-0";
        //        //if (tipoGuardar == 1) {
        //        //    Limpiar();
        //        //    opcionHabilitarView(false, "FieldSetView");
        //        //    requisicionID = 0;
        //        //}
        //        //else {
        //        //    requisicionID = data.ReturnMessage[0].split('|')[1];
        //        //    ajaxObtenerJuntasSoldadas($("#Proyecto").data("kendoComboBox").value());
        //        //    opcionHabilitarView(true, "FieldSetView");
        //        //}
        //        //ajaxRequisicion();
        //        //displayNotify("CapturaSoldaduraMensajeGuardadoExitoso", "", "0");
        //        loadingStop();
        //    }
        //    else  /*(data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") */ {
        //        //mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2";
        //        //displayNotify("CapturaMensajeGuardadoErroneo", "", '1');
        //        loadingStop();
        //    }
        //});
    }
    else {
        displayNotify("MensajeSeleccioneRequisiciones", "", "1");
    }
}