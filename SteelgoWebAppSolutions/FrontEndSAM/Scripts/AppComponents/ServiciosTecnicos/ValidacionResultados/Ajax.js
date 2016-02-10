function AjaxObtenerJuntas() {
    loadingStart();
    $ValidacionResultados.ValidacionResultados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), RequisicionID: $("#Requisicion").data("kendoComboBox").text() }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        if (array.length != 0) {
            for (var i = 0; i < array.length; i++) {
                ds.add(array[i]);
            }
        }
        else {
            displayMessage("ValidacionResultadosMensajeNoHayDatos", "", "1");
        }
        loadingStop();
    });
}


function AjaxObtenerRenglonEdicionDefectos(requisicionID) {
    loadingStart();
    $ValidacionResultados.ValidacionResultados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), PruebaElementoResultadoID: $("#hdnPruebaElementoResultadoID").val(), RequisicionID: requisicionID }).done(function (data) {
        $("#gridPopUp").data('kendoGrid').dataSource.data([]);
        var ds = $("#gridPopUp").data("kendoGrid").dataSource;
        var array = data;
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
        VentanaModal();
        loadingStop();
    });
}


function AjaxObtenerRenglonEdicion(requisicionID, ubicacion) {
    loadingStart();
    $ValidacionResultados.ValidacionResultados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), RequisicionID: requisicionID, Ubicacion: ubicacion }).done(function (data) {
        if (data.length > 0) {
            $("#lblSpoolJunta").text(_dictionary.ValidacionResultadosSpoolJunta[$("#language").data("kendoDropDownList").value()] + data[0].SpoolJunta);
            $("#lblUbicacion").text(_dictionary.ValidacionResultadosCabeceraUbicacion[$("#language").data("kendoDropDownList").value()] + ": " + data[0].Ubicacion);
            $("#hdnPruebaElementoResultadoID").val(data[0].PruebaElementoResultadoID);
            $("#hdnRequisicionID").val(requisicionID);
            comboDefectos = data[0].Defectos;
            AjaxObtenerRenglonEdicionDefectos(requisicionID);
        }

        loadingStop();
    });
}


function AjaxGuardarCaptura(arregloCaptura) {
    Captura = [];
    Captura[0] = { ListaDetalles: "" };
    ListaDetalles = [];



    for (index = 0; index < arregloCaptura.length; index++) {
        ListaDetalles[index] = {
            Accion: "",
            ValidacionResultadosID: "",
            PruebaElementoResultadoID: "",
            DefectoID: "",
            Conciliado: "",
            Comentario: ""
        };


        ListaDetalles[index].Accion = arregloCaptura[index].Accion;
        ListaDetalles[index].ValidacionResultadosID = arregloCaptura[index].ValidacionResultadosID;
        ListaDetalles[index].PruebaElementoResultadoID = arregloCaptura[index].PruebaElementoResultadoID;
        ListaDetalles[index].DefectoID = arregloCaptura[index].DefectoID;
        ListaDetalles[index].Conciliado = arregloCaptura[index].Conciliado;
        if (arregloCaptura[index].Comentario == null || arregloCaptura[index].Comentario == undefined) {
            ListaDetalles[index].Comentario = "";
        }
        else {
            ListaDetalles[index].Comentario = arregloCaptura[index].Comentario;
        }


    }

    Captura[0].ListaDetalles = ListaDetalles;

    loadingStart();
    $ValidacionResultados.ValidacionResultados.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val(), RequisicionID: $("#Requisicion").data("kendoComboBox").value() }).done(function (data) {
        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
            displayMessage("CapturaSoldaduraMensajeGuardadoExitoso", "", "0");
            opcionHabilitarView(false, "FieldSetView");
            AjaxCargarRequisicionesParaValidacion();
            $("#grid").data('kendoGrid').dataSource.data([]);
        }
        else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
            mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2"
            displayMessage("CapturaMensajeGuardadoErroneo", "", '1');
            opcionHabilitarView(false, "FieldSetView");
        }
        loadingStop();
    });
}




function AjaxGuardarDefectos(arregloCaptura) {
    Defectos = [];
    Defectos[0] = { ListaDetalles: "" };
    ListaDetalles = [];



    for (index = 0; index < arregloCaptura.length; index++) {
        ListaDetalles[index] = {
            Accion: "",
            PruebaElementoDefectoID: "",
            PruebaElementoResultadoID: "",
            DefectoID: "",
            InicioDefecto: "",
            FinDefecto: ""
        };

        if (arregloCaptura[index].Accion == undefined) {
            ListaDetalles[index].Accion = 1;
            ListaDetalles[index].PruebaElementoDefectoID = 0;
            ListaDetalles[index].PruebaElementoResultadoID = $("#hdnPruebaElementoResultadoID").val();
        }
        else {
            ListaDetalles[index].Accion = arregloCaptura[index].Accion;
            ListaDetalles[index].PruebaElementoDefectoID = arregloCaptura[index].PruebaElementoDefectoID;
            ListaDetalles[index].PruebaElementoResultadoID = arregloCaptura[index].PruebaElementoResultadoID;

        }
        ListaDetalles[index].DefectoID = arregloCaptura[index].DefectoID;
        ListaDetalles[index].InicioDefecto = arregloCaptura[index].InicioDefecto;
        ListaDetalles[index].FinDefecto = arregloCaptura[index].FinDefecto;

    }

    Defectos[0].ListaDetalles = ListaDetalles;

    loadingStart();
    $ValidacionResultados.ValidacionResultados.create(Defectos[0], { token: Cookies.get("token"), lenguaje: $("#language").val(), defecto: 1 }).done(function (data) {
        $("#windowGrid").data("kendoWindow").close();
        AjaxObtenerJuntas();
        loadingStop();
        displayMessage("CapturaSoldaduraMensajeGuardadoExitoso", "", "0");
    });
}


function AjaxCargarRequisicionesParaValidacion() {
    loadingStart();
    $RequisicionesAsignadas.RequisicionesAsignadas.read({ lenguaje: $("#language").val(), token: Cookies.get("token"), idStatus: 7 }).done(function (data) {
        if (data.length > 0) {
            $("#Requisicion").data("kendoComboBox").value("");
            $("#Requisicion").data("kendoComboBox").dataSource.data(data);
        }
        loadingStop();
    });
}


