function AjaxCargarEntregaResultados() {
    
    loadingStart();
    $EntregaResultados.EntregaResultados.read({ lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
         $("#grid").data("kendoGrid").dataSource.data(data);
       
        loadingStop();
    });
}


function AjaxGuardarCaptura(arregloCaptura) {
    try {
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];


        for (index = 0; index < arregloCaptura.length; index++) {
            ListaDetalles[index] = { Accion: "", EntregaResultadosID: "", RECIBIDO: "", CONDICIONESFISICASID: "", DEFECTOSID: "", RequisicionPruebaElementoID: "" };
            ListaDetalles[index].Accion = arregloCaptura[index].Accion;
            ListaDetalles[index].EntregaResultadosID = arregloCaptura[index].EntregaResultadosID;
            ListaDetalles[index].RECIBIDO = arregloCaptura[index].RECIBIDO;
            ListaDetalles[index].CONDICIONESFISICASID = arregloCaptura[index].DEFECTOSID == 0 ? undefined : arregloCaptura[index].CONDICIONESFISICASID;
            ListaDetalles[index].DEFECTOSID = arregloCaptura[index].DEFECTOSID;
            ListaDetalles[index].RequisicionPruebaElementoID = arregloCaptura[index].RequisicionPruebaElementoID;

        }

        Captura[0].Detalles = ListaDetalles;

        $EntregaResultados.EntregaResultados.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                AjaxCargarEntregaResultados();
                mensaje = "Se guardo correctamente la informacion" + "-0";
                displayMessage("CapturaMensajeGuardadoExitoso", "", '1');
            }
            else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2"
                displayMessage("CapturaMensajeGuardadoErroneo", "", '1');
            }
            loadingStop();
        });


    } catch (e) {
        loadingStop();
        displayMessage("Mensajes_error", e.message, '0');

    }

};