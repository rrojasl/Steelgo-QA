function AjaxCargarEntregaResultados() {
    
    loadingStart();
    $EntregaResultados.EntregaResultados.read({ lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
         $("#grid").data("kendoGrid").dataSource.data(data);
       
        loadingStop();
    });
}


function AjaxGuardarCaptura(arregloCaptura, tipoGuardar) {
    try {
        
        var pruebas=false;
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];
        var i = 0;
        for (index = 0; index < arregloCaptura.length; index++) {
            if (arregloCaptura[index].RECIBIDO) {
                if (arregloCaptura[index].CONDICIONESFISICASID == 1 && arregloCaptura[index].DEFECTOSID == 0)
                {
                    ListaDetalles[i] = { Accion: "", EntregaResultadosID: "", RECIBIDO: "", CONDICIONESFISICASID: "", DEFECTOSID: "", RequisicionPruebaElementoID: "" };
                    ListaDetalles[i].Accion = arregloCaptura[index].Accion;
                    ListaDetalles[i].EntregaResultadosID = arregloCaptura[index].EntregaResultadosID;
                    ListaDetalles[i].RECIBIDO = arregloCaptura[index].RECIBIDO;
                    ListaDetalles[i].CONDICIONESFISICASID = arregloCaptura[index].CONDICIONESFISICASID;
                    //ListaDetalles[i].CONDICIONESFISICASID = arregloCaptura[index].DEFECTOSID == 0 ? undefined : arregloCaptura[index].CONDICIONESFISICASID;
                    ListaDetalles[i].DEFECTOSID = arregloCaptura[index].DEFECTOSID;
                    ListaDetalles[i].RequisicionPruebaElementoID = arregloCaptura[index].RequisicionPruebaElementoID;
                    pruebas = true;
                    i++;
                }

                if (arregloCaptura[index].CONDICIONESFISICASID == 2 && arregloCaptura[index].DEFECTOSID > 0) {
                    ListaDetalles[i] = { Accion: "", EntregaResultadosID: "", RECIBIDO: "", CONDICIONESFISICASID: "", DEFECTOSID: "", RequisicionPruebaElementoID: "" };
                    ListaDetalles[i].Accion = arregloCaptura[index].Accion;
                    ListaDetalles[i].EntregaResultadosID = arregloCaptura[index].EntregaResultadosID;
                    ListaDetalles[i].RECIBIDO = arregloCaptura[index].RECIBIDO;
                    ListaDetalles[i].CONDICIONESFISICASID = arregloCaptura[index].CONDICIONESFISICASID;
                    //ListaDetalles[i].CONDICIONESFISICASID = arregloCaptura[index].DEFECTOSID == 0 ? undefined : arregloCaptura[index].CONDICIONESFISICASID;
                    ListaDetalles[i].DEFECTOSID = arregloCaptura[index].DEFECTOSID;
                    ListaDetalles[i].RequisicionPruebaElementoID = arregloCaptura[index].RequisicionPruebaElementoID;
                    pruebas = true;
                    i++;
                }
                //&& arregloCaptura[index].CONDICIONESFISICASID == 1 ? true: (arregloCaptura[index].CONDICIONESFISICASID != 1 && arregloCaptura[index].DEFECTOSID != "")) {
            }
        }
        Captura[0].Detalles = ListaDetalles;
        if (pruebas) {
            $EntregaResultados.EntregaResultados.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {

                    if (tipoGuardar == 1) {
                        opcionHabilitarView(false, "FieldSetView");
                    }
                    else {
                        $("#grid").data("kendoGrid").dataSource.data([]);
                        AjaxCargarEntregaResultados();
                        opcionHabilitarView(true, "FieldSetView");

                    }
                    displayMessage("CapturaMensajeGuardadoExitoso", "", '1');
                }
                else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {

                    displayMessage("CapturaMensajeGuardadoErroneo", "", '1');
                }
                loadingStop();
            });
        }
        else {
            displayMessage("Mensajes_error", "NO existen datos para insertar", '0');
            loadingStop();
        }


    } catch (e) {
        loadingStop();
        displayMessage("Mensajes_error", e.message, '0');

    }

};