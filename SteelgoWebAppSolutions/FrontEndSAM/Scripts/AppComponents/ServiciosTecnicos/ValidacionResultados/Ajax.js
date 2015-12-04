function AjaxObtenerJuntas()
{
    loadingStart();
    $ValidacionResultados.ValidacionResultados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), RequisicionID: $("#Requisicion").val()}).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
        loadingStop();
    });
}


function AjaxGuardarCaptura(arregloCaptura) {
    Captura = [];
    Captura[0] = { ListaDetalles: ""};
    ListaDetalles = [];


    
    for (index = 0; index < arregloCaptura.length; index++) {
            ListaDetalles[index] = {
                Accion: "",
                ValidacionResultadosID: "",
                RequisicionID: "",
                DefectoID: "",
                IdentificadorForaneo: "",
                PruebaElementoID: "",
                Conciliado: "",
                Ubicacion: "",
                Comentario: "",
                RequisicionPruebaElementoID: ""
                
            };

            ListaDetalles[index].Accion = arregloCaptura[index].Accion;
            ListaDetalles[index].ValidacionResultadosID = arregloCaptura[index].ValidacionResultadosID;
            ListaDetalles[index].RequisicionID = arregloCaptura[index].RequisicionID;
            ListaDetalles[index].DefectoID = arregloCaptura[index].DefectoID;
            ListaDetalles[index].IdentificadorForaneo = arregloCaptura[index].IdentificadorForaneo;
            ListaDetalles[index].PruebaElementoID = arregloCaptura[index].PruebaElementoID;
            ListaDetalles[index].Conciliado = arregloCaptura[index].Conciliado;
            ListaDetalles[index].Ubicacion = arregloCaptura[index].Ubicacion;
            ListaDetalles[index].Comentario = arregloCaptura[index].Comentario;
            ListaDetalles[index].RequisicionPruebaElementoID = arregloCaptura[index].RequisicionPruebaElementoID;
    }

    Captura[0].ListaDetalles = ListaDetalles;

        loadingStart();
        $ValidacionResultados.ValidacionResultados.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            AjaxObtenerJuntas();
            loadingStop();
            displayMessage("CapturaSoldaduraMensajeGuardadoExitoso", "", "0");
        });
}


