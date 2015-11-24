var CampoMuestra = 29;

function AjaxPruebas() {
   
    $Pruebas.Pruebas.read({ token: Cookies.get("token"), proyectoID: 0, lenguaje: $("#language").val() }).done(function (data) {
        $("#inputPrueba").data("kendoDropDownList").value("");
        $("#inputPrueba").data("kendoDropDownList").dataSource.data(data);
        $("#inputPrueba").data("kendoDropDownList").trigger("change");
    });
    
};

function AjaxProveedor(TipoConsulta) {
    loadingStart();
    $AsignarRequisicion.AsignarRequisicion.read({ lenguaje: $("#language").val(), token: Cookies.get("token"), idPrueba: $("#inputPrueba").val(), ConsultaDetalle: TipoConsulta }).done(function (data) {
            $("#inputProveedor").data("kendoDropDownList").value("");
            $("#inputProveedor").data("kendoDropDownList").dataSource.data(data);
            loadingStop();
            AjaxCargarRequisicionAsignacion();
        });
}

function AjaxCargarRequisicionAsignacion() {
    loadingStart();
    $AsignarRequisicion.AsignarRequisicion.read({ lenguaje: $("#language").val(), token: Cookies.get("token"), mostrar: "Todos", idPrueba: $("#inputPrueba").val(), idProveedor: $("#inputProveedor").val() }).done(function (data) {
        $("#grid").data("kendoGrid").dataSource.data(data);
        loadingStop();
    });
}

function AjaxCargarCamposPredeterminados() {
    
    $ListadoCamposPredeterminados.ListadoCamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: CampoMuestra }).done(function (data) {
        
        if (data == "sin captura") {
            $('input:radio[name=Muestra]:nth(0)').attr('checked', true);
            $('input:radio[name=Muestra]:nth(1)').attr('checked', false);
            $("#styleSinCaptura").addClass("active");
            $("#styleTodos").removeClass("active");
        }
        else if (data == "Todos") {
            $('input:radio[name=Muestra]:nth(0)').attr('checked', false);
            $('input:radio[name=Muestra]:nth(1)').attr('checked', true);
            $("#styleTodos").addClass("active");
            $("#styleSinCaptura").removeClass("active");
        }
    });

}

function AjaxGuardarCaptura(arregloCaptura) {
    try {
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];


        for (index = 0; index < arregloCaptura.length; index++) {
            ListaDetalles[index] = { Accion:"", RequisicionID: "", ProveedorID: "", HerramientadePruebaID: "", TurnoLaboralID: "", Fecha: "" };
            ListaDetalles[index].Accion = arregloCaptura[index].Accion;
            ListaDetalles[index].RequisicionID = arregloCaptura[index].RequisicionID;
            ListaDetalles[index].ProveedorID = arregloCaptura[index].ProveedorID;
            ListaDetalles[index].HerramientadePruebaID = arregloCaptura[index].HerramientadePruebaID;
            ListaDetalles[index].TurnoLaboralID = arregloCaptura[index].TurnoLaboralID;
            ListaDetalles[index].Fecha = arregloCaptura[index].Fecha;
        }

        Captura[0].Detalles = ListaDetalles;

        $AsignarRequisicion.AsignarRequisicion.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                AjaxCargarRequisicionAsignacion();
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