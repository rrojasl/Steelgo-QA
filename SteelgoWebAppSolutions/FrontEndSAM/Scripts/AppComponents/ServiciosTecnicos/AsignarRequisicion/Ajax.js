var CampoMuestra = 29;

function AjaxPruebas() {
   
    $Pruebas.Pruebas.read({ token: Cookies.get("token"), proyectoID: 0, lenguaje: $("#language").val() }).done(function (data) {
        $("#inputPrueba").data("kendoComboBox").value("");
        $("#inputPrueba").data("kendoComboBox").dataSource.data(data);
        //$("#inputPrueba").data("kendoComboBox").trigger("change");
    });
    
};

function AjaxProveedor(TipoConsulta) {
    loadingStart();
    $AsignarRequisicion.AsignarRequisicion.read({ lenguaje: $("#language").val(), token: Cookies.get("token"), idPrueba: $("#inputPrueba").val(), ConsultaDetalle: TipoConsulta }).done(function (data) {
        $("#inputProveedor").data("kendoComboBox").value("");
        $("#inputProveedor").data("kendoComboBox").dataSource.data(data);
        AjaxCargarRequisicionAsignacion();
            loadingStop();
            
        });
}

function AjaxCargarRequisicionAsignacion() {
    loadingStart();
    $AsignarRequisicion.AsignarRequisicion.read({ lenguaje: $("#language").val(), token: Cookies.get("token"), mostrar: $('input:radio[name=Muestra]:checked').val(), idPrueba: $("#inputPrueba").val(), idProveedor: $("#inputProveedor").val() }).done(function (data) {
        $("#grid").data("kendoGrid").dataSource.data([]);
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
       // AjaxCargarRequisicionAsignacion();
    });

}

function AjaxGuardarCaptura(arregloCaptura) {
    try {
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];
        var i = 0;

        for (index = 0; index < arregloCaptura.length; index++) {
            ListaDetalles[index] = { Accion:"", RequisicionID: "", ProveedorID: "", HerramientadePruebaID: "", TurnoLaboralID: "", Fecha: "" };
            if (arregloCaptura[index].ProveedorID != "" && arregloCaptura[index].HerramientadePruebaID != "" && arregloCaptura[index].TurnoLaboralID != "") {
                ListaDetalles[i].Accion = arregloCaptura[index].Accion;
                ListaDetalles[i].RequisicionID = arregloCaptura[index].RequisicionID;
                ListaDetalles[i].ProveedorID = arregloCaptura[index].ProveedorID;
                ListaDetalles[i].HerramientadePruebaID = arregloCaptura[index].HerramientadePruebaID;
                ListaDetalles[i].TurnoLaboralID = arregloCaptura[index].TurnoLaboralID;
                ListaDetalles[i].Fecha = arregloCaptura[index].Fecha;
                i++;
            }
        }

        Captura[0].Detalles = ListaDetalles;

        $AsignarRequisicion.AsignarRequisicion.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                $("#grid").data("kendoGrid").dataSource.data([]);
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