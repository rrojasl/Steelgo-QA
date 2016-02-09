var CampoMuestra = 29;

function AjaxPruebas() {
    loadingStart();
    $Pruebas.Pruebas.read({ token: Cookies.get("token"), proyectoID: 0, lenguaje: $("#language").val() }).done(function (data) {
        $("#inputPrueba").data("kendoComboBox").value("");
        $("#inputPrueba").data("kendoComboBox").dataSource.data(data);
        //$("#inputPrueba").data("kendoComboBox").trigger("change");
        loadingStop();
    });
    
};

function AjaxProveedor(TipoConsulta) {
    
    $AsignarRequisicion.AsignarRequisicion.read({ lenguaje: $("#language").val(), token: Cookies.get("token"), idPrueba: $("#inputPrueba").val(), ConsultaDetalle: TipoConsulta }).done(function (data) {
        $("#inputProveedor").data("kendoComboBox").value("");
        $("#inputProveedor").data("kendoComboBox").dataSource.data(data);
    
           
        });
}

function ObtenerDato(fecha, tipoDatoObtener) {
    var cultura = $("#language").val();

    switch (tipoDatoObtener) {
        case 1://anho
            return fecha.split('/')[2]
            break;
        case 2://mes
            if (cultura = 'es-MX')
                return fecha.split('/')[1]
            else
                return fecha.split('/')[0]
            break;
        case 3://dia
            if (cultura = 'es-MX')
                return fecha.split('/')[0]
            else
                return fecha.split('/')[1]
            break;
    }
}

function AjaxCargarRequisicionAsignacion() {
    loadingStart();
    $AsignarRequisicion.AsignarRequisicion.read({ lenguaje: $("#language").val(), token: Cookies.get("token"), mostrar: $('input:radio[name=Muestra]:checked').val(), idPrueba: $("#inputPrueba").val() == "" ? 0 : $("#inputPrueba").val(), idProveedor: $("#inputProveedor").val() == "" ? 0 : $("#inputProveedor").val() }).done(function (data) {
        $("#grid").data("kendoGrid").dataSource.data([]);
        //$("#grid").data("kendoGrid").dataSource.data(data);

        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;

        for (var i = 0; i < array.length; i++) {
            array[i].Fecha = new Date(ObtenerDato(array[i].Fecha, 1), ObtenerDato(array[i].Fecha, 2), ObtenerDato(array[i].Fecha, 3));//año, mes, dia
            ds.add(array[i]);
        }


        if ($("#inputProveedor").val() == "")
            AjaxProveedor(0);
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

function AjaxGuardarCaptura(arregloCaptura, tipoGuardar) {
    try {
        var pruebas = false;
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];
        var i = 0;

        for (index = 0; index < arregloCaptura.length; index++) {
            ListaDetalles[i] = { Accion:"", RequisicionID: "", ProveedorID: "", HerramientadePruebaID: "", TurnoLaboralID: "", Fecha: "" };
            if (arregloCaptura[i].ProveedorID != "" && arregloCaptura[i].HerramientadePruebaID != "" && arregloCaptura[i].TurnoLaboralID != "") {
                ListaDetalles[i].Accion = arregloCaptura[index].Accion;
                ListaDetalles[i].RequisicionID = arregloCaptura[index].RequisicionID;
                ListaDetalles[i].ProveedorID = arregloCaptura[index].ProveedorID;
                ListaDetalles[i].HerramientadePruebaID = arregloCaptura[index].HerramientadePruebaID;
                ListaDetalles[i].TurnoLaboralID = arregloCaptura[index].TurnoLaboralID;
                ListaDetalles[i].Fecha =kendo.toString(arregloCaptura[index].Fecha, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim();
                i++;
                pruebas = true;
            }
            else {
                pruebas = false;
                break;
            }
        }

        Captura[0].Detalles = ListaDetalles;
        if (pruebas) {
            $AsignarRequisicion.AsignarRequisicion.create(Captura[0], { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
                    if (tipoGuardar == 1) {
                        Limpiar();
                        opcionHabilitarView(false, "FieldSetView");
                    }
                    else {
                        $("#grid").data("kendoGrid").dataSource.data([]);
                        AjaxCargarRequisicionAsignacion();
                        opcionHabilitarView(true, "FieldSetView");

                    }
                    displayMessage("CapturaMensajeGuardadoExitoso", "", '1');
                }
                else if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") {
                    mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2"
                    displayMessage("CapturaMensajeGuardadoErroneo", "", '1');
                }

            });
        }
        else
            displayMessage("DatosIncompletos", "", '1');


    } catch (e) {
        loadingStop();
        displayMessage("Mensajes_error", e.message, '0');

    }

};