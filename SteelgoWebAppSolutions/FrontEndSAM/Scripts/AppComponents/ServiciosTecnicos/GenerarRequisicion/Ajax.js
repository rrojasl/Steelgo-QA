function ajaxObtenerTipoPruebas() {
    loadingStart();
    var proyecto = parseInt($("#Proyecto").val());
    $Pruebas.Pruebas.read({ token: Cookies.get("token"), proyectoID: proyecto, lenguaje: $("#language").val() }).done(function (data) {
        $("#tipoPrueba").data("kendoComboBox").value("");
        $("#tipoPrueba").data("kendoComboBox").dataSource.data(data);
        loadingStop();
    });
}

function ajaxObtenerTipoPruebasRequisicionEdicion() {
    loadingStart();
    var proyecto = parseInt($("#Proyecto").val());
    $Pruebas.Pruebas.read({ token: Cookies.get("token"), proyectoID: proyecto, lenguaje: $("#language").val() }).done(function (data) {
        $("#tipoPrueba").data("kendoComboBox").value("");
        $("#tipoPrueba").data("kendoComboBox").dataSource.data(data);
        $("#tipoPrueba").data("kendoComboBox").value(pruebasID);
        ajaxObtenerJuntasSoldadas(pruebasID);
        loadingStop();
    });
}


function ajaxRequisicion() {
    loadingStart();
    if (requisicionID != 0) {
        $GenerarRequisicion.GenerarRequisicion.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), requisicionID: requisicionID }).done(function (data) {
            var NewDate = kendo.toString(data[0].FechaRequisicion, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
            endRangeDate.val(NewDate);
            requisicionID = data[0].RequisicionID;
            EstatusID = data[0].EstatusID;
            pruebasID = data[0].PruebasID;
            ProyectoNombre = data[0].Nombre;
            ProyectoID = data[0].ProyectoID;
            PruebaNombre = data[0].Prueba;
            $("#Folio").text(data[0].Folio);
            $("#Observacion").val(data[0].Observacion);
            $("#Proyecto").data("kendoComboBox").value(data[0].proyectoID);
            loadingStop();
            
        });
    }
    else {
        requisicionID = 0;
        EstatusID = 1;
        $("#Folio").text("Sin asignar");
        $("#Fecha").data("kendoDatePicker").value("");
        $("#Observacion").val("");
        loadingStop();
    }
        
}

function ajaxObtenerProyectos() {
    $GenerarRequisicion.GenerarRequisicion.read({ token: Cookies.get("token") }).done(function (data) {
        $("#Proyecto").data("kendoComboBox").value("");
        $("#Proyecto").data("kendoComboBox").dataSource.data(data);
    });
}


function ajaxObtenerJuntasSoldadas(pruebaID) {
    loadingStart();
    
    $GenerarRequisicion.GenerarRequisicion.read({ token: Cookies.get("token"), pruebaID: pruebaID, todos: $('input:radio[name=Muestra]:checked').val(), lenguaje: $("#language").val(), reqID: requisicionID }).done(function (data) {
        $("#grid").data('kendoGrid').dataSource.data([]);
        var ds = $("#grid").data("kendoGrid").dataSource;
        var array = data;
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
        $("#Proyecto").data("kendoComboBox").enable(false);
        $("#tipoPrueba").data("kendoComboBox").enable(false);
        $('#containerDiv').css('display', 'block');
        loadingStop();
    });
}


function AjaxCargarCamposPredeterminados() {

    loadingStart();
    $GenerarRequisicion.GenerarRequisicion.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (data.Muestra == "Sincaptura") {
            $('input:radio[name=Muestra]:nth(0)').attr('checked');
            $('input:radio[name=Muestra]:nth(1)').removeAttr('checked');
        }
        else if (data.Muestra == "Todos") {
            $('input:radio[name=Muestra]:nth(0)').removeAttr('checked');
            $('input:radio[name=Muestra]:nth(1)').attr('checked', true);
        }
        loadingStop();
        cargaInicialRequisicionEditar();
    });

};


function AjaxJunta(spoolID) {
    loadingStart();
    $CapturasRapidas.CapturasRapidas.read({ id: spoolID, sinCaptura: "otros", token: Cookies.get("token"), proceso: 3 }).done(function (data) {
        $("#Junta").data("kendoComboBox").value("");
        $("#Junta").data("kendoComboBox").dataSource.data(data)
        if (data.length == 0) {
            displayMessage("MensajeJuntasSoldadasReguisicion", "", '1');
        }
            
        loadingStop();
    });
}



function AjaxGuardarCaptura(arregloCaptura, tipoGuardar) {
    Captura = [];
    Captura[0] = { listaRequisiciones: "", RequisicionID: "", Folio: "", PruebasID: "", FechaRequisicion: "", Observacion: "", EstatusID: "" };
    ListaDetalles = [];


    var cont = 0;
    for (index = 0; index < arregloCaptura.length; index++) {
        if (arregloCaptura[index].Agregar == true) {
            
            ListaDetalles[cont] = {
                Accion: "",
                RequisicionPruebaElementoID: "",
                PruebaElementoID: "",
                PruebasProyectoID: "",
                IdentificadorForaneo: "",
                PruebasClasificacionID: ""
            };

            ListaDetalles[cont].Accion = arregloCaptura[index].Accion;
            ListaDetalles[cont].RequisicionPruebaElementoID = arregloCaptura[index].RequisicionPruebaElementoID;
            ListaDetalles[cont].PruebaElementoID = arregloCaptura[index].PruebaElementoID;
            ListaDetalles[cont].PruebasProyectoID = arregloCaptura[index].PruebasProyectoID;
            ListaDetalles[cont].IdentificadorForaneo = arregloCaptura[index].IdentificadorForaneo;
            ListaDetalles[cont].PruebasClasificacionID = arregloCaptura[index].PruebasClasificacionID;
            cont++;
        }
        
    }

    if (ListaDetalles.length != 0) {
        Captura[0].listaRequisiciones = ListaDetalles;
        Captura[0].Folio = $("#Folio").text();
        Captura[0].FechaRequisicion = $("#Fecha").val();
        Captura[0].Observacion = $("#Observacion").val();
        Captura[0].PruebasID = $("#tipoPrueba").data("kendoComboBox").value();
        Captura[0].EstatusID = EstatusID;
        Captura[0].RequisicionID = requisicionID;

        loadingStart();
        $GenerarRequisicion.GenerarRequisicion.create(Captura[0],{ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (data.ReturnMessage.length > 0 && data.ReturnMessage[0].split('|')[0] == "Ok") {
                //mensaje = "Se guardo correctamente la informacion" + "-0";
                if (tipoGuardar == 1) {
                    Limpiar();
                    opcionHabilitarView(false, "FieldSetView");
                    requisicionID = 0;
                   
                }
                else {
                    requisicionID = data.ReturnMessage[0].split('|')[1];
                    ajaxObtenerJuntasSoldadas($("#tipoPrueba").data("kendoComboBox").value());
                    opcionHabilitarView(true, "FieldSetView");
                   
                    
                }
                ajaxRequisicion();
                displayMessage("CapturaSoldaduraMensajeGuardadoExitoso", "", "0");
                loadingStop();

            }
            else  /*(data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") */ {
                //mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2";
                displayMessage("CapturaMensajeGuardadoErroneo", "", '1');
                loadingStop();

            }

        });
    }
    else {
        displayMessage("MensajeSeleccioneRequisiciones", "", "1");
    }
}


