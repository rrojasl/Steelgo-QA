function AjaxJunta(spoolID) {
    $('input:radio[name=Muestra]:checked').val();
    $CapturaArmado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), id: spoolID, sinCaptura: $('input:radio[name=Muestra]:checked').val(), token: Cookies.get("token") }).done(function (data) {
        $("#Junta").data("kendoComboBox").value("");
        $("#Junta").data("kendoComboBox").dataSource.data(data);


    });
}

function AjaxObtenerSpoolID() {
    $CapturaArmado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
        $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
        Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
    });
}

function AjaxObtenerListaTubero() {
    loadingStart();
    if (Cookies.get("Proyecto") != undefined) {
        $CapturaArmado.Armado.read({ idProyecto: Cookies.get("Proyecto").split('°')[0], tipo: 4, token: Cookies.get("token") }).done(function (data) {

            $("#inputTubero").data("kendoComboBox").value("");
            $("#inputTubero").data("kendoComboBox").dataSource.data(data);
            loadingStop();
        });
    }
    else
        loadingStop();
}

function AjaxObtenerListaTaller() {
    loadingStart();
    if (Cookies.get("Proyecto") != undefined) {
        $CapturaArmado.Armado.read({ idProyecto: Cookies.get("Proyecto").split('°')[0], token: Cookies.get("token") }).done(function (data) {
            $("#inputTaller").data("kendoComboBox").value("");
            $("#inputTaller").data("kendoComboBox").dataSource.data(data);
        });
    }
    else
        loadingStop();
}

function ObtenerJSonGridArmado() {
    if (ExisteJunta()) {
        try {

            $CapturaArmado.Armado.read({ JsonCaptura: JSON.stringify(ArregloListadoCaptura()), token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {

                var ds = $("#grid").data("kendoGrid").dataSource;
                var array = JSON.parse(data);

                for (var i = 0; i < array.length; i++) {
                    array[i].NumeroUnico1 = array[i].NumeroUnico1 === "" ? DatoDefaultNumeroUnico1() : array[i].NumeroUnico1;
                    array[i].NumeroUnico2 = array[i].NumeroUnico2 === "" ? DatoDefaultNumeroUnico2() : array[i].NumeroUnico2;
                    if (array[i].FechaArmado != null) {
                        array[i].FechaArmado = new Date(ObtenerDato(array[i].FechaArmado, 1), ObtenerDato(array[i].FechaArmado, 2), ObtenerDato(array[i].FechaArmado, 3));//año, mes, dia
                    }
                    ds.add(array[i]);
                }
            });

        } catch (e) {
            displayMessage("Mensajes_error", e.message, '1');
        }
    }
    else {
        displayMessage("CapturaArmadoMensajeJuntaExistente", "", '1');
    }
}

function AjaxEjecutarGuardado(rows, tipoGuardar)
{
    $CapturaArmado.Armado.create(rows, { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
            displayMessage("CapturaMensajeGuardadoExitoso", "", '1');

            if (tipoGuardar == 1) {
                Limpiar();
                AjaxCargarCamposPredeterminados();
            }
            else {
                opcionHabilitarView(true, "FieldSetView");
                AjaxCambiarAccionAModificacion();
            }
            loadingStop();

        }
        else  /*(data.ReturnMessage.length > 0 && data.ReturnMessage[0] != "Ok") */ {
            //mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2";
            displayMessage("CapturaMensajeGuardadoErroneo", "", '1');
            loadingStop();

        }
    });
}

function AjaxGuardarCaptura(arregloCaptura,tipoGuardar) {
    try {
        var seGuardoCorrectamente = false;
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];
        
        

       
        for (index = 0; index < arregloCaptura.length; index++) {
            try {
            ListaDetalles[index] = { Accion: "", IdVal: "", JuntaID: "", TipoJuntaID: "", Junta: "", Localizacion1: "", Localizacion2: "", JuntaArmadoID: "", JuntaTrabajoID: "", NumeroUnico1ID: "", NumeroUnico2ID: "", TallerID: "", TuberoID: "", FechaArmado: "", ListaDetalleTrabajoAdicional: "" ,Estatus: 1 };


            ListaDetalles[index].Accion = arregloCaptura[index].Accion;
            ListaDetalles[index].IdVal = arregloCaptura[index].IdVal;
            ListaDetalles[index].JuntaID = arregloCaptura[index].JuntaID;
            ListaDetalles[index].TipoJuntaID = arregloCaptura[index].TipoJuntaID;
            ListaDetalles[index].Junta = arregloCaptura[index].Junta;
            ListaDetalles[index].Localizacion1 = arregloCaptura[index].Localizacion.split('-')[0];
            ListaDetalles[index].Localizacion2 = arregloCaptura[index].Localizacion.split('-')[1];
            ListaDetalles[index].JuntaArmadoID = arregloCaptura[index].JuntaArmadoID;
            ListaDetalles[index].JuntaTrabajoID = arregloCaptura[index].JuntaTrabajoID;
            ListaDetalles[index].NumeroUnico1ID = arregloCaptura[index].NumeroUnico1ID;
            ListaDetalles[index].NumeroUnico2ID = arregloCaptura[index].NumeroUnico2ID;
            ListaDetalles[index].TallerID = arregloCaptura[index].TallerID;
            ListaDetalles[index].TuberoID = arregloCaptura[index].TuberoID;
            ListaDetalles[index].FechaArmado =arregloCaptura[index].FechaArmado==null?"": kendo.toString(arregloCaptura[index].FechaArmado, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim();

            ListaTrabajosAdicionalesEditados = [];
            for (j = 0; j < arregloCaptura[index].ListaDetalleTrabajoAdicional.length; j++) {

                ListaTrabajosAdicionalesEditados[j] = { Accion: "", JuntaID: "", ArmadoTrabajoAdicionalID: "", JuntaArmadoID: "", TrabajoAdicionalID: "", ObreroID: "", Observacion: "" };
                ListaTrabajosAdicionalesEditados[j].Accion = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].Accion;
                ListaTrabajosAdicionalesEditados[j].JuntaID = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].JuntaID;
                ListaTrabajosAdicionalesEditados[j].ArmadoTrabajoAdicionalID = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].ArmadoTrabajoAdicionalID;
                ListaTrabajosAdicionalesEditados[j].JuntaArmadoID = arregloCaptura[index].JuntaArmadoID;
                ListaTrabajosAdicionalesEditados[j].TrabajoAdicionalID = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].TrabajoAdicionalID;
                ListaTrabajosAdicionalesEditados[j].ObreroID = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].ObreroID;
                ListaTrabajosAdicionalesEditados[j].Observacion = arregloCaptura[index].ListaDetalleTrabajoAdicional[j].Observacion;
            }

            ListaDetalles[index].ListaDetalleTrabajoAdicional = arregloCaptura[index].ListaDetalleTrabajoAdicional.length == 0 ? undefined : ListaTrabajosAdicionalesEditados;

            if (

           ListaDetalles[index].IdVal == "" ||
           ListaDetalles[index].JuntaID == "" ||
           ListaDetalles[index].TipoJuntaID == "" ||
           ListaDetalles[index].Junta == "" ||
           ListaDetalles[index].Localizacion1 == "" ||
           ListaDetalles[index].Localizacion2 == "" ||
           ListaDetalles[index].NumeroUnico1ID == "" ||
           ListaDetalles[index].NumeroUnico2ID == "" ||
           ListaDetalles[index].TallerID == "" ||
           ListaDetalles[index].TuberoID == "" ||
           ListaDetalles[index].FechaArmado == ""
                
               ) {
                ListaDetalles[index].Estatus = 0;
            }
            } catch (e) {
                loadingStop();
            }
        }
        Captura[0].Detalles = ListaDetalles;
       
        if (!ExistRowEmpty(ListaDetalles)) {
            
            if (Captura[0].Detalles.length > 0) {
                AjaxEjecutarGuardado(Captura[0], tipoGuardar);
            }
            else {
                loadingStop();

            }

        }
        else {
            loadingStop();
            windowTemplate = kendo.template($("#windowTemplate").html());

            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.CapturaAvanceIntAcabadoMensajeErrorGuardado[$("#language").data("kendoDropDownList").value()],
                visible: false, //the window will not appear before its .open method is called
                width: "auto",
                height: "auto",
                modal: true
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.CapturaAvanceIntAcabadoMensajePreguntaGuardado[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

            ventanaConfirm.open().center();


            RowEmpty($("#grid"));

            $("#yesButton").click(function () {
                loadingStart();
               
                ArregloGuardado = [];
                var indice = 0;
                for (var i = 0; i < Captura[0].Detalles.length; i++) {
                    if (Captura[0].Detalles[i].Estatus == 1) {
                        ArregloGuardado[indice] = ListaDetalles[i];
                        indice++;
                    }
                }

                Captura[0].Detalles = [];
                Captura[0].Detalles = ArregloGuardado;


                if (ArregloGuardado.length > 0) {
                    AjaxEjecutarGuardado(Captura[0], tipoGuardar);
                }
                else {
                    loadingStop();
                    displayNotify("AlertaAdvertencia", "AdverteciaExcepcionGuardado", "", '1');
                }

                ventanaConfirm.close();
            });
            $("#noButton").click(function () {
                ventanaConfirm.close();
            });

        }
        
    } catch (e) {
        loadingStop();
        displayMessage("Mensajes_error", e.message, '0');
    }

}

function AjaxCargarCamposPredeterminados() {


    $CapturaArmado.Armado.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {

        var NewDate = kendo.toString(data.FechaArmado, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);

        endRangeDate.val(NewDate);

        if (data.Muestra == "sin captura") {
            $('input:radio[name=Muestra]:nth(0)').attr('checked', true);
            $('input:radio[name=Muestra]:nth(1)').attr('checked', false);
           
        }
        else if (data.Muestra == "Todos") {
            $('input:radio[name=Muestra]:nth(0)').attr('checked', false);
            $('input:radio[name=Muestra]:nth(1)').attr('checked', true);
           
        }

        if (data.Llena == "Todos") {
            $('input:radio[name=LLena]:nth(0)').attr('checked', true);
            $('input:radio[name=LLena]:nth(1)').attr('checked', false);
           
        }
        else if (data.Llena == "Vacios") {
            $('input:radio[name=LLena]:nth(0)').attr('checked', false);
            $('input:radio[name=LLena]:nth(1)').attr('checked', true);
           
        }

        if (data.TipoCaptura == "Reporte") {
            $('input:radio[name=TipoAgregado]:nth(0)').attr('checked', true);
            $('input:radio[name=TipoAgregado]:nth(1)').attr('checked', false);
            $("#styleReporte").addClass("active");
            $("#styleListado").removeClass("active");
        }
        else if (data.TipoCaptura == "Lista") {
            $('input:radio[name=TipoAgregado]:nth(0)').attr('checked', false);
            $('input:radio[name=TipoAgregado]:nth(1)').attr('checked', true);
            $("#styleListado").addClass("active");
            $("#styleReporte").removeClass("active");
        }

    });

}





function AjaxCargarCamposPredeterminadosOcultaJunta() {

    loadingStart();
    $CapturaArmado.Armado.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {

        var NewDate = kendo.toString(data.FechaArmado, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);

        endRangeDate.val(NewDate);

        if (data.Muestra == "sin captura") {
            $('input:radio[name=Muestra]:nth(0)').attr('checked');
            $('input:radio[name=Muestra]:nth(1)').removeAttr('checked');

        }
        else if (data.Muestra == "Todos") {
            $('input:radio[name=Muestra]:nth(0)').removeAttr('checked');
            $('input:radio[name=Muestra]:nth(1)').attr('checked');

        }

        if (data.Llena == "Todos") {
            $('input:radio[name=LLena]:nth(0)').attr('checked', true);
            $('input:radio[name=LLena]:nth(1)').attr('checked', false);

        }
        else if (data.Llena == "Vacios") {
            $('input:radio[name=LLena]:nth(0)').attr('checked', false);
            $('input:radio[name=LLena]:nth(1)').attr('checked', true);

        }

        loadingStop();
    });
}

function ObtenerDato(fecha,tipoDatoObtener)
{
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

function AjaxCargarReporteJuntas() {
    if (ExisteJunta()) {
        var listadoReporte = ArregloListadoReporte();

        for (var i = 0; i < listadoReporte.length; i++) {

            loadingStart();
            $CapturaArmado.Armado.read({ JsonCaptura: JSON.stringify(listadoReporte[i]), lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
                var ds = $("#grid").data("kendoGrid").dataSource;
                var array = JSON.parse(data);
                for (var i = 0; i < array.length; i++) {
                    if (array[i].FechaArmado != null)
                    {
                        array[i].FechaArmado = new Date(ObtenerDato(array[i].FechaArmado, 1), ObtenerDato(array[i].FechaArmado, 2), ObtenerDato(array[i].FechaArmado, 3));//año, mes, dia
                    }
                    ds.add(array[i]);
                }
                loadingStop();
            });
        }
    }
    else {
        displayMessage("CapturaArmadoMensajeJuntaExistente", "", '1');
    }
}

function AjaxCambiarAccionAModificacion() {
    var listado = ArregloListadoJuntasCapturadas();

    $("#grid").data("kendoGrid").dataSource.data([]);

    for (var i = 0; i < listado.length; i++) {

        loadingStart();
        $CapturaArmado.Armado.read({ JsonCaptura: JSON.stringify(listado[i]), lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = JSON.parse(data);
            for (var i = 0; i < array.length; i++) {
                if (array[i].FechaArmado != null) {
                    array[i].FechaArmado = new Date(ObtenerDato(array[i].FechaArmado, 1), ObtenerDato(array[i].FechaArmado, 2), ObtenerDato(array[i].FechaArmado, 3));//año, mes, dia
                }
                ds.add(array[i]);
            }
            loadingStop();
        });
    }
}