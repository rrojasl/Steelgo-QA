﻿function AjaxJunta(spoolID) {
    loadingStart();
    $('input:radio[name=Muestra]:checked').val();
    $Armado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), id: spoolID, sinCaptura: $('input:radio[name=Muestra]:checked').val(), token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            $("#Junta").data("kendoComboBox").value("");
            $("#Junta").data("kendoComboBox").dataSource.data(data);
            loadingStop();
        }
    });
}


var dataSpoolArray = null;

function AjaxObtenerSpoolID() {

    var OrdenTrabajoOrigianl = $("#InputOrdenTrabajo").val();
    $Armado.Armado.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        dataSpoolArray = data;
        if (Error(data)) {
            if (data.OrdenTrabajo != "") {
                $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
            }
            else {
                $("#InputOrdenTrabajo").val(OrdenTrabajoOrigianl);
                displayNotify("CapturaArmadoMensajeOrdenTrabajoNoEncontrada", "", '1');
            }

            $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
            Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
            $("#InputID").data("kendoComboBox").enable(true);
            $("#InputID").data("kendoComboBox").input.focus();
        }
    });
}

function AjaxObtenerListaTubero() {
    loadingStart();
    if (Cookies.get("Proyecto") != undefined) {
        $Armado.Armado.read({ idProyecto: Cookies.get("Proyecto").split('°')[0], tipo: 2, token: Cookies.get("token") }).done(function (data) {
            if (Error(data)) {
                $("#inputTubero").data("kendoComboBox").value("");
                $("#inputTubero").data("kendoComboBox").dataSource.data(data);
            }
            loadingStop();

        });
    }
    else
        loadingStop();
}

function AjaxObtenerListaTaller() {
    loadingStart();
    if (Cookies.get("Proyecto") != undefined) {
        $Armado.Armado.read({ idProyecto: Cookies.get("Proyecto").split('°')[0], token: Cookies.get("token") }).done(function (data) {
            if (Error(data)) {
                $("#inputTaller").data("kendoComboBox").value("");
                $("#inputTaller").data("kendoComboBox").dataSource.data(data);
            }
            loadingStop();
        });
    }
    else
        loadingStop();
}

function AjaxObtenerJSonGridArmado() {
    try {
        loadingStart();
        $Armado.Armado.read({ JsonCaptura: JSON.stringify(ArregloListadoCaptura()), isReporte: false, token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (Error(data)) {
                editado = true;
                var elementosModificados = "";
                var elementosNoModificados = "";
                var ds = $("#grid").data("kendoGrid").dataSource;
                var lInicialGrid = ds._data.length;
                var array = JSON.parse(data);


                for (var i = 0; i < array.length; i++) {
                    if (!ExisteJuntaEnSpool(array[i])) {
                        if (array[i].FechaArmado != null) {
                            array[i].FechaArmado = new Date(ObtenerDato(array[i].FechaArmado, 1), ObtenerDato(array[i].FechaArmado, 2), ObtenerDato(array[i].FechaArmado, 3));//año, mes, dia
                        }
                        elementoNoEncontrado = true;

                        if (elementosModificados != "")
                            elementosModificados += ", " + array[i].Junta;
                        else
                            elementosModificados = array[i].Junta;
                        ds.insert(0, array[i]);
                    }
                    else {
                        if (elementosNoModificados != "")
                            elementosNoModificados += ", " + array[i].Junta;
                        else
                            elementosNoModificados = array[i].Junta;
                    }

                }

                if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte" && elementosNoModificados == "") {
                    $("#InputID").data("kendoComboBox").value("");
                    $("#InputID").val("")
                }
                else if (elementosNoModificados == "") {
                    $("#Junta").data("kendoComboBox").value("");
                    $("#Junta").val("")
                }

                $("#grid").data("kendoGrid").dataSource.sync();

                if (elementosModificados != "") {
                    displayNotify("", _dictionary.CapturaArmadoMsgExiste[$("#language").data("kendoDropDownList").value()] +
                       elementosModificados + _dictionary.CapturaArmadoMsgNuevoEnReporte[$("#language").data("kendoDropDownList").value()], '0');
                }
                if (elementosNoModificados != "") {
                    displayNotify("", _dictionary.CapturaArmadoMsgExiste[$("#language").data("kendoDropDownList").value()] +
                        elementosNoModificados + _dictionary.CapturaArmadoMsgExisteReporte[$("#language").data("kendoDropDownList").value()], '2');
                }
                loadingStop();

            }
            loadingStop();
        });
        $('#ButtonAgregar').prop("disabled", false);

    } catch (e) {
        //displayNotify("Mensajes_error", e.message, '1');
        $('#ButtonAgregar').prop("disabled", false);
    }
}

function AjaxEjecutarGuardado(rows, tipoGuardar) {
    loadingStart();
    $Armado.Armado.create(rows, { token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {

        if (data.ReturnMessage.length > 0 && data.ReturnMessage[0] == "Ok") {
            displayNotify("MensajeGuardadoExistoso", "", '0');
            loadingStop();

            if (tipoGuardar == 1) {
                opcionHabilitarView(false, "FieldSetView");
                Limpiar();
                AjaxCargarCamposPredeterminados();
                editado = false;
            }
            else {
                opcionHabilitarView(true, "FieldSetView");
                AjaxCambiarAccionAModificacion();
            }


        }
        else {
            //mensaje = "No se guardo la informacion el error es: " + data.ReturnMessage[0] + "-2";
            displayNotify("MensajeGuardadoErroneo", "", '2');
            loadingStop();

        }
    });
}

function AjaxGuardarCaptura(arregloCaptura, tipoGuardar) {
    try {
        var seGuardoCorrectamente = false;
        loadingStart();
        Captura = [];
        Captura[0] = { Detalles: "" };
        ListaDetalles = [];
        for (index = 0; index < arregloCaptura.length; index++) {
            $("#grid").data("kendoGrid").dataSource._data[index].RowOk = true;
            ListaDetalles[index] = { Accion: "", IdVal: "", JuntaID: "", TipoJuntaID: "", Junta: "", Localizacion1: "", Localizacion2: "", JuntaArmadoID: "", DetalleArmadoID: "", NumeroUnico1ID: "", NumeroUnico2ID: "", TallerID: "", TuberoID: "", FechaArmado: "", ListaDetalleTrabajoAdicional: "", Estatus: 1, JuntaAnteriorNumeroUnicoGuardado: "" };
            ListaDetalles[index].Accion = arregloCaptura[index].Accion;
            ListaDetalles[index].IdVal = arregloCaptura[index].IdVal;
            ListaDetalles[index].JuntaID = arregloCaptura[index].JuntaID;
            ListaDetalles[index].TipoJuntaID = arregloCaptura[index].TipoJuntaID;
            ListaDetalles[index].Junta = arregloCaptura[index].Junta;
            ListaDetalles[index].Localizacion1 = arregloCaptura[index].Localizacion.split('-')[0];
            ListaDetalles[index].Localizacion2 = arregloCaptura[index].Localizacion.split('-')[1];
            ListaDetalles[index].JuntaArmadoID = arregloCaptura[index].JuntaArmadoID;
            ListaDetalles[index].DetalleArmadoID = arregloCaptura[index].DetalleArmadoID;
            ListaDetalles[index].NumeroUnico1ID = arregloCaptura[index].NumeroUnico1ID;
            ListaDetalles[index].NumeroUnico2ID = arregloCaptura[index].NumeroUnico2ID;
            ListaDetalles[index].TallerID = arregloCaptura[index].TallerID;
            ListaDetalles[index].TuberoID = arregloCaptura[index].TuberoID;
            ListaDetalles[index].FechaArmado = arregloCaptura[index].FechaArmado == null ? "" : kendo.toString(arregloCaptura[index].FechaArmado, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", ""))).trim();
            ListaDetalles[index].JuntaAnteriorNumeroUnicoGuardado = arregloCaptura[index].JuntaAnteriorNumeroUnicoGuardado;

            ListaTrabajosAdicionalesEditados = [];
            if (arregloCaptura[index].ListaDetalleTrabajoAdicional != null) {
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
            }
            ListaDetalles[index].ListaDetalleTrabajoAdicional = (arregloCaptura[index].ListaDetalleTrabajoAdicional == null || arregloCaptura[index].ListaDetalleTrabajoAdicional.length == 0) ? undefined : ListaTrabajosAdicionalesEditados;
            if (!esCorrectaJunta(ListaDetalles[index].JuntaAnteriorNumeroUnicoGuardado)) {
                // la junta del numero unico anterior no se ah asignado correctamente 
                $("#grid").data("kendoGrid").dataSource._data[index].RowOk = false;
                ListaDetalles[index].Estatus = 0;
            }
            else if (
                (
                   ListaDetalles[index].IdVal == "" ||
                   ListaDetalles[index].JuntaID == "" ||
                   ListaDetalles[index].TipoJuntaID == "" ||
                   ListaDetalles[index].Junta == "" ||
                   ListaDetalles[index].Localizacion1 == "" ||
                   ListaDetalles[index].Localizacion2 == "" ||
                   ListaDetalles[index].NumeroUnico1ID == "" || ListaDetalles[index].NumeroUnico1ID == null ||
                   ListaDetalles[index].NumeroUnico2ID == "" || ListaDetalles[index].NumeroUnico2ID == null ||
                   ListaDetalles[index].TallerID == "" ||
                   ListaDetalles[index].TallerID == "0" ||
                   ListaDetalles[index].TuberoID == "" ||
                   ListaDetalles[index].TuberoID == "0" ||
                   ListaDetalles[index].FechaArmado == ""
                ) && (ListaDetalles[index].Accion != 3 && ListaDetalles[index].Accion != 4)
               ) {
                if (ListaDetalles[index].Accion == 2 && ListaDetalles[index].FechaArmado == "" &&
                    (ListaDetalles[index].TallerID == "" || ListaDetalles[index].TallerID == "0") &&
                   (ListaDetalles[index].TuberoID == "" || ListaDetalles[index].TuberoID == "0") &&
                    (ListaDetalles[index].NumeroUnico1ID == "" || ListaDetalles[index].NumeroUnico1ID == null || ListaDetalles[index].NumeroUnico1ID == "0") &&
                    (ListaDetalles[index].NumeroUnico2ID == "" || ListaDetalles[index].NumeroUnico2ID == null || ListaDetalles[index].NumeroUnico2ID == "0")) {
                    ListaDetalles[index].Accion = 4;
                }
                else {
                    ListaDetalles[index].Estatus = 0;
                    //$('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
                    $("#grid").data("kendoGrid").dataSource._data[index].RowOk = false;
                }

            }
            else if (ListaDetalles[index].Accion == 4) {
                if ((ListaDetalles[index].FechaArmado != "" &&
                    (ListaDetalles[index].TallerID != "" && ListaDetalles[index].TallerID != "0") &&
                    (ListaDetalles[index].NumeroUnico1ID != "" && ListaDetalles[index].NumeroUnico1ID != null && ListaDetalles[index].NumeroUnico1ID != "0") &&
                    (ListaDetalles[index].NumeroUnico2ID != "" && ListaDetalles[index].NumeroUnico2ID != null && ListaDetalles[index].NumeroUnico2ID != "0") &&
                   (ListaDetalles[index].TuberoID != "" && ListaDetalles[index].TuberoID != "0"))) {
                    ListaDetalles[index].Accion = 2;
                }
                else if (!(ListaDetalles[index].FechaArmado == "" &&
                    (ListaDetalles[index].TallerID == "" || ListaDetalles[index].TallerID == "0") &&
                    (ListaDetalles[index].NumeroUnico1ID == "" || ListaDetalles[index].NumeroUnico1ID == null || ListaDetalles[index].NumeroUnico1ID == "0") &&
                    (ListaDetalles[index].NumeroUnico2ID == "" || ListaDetalles[index].NumeroUnico2ID == null || ListaDetalles[index].NumeroUnico2ID == "0") &&
                   (ListaDetalles[index].TuberoID == "" || ListaDetalles[index].TuberoID == "0"))) {
                    ListaDetalles[index].Estatus = 0;
                    //$('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
                    $("#grid").data("kendoGrid").dataSource._data[index].RowOk = false;

                }
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
            $("#grid").data("kendoGrid").dataSource.sync();
            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.TituloPopUpError[$("#language").data("kendoDropDownList").value()],
                visible: false, //the window will not appear before its .open method is called
                width: "auto",
                height: "auto",
                modal: true,
                actions: [],
                animation: {
                    close: false,
                    open: false
                }
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.MensajeConfirmacionGuardadoGeneral[$("#language").data("kendoDropDownList").value()] +
                "</br><center><button class='btn btn-blue' id='yesButton'>" + _dictionary.EntregaPlacasGraficasbotonSi[$("#language").data("kendoDropDownList").value()] + "</button><button class='btn btn-blue' id='noButton'>" + _dictionary.EntregaPlacasGraficasbotonNo[$("#language").data("kendoDropDownList").value()] + "</button></center>");

            ventanaConfirm.open().center();

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

                if (Captura[0].Detalles.length > 0) {

                    AjaxEjecutarGuardado(Captura[0], tipoGuardar);
                }
                else {
                    loadingStop();
                    displayNotify("AdverteciaExcepcionGuardado", "", '1');
                }

                ventanaConfirm.close();
            });

            $("#noButton").click(function () {
                ventanaConfirm.close();
            });

        }

    } catch (e) {
        loadingStop();
        //displayNotify("Mensajes_error", e.message, '0');
    }

}

function AjaxCargarCamposPredeterminados() {
    $Armado.Armado.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            var NewDate = kendo.toString(data.FechaArmado, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);

            endRangeDate.val(NewDate);

            if (data.Muestra == "sin captura") {
                $('input:radio[name=Muestra]:nth(0)').trigger("click");
                //$('input:radio[name=Muestra]:nth(1)').attr('checked', false);

            }
            else if (data.Muestra == "Todos") {
                //$('input:radio[name=Muestra]:nth(0)').attr('checked', false);
                $('input:radio[name=Muestra]:nth(1)').trigger("click");

            }

            if (data.Llena == "Todos") {
                $('input:radio[name=LLena]:nth(0)').trigger("click");
                //$('input:radio[name=LLena]:nth(1)').attr('checked', false);

            }
            else if (data.Llena == "Vacios") {
                //$('input:radio[name=LLena]:nth(0)').trigger("click");
                $('input:radio[name=LLena]:nth(1)').trigger("click");

            }

            if (data.TipoCaptura == "Reporte") {
                $('input:radio[name=TipoAgregado]:nth(0)').trigger("click");
                $('input:radio[name=TipoAgregado]:nth(1)').attr('checked', false);
                $("#styleReporte").addClass("active");
                $("#styleListado").removeClass("active");
            }
            else if (data.TipoCaptura == "Lista") {
                $('input:radio[name=TipoAgregado]:nth(0)').attr('checked', false);
                $('input:radio[name=TipoAgregado]:nth(1)').trigger("click");
                $("#styleListado").addClass("active");
                $("#styleReporte").removeClass("active");
            }
        }
    });

}

function AjaxCargarCamposPredeterminadosOcultaJunta() {
    loadingStart();
    $Armado.Armado.read({ token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
        if (Error(data)) {
            var NewDate = kendo.toString(data.FechaArmado, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);

            endRangeDate.val(NewDate);

            if (data.Muestra == "sin captura") {
                $('input:radio[name=Muestra]:nth(0)').trigger("click");
                //$('input:radio[name=Muestra]:nth(1)').attr('checked', false);

            }
            else if (data.Muestra == "Todos") {
                //$('input:radio[name=Muestra]:nth(0)').attr('checked', false);
                $('input:radio[name=Muestra]:nth(1)').trigger("click");

            }

            if (data.Llena == "Todos") {
                $('input:radio[name=LLena]:nth(0)').trigger("click");
                //$('input:radio[name=LLena]:nth(1)').attr('checked', false);

            }
            else if (data.Llena == "Vacios") {
                //$('input:radio[name=LLena]:nth(0)').trigger("click");
                $('input:radio[name=LLena]:nth(1)').trigger("click");

            }
        }
        loadingStop();
    });
}

function AjaxCargarReporteJuntas() {
    loadingStart();
    var listadoReporte = ArregloListadoReporte();
    var elementoNoEncontrado = false;

    CapturaJuntas = [];
    CapturaJuntas[0] = { Detalles: "" };
    ListaDetalles = [];

    ListaDetalles = listadoReporte;
    CapturaJuntas[0].Detalles = ListaDetalles;

    //se envia solo un objeto de los 4 porque ahora solo se hace una sola peticion y se trae todos los objetos ajax.
    if (listadoReporte.length > 0) {

        $Armado.Armado.read({ JsonCaptura: JSON.stringify(listadoReporte[0]), isReporte: true, lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
            if (Error(data)) {
                editado = true;
                var elementosModificados = "";
                var elementosNoModificados = "";
                var ds = $("#grid").data("kendoGrid").dataSource;
                var lInicialGrid = ds._data.length;
                var array = JSON.parse(data);


                for (var i = 0; i < array.length; i++) {
                    if (!ExisteJuntaEnSpool(array[i])) {
                        if (array[i].FechaArmado != null) {
                            array[i].FechaArmado = new Date(ObtenerDato(array[i].FechaArmado, 1), ObtenerDato(array[i].FechaArmado, 2), ObtenerDato(array[i].FechaArmado, 3));//año, mes, dia
                        }
                        elementoNoEncontrado = true;

                        if (elementosModificados != "")
                            elementosModificados += ", " + array[i].Junta;
                        else
                            elementosModificados = array[i].Junta;
                        ds.insert(0, array[i]);
                    }
                    else {
                        if (elementosNoModificados != "")
                            elementosNoModificados += ", " + array[i].Junta;
                        else
                            elementosNoModificados = array[i].Junta;
                    }

                }


                $("#InputID").data("kendoComboBox").value("");
                caracteresEscritosEnPagina = '';

                if (elementosModificados != "") {
                    displayNotify("", _dictionary.CapturaArmadoMsgExiste[$("#language").data("kendoDropDownList").value()] +
                       elementosModificados + _dictionary.CapturaArmadoMsgNuevoEnReporte[$("#language").data("kendoDropDownList").value()], '0');
                }
                if (elementosNoModificados != "") {
                    displayNotify("", _dictionary.CapturaArmadoMsgExiste[$("#language").data("kendoDropDownList").value()] +
                        elementosNoModificados + _dictionary.CapturaArmadoMsgExisteReporte[$("#language").data("kendoDropDownList").value()], '2');
                }
                loadingStop();

            }

        });

    }
    $('#ButtonAgregar').prop("disabled", false);



}

function AjaxCambiarAccionAModificacion() {
    var capturaListado = [];
    capturaListado[0] = { Detalles: "" };
    var listado = ArregloListadoJuntasCapturadas();


    capturaListado[0].Detalles = listado;

    $("#grid").data("kendoGrid").dataSource.data([]);


    loadingStart();
    $Armado.Armado.read({ Detalle: capturaListado[0], lenguaje: $("#language").val(), token: Cookies.get("token") }).done(function (data) {
        if (Error(data)) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            var array = JSON.parse(data);

            for (var i = 0; i < array.length; i++) {

                if (array[i].FechaArmado != null) {
                    array[i].FechaArmado = kendo.toString(array[i].FechaArmado, _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()]);
                    array[i].FechaArmado = new Date(ObtenerDato(array[i].FechaArmado, 1), ObtenerDato(array[i].FechaArmado, 2), ObtenerDato(array[i].FechaArmado, 3));//año, mes, dia
                }
                ds.insert(array[i], 0);
            }
            $("#grid").data("kendoGrid").dataSource.sync();
        }

        loadingStop();
    });



}

function AjaxObtenerDatoOriginalBorrado(dataItem, dataSource) {
    try {

        $Armado.Armado.read({ JsonCaptura: JSON.stringify(ObjetoBorrado(dataItem)), isReporte: false, token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
            if (Error(data)) {
                var ds = $("#grid").data("kendoGrid").dataSource;
                var array = JSON.parse(data);
                var elementoNoEncontrado = false;
                //se aplica el algoritmo de los numeros unicos.
                if (dataItem.ListaNumerosUnicos1.length > 2 && ExisteNUGrid(array[0].NumeroUnico1ID, dataSource._data, dataItem)) //valida NU1
                {
                    EliminarItemNUSeleccionado(dataSource._data, array[0].NumeroUnico1ID, dataItem);
                }
                else if (dataItem.ListaNumerosUnicos2.length > 2 && ExisteNUGrid(array[0].NumeroUnico2ID, dataSource._data, dataItem)) //valida NU2
                {
                    EliminarItemNUSeleccionado(dataSource._data, array[0].NumeroUnico2ID, dataItem);
                }

                ds.sync();
            }
            loadingStop();
        });


    } catch (e) {

    }
}

function AjaxListaDetalleTrabajosAdicionales(juntaID) {
    loadingStart();
    $Armado.Armado.read({ token: Cookies.get("token"), juntaID: juntaID }).done(function (data) {
        if (Error(data)) {
            var ds = $("#gridPopUp").data("kendoGrid").dataSource;
            for (var i = 0; i < data.length; i++) {
                ds.add(data[i]);
            }
            ds.sync();
        }
        loadingStop();
    });

}