function SuscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoAgregar();
    suscribirEventoAplicar();
    suscribirEventoCancelar();
    SuscribirEventoTaller();
    SuscribirEventoWPS();
    SuscribirEventoPQR();
    SuscribirEventosJunta();
    SuscribirEventoID();
    SuscribirEventosOrdenTrabajo();
    suscribirEventoChangeRadio();
    suscribirEventoChangeRadioTipoListado();
    SuscribirEventoMuestraJunta();
    GuardarDetalleAdicional();
    SuscribirEventoCancelarAdicionales();
    suscribirEventoGridPopupSoldadoresRaiz();
    suscribirEventoGridPopupSoldadoresRelleno();
    suscribirEventoGridPopupTrabajosAdicionales();
    GuardarGridPopUpRaiz();
    GuardarGridPopUpRelleno();
    SuscribirEventoProcesosRaiz();
    SuscribirEventoProcesosRelleno();
    SuscribirFechaSoldadura();
};

function SuscribirFechaSoldadura() {

    endRangeDate = $("#FechaSoldadura").kendoDatePicker({
        max: new Date(),
        format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()],
        change: function (e) {
            ValidarFecha(e.sender._value)
        }
    });

    endRangeDate.on("keydown", function (e) {
        if (e.keyCode == 9) {
            ValidarFecha($("#FechaSoldadura").data("kendoDatePicker").value());
        }
    });

    $("#FechaSoldadura").blur(function (e) {
        ValidarFecha($("#FechaSoldadura").data("kendoDatePicker").value());
    });
}

function suscribirEventoGridPopupTrabajosAdicionales() {
    $(document).on('click', '.botonAdicionales', function (e) {
        e.preventDefault();

        if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {

            var grid = $("#grid").data("kendoGrid");
            dataItem = grid.dataItem($(e.target).closest("tr"));
            GridPopUpTrabajosAdicionales(dataItem);
        }
    });
}

function suscribirEventoGridPopupSoldadoresRaiz() {

    $(document).on('click', '.botonSoldadoresRaiz', function (e) {
        e.preventDefault();
        if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#grid").data("kendoGrid");
            dataItem = grid.dataItem($(e.target).closest("tr"));
            if (dataItem.procesoSoldaduraRaiz != "N/A")
                GridPopupSoldadoresRaizCapturados(dataItem);
        }
    });
}

function suscribirEventoGridPopupSoldadoresRelleno() {

    $(document).on('click', '.botonSoldadoresRelleno', function (e) {
        e.preventDefault();
        if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#grid").data("kendoGrid");
            dataItem = grid.dataItem($(e.target).closest("tr"));
            if (dataItem.procesoSoldaduraRelleno != "N/A")
                GridPopUpSoldadoresRellenoCapturados(dataItem);
        }
    });
}


function SuscribirEventoCancelarAdicionales() {
    $("#CancelarTrabajosAdicionales").click(function (e) {
        $("#windowGrid").data("kendoWindow").close();
        actuallongitudTrabajosAdicionales = modeloRenglon.length;

        if (actuallongitudTrabajosAdicionales == 0 || actuallongitudTrabajosAdicionales == undefined)
            modeloRenglon.TrabajosAdicionales = _dictionary.CapturaArmadoTemplateNoHayTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];
        else
            modeloRenglon.TrabajosAdicionales = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + actuallongitudTrabajosAdicionales + _dictionary.CapturaSoldaduraMensajeCambioTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];


        $("#grid").data("kendoGrid").dataSource.sync();
    });
}

function GuardarGridPopUpRaiz() {
    $('#GuardarSoldadoresRaiz').click(function () {
        modeloRenglon.ListadoSoldadoresRaizCapturados = $("#inputSoldadoresRaiz").data("kendoGrid").dataSource._data;
        $("#windowMultiselectSoldador").data("kendoWindow").close();
        $("#grid").data("kendoGrid").dataSource.sync();
    });
}

function GuardarGridPopUpRelleno() {
    $('#GuardarSoldadoresRelleno').click(function () {
        modeloRenglon.ListadoSoldadoresRellenoCapturados = $("#inputSoldadoresRelleno").data("kendoGrid").dataSource._data;
        $("#windowMultiselectSoldadorRelleno").data("kendoWindow").close();
        $("#grid").data("kendoGrid").dataSource.sync();
    });
}



function GuardarDetalleAdicional() {
    $('#GuardarTrabajosAdicionales').click(function () {
        var ds = $("#gridPopUp").data("kendoGrid").dataSource

        for (var i = 0; i < ds._data.length; i++) {
            if (ds._data[i].Soldador == "" || ds._data[i].TrabajoAdicional == "") {
                //displayNotify("CapturaSoldaduraCamposVacios", "", "1");
                return;
            }
        }

        modeloRenglon.DetalleAdicional = ds._data;
        $("#windowGrid").data("kendoWindow").close();
        $("#grid").data("kendoGrid").dataSource.sync();
    });
}

function EventoGuardar() {
    var ds = $("#grid").data("kendoGrid").dataSource;
    if ($('#botonGuardar').text() == "Guardar") {
        //AjaxGuardarCaptura(ds._data, 0);
    }
    else if ($('#botonGuardar').text() == "Editar")
        opcionHabilitarView(false, "FieldSetView")
}


function SuscribirEventoProcesosRelleno() {
    $('#inputProcesoRelleno').kendoComboBox({
        dataTextField: "Codigo",
        dataValueField: "ProcesoSoldaduraID",
        suggest: true,
        delay: 10,
        filter: "contains",

    });
}

function SuscribirEventoWPS() {
    $('#inputWPS').kendoComboBox({
        dataTextField: "WPSNombre",
        dataValueField: "WSPID",
        suggest: true,
        delay: 10,
        filter: "contains",

    });
    $('#inputWPS').closest('.k-widget').keydown(function (e) {
        e.preventDefault();
        if (e.keyCode == 13) {
        }
    });
}

function SuscribirEventoPQR() {
    $('#inputPQR').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "PQRID",
        suggest: true,
        delay: 10,
        filter: "contains",

    });
    $('#inputPQR').closest('.k-widget').keydown(function (e) {
        e.preventDefault();
        if (e.keyCode == 13) {
        }
    });
}

function SuscribirEventoProcesosRaiz() {
    $('#inputProcesoRaiz').kendoComboBox({
        dataTextField: "Codigo",
        dataValueField: "ProcesoSoldaduraID",
        suggest: true,
        delay: 10,
        filter: "contains"

    });
}

function suscribirEventoGuardar() {
    $('#btnGuardar').click(function (e) {
        EventoGuardar();
    });

    $("#Guardar").click(function () {
        EventoGuardar();
    });


    $('#btnGuardarYNuevo').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        //AjaxGuardarCaptura(ds._data, 1);

    });


    //pie pagina
    $('#GuardarPie').click(function (e) {
        EventoGuardar();
    });

    $("#btnGuardarPie").click(function () {
        EventoGuardar();
    });


    $('#btnGuardarYNuevoPie').click(function (e) {

        var ds = $("#grid").data("kendoGrid").dataSource;
        //AjaxGuardarCaptura(ds._data, 1);

    });
}

function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        Limpiar();
        //AjaxCargarCamposPredeterminados();
    });
}

function suscribirEventoAgregar() {
    $('#ButtonAgregar').click(function (e) {

        if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
            if ($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()) != undefined) {
                $('#ButtonAgregar').prop("disabled", true);
                //AjaxJuntaModoSpool($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
            }
            else {
                if ($("#InputID").val() == "") {
                    //displayNotify("CapturaSoldaduraSpoolNoCapturado", "", '1');
                }
                //else
                    //displayNotify("CapturaSoldaduraNoExisteSpoolID", "", '2');
            }
        }
        else {
            if ($('input:radio[name=TipoAgregado]:checked').val() == "Listado" && $("#Junta").val() != "" && $("#Junta").data("kendoComboBox").dataItem($("#Junta").data("kendoComboBox").select()) != undefined) {
                $('#ButtonAgregar').prop("disabled", true);
                ObtenerJSonGridSoldadura();
            }
            //else
            //    desplegarNotificacion();
        }
    });
}

function suscribirEventoAplicar() {
    $('#ButtonAplicar').click(function (e) {

        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            windowTemplate = kendo.template($("#windowTemplate").html());

            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
                visible: false, //the window will not appear before its .open method is called
                width: "auto",
                height: "auto",
                modal: true,
                animation: {
                    close: false,
                    open: false
                }
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.CapturaMensajeArmadoPlancharTodos[$("#language").data("kendoDropDownList").value()] +
                         "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

            ventanaConfirm.open().center();

            $("#yesButton").click(function (handler) {
                if ($("#inputTaller").data("kendoComboBox").dataItem($("#inputTaller").data("kendoComboBox").select()) != undefined)
                    PlanchaTaller();
                //if ($("#inputColada").data("kendoComboBox").dataItem($("#inputColada").data("kendoComboBox").select()) != undefined)
                //    PlanchaColada();
                if (endRangeDate.val() != "")
                    PlanchaFecha();

                ventanaConfirm.close();
            });
            $("#noButton").click(function (handler) {
                ventanaConfirm.close();
            });
        }
        else {
            if ($("#inputTaller").data("kendoComboBox").dataItem($("#inputTaller").data("kendoComboBox").select()) != undefined)
                PlanchaTaller();
            //if ($("#inputColada").data("kendoComboBox").dataItem($("#inputColada").data("kendoComboBox").select()) != undefined)
            //    PlanchaColada();
            if (endRangeDate.val() != "")
                PlanchaFecha();
        }
    });
}


function SuscribirEventoTaller() {
    $('#inputTaller').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TallerID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3
    });
    $('#inputTaller').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputTaller").data("kendoComboBox").dataItem($("#inputTaller").data("kendoComboBox").select()) != undefined) {
                //PlanchaTaller();
            }
            else {
                $("#inputTaller").data("kendoComboBox").value("");
            }

        }
    });

    $('#inputTaller').blur(function (e) {
        dataItem = $("#inputTaller").data("kendoComboBox").dataItem($("#inputTaller").data("kendoComboBox").select());
        if (dataItem == undefined) {

            $("#inputTaller").data("kendoComboBox").value("");
            $("#inputTaller").data("kendoComboBox").select(0);
        }

    });
}

function SuscribirEventoColada() {
    $('#inputColada').kendoComboBox({
        dataTextField: "NumeroColada",
        dataValueField: "ColadaID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3
    });
    $('#inputColada').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputColada").data("kendoComboBox").dataItem($("#inputColada").data("kendoComboBox").select()) != undefined) {
            }
            else {
                $("#inputColada").data("kendoComboBox").value("");
            }

        }
    });
}

function SuscribirEventosJunta() {
    $('#Junta').kendoComboBox({
        dataTextField: "Etiqueta",
        dataValueField: "JuntaSpoolID",
        suggest: true,
        delay: 10,
        filter: "endswith",
        index: 3
    });

    $('#Junta').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 37) {
            $("#InputID").data("kendoComboBox").input.focus();
            $("#Junta").val("");
        }
        else if (e.keyCode == 39) {
            $("#ButtonAgregar").focus();
        }
        else if (e.keyCode == 13) {
            if ($("#Junta").data("kendoComboBox").dataItem($("#Junta").data("kendoComboBox").select()) != undefined) {
                if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
                    if ($("#Junta").data("kendoComboBox").select() != -1) {
                        ObtenerJSonGridSoldadura();
                        $("#Junta").data("kendoComboBox").text("");
                    }
                }
                else if ($('input:radio[name=TipoAgregado]:checked').val() == "Listado") {
                    if ($("#Junta").val() != "") {
                        if ($("#Junta").data("kendoComboBox").select() != -1) {
                            var button = $(this);
                            button.attr('disabled', 'disabled');
                            setTimeout(function () {
                                button.removeAttr('disabled');
                            }, 500);

                            ObtenerJSonGridSoldadura();

                        }
                    }
                    //else
                        //displayNotify("JuntaSinSeleccionar", "", '2');
                }
                //else {
                    //displayNotify("Mensajes_error", "Favor de seleccionar un Tipo de Captura", '2');
                //}
            }
            //else {
            //    desplegarNotificacion();
            //}
        }
    });
}

function SuscribirEventoMuestraJunta() {

    if ($('input:radio[name=TipoAgregado]').val() == "Reporte") {
        $("#JuntaDiv").hide();
        // $("#MuestraDiv").hide();
    }
    else if ($('input:radio[name=TipoAgregado]').val() == "Listado") {
        $("#JuntaDiv").show();
        // $("#MuestraDiv").show();
    }
}

function SuscribirEventoEliminar(idtable) {
    $("#" + idtable + " .deleteRow").on("click", function () {
        var td = $(this).parent();
        var tr = td.parent();
        tr.css("background-color", "#FF3700");

        tr.fadeOut(400, function () {
            tr.remove();
        });
    });
}

function SuscribirEventosOrdenTrabajo() {
    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                var OrdenTrabajoOrigianl = $("#InputOrdenTrabajo").val();
                if (Error) {
                    $Soldadura.Soldadura.read({ ordenTrabajo: $("#InputOrdenTrabajo").val(), tipo: '1', token: Cookies.get("token"), lenguaje: $("#language").val() }).done(function (data) {
                        if (data.OrdenTrabajo != "") {
                            $("#InputOrdenTrabajo").val(data.OrdenTrabajo);
                        }
                        else {
                            $("#InputOrdenTrabajo").val(OrdenTrabajoOrigianl);
                            //displayNotify("CapturaArmadoMensajeOrdenTrabajoNoEncontrada", "", '1');
                        }

                        $("#InputID").data("kendoComboBox").dataSource.data(data.idStatus);
                        Cookies.set("LetraProyecto", data.OrdenTrabajo.substring(0, 1), { path: '/' });
                    });
                }
            } catch (e) {
                //displayNotify("Mensajes_error", e.message, '2');

            }
        } else {
            //displayNotify("CapturaArmadoMensajeOrdenTrabajo", "", '1');
            //$("#InputOrdenTrabajo").focus();
        }
    });

    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").value("");
        $("#InputID").data("kendoComboBox").setDataSource()
    });
}

function SuscribirEventoID() {
    var dataItem;

    $("#InputID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        suggest: true,
        delay: 10,
        filter: "endswith",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                if ($("#InputID").val().length == 1) {
                    $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
                    //AjaxObtenerListaTaller();
                }
                if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                    Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                    $("#LabelProyecto").text(dataItem.Proyecto);
                    //AjaxJunta($("#InputID").val());
                    //AjaxObtenerListaTaller();
                }
            }
        }
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();
        }
        else if (e.keyCode == 39) {
            $("#Junta").data("kendoComboBox").input.focus();
        }
        else if (e.keyCode == 13) {
            if ($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()) != undefined) {
                if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
                    if ($("#InputID").data("kendoComboBox").select() != -1) {
                        //AjaxJuntaModoSpool($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
                    }
                }
            }
            else {
                if ($("#InputID").val() == "") {
                    //displayNotify("CapturaSoldaduraSpoolNoCapturado", "", '1');
                } else {
                    //displayNotify("CapturaSoldaduraNoExisteSpoolID", "", '2');
                }
            }
        }
        else if (e.keyCode == 9) {
            if (tieneClase(e.currentTarget)) {
                $("#InputID").data("kendoComboBox").select(0);
                AjaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
            }
            dataItem = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select());
            if (dataItem != undefined) {
                if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                    Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                    $("#LabelProyecto").text(dataItem.Proyecto);
                    AjaxJunta($("#InputID").val());
                    //AjaxObtenerListaTaller();
                }
            }
            else {
                $("#Junta").data("kendoComboBox").dataSource.data([]);
                $("#Junta").data("kendoComboBox").value("");
            }
        }
    });

    $('#InputID').blur(function (e) {

        var spoollIDValue = $("#InputID").val();
        var listaSpoolID = $("#InputID").data("kendoComboBox").dataSource._data;
        var valorEncontrado = false;
        if (spoollIDValue != "" && listaSpoolID.length > 0) {
            for (var i = 0; i < listaSpoolID.length; i++) {


                if (TryParseInt(spoollIDValue, 0) != 0 && (TryParseInt(spoollIDValue, 0) == TryParseInt(listaSpoolID[i].IDValido, 0))) {
                    valorEncontrado = true;
                    //    $("#InputID").data("kendoComboBox").select(0);
                    $("#InputID").data("kendoComboBox").value(listaSpoolID[i].Valor);
                    if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
                        $("#ButtonAgregar").trigger("click");
                    }

                    //AjaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
                    break;
                }
            }

        }

        dataItem = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select());
        if (!valorEncontrado && dataItem == undefined) {
            $("#Junta").data("kendoComboBox").dataSource.data([]);
            $("#Junta").data("kendoComboBox").select(0);
            //displayNotify("NoExisteSpoolID", "", '1');
        }

    });
}

function TryParseInt(str, defaultValue) {
    var retValue = defaultValue;
    if (str !== null) {
        if (str.length > 0) {
            if (!isNaN(str)) {
                retValue = parseInt(str);
            }
        }
    }
    return retValue;
}


$(document.body).keydown(function (e) {
    if (e.altKey && e.keyCode == 77) {
        if ($('input:radio[name=Muestra]:checked').val().trim() == "Todos") {
            $('input:radio[name=Muestra]').val(["Sin Capturar"]).attr('checked', 'checked');
        }
        else {
            $('input:radio[name=Muestra]').val(["Todos"]).attr('checked', 'checked');
        }
    }
});

function suscribirEventoChangeRadio() {
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        dataItem = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select());
        if ($("#InputID").val() != "" && $("#inputordentrabajo").val() != "" && dataItem != undefined) {
            //AjaxJunta($("#InputID").val());
        }
        FiltroMostrar(0);
    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {
        dataItem = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select());
        if ($("#InputID").val() != "" && $("#InputOrdenTrabajo").val() != "" && dataItem != undefined) {
            //AjaxJunta($("#InputID").val());
        }
        FiltroMostrar(1);
    });
}

function eventoCambioTipoListado() {

    if ($('input:radio[name=TipoAgregado]:checked').val() == "Reporte") {
        $("#JuntaDiv").css('display', 'none');
        $("#MuestraDiv").css('display', 'block');


        //AjaxObtenerListaTaller();
        ////AjaxWPS();
        ////AjaxPQR();
    }
    else if ($('input:radio[name=TipoAgregado]:checked').val() == "Listado") {
        $("#JuntaDiv").css('display', 'block');
        $("#MuestraDiv").css('display', 'block');

        //AjaxObtenerListaTaller();
        ////AjaxWPS();
        ////AjaxPQR();
    }
}

function suscribirEventoChangeRadioTipoListado() {

    $('input:radio[name=TipoAgregado]:nth(0)').change(function () {
        Limpiar();
        eventoCambioTipoListado();
        //AjaxCargarCamposPredeterminadosCambiaTipoVista();
        $("#grid").data("kendoGrid").dataSource.data([]);

    });
    $('input:radio[name=TipoAgregado]:nth(1)').change(function () {
        Limpiar();
        eventoCambioTipoListado();
        //AjaxCargarCamposPredeterminadosCambiaTipoVista();
        $("#grid").data("kendoGrid").dataSource.data([]);

    });
}


function Limpiar() {

    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").value("");
    $("#Junta").data("kendoComboBox").value("");//.dataSource.data([]);
    $("#FechaSoldadura").data("kendoDatePicker").value("");
    $("#inputTaller").data("kendoComboBox").value("");
    $("#grid").data('kendoGrid').dataSource.data([]);


}


function opcionHabilitarRadioTipoCaptura(valor) {

}


function deshabilitaSpool() {
    $("#InputOrdenTrabajo").prop("disabled", true);
    $("#InputID").data("kendoComboBox").enable(false);

}

function habilitaSpool() {
    $("#InputOrdenTrabajo").prop("disabled", false);
    $("#InputID").data("kendoComboBox").enable(true);

}

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#InputID").data("kendoComboBox").enable(false);
        $("#Junta").data("kendoComboBox").enable(false);
        $("#inputTaller").data("kendoComboBox").enable(false);
        $("#inputWPS").data("kendoComboBox").enable(false);
        $("#inputPQR").data("kendoComboBox").enable(false);
        $("#FechaSoldadura").data("kendoDatePicker").enable(false);
        $('#botonGuardar').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#DetalleAvisoLlegada0017").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#ButtonAplicar').attr("disabled", true);

        $('#btnGuardarPiePagina').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar3").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#InputID").data("kendoComboBox").enable(true);
        $("#inputTaller").data("kendoComboBox").enable(true);
        //$("#inputWPS").data("kendoComboBox").enable(true);
        //$("#inputPQR").data("kendoComboBox").enable(true);
        $("#FechaSoldadura").data("kendoDatePicker").enable(true);
        $("#Junta").data("kendoComboBox").enable(true);
        $('#botonGuardar').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#DetalleAvisoLlegada0017").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#ButtonAplicar').attr("disabled", false);
        $('#btnGuardarPiePagina').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar3").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
    }
}