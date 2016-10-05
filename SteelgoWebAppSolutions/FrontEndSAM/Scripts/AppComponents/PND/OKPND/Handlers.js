var proyectoInicial = 0;
var pruebaInicial = 0;
var requisicionOriginal = 0;

function SuscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoChangeRadio();
    suscribirEventoCancelar();
    suscribirEventoProyecto();
    SuscribirEventoSpoolID();
}

function suscribirEventoChangeRadio() {
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        if ($("#Proyecto").data("kendoComboBox").value() != "" && $("#Proyecto").data("kendoComboBox").value() != 0) {
            var ProyectoID = $("#Proyecto").data("kendoComboBox").value() == "" ? 0 : $("#Proyecto").data("kendoComboBox").value();

            var ds = $("#grid").data("kendoGrid").dataSource;
            if (!existenCambios(ds._data)) {
                AjaxGetListaElementos(ProyectoID, $('input:radio[name=Muestra]:checked').val());
            }
            else {
                var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "auto",
                    height: "auto",
                    modal: true,
                    close: function () {
                        $('input[name="Muestra"][value="Todos"]').prop('checked', true);
                    }
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    ventanaConfirm.close();
                    AjaxGetListaElementos(ProyectoID, $('input:radio[name=Muestra]:checked').val());
                });

                $("#noButtonProy").click(function () {
                    $('input[name="Muestra"][value="Todos"]').prop('checked', true);
                    ventanaConfirm.close();
                });
            }
        }
    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {
        if ($("#Proyecto").data("kendoComboBox").value() != "" && $("#Proyecto").data("kendoComboBox").value() != 0) {
            //var tipoPrueba = $("#tipoPrueba").data("kendoComboBox").value() == "" ? 0 : $("#tipoPrueba").data("kendoComboBox").value();
            //var RequisicionID = $("#listaRequisiciones").data("kendoComboBox").value() == "" ? 0 : $("#listaRequisiciones").data("kendoComboBox").value();
            var ProyectoID = $("#Proyecto").data("kendoComboBox").value() == "" ? 0 : $("#Proyecto").data("kendoComboBox").value();

            var ds = $("#grid").data("kendoGrid").dataSource;
            if (!existenCambios(ds._data)) {
                AjaxGetListaElementos(ProyectoID, $('input:radio[name=Muestra]:checked').val());
            }
            else {
                var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "auto",
                    height: "auto",
                    modal: true,
                    close: function () {
                        $('input[name="Muestra"][value="SinCaptura"]').prop('checked', true);
                    }
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    ajaxGetListaElementos(ProyectoID, $('input:radio[name=Muestra]:checked').val());
                    ventanaConfirm.close();
                });

                $("#noButtonProy").click(function () {
                    $('input[name="Muestra"][value="SinCaptura"]').prop('checked', true);
                    ventanaConfirm.close();
                });
            }
        }
    });
}

function suscribirEventoGuardar() {
    //$('#Guardar').click(function (e) {
    //    var ds = $("#grid").data("kendoGrid").dataSource;
    //    if ($('#botonGuardar').text() == "Guardar") {
    //        if ($("#Proyecto").data("kendoComboBox").value() != 0 && $("#Proyecto").data("kendoComboBox").value() != "") {
    //            if ($("#tipoPrueba").data("kendoComboBox").value() != 0 && $("#tipoPrueba").data("kendoComboBox").value() != "") {
    //                //ajaxGuardarCaptura(ds._data, 0);
    //            }
    //            else
    //                displayNotify("", "Favor de seleccionar un tipo de prueba", '1');
    //        }
    //        else
    //            displayNotify("", "Favor de seleccionar un proyecto", '1');
    //    }
    //    else if ($('#botonGuardar').text() == "Editar")
    //        opcionHabilitarView(false, "FieldSetView")
    //});

    //$('#btnGuardar').click(function (e) {
    //    var ds = $("#grid").data("kendoGrid").dataSource;
    //    if ($('#botonGuardar').text() == "Guardar") {
    //        //if ($("#tipoPrueba").data("kendoComboBox").value() != 0)
    //            //ajaxGuardarCaptura(ds._data, 0);
    //        //else
    //        //    displayNotify("", "Favor de seleccionar un tipo de prueba", '1');
    //    }
    //    else if ($('#botonGuardar').text() == "Editar")
    //        opcionHabilitarView(false, "FieldSetView")
    //});

    //$('#btnGuardarYNuevo').click(function (e) {
    //    var ds = $("#grid").data("kendoGrid").dataSource;
    //    if ($('#botonGuardar').text() == "Guardar") {
    //        //if ($("#tipoPrueba").data("kendoComboBox").value() != 0)
    //        //    //ajaxGuardarCaptura(ds._data, 1);
    //        //else
    //        //    displayNotify("", "Favor de seleccionar un tipo de prueba", '1');
    //    }
    //    //else if ($('#botonGuardar').text() == "Editar") {
    //    //    if ($("#tipoPrueba").data("kendoComboBox").value() != 0)
    //    //        //ajaxGuardarCaptura(ds._data, 1);
    //    //}
    //});

    //$('#GuardarPie').click(function (e) {
    //    var ds = $("#grid").data("kendoGrid").dataSource;
    //    if ($('#botonGuardar').text() == "Guardar") {
    //        //if ($("#tipoPrueba").data("kendoComboBox").value() != 0)
    //        //    //ajaxGuardarCaptura(ds._data, 0);
    //        //else
    //        //    displayNotify("", "Favor de seleccionar un tipo de prueba", '1');
    //    }
    //    else if ($('#botonGuardar').text() == "Editar")
    //        opcionHabilitarView(false, "FieldSetView")
    //});

    //$('#btnGuardar1').click(function (e) {
    //    var ds = $("#grid").data("kendoGrid").dataSource;
    //    if ($('#botonGuardar').text() == "Guardar") {
    //        if ($("#tipoPrueba").data("kendoComboBox").value() != 0)
    //            //ajaxGuardarCaptura(ds._data, 0);
    //        else
    //            displayNotify("", "Favor de seleccionar un tipo de prueba", '1');
    //    }
    //    else if ($('#botonGuardar').text() == "Editar")
    //        opcionHabilitarView(false, "FieldSetView");
    //});

    //$('#btnGuardarYNuevo1').click(function (e) {
    //    var ds = $("#grid").data("kendoGrid").dataSource;
    //    if ($('#botonGuardar').text() == "Guardar") {
    //        if ($("#tipoPrueba").data("kendoComboBox").value() != 0)
    //            //ajaxGuardarCaptura(ds._data, 1);
    //        else
    //            displayNotify("", "Favor de seleccionar un tipo de prueba", '1');
    //    }
    //    else if ($('#botonGuardar').text() == "Editar")
    //        if ($("#tipoPrueba").data("kendoComboBox").value() != 0)
    //            //ajaxGuardarCaptura(ds._data, 1);
    //});
}

function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        Limpiar();
    });
}

function suscribirEventoProyecto() {
    var dataItem;
    $("#Proyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        delay: 10,
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            var ds = $("#grid").data("kendoGrid").dataSource;
            if (!existenCambios(ds._data)) {
                proyectoInicial = $("#Proyecto").data("kendoComboBox").value();

                if (dataItem != undefined && dataItem.Nombre != "" && dataItem.RequisicionID != 0) {
                    var ProyectoID = $("#Proyecto").data("kendoComboBox").value();

                    AjaxGetListaElementos(ProyectoID, $('input:radio[name=Muestra]:checked').val());
                }
                else {
                    $("#Proyecto").data("kendoComboBox").value("");
                    $("#Proyecto").data("kendoComboBox").select(0);
                    proyectoInicial = 0;
                    $("#grid").data('kendoGrid').dataSource.data([]);
                    var ProyectoID = 0;
                }
            }
            else {
                var ventanaConfirm = $("#ventanaConfirmCaptura").kendoWindow({
                    iframe: true,
                    title: _dictionary.EntregaPlacasGraficasTituloPopup[$("#language").data("kendoDropDownList").value()],
                    visible: false,
                    width: "auto",
                    height: "auto",
                    modal: true,
                    close: function () {
                        $("#Proyecto").data("kendoComboBox").value(proyectoInicial);
                    }
                }).data("kendoWindow");

                ventanaConfirm.content(_dictionary.EntregaPlacasGraficasMensajeDatosCapturadosNoGuardados[$("#language").data("kendoDropDownList").value()] +
                    "</br><center><button class='btn btn-blue' id='yesButtonProy'>Si</button><button class='btn btn-blue' id='noButtonProy'>No</button></center>");

                ventanaConfirm.open().center();
                $("#yesButtonProy").click(function () {
                    if (dataItem != undefined && dataItem.Nombre != "" && dataItem.RequisicionID != 0) {
                        proyectoInicial = $("#Proyecto").data("kendoComboBox").value();
                    }
                    else {
                        $("#Proyecto").data("kendoComboBox").value("");
                        $("#Proyecto").data("kendoComboBox").select(0);
                        proyectoInicial = 0;

                        $("#grid").data('kendoGrid').dataSource.data([]);
                    }
                    ventanaConfirm.close();
                });
                $("#noButtonProy").click(function () {
                    $("#Proyecto").data("kendoComboBox").value(proyectoInicial);
                    ventanaConfirm.close();
                });
            }
        }
    });
}

function SuscribirEventoSpoolID() {
    var dataItem;
    $("#InputID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        suggest: false,
        filter: "contains",
        index: 3,
        delay: 10,
        change: function (e) {
            //if (!bloqueoSegundoEvento) {
            //    //dataItem = this.dataItem(e.sender.selectedIndex);
            //    //if (e.sender.selectedIndex != (-1))
            //    //    caracteresEscritosEnPagina = $("#InputID").data("kendoComboBox").text();

            //}
            vengoEventoChange = true;
            ultimoModoInteraccion = 1;//Seleccion

        }
    });

    $("#InputID").data("kendoComboBox").input.on("focus", function () {
        caracteresEscritosEnPagina = $("#InputID").data("kendoComboBox").text();


        setTimeout(function () {
            $("#InputID").data("kendoComboBox").value("");
            $("#InputID").data("kendoComboBox").value(caracteresEscritosEnPagina);
        }, 500);
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {
        if ((e.keyCode != 13) && (e.keyCode != 9))//Enter para captura
            ultimoModoInteraccion = 2;//Captura

        //if ((e.keyCode == 13) && (vengoEventoChange))
        //    ultimoModoInteraccion = 1;

        if (e.keyCode == 37) {
            if ($("#InputID").data("kendoComboBox").text() == '')
                $("#InputOrdenTrabajo").focus();
        }
        else if (e.keyCode == 13) {//Enter
            bloqueoSegundoEvento = true;

            if (vengoEventoChange && (caracteresEscritosEnPagina != '')) {
                ////displayNotify("", "ultimoModoInteraccion: " + ultimoModoInteraccion, '1');
                ////var encontradoTemp = false;
                ////for (i = 0; i < dataSpoolArray.idStatus.length; i++) {
                ////    if ($("#InputID").data("kendoComboBox").text() == dataSpoolArray.idStatus[i].IDValido) {
                ////        caracteresEscritosEnPagina = $("#InputID").data("kendoComboBox").text();
                ////        encontradoTemp = true;
                ////        break
                ////    }
                ////}
                ////if (!encontradoTemp)
                $("#InputID").data("kendoComboBox").value(caracteresEscritosEnPagina);
                vengoEventoChange = false;
            }
            else if (vengoEventoChange && (caracteresEscritosEnPagina == '')) {
                caracteresEscritosEnPagina = $("#InputID").data("kendoComboBox").text();
                vengoEventoChange = false;
            }
            else if (ultimoModoInteraccion == 1)//si es Seleccion
                caracteresEscritosEnPagina = $("#InputID").data("kendoComboBox").text();
            else if (ultimoModoInteraccion == 2)//si es Captura
                $("#InputID").data("kendoComboBox").value(caracteresEscritosEnPagina);

            if (caracteresEscritosEnPagina != '') {
                for (i = 0; i < dataSpoolArray.idStatus.length; i++) {
                    if ($.isNumeric(caracteresEscritosEnPagina) && $.isNumeric(dataSpoolArray.idStatus[i].IDValido)) {//Evaluación si son numeros
                        if (Number(caracteresEscritosEnPagina) == Number(dataSpoolArray.idStatus[i].IDValido)) {
                            $("#InputID").data("kendoComboBox").value(dataSpoolArray.idStatus[i].IDValido);
                            caracteresEscritosEnPagina = dataSpoolArray.idStatus[i].IDValido;
                            Cookies.set("Proyecto", dataSpoolArray.idStatus[i].ProyectoID + '°' + dataSpoolArray.idStatus[i].Proyecto);
                            $("#LabelProyecto").text(dataSpoolArray.idStatus[i].Proyecto);
                            bloqueoSegundoEvento = false;
                            AjaxObtenerListaTubero();
                            AjaxObtenerListaTaller();
                            spoolIDSelectTemp = i;
                            //try {
                            //    AjaxJuntaModoSpool($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor, true);
                            //} catch (ex) {
                            //    $("#InputID").data("kendoComboBox").text("");
                            //    $("#InputID").data("kendoComboBox").value(dataSpoolArray.idStatus[i].IDValido);
                            //    $("#InputID").data("kendoComboBox").select(i);

                            //    AjaxJuntaModoSpool(dataSpoolArray.idStatus[i].Valor, true);
                            //}

                            return;
                        }

                    }
                }
            }
            bloqueoSegundoEvento = false;
            //displayNotify("", "No hay coincidencias en el spool: " + caracteresEscritosEnPagina, '1');

        }
        else if (((e.keyCode >= 48) && (e.keyCode <= 57))) {
            var x = $("#InputID").data("kendoComboBox");

            caracteresEscritosEnPagina += e.key;

            ////displayNotify("", "Captura: " + caracteresEscritosEnPagina, '1');
        }
        else if ((e.keyCode == 8)) {

            if (caracteresEscritosEnPagina.length > 1)
                caracteresEscritosEnPagina = caracteresEscritosEnPagina.substring(0, caracteresEscritosEnPagina.length - 1);
            else
                caracteresEscritosEnPagina = '';
            ////displayNotify("", "Captura Back: " + caracteresEscritosEnPagina, '1');
        }
        else if (e.keyCode == 38 || e.keyCode == 40) {
            caracteresEscritosEnPagina = $("#InputID").data("kendoComboBox").text();
        }
    });

    //$('#InputID').click(function (e) {
    //    caracteresEscritosEnPagina = $("#InputID").data("kendoComboBox").text();
    //});

    $('#InputID').blur(function (e) {
        if (ultimoModoInteraccion == 1)//si es Seleccion
            caracteresEscritosEnPagina = $("#InputID").data("kendoComboBox").text();
        else if (ultimoModoInteraccion == 2)//si es Captura
            $("#InputID").data("kendoComboBox").value(caracteresEscritosEnPagina);

        if (dataSpoolArray != null) {
            for (i = 0; i < dataSpoolArray.idStatus.length; i++) {
                if ($.isNumeric(caracteresEscritosEnPagina) && $.isNumeric(dataSpoolArray.idStatus[i].IDValido)) {//Evaluación si son numeros
                    if (Number(caracteresEscritosEnPagina) == Number(dataSpoolArray.idStatus[i].IDValido)) {
                        $("#InputID").data("kendoComboBox").value(dataSpoolArray.idStatus[i].IDValido);
                        caracteresEscritosEnPagina = dataSpoolArray.idStatus[i].IDValido;
                        Cookies.set("Proyecto", dataSpoolArray.idStatus[i].ProyectoID + '°' + dataSpoolArray.idStatus[i].Proyecto);
                        $("#LabelProyecto").text(dataSpoolArray.idStatus[i].Proyecto);
                        AjaxObtenerListaTubero();
                        AjaxObtenerListaTaller();
                        spoolIDSelectTemp = i;
                        if (ejecutaClikAgregar)
                            clickBotonAgregar();
                        /*try {
                            AjaxJuntaModoSpool($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor, true);
                        } catch (ex) {
                            $("#InputID").data("kendoComboBox").text("");
                            $("#InputID").data("kendoComboBox").value(dataSpoolArray.idStatus[i].IDValido);
                            $("#InputID").data("kendoComboBox").select(i);
                            AjaxJuntaModoSpool(dataSpoolArray.idStatus[i].Valor, true);
                        }*/

                        return;
                    }

                }
            }
        }
        //displayNotify("", "No hay coincidencias en el spool: " + caracteresEscritosEnPagina, '1');

    });

    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                $("#InputID").data("kendoComboBox").enable(false);
                AjaxObtenerSpoolID();
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
        $("#Junta").data("kendoComboBox").value("");
        $("#Junta").data("kendoComboBox").setDataSource();
        $("#InputID").data("kendoComboBox").setDataSource();
    });

};

function Limpiar() {
    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").value("");
    $("#Junta").data("kendoComboBox").value("");

    vaciaTiposDePrueba();
    vaciaRequisiciones();

    $("#grid").data('kendoGrid').dataSource.data([]);

    //ajaxCargarCamposPredeterminados();

    //$("#Fecha").data("kendoDatePicker").value("");

}

function opcionHabilitarView(valor, name) {
    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#Proyecto").data("kendoComboBox").enable(false);
        $("#tipoPrueba").data("kendoComboBox").enable(false);
        $("#listaRequisiciones").data("kendoComboBox").enable(false);

        $("#InputID").data("kendoComboBox").enable(false);
        $("#Junta").data("kendoComboBox").enable(false);
        //$("#Fecha").data("kendoDatePicker").enable(false);
        $('#botonGuardar').text("Editar");
        $("#DetalleAvisoLlegada0017").text("Editar");

        $("#botonGuardar2").text("Editar");
        $('#botonGuardar').text("Editar");
        $('#botonGuardar4').text("Editar");
        $('#botonGuardar3').text("Editar");
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#Proyecto").data("kendoComboBox").enable(true);
        $("#tipoPrueba").data("kendoComboBox").enable(true);
        $("#listaRequisiciones").data("kendoComboBox").enable(true);

        $("#InputID").data("kendoComboBox").enable(true);
        $("#Junta").data("kendoComboBox").enable(true);
        $('#botonGuardar').text("Guardar");
        $("#DetalleAvisoLlegada0017").text("Guardar");

        $("#botonGuardar2").text("Guardar");
        $('#botonGuardar').text("Guardar");
        $('#botonGuardar4').text("Guardar");
        $('#botonGuardar3').text("Guardar");
    }
}