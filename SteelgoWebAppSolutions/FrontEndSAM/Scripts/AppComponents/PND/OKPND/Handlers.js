var proyectoInicial = 0;
var pruebaInicial = 0;
var requisicionOriginal = 0;

function SuscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoChangeRadio();
    suscribirEventoCancelar();
    suscribirEventoProyecto();
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