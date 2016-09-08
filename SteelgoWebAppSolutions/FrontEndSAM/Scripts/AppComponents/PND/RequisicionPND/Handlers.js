function SuscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoAgregar();
    suscribirEventoRequisiciones();
    suscribirEventoChangeRadio();
    suscribirEventoCancelar();
    suscribirEventoTipoPrueba();
    suscribirEventoProyecto();
    SuscribirEventoSpoolID();
    SuscribirEventosJunta();
    SuscribirEventoOcultarDivJunta();
}

function suscribirEventoChangeRadio() {
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        if ($("#Proyecto").data("kendoComboBox").value() != "" && $("#Proyecto").data("kendoComboBox").value() != 0) {
            var tipoPrueba = $("#tipoPrueba").data("kendoComboBox").value() == "" ? 0 : $("#tipoPrueba").data("kendoComboBox").value();
            var RequisicionID = $("#listaRequisiciones").data("kendoComboBox").value() == "" ? 0 : $("#listaRequisiciones").data("kendoComboBox").value();
            var ProyectoID = $("#Proyecto").data("kendoComboBox").value() == "" ? 0 : $("#Proyecto").data("kendoComboBox").value();

            AjaxGetListaElementos(RequisicionID, tipoPrueba, ProyectoID, $('input:radio[name=Muestra]:checked').val());
        }
    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {
        if ($("#Proyecto").data("kendoComboBox").value() != "" && $("#Proyecto").data("kendoComboBox").value() != 0) {
            var tipoPrueba = $("#tipoPrueba").data("kendoComboBox").value() == "" ? 0 : $("#tipoPrueba").data("kendoComboBox").value();
            var RequisicionID = $("#listaRequisiciones").data("kendoComboBox").value() == "" ? 0 : $("#listaRequisiciones").data("kendoComboBox").value();
            var ProyectoID = $("#Proyecto").data("kendoComboBox").value() == "" ? 0 : $("#Proyecto").data("kendoComboBox").value();

            AjaxGetListaElementos(RequisicionID, tipoPrueba, ProyectoID, $('input:radio[name=Muestra]:checked').val());
        }
    });
}

function SuscribirEventoOcultarDivJunta() {
    $('#containerDiv').css('display', 'none');
}

function suscribirEventoGuardar() {
    $('#Guardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            if ($("#Proyecto").data("kendoComboBox").value() != 0 && $("#Proyecto").data("kendoComboBox").value() != "") {
                if ($("#tipoPrueba").data("kendoComboBox").value() != 0 && $("#tipoPrueba").data("kendoComboBox").value() != "") {
                    $("#grid").data("kendoGrid").dataSource.sync();
                    AjaxGuardarCaptura(ds._data);
                }
                else
                    displayNotify("", "Favor de seleccionar un tipo de prueba", '1');
            }
            else
                displayNotify("", "Favor de seleccionar un proyecto", '1');
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            if ($("#tipoPrueba").data("kendoComboBox").value() != 0)
                AjaxGuardarCaptura(ds._data, 0);
            else
                displayNotify("", "Favor de seleccionar un tipo de prueba", '1');
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardarYNuevo').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            if ($("#tipoPrueba").data("kendoComboBox").value() != 0)
                AjaxGuardarCaptura(ds._data, 1);
            else
                displayNotify("", "Favor de seleccionar un tipo de prueba", '1');
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#GuardarPie').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            if ($("#tipoPrueba").data("kendoComboBox").value() != 0)
                AjaxGuardarCaptura(ds._data, 0);
            else
                displayNotify("", "Favor de seleccionar un tipo de prueba", '1');
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardar1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            if ($("#tipoPrueba").data("kendoComboBox").value() != 0)
                AjaxGuardarCaptura(ds._data, 0);
            else
                displayNotify("", "Favor de seleccionar un tipo de prueba", '1');
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView");
    });

    $('#btnGuardarYNuevo1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            if ($("#tipoPrueba").data("kendoComboBox").value() != 0)
                AjaxGuardarCaptura(ds._data, 0);
            else
                displayNotify("", "Favor de seleccionar un tipo de prueba", '1');
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });
}

function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        Limpiar();
    });
}

function suscribirEventoAgregar() {
    $('#ButtonAgregar').click(function (e) {

        AgregarJuntaNueva();

    });
}

function vaciaTiposDePrueba() {
    if ($("#tipoPrueba").data("kendoComboBox").dataSource._data.length > 0) {
        $("#tipoPrueba").data("kendoComboBox").setDataSource();
    }
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
            if (dataItem != undefined && dataItem.Nombre != "" && dataItem.RequisicionID != 0) {
                AjaxGetListaTiposDePrueba();

                var TipoPruebaID = 0;
                var RequisicionID = 0;
                var ProyectoID = $("#Proyecto").data("kendoComboBox").value();

                if (ProyectoID != "" && ProyectoID != 0)
                    AjaxGetListaElementos(RequisicionID, TipoPruebaID, ProyectoID, $('input:radio[name=Muestra]:checked').val());
                else
                    $("#grid").data('kendoGrid').dataSource.data([]);

                //AjaxGetListaRequisiciones(ProyectoID, TipoPruebaID);

                LimpiarRowJunta();
            }
            else {
                $("#Proyecto").data("kendoComboBox").select(0);
                $("#grid").data('kendoGrid').dataSource.data([]);
                var ProyectoID = 0;
                var TipoPruebaID = 0;

                vaciaTiposDePrueba();

                //AjaxGetListaRequisiciones(ProyectoID, TipoPruebaID);
            }
        }
    });
}

function suscribirEventoTipoPrueba() {
    var dataItem;
    $("#tipoPrueba").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TipoPruebaID",
        delay: 10,
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            $("#listaRequisiciones").data("kendoComboBox").select(0);
            var RequisicionID = 0;

            if (dataItem != undefined && dataItem.Nombre != "" && dataItem.TipoPruebaID != 0) {
                
                var tipoPruebaID = $("#tipoPrueba").data("kendoComboBox").value();
                var ProyectoID = $("#Proyecto").data("kendoComboBox").value();

                if (ProyectoID != "" && ProyectoID != 0)
                    AjaxGetListaElementos(RequisicionID, tipoPruebaID, ProyectoID, $('input:radio[name=Muestra]:checked').val());
                else
                    $("#grid").data('kendoGrid').dataSource.data([]);

                AjaxGetListaRequisiciones(ProyectoID, tipoPruebaID);
            }
            else {
                $("#tipoPrueba").data("kendoComboBox").select(0);


                var proyectoID = $("#Proyecto").data("kendoComboBox").value();
                var tipoPruebaID = 0;

                AjaxGetListaRequisiciones(proyectoID, tipoPruebaID);

                if (ProyectoID != "" && ProyectoID != 0)
                    AjaxGetListaElementos(RequisicionID, tipoPrueba, ProyectoID, $('input:radio[name=Muestra]:checked').val());
                else
                    $("#grid").data('kendoGrid').dataSource.data([]);
            }
        }
    });
}

function suscribirEventoRequisiciones() {
    var dataItem;
    $("#listaRequisiciones").kendoComboBox({
        suggest: true,
        delay: 10,
        filter: "contains",
        autoBind: false,
        dataTextField: "NombreRequisicion",
        dataValueField: "RequisicionID",
        select: function (e) {
            dataItem = this.dataItem(e.item.index());
        }, change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem == undefined) {
                $("#listaRequisiciones").data("kendoComboBox").select(0);

                var RequisicionID = 0;
                var tipoPruebaID = $("#tipoPrueba").data("kendoComboBox").value() == "" ? 0 : $("#tipoPrueba").data("kendoComboBox").value();
                var ProyectoID = $("#Proyecto").data("kendoComboBox").value();

                AjaxGetListaElementos(RequisicionID, tipoPruebaID, ProyectoID, $('input:radio[name=Muestra]:checked').val());
            }
            else {
                if (dataItem.RequisicionID == 0) {
                    $('#containerDiv').css('display', 'none');

                    var RequisicionID = 0;
                    var tipoPruebaID = $("#tipoPrueba").data("kendoComboBox").value() == "" ? 0 : $("#tipoPrueba").data("kendoComboBox").value();
                    var ProyectoID = $("#Proyecto").data("kendoComboBox").value();

                    AjaxGetListaElementos(RequisicionID, tipoPruebaID, ProyectoID, $('input:radio[name=Muestra]:checked').val());
                } else {
                    $('#containerDiv').css('display', 'block');

                    if ($("#Proyecto").data("kendoComboBox").value() == "" || $("#Proyecto").data("kendoComboBox").value() == 0) {
                        displayNotify("", "El campo proyecto es mandatorio", '1');
                        $("#listaRequisiciones").data("kendoComboBox").select(0);
                        $('#containerDiv').css('display', 'none');
                    }
                    else {
                        AjaxGetListaTiposDePrueba();

                        var proyectoReq = $("#Proyecto").data("kendoComboBox").value();
                        var tipoPruebaReq = $("#tipoPrueba").data("kendoComboBox").value();
                        var requisicionID = $("#listaRequisiciones").data("kendoComboBox").value();

                        if (proyectoReq == "" || proyectoReq == 0) {
                            proyectoReq = $("#listaRequisiciones").data("kendoComboBox").dataItem($("#listaRequisiciones").data("kendoComboBox").select()).ProyectoID;                        
                        }
                        if (tipoPruebaReq == "" || tipoPruebaReq == 0) {
                            tipoPruebaReq = $("#listaRequisiciones").data("kendoComboBox").dataItem($("#listaRequisiciones").data("kendoComboBox").select()).TipoPruebaID;
                        }
                        
                        $("#Proyecto").data("kendoComboBox").value(proyectoReq);
                        $("#tipoPrueba").data("kendoComboBox").value(tipoPruebaReq);

                        AjaxGetListaElementos(requisicionID, tipoPruebaReq, proyectoReq, $('input:radio[name=Muestra]:checked').val());
                    }
                }
            }
        }
    });
}

function SuscribirEventoSpoolID() {
    var dataItem;
    $("#InputID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        delay: 10,
        suggest: true,
        filter: "contains",
        index: 3,
        select: function (e) {
            dataItem = this.dataItem(e.item.index());
            if (dataItem != undefined) {
                if (dataItem.Status != "1") {
                    e.preventDefault();
                    $("#InputID").val("");
                    displayNotify("Mensajes_error", dataItem.Status, '1');
                }
                else {
                    $("#InputID").val(dataItem.IDValido);
                    Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                    $("#LabelProyecto").text(dataItem.Proyecto);
                }
            }
        },
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined) {
                if ($("#InputID").val().length == 1) {
                    $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
                }
                if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                    Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                    $("#LabelProyecto").text(dataItem.Proyecto);
                    //AjaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
                }
            }
        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {
        //if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
        //    try {
        //        AjaxObtenerSpoolID();
        //    } catch (e) {
        //        displayNotify("Mensajes_error", e.message, '2');
        //    }
        //} else {
        //    displayNotify("CapturaSoldaduraMensajeOrdenTrabajo", "", '1');
        //}
    });

    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").select(0);
        $("#Junta").data("kendoComboBox").setDataSource();
        $("#InputID").data("kendoComboBox").setDataSource();
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();
        }
        else if (e.keyCode == 39) {
            $("#Junta").data("kendoComboBox").input.focus();
        }
        else if (e.keyCode == 40 && $("#InputID").data("kendoComboBox").select() != -1) {
            $("#InputID").data("kendoComboBox").select();
            //AjaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
        }
        else if (e.keyCode == 13) {
            if ($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select(0)) != undefined) {
                if ($("#InputID").data("kendoComboBox").select() != -1) {
                    //AjaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
                }
            }
            else
                displayNotify("NoExisteSpoolID", '', '2');
        }
        else if (e.keyCode == 9) {
            if (tieneClase(e.currentTarget)) {
                $("#InputID").data("kendoComboBox").select(0);
                //AjaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
            }
            dataItem = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select());
            if (dataItem != undefined) {
                if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                    Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                    $("#LabelProyecto").text(dataItem.Proyecto);
                    //AjaxJunta($("#InputID").val());
                }
            }
        }
    });
};

function SuscribirEventosJunta() {
    $('#Junta').kendoComboBox({
        dataTextField: "Etiqueta",
        dataValueField: "JuntaSpoolID",
        delay: 10,
        suggest: true,
        filter: "contains",
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

                AgregarJuntaNueva();
            }
            else
                $("#Junta").data("kendoComboBox").value("");
        }
    });
}

function Limpiar() {
    $("#InputOrdenTrabajo").val("");
    $("#Folio").text("");
    $("#InputID").data("kendoComboBox").value("");
    $("#Junta").data("kendoComboBox").value("");
    $("#Proyecto").data("kendoComboBox").select(0);
    $("#tipoPrueba").data("kendoComboBox").value("");
    //$("#Fecha").data("kendoDatePicker").value("");

    $("#grid").data('kendoGrid').dataSource.data([]);
}

function LimpiarRowJunta() {
    $("#InputOrdenTrabajo").val("");
    $("#InputID").data("kendoComboBox").value("");
    $("#Junta").data("kendoComboBox").value("");
}

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#Proyecto").data("kendoComboBox").enable(false);
        $("#tipoPrueba").data("kendoComboBox").enable(false);

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