﻿function SuscribirEventos() {
    SuscribirEventoSpoolID();
    SuscribirEventoInspector();
    SuscribirEventoDefecto();
    SuscribirEventoResultadoDimensional();
    suscribirEventoAgregar();
    suscribirEventoGuardar();
    suscribirEventoCancelar();
    SuscribirEventoResultadoVisual();
    SuscribirEventoDefectoVisual();
    SuscribirEventoInspectorVisual();
    SuscribirEventoTaller();
    SuscribirEventoAgregarCapturaRapida();
    SuscribirEventoListaJuntas();
    SuscribirEventoFecha();
};

function SuscribirEventoFecha() {
    endRangeDate = $("#FechaInspeccion").kendoDatePicker({
        max: new Date()

    });
    endRangeDateV = $("#inputFechaVisual").kendoDatePicker({
        max: new Date()

    });

    endRangeDateV.on("keydown", function (e) {
        //if (e.keyCode == 13) {
        //    PlanchaFecha();
        //}
    });

};

function SuscribirEventoListaJuntas() {
    $("#ListaJuntas").kendoMultiSelect({
        dataTextField: "Junta",
        dataValueField: "JuntaID",
        suggest: true,
        filter: "contains",
        autoBind: false,
        ignoreCase: true,
        change: function (e) {

        }
    }).data("kendoMultiSelect");


}
function SuscribirEventoSpoolID() {

    $("#InputID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
       
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if (dataItem != undefined && dataItem.IDValido!="") {
                if ($("#InputID").val().length == 1) {
                    $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
                }
                if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                    Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                    //ajaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
                    MostrarDetalleVisualDimensional();
                }
            }
        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {
        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                ajaxObtenerSpoolID();

            } catch (e) {
                displayNotify("Mensajes_error", e.message, '0');
            }
        } else {
            displayNotify("DimensionalVisualMensajeOrdenTrabajo", "", '1');
            //$("#InputOrdenTrabajo").focus();
        }
    });


    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").value("");
        $("#InputID").data("kendoComboBox").setDataSource();
        limpiarJuntaMultiselect();
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();
        }
        else if (e.keyCode == 39) {
            $("#inputDefecto").data("kendoComboBox").focus();
        }
        else if (e.keyCode == 40) {
            //if (tieneClase(e.currentTarget)) {
            //    $("#InputID").data("kendoComboBox").select(0);
            //    //ajaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
            //    //MostrarDetalleVisualDimensional();
            //}
            //dataItem = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select());
            //if (dataItem != undefined) {
            //    if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
            //        Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
            //        $("#LabelProyecto").text(dataItem.Proyecto);
            //        //ajaxJunta($("#InputID").val());
            //        MostrarDetalleVisualDimensional();
            //    }
            //}
        }
        else if (e.keyCode == 13) {
            if ($("#InputID").val() != "" && $("#InputOrdenTrabajo").val()) {
                if ($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).IDValido!="" && $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()) != undefined) {
                    e.preventDefault();
                    MostrarDetalleVisualDimensional();
                    if ($("#InputID").val() != "" && $("#InputOrdenTrabajo").val()) {
                        ajaxobtenerDetalleDimensional($("#InputID").val());
                        ajaxObtenerJSonGrid();
                        deshabilitaSpool();
                    }
                }
                else displayNotify("NoExisteSpoolID", '', '1');
            }
            else displayNotify("NoExisteSpoolID", '', '1');
        }
        else if (e.keyCode == 9) {
            if (tieneClase(e.currentTarget)) {
                $("#InputID").data("kendoComboBox").select(0);
                var e = $.Event("keydown", { keyCode: 27 });
                //ajaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
                //MostrarDetalleVisualDimensional();
            }
            dataItem = $("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select());
            if (dataItem != undefined) {
                if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                    Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                    $("#LabelProyecto").text(dataItem.Proyecto);
                    //ajaxJunta($("#InputID").val());
                    MostrarDetalleVisualDimensional();
                    e.preventDefault();
                    if ($("#InputID").val() != "" && $("#InputOrdenTrabajo").val() != "") {
                        ajaxobtenerDetalleDimensional($("#InputID").val());
                        ajaxObtenerJSonGrid();
                    }
                }
            }
        }
    });

    $('#InputID').blur(function (e) {
        var spoollIDValue = $("#InputID").val();
        var listaSpoolID = $("#InputID").data("kendoComboBox").dataSource._data;
        if (listaSpoolID.length > 0) {
            for (var i = 0; i < listaSpoolID.length; i++) {
                var idvalSpoolID = listaSpoolID[i].IDValido + '';
                if (idvalSpoolID.indexOf(spoollIDValue) > 0) {
                    $("#InputID").data("kendoComboBox").select(0);
                    //ajaxJunta($("#InputID").data("kendoComboBox").dataItem($("#InputID").data("kendoComboBox").select()).Valor);
                    MostrarDetalleVisualDimensional();
                }
            }
        }
    });
};
function SuscribirEventosJunta() {
    $('#Junta').kendoComboBox({
        dataTextField: "Etiqueta",
        dataValueField: "JuntaSpoolID",
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
            ajaxobtenerDetalleDimensional($("#InputID").val());
            ajaxObtenerJSonGrid();
            deshabilitaSpool();
        }
    });
}
function SuscribirEventoTaller() {
    $('#inputTaller').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "TallerID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#inputTaller").data("kendoComboBox").dataItem($("#inputTaller").data("kendoComboBox").select()) == undefined)
                $("#inputTaller").data("kendoComboBox").value("");
        }
    });
    $('#inputTaller').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputTaller").data("kendoComboBox").dataItem($("#inputTaller").data("kendoComboBox").select()) == undefined) {
                $("#inputTaller").data("kendoComboBox").value("");
            }
        }
    });
    // ajaxObtenerListaTaller();
}
function SuscribirEventoInspector() {
    $('#inputInspector').kendoComboBox({
        dataTextField: "NombreCompleto",
        dataValueField: "ObreroID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#inputInspector").data("kendoComboBox").dataItem($("#inputInspector").data("kendoComboBox").select()) == undefined)
                $("#inputInspector").data("kendoComboBox").value("");
        }
    });

    $('#inputInspector').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputInspector").data("kendoComboBox").dataItem($("#inputInspector").data("kendoComboBox").select()) == undefined) {
                $("#inputInspector").data("kendoComboBox").value("");
            }
        }
    });
}
function SuscribirEventoInspectorVisual() {
    $('#inputInspectorVisual').kendoComboBox({
        dataTextField: "NombreCompleto",
        dataValueField: "ObreroID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#inputInspectorVisual").data("kendoComboBox").dataItem($("#inputInspectorVisual").data("kendoComboBox").select()) == undefined)
                $("#inputInspectorVisual").data("kendoComboBox").value("");
        }
    });

    $('#inputInspectorVisual').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputInspectorVisual").data("kendoComboBox").dataItem($("#inputInspectorVisual").data("kendoComboBox").select()) == undefined) {
                $("#inputInspectorVisual").data("kendoComboBox").value("");
            }
        }
    });
}
function SuscribirEventoDefecto() {
    $('#inputDefecto').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "DefectoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#inputDefecto").data("kendoComboBox").dataItem($("#inputDefecto").data("kendoComboBox").select()) == undefined)
                $("#inputDefecto").data("kendoComboBox").value("");

            if ($("#inputDefecto").data("kendoComboBox").dataItem($("#inputDefecto").data("kendoComboBox").select()) != undefined
            && $("#inputDefecto").data("kendoComboBox").dataItem($("#inputDefecto").data("kendoComboBox").select()).TIPO == "NoEspecificarJunta")
                $("#ListaJuntas").data("kendoMultiSelect").enable(false);

            else $("#ListaJuntas").data("kendoMultiSelect").enable(true);

            $("#ListaJuntas").data("kendoMultiSelect").value("");
        }
    });

    $('#inputDefecto').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputDefecto").data("kendoComboBox").dataItem($("#inputDefecto").data("kendoComboBox").select()) == undefined) {
                $("#inputDefecto").data("kendoComboBox").value("");
                $("#ListaJuntas").data("kendoMultiSelect").value("");
            } else {
                $("#ListaJuntas").data("kendoMultiSelect").value("");
            }
        }
    });
}
function SuscribirEventoDefectoVisual() {
    $('#inputDefectosVisual').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "DefectoID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            if ($("#inputDefectosVisual").data("kendoComboBox").dataItem($("#inputDefectosVisual").data("kendoComboBox").select()) == undefined)
                $("#inputDefectosVisual").data("kendoComboBox").value("");
        }
    });

    $('#inputDefectosVisual').closest('.k-widget').keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#inputDefectosVisual").data("kendoComboBox").dataItem($("#inputDefectosVisual").data("kendoComboBox").select()) == undefined) {
                $("#inputDefectosVisual").data("kendoComboBox").value("");
                $("#ListaJuntas").data("kendoMultiSelect").value("");
            } else {
                $("#ListaJuntas").data("kendoMultiSelect").value("");
            }
        }
    });
}

function SuscribirEventoResultadoDimensional() {
    $('input:radio[name=ResultadoDimensional]:nth(0)').change(function () {
        if ($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
            $("#inputDefecto").data("kendoComboBox").enable(false);
            $("#ListaJuntas").data("kendoMultiSelect").enable(false);
        }
        $("#ListaJuntas").data("kendoMultiSelect").value("");
        $("#inputDefecto").data("kendoComboBox").value("");
        $("#inputDefecto").data("kendoComboBox").select(0);
    });
    $('input:radio[name=ResultadoDimensional]:nth(1)').change(function () {
        if ($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
            $("#inputDefecto").data("kendoComboBox").enable(true);
            $("#ListaJuntas").data("kendoMultiSelect").enable(true);
        }

        $("#inputDefecto").data("kendoComboBox").select(0);
    });
};

function SuscribirEventoResultadoVisual() {
    $('input:radio[name=ResultadoVisual]:nth(0)').change(function () {
        $("#inputDefectosVisual").data("kendoComboBox").enable(false);
        $("#inputDefectosVisual").data("kendoComboBox").value("");
    });
    $('input:radio[name=ResultadoVisual]:nth(1)').change(function () {
        $("#inputDefectosVisual").data("kendoComboBox").enable(true);
        $("#inputDefectosVisual").data("kendoComboBox").value("");
    });
};

function suscribirEventoAgregar() {
    $('#btnAgregar').click(function (e) {
        e.preventDefault();
        if ($("#InputID").val()!="0"  && $("#InputID").val() != "" && $("#InputOrdenTrabajo").val()) {
            ajaxobtenerDetalleDimensional($("#InputID").val());
            ajaxObtenerJSonGrid();
            deshabilitaSpool();
        }
    });
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
};
function suscribirEventoGuardar() {

    $('.accionGuardar').click(function (e) {
        e.preventDefault();
        var ds = $("#grid").data("kendoGrid").dataSource;

        if ($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
            ajaxGuardado(ds._data, 0);
        }
        else if ($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
            opcionHabilitarView(false, "FieldSetView");
            deshabilitaSpool();
        }
    });

    $('#btnGuardarYNuevo').click(function (e) {
        e.preventDefault();
        var ds = $("#grid").data("kendoGrid").dataSource;
        ajaxGuardado(ds._data, 1);
    });

    $('#btnGuardarYNuevo1').click(function (e) {
        e.preventDefault();
        var ds = $("#grid").data("kendoGrid").dataSource;
        ajaxGuardado(ds._data, 1);
    });
}
function SuscribirEventoAgregarCapturaRapida() {
    $('#btnAplicarCapturaRapida').click(function (e) {
        e.preventDefault();
        if ($('input:radio[name=LLena]:checked').val() === "Todos") {
            ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                iframe: true,
                title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
                visible: false, //the window will not appear before its .open method is called
                width: "auto",
                height: "auto",
                modal: true,
                animation: {
                    open: false,
                    close: false
                }
            }).data("kendoWindow");

            ventanaConfirm.content(_dictionary.CapturaMensajeArmadoPlancharTodos[$("#language").data("kendoDropDownList").value()] +
                         "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");

            ventanaConfirm.open().center();

            $("#yesButton").click(function (handler) {
                if ($("#inputTaller").val() != "" && $("#inputTaller").val() != 0) PlanchaTaller();
                if ($("#inputInspectorVisual").val() != "" && $("#inputInspectorVisual").val() != 0) PlanchaInspector();
                if ($("#inputDefectosVisual").val() != "" && $("#inputDefectosVisual").val() != 0) PlanchaDefecto();
                if (String(endRangeDateV.val()).trim() != "") PlanchaFecha();

                PlanchadoResultadoVisual();
                ventanaConfirm.close();
            });
            $("#noButton").click(function (handler) {
                ventanaConfirm.close();
            });
        }
        else {
            if ($("#inputTaller").val() != "" && $("#inputTaller").val() != 0) PlanchaTaller();
            if ($("#inputInspectorVisual").val() != "" && $("#inputInspectorVisual").val() != 0) PlanchaInspector();
            if ($("#inputDefectosVisual").val() != "" && $("#inputDefectosVisual").val() != 0) PlanchaDefecto();
            if (String(endRangeDateV.val()).trim() != "") PlanchaFecha();

            PlanchadoResultadoVisual();
        }
    });
}
function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        e.preventDefault();
        limpiar();
    });
}

function limpiarJuntaMultiselect() {
    $("#ListaJuntas").data("kendoMultiSelect").dataSource.data([]);
    $("#ListaJuntas").data("kendoMultiSelect").value("");
}
function limpiar() {
    limpiarJuntaMultiselect();

    //$("#InputOrdenTrabajo").prop("disabled", false);
    $("#InputOrdenTrabajo").val("");
    // $("#InputOrdenTrabajo").focus();

    $("#InputID").data("kendoComboBox").value("");
    $("#InputID").data("kendoComboBox").enable(true);

    $("#inputDefecto").data("kendoComboBox").enable(true);
    $("#inputDefecto").data("kendoComboBox").value("");

    // $("#Junta").data("kendoComboBox").value("");

    $("#inputInspector").data("kendoComboBox").value("");

    var radioButtons = document.getElementsByName('ResultadoDimensional');
    for (var x = 0; x < radioButtons.length; x++) {
        if (radioButtons[x].checked) {
            radioButtons[x].checked = false;
        }
    }
    $("#grid").data('kendoGrid').dataSource.data([]);
}

function LimpiarPlanchado() {
    $("#inputTaller").data("kendoComboBox").value("");
    $("#inputDefectosVisual").data("kendoComboBox").value("");
    $("#inputInspectorVisual").data("kendoComboBox").value("");
}

function deshabilitaSpool() {
    $("#InputOrdenTrabajo").prop("disabled", true);
    $("#InputOrdenTrabajo").prop("readonly", true);

    $("#InputID").data("kendoComboBox").enable(false);
    $('#InputOrdenTrabajo').css('opacity', '0.6');
}

function habilitaSpool() {
    $("#InputOrdenTrabajo").prop("disabled", false);
    $("#InputOrdenTrabajo").prop("readonly", false);

    $("#InputID").data("kendoComboBox").enable(true);
    $('#InputOrdenTrabajo').css('opacity', '1');
}

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $('#divAplicarCapturaRapida').find('*').attr('disabled', true);
        $('#ResultadoVisualRadio').find('*').attr('disabled', true);
        $('#ResultadoLlenadoMasivoRadio').find('*').attr('disabled', true);

        //$("#InputID").data("kendoComboBox").enable(false);
        $("#inputInspectorVisual").data("kendoComboBox").enable(false);
        $("#inputFechaVisual").data("kendoDatePicker").enable(false);
        $("#FechaInspeccion").data("kendoDatePicker").enable(false);
        $("#inputInspector").data("kendoComboBox").enable(false);
        $("#inputTaller").data("kendoComboBox").enable(false);
        $("#inputDefecto").data("kendoComboBox").enable(false);
        $("#inputDefectosVisual").data("kendoComboBox").enable(false);
        $("#ListaJuntas").data("kendoMultiSelect").enable(false);

        $('#Guardar').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#Guardar1').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar1").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#grid").children().prop('readonly', true);
    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $('#ResultadoVisualRadio').find('*').attr('disabled', false);
        $('#ResultadoLlenadoMasivoRadio').find('*').attr('disabled', false);
        $('#divAplicarCapturaRapida').find('*').attr('disabled', false);

        $("#inputInspectorVisual").data("kendoComboBox").enable(true);
        $("#inputFechaVisual").data("kendoDatePicker").enable(true);
        $("#inputTaller").data("kendoComboBox").enable(true);
        if ($('input:radio[name=ResultadoDimensional]:checked').val() != "Aprobado") {
            $("#inputDefecto").data("kendoComboBox").enable(true);
            $("#ListaJuntas").data("kendoMultiSelect").enable(true);
        }
        else {
            $("#inputDefecto").data("kendoComboBox").enable(false);
            $("#ListaJuntas").data("kendoMultiSelect").enable(false);
        }

        if ($('input:radio[name=ResultadoVisual]:checked').val() != "Aprobado") {
            $("#inputDefectosVisual").data("kendoComboBox").enable(true);
        }
        else {
            $("#inputDefectosVisual").data("kendoComboBox").enable(false);
        }
        $("#FechaInspeccion").data("kendoDatePicker").enable(true);
        $("#inputInspector").data("kendoComboBox").enable(true);

        $('#Guardar1').text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar').text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar1').text(_dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]);

        $("#grid").children().prop('readonly', false);
    }
} 