function SuscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoVer();
    suscribirEventoCancelar();
    suscribirEventoRequisicion();
}

SuscribirEventos();

function suscribirEventoGuardar() {

    /*$('#btnGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
            AjaxGuardarCaptura(ds._data);
    });
    $('#Guardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data);
    });
    */
    $('#GuardarDefectos').click(function (e) {
        var ds = $("#gridPopUp").data("kendoGrid").dataSource;
        AjaxGuardarDefectos(ds._data);
    });

    $('.accionGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;

        if ($('#Guardar').text() == "Guardar" || $('#Guardar').text() == "Save") {
            if (ds._data.length > 0) {
                opcionHabilitarView(true, "FieldSetView");
                AjaxGuardarCaptura(ds._data);
            }
        }
        else if ($('#Guardar').text() == "Editar" || $('#Guardar').text() == "Edit") {
            opcionHabilitarView(false, "FieldSetView")
        }
    });
}

function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        Limpiar();
    });
}


function suscribirEventoVer() {

    $('#btnVer').click(function (e) {
        if ($("#Requisicion").val() != "") {
            AjaxObtenerJuntas();
        }
        else {
            displayMessage("ValidacionResultadosMensajeCampoRequisicionVacio", "", "1");
        }
    });
}


function Limpiar() {
    $("#Requisicion").val("");
    $("#grid").data('kendoGrid').dataSource.data([]);
}

function suscribirEventoRequisicion() {
    $("#Requisicion").kendoComboBox({
        dataTextField: "FolioTexto",
        dataValueField: "Folio",
        suggest: true,
        filter: "contains",
        change: function (e) {
            if ($("#Requisicion").data("kendoComboBox").dataItem($("#Requisicion").data("kendoComboBox").select()) != undefined) {
            }
            else {
                $("#Requisicion").data("kendoComboBox").value("");
            }
        }
    });

    $("#Requisicion").keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#Requisicion").data("kendoComboBox").dataItem($("#Requisicion").data("kendoComboBox").select()) != undefined) {
                AjaxObtenerJuntas();
            }
            else {
                $("#Requisicion").data("kendoComboBox").value("");
            }
        }
    });
}




function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);
        $("#Requisicion").data("kendoComboBox").enable(false);

        $('#Guardar1').text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoEditar[$("#language").data("kendoDropDownList").value()]);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);
        $("#Requisicion").data("kendoComboBox").enable(true);
        $('#Guardar1').text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar").text(_dictionary.textoGuardar[$("#language").data("kendoDropDownList").value()]);

    }
}