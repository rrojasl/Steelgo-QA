﻿function SuscribirEventos() {
    SuscribirEventoSpoolID();
    SuscribirEventoChangeRadioTipoListado();
    SuscribirEventoCarro();
    SuscribirEventoAgregar();
};

function SuscribirEventoAgregar() {
    $('#btnAgregar').click(function (e) {
        AjaxAgregarCarga()
    });
}

function ObtenerTipoConsulta() {
    var radioButtonsLLena = document.getElementsByName('EmbarqueCargaTipoSeleccion');

    for (var x = 0; x < radioButtonsLLena.length; x++) {
        if (radioButtonsLLena[x].checked) {
            return (x + 1);
        }
    }
    return -1;
}

function SuscribirEventoSpoolID() {
    var dataItem;
    $("#InputID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        suggest: true,
        filter: "contains",
        index: 3,
        select: function (e) {

            dataItem = this.dataItem(e.item.index());

            if (dataItem.Status != "1") {
                e.preventDefault();
                $("#InputID").val("");
                displayMessage("Mensajes_error", dataItem.Status, '1');

            }
            else {
                $("#InputID").val(dataItem.IDValido);
                Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                $("#LabelProyecto").text(dataItem.Proyecto);
            }

        }
        ,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if ($("#InputID").val().length == 1) {
                $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
            }
            if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                $("#LabelProyecto").text(dataItem.Proyecto);

            }
        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                AjaxObtenerSpoolID();
            } catch (e) {
                displayMessage("Mensajes_error", e.message, '0');
            }
        } else {
            displayMessage("CapturaArmadoMensajeOrdenTrabajo", "", '2');
            $("#InputOrdenTrabajo").focus();
        }
    });

    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").value("");
        $("#InputID").data("kendoComboBox").setDataSource();
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {

        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();

        }
        else if (e.keyCode == 40)
            $("#InputID").data("kendoComboBox").select();
    });

};

function SuscribirEventoChangeRadioTipoListado() {

    $('input:radio[name=PinturaCargaTipoSeleccion]:nth(0)').change(function () {
        $("#divSpool").show();
        $("#divCodigo").hide();
    });
   
    $('input:radio[name=PinturaCargaTipoSeleccion]:nth(1)').change(function () {
        $("#divSpool").hide();
        $("#divCodigo").show();
    });
}

function SuscribirEventoCarro()
{
    $('#inputCarro').kendoDropDownList({
        dataTextField: "NombreMedioTransporte",
        dataValueField: "MedioTransporteID ",
        suggest: true,
        filter: "contains",
        index: 3
    });
}

function SuscribirEventoSpoolID() {
    var dataItem;
    $("#InputID").kendoComboBox({
        dataTextField: "IDValido",
        dataValueField: "Valor",
        suggest: true,
        filter: "contains",
        index: 3,
        select: function (e) {

            dataItem = this.dataItem(e.item.index());

            if (dataItem.Status != "1") {
                e.preventDefault();
                $("#InputID").val("");
                displayMessage("Mensajes_error", dataItem.Status, '1');

            }
            else {
                $("#InputID").val(dataItem.IDValido);
                Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                $("#LabelProyecto").text(dataItem.Proyecto);
            }

        }
        ,
        change: function (e) {
            dataItem = this.dataItem(e.sender.selectedIndex);
            if ($("#InputID").val().length == 1) {
                $("#InputID").data("kendoComboBox").value(("00" + $("#InputID").val()).slice(-3));
            }
            if ($("#InputID").val() != '' && $("#InputOrdenTrabajo").val() != '') {
                Cookies.set("Proyecto", dataItem.ProyectoID + '°' + dataItem.Proyecto);
                $("#LabelProyecto").text(dataItem.Proyecto);

            }
        }
    });

    $("#InputOrdenTrabajo").blur(function (e) {

        if ($("#InputOrdenTrabajo").val().match("^[a-zA-Z][0-9]*$")) {
            try {
                AjaxObtenerSpoolID();
            } catch (e) {
                displayMessage("Mensajes_error", e.message, '0');
            }
        } else {
            displayMessage("CapturaArmadoMensajeOrdenTrabajo", "", '2');
            $("#InputOrdenTrabajo").focus();
        }
    });

    $("#InputOrdenTrabajo").focus(function (e) {
        $("#InputOrdenTrabajo").val("");
        $("#InputID").data("kendoComboBox").value("");
        $("#InputID").data("kendoComboBox").setDataSource();
    });

    $('#InputID').closest('.k-widget').keydown(function (e) {

        if (e.keyCode == 37) {
            $("#InputOrdenTrabajo").focus();

        }
        else if (e.keyCode == 40)
            $("#InputID").data("kendoComboBox").select();
    });

};