﻿function SuscribirEventos() {
    suscribirEventoArea();
    suscribirEventoCuadrante();
    suscribirEventoGuardar();
    suscribirEventoImprimirEtiqueta();
    suscribirEventoVer();
}


SuscribirEventos();

function suscribirEventoArea() {
    $("#Area").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "AreaID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            AjaxCargarCuadrante($("#Area").data("kendoComboBox").value());
        }
    });
}

function suscribirEventoCuadrante() {
    $("#Cuadrante").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "CuadranteID",
        suggest: true,
        filter: "contains",
        index: 3,
        change: function (e) {
            AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value(), $('input:radio[name=Impreso]:checked').val());
        }
    });
}


function suscribirEventoGuardar() {

    $('#btnGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data, "0");
    });
}

function suscribirEventoVer() {

    $('#btnAgregar').click(function (e) {
        if ($("#Area").val() != "") {
            if ($("#Cuadrante").val() != "") {
                AjaxCargarDatos($("#Area").data("kendoComboBox").value(), $("#Cuadrante").data("kendoComboBox").value(), $('input:radio[name=Impreso]:checked').val());
            }
            else {
                displayMessage("EmbarqueMarcadoMensajeCuadrante", "", "1");
            }
        }
        else {
            displayMessage("EmbarqueMarcadoMensajeArea", "", "1");
        }
    });
}


function suscribirEventoImprimirEtiqueta() {

    $('#ImprimirEtiqueta').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data, "1");
    });
}