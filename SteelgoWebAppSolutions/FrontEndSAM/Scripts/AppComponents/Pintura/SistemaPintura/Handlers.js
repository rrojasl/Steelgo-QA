﻿var proyectoInicial = 0;
var pruebaOriginal = 0;
var requisicionOriginal = 0;

function SuscribirEventos() {
    GuardarDetallePruebas();
    suscribirEventoGuardar();
    SuscribirEventoComboColor();
    suscribirEventoDetallePruebas();
    SuscribirEventoCerrarPopUpPruebas();
    suscribirEventoProyecto();
    SuscribirEventoComboProyecto();
};


function suscribirEventoProyecto() {

    $("#inputProyecto").kendoMultiSelect({
        dataSource: '',
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        filter: "contains",
        change: function (e) {
        }
    }).data("kendoMultiSelect");

}

function GuardarDetallePruebas() {
    $('#GuardarDetallePruebas').click(function () {

        var ds = $("#gridPopUp").data("kendoGrid").dataSource;

        for (var i = 0; i < ds._data.length; i++) {
            ds._data[i].SistemaPinturaProyectoProcesoID = ds._data[i].SistemaPinturaProyectoProcesoID == undefined ? 0 : ds._data[i].SistemaPinturaProyectoProcesoID;
            ds._data[i].ProyectoProcesoPruebaID = ds._data[i].ProyectoProcesoPruebaID == undefined ? 0 : ds._data[i].ProyectoProcesoPruebaID;
            ds._data[i].Accion = ds._data[i].ProyectoProcesoPruebaID == 0 ? 1 : 2;
            
            
        }
        modeloRenglon.listadoPruebasDetalle = ds._data;
        $("#windowGrid").data("kendoWindow").close();
        $("#grid").data("kendoGrid").dataSource.sync();

    });
}



function suscribirEventoDetallePruebas() {

    $(document).on('click', '.EnlaceDetallePruebas', function (e) {
        e.preventDefault();

        if ($('#botonGuardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

            var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));
            LlenarGridPopUp(dataItem);
        }
    });
}

function SuscribirEventoCerrarPopUpPruebas() {
    $("#CerrarDetallePruebas").click(function (e) {
        e.preventDefault();

        $("#windowGrid").data("kendoWindow").close();
    });
}




function suscribirEventoChangeRadio() {
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        AjaxCargarRequisicionAsignacion();
    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {
        AjaxCargarRequisicionAsignacion();
    });
}


function SuscribirEventoComboColor() {
    $("#inputColor").kendoMultiSelect({
        dataSource: '',
        dataTextField: "Nombre",
        dataValueField: "ColorID",
        suggest: true,
        filter: "contains",
        change: function (e) {
        }
    }).data("kendoMultiSelect");

};

function SuscribirEventoComboProyecto() {
    $("#comboProyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {
                AjaxCargarNuevoSistemaPintura();
            }
            else {
                $("#comboProyecto").data("kendoComboBox").value("");
            }
        }
    });
}


function Limpiar() {

    $("#grid").data('kendoGrid').dataSource.data([]);
}



function suscribirEventoGuardar() {
    $('#Guardar').click(function (e) {
        e.preventDefault();
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            // opcionHabilitarView(true, "FieldSetView");
            AjaxGuardarCaptura(ds._data, 0);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardar').click(function (e) {
        e.preventDefault();
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            //opcionHabilitarView(true, "FieldSetView");
            AjaxGuardarCaptura(ds._data, 0);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardarYNuevo').click(function (e) {
        e.preventDefault();
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data, 1);
        //Limpiar();
    });


    $('#GuardarPie').click(function (e) {
        e.preventDefault();
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            // opcionHabilitarView(true, "FieldSetView");
            AjaxGuardarCaptura(ds._data, 0);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardar1').click(function (e) {
        e.preventDefault();
        var ds = $("#grid").data("kendoGrid").dataSource;
        if ($('#botonGuardar').text() == "Guardar") {
            //opcionHabilitarView(true, "FieldSetView");
            AjaxGuardarCaptura(ds._data, 0);
        }
        else if ($('#botonGuardar').text() == "Editar")
            opcionHabilitarView(false, "FieldSetView")
    });

    $('#btnGuardarYNuevo1').click(function (e) {
        e.preventDefault();
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data, 1);
        //Limpiar();
    });
}

function opcionHabilitarView(valor, name) {

    if (valor) {
        $('#FieldSetView').find('*').attr('disabled', true);


        $('#botonGuardar2').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar3").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar4').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);

    }
    else {
        $('#FieldSetView').find('*').attr('disabled', false);

        $('#botonGuardar2').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#botonGuardar3").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#botonGuardar4').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);


    }
}