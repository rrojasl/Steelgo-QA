function SuscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoCancelar();
}

SuscribirEventos();

function suscribirEventoGuardar() {

    $('#Guardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data,0);
    });

    $('#btnGuardar2').click(function (e) {
        var ds = $("#gridPopUp").data("kendoGrid").dataSource;
        modeloRenglon.ListaDetalleDefectos = ds._data;
        $("#windowGrid").data("kendoWindow").close();
    });

    $('#btnGuardarYNuevo').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data,1);
    });

    $('#GuardarPie').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data,0);
    });

    $('#btnGuardar1').click(function (e) {
        var ds = $("#gridPopUp").data("kendoGrid").dataSource;
        modeloRenglon.ListaDetalleDefectos = ds._data;
        $("#windowGrid").data("kendoWindow").close();
    });

    $('#btnGuardarYNuevo1').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data,1);
    });

    $('#GuardarDefectos').click(function (e) {
        var ds = $("#gridPopUp").data("kendoGrid").dataSource;
        modeloRenglon.ListaDetalleDefectos = ds._data;
        $("#windowGrid").data("kendoWindow").close();
    });

}


function suscribirEventoCancelar() {
    $('#btnCancelar').click(function (e) {
        Limpiar();
    });
}

function Limpiar() {
    $("#Requisicion").val("");
    $("#grid").data('kendoGrid').dataSource.data([]);
}