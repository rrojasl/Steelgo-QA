function SuscribirEventos() {
    suscribirEventoGuardar();
    suscribirEventoCancelar();
}

SuscribirEventos();

function suscribirEventoGuardar() {

    $('#btnGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGuardarCaptura(ds._data);
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