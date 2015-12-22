function SuscribirEventos() {
    
    suscribirEventoGenerarReporte();
    suscribirEventoImprimir();
};


function suscribirEventoGenerarReporte() {
    $('#btnGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGenerarReporte(ds._data);
    });
}

function suscribirEventoImprimir() {
    $('#Imprimir').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxImprimir(ds._data);
       // alert("imprimir");
    });
}