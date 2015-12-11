function SuscribirEventos() {
    
    suscribirEventoGenerarReporte();
};


function suscribirEventoGenerarReporte() {
    $('#btnGuardar').click(function (e) {
        var ds = $("#grid").data("kendoGrid").dataSource;
        AjaxGenerarReporte(ds._data);
    });

  
}