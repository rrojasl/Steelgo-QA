function SuscribirEventos() {
    suscribirEventoSubirCarro();
    suscribirEventoCarro();
}

SuscribirEventos();


function suscribirEventoSubirCarro() {

    $('#btnSubir').click(function (e) {
            var ds = $("#grid").data("kendoGrid").dataSource;
            AjaxSubirSpool(ds._data);
    });
}

function suscribirEventoCarro() {
    
    $("#inputCarro").kendoDropDownList({
        dataTextField: "NombreMedioTransporte",
        dataValueField: "MedioTransporteID",
        suggest: true,
        filter: "contains",
        change: function (e) {
            
        }
    });
}