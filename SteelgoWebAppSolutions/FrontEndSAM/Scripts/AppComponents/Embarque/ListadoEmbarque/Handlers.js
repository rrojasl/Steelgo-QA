function SuscribirEventos() {
    suscribirEventoCambioTab();
    suscribirEventoModal();
    suscribirEventoGuardarFolio();
    
}

SuscribirEventos();



function suscribirEventoCambioTab() {
    $("#btnSinPermiso").click(function (e) {
        $(".btn-tabList").removeClass("active");
        $("#btnSinPermiso").addClass("active");
        AjaxCargarListadoEmbarque('todos', $("#language").val());
    });
    $("#btnSinAutorizacion").click(function (e) {
        $(".btn-tabList").removeClass("active");
        $("#btnSinAutorizacion").addClass("active");
        AjaxCargarListadoEmbarque('Enviados', $("#language").val());
    });
}


function suscribirEventoModal() {

    $(document).on('click', '.botonEnviar', function (e) {
        VentanaModalFecha();
    });

    $(document).on('click', '.botonFolio', function (e) {
        var grid = $("#grid").data("kendoGrid"),
        dataItem = grid.dataItem($(e.target).closest("tr"));

        $("#Folio").val(dataItem.FolioAprobadoAduana);
        VentanaModalFolio(dataItem);
    });

}


function suscribirEventoGuardarFolio() {
    $("#GuardarFolio").click(function () {
        if ($("#Folio").val() != "") {
            ObjetoRenglon.FolioAprobadoAduana = $("#Folio").val();
        }
        $("#windowFolio").data("kendoWindow").close();
    });
}