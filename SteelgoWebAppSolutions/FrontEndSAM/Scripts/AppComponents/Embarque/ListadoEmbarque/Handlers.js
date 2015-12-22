function SuscribirEventos() {
    suscribirEventoCambioTab();
    suscribirEventoModal();
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

    $(document).on('click', '.botonEnviar', function () {
        VentanaModalFecha();
    });

    $(document).on('click', '.botonFolio', function () {
        VentanaModalFolio();
    });

}