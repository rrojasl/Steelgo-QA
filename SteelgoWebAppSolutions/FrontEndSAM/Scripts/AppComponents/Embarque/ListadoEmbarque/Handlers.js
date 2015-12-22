function SuscribirEventos() {
    suscribirEventoCambioTab();
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
    $(".botonEnviar").click(function(e) {
        VentanaModalFecha();
    });
    $(".botonFolio").click(function (e) {
        VentanaModalFolio();
    });
}