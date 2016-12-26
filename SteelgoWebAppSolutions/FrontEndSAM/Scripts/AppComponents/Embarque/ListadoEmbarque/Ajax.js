function AjaxCargarCamposPredeterminados() {
    var campoPredeterminado = 3070;
    $CamposPredeterminados.CamposPredeterminados.read({ token: Cookies.get("token"), lenguaje: $("#language").val(), id: campoPredeterminado }).done(function (data) {
        if (data == "Pendientes") {
            $('#btnPendientes').trigger("click");
        }
        else if (data == "Transitados") {
            $('#btnTransito').trigger("click");
        }
        loadingStop();
    });
}

function AjaxObtenerContadorPorEstatus() {
    $ListadoEmbarque.ListadoEmbarque.read({});
}