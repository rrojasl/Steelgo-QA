function obtenerTipoPruebas() {
    $GenerarRequisicion.GenerarRequisicion.read({token: Cookies.get("token") ,proyectoID:Cookies.get("Proyecto").split('°')[0],lenguaje: }).done(function (data) {
        $("#tipoPrueba").data("kendoComboBox").value("");
        $("#tipoPrueba").data("kendoComboBox").dataSource.data(data);
    });
}


function ajaxObtenerJuntasSoldadas() {
    $GenerarRequisicion.GenerarRequisicion.read({ }).done(function(data){

    });
}