var procesoPinturaSeleccionadoAnterior = "";
var editado = false;
var ventanaConfirmEdicionCambioProcesoPintura;


function Limpiar() {
    $("#InputCuadrante").val("");
    $("#InputColor").val("");
    $("#InputFechaCapturaAvanceIntAcabado").val("");
    $("#InputPintor").val("");
    $("#InputSistemaPintura").val("");
    $("#InputPinturaComponenteComposicion").val("");
    $("#grid").data('kendoGrid').dataSource.data([]);
}




function changeLanguageCall() {
    SuscribirEventos();
    AjaxCargaMostrarPredeterminadoseleciconProcesosPintura();
}



function CambiarProcesoPintura() {
    if (procesoPinturaSeleccionadoAnterior == "")
        procesoPinturaSeleccionadoAnterior = $('input:radio[name=ProcesoPintura]:checked').val();

    if (!editado) {
        procesoPinturaSeleccionadoAnterior = $('input:radio[name=ProcesoPintura]:checked').val();
        AjaxZona();
    }
    else {
        ventanaConfirmEdicionCambioProcesoPintura.open().center();
    }
}