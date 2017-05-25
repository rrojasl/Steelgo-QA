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
        LimpiarDespuesCambioProcesoPintura();
        procesoPinturaSeleccionadoAnterior = $('input:radio[name=ProcesoPintura]:checked').val();
        AjaxZona();
    }
    else {
        ventanaConfirmEdicionCambioProcesoPintura.open().center();
    }
}


function LimpiarDespuesCambioProcesoPintura() {
    $("#inputZona").data("kendoComboBox").dataSource.data([]);
    $("#inputCuadrante").data("kendoComboBox").dataSource.data([]);
    $("#inputSistemaPintura").data("kendoComboBox").dataSource.data([]);
    $("#InputID").data("kendoComboBox").dataSource.data([]);
    $("#inputLote").data("kendoComboBox").dataSource.data([]);
    $("#inputColor").data("kendoComboBox").dataSource.data([]);

    $("#inputZona").data("kendoComboBox").value("");
    $("#inputCuadrante").data("kendoComboBox").value("");
    $("#inputSistemaPintura").data("kendoComboBox").value("");
    $("#InputID").data("kendoComboBox").value("");
    $("#inputLote").data("kendoComboBox").value("");
    $("#inputColor").data("kendoComboBox").value("");
   

    
    //$("#grid").empty();
    //CrearGrid();
    //CustomisaGrid($("#grid"));
    //document.getElementById('divAgregarComponentesReductoresDinamicos').innerHTML = '';
    //$("#inputShotBlastero").data("kendoMultiSelect").value("");
}