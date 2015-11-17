var currentDataItem;

function EliminaSoldadorCertificacion(e) {
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

    EliminaSoldadorCertificacionAjax(dataItem);

};

$("#AgregarSoldadorCertificacion").click(function (e) {
    TotalPasosSoldadura = 0;
    LimpiarControlesParaAgregar();
    VentanaModal();
    $("#windowSoldadorCertificacion").show();
});


function editaSoldadorCertificacion(e) {

    currentDataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

   
    AsignarValoresItemSeleccionado();
    AbrirVentanaModalVista();
    
};