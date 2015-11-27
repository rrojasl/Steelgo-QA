
function EliminaWPS(e) {

    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

    EliminaWPSAjax(dataItem);
};



function EditaWPS(e) {

    var DataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
  AsignarValoresItemSeleccionado(e);
    AbrirVentanaModalVista();


};

$("#AgregarWPS").click(function (e) {
   
    LimpiarControlesParaAgregar();
    VentanaModal();
    $("#windowWPS").show();
});
