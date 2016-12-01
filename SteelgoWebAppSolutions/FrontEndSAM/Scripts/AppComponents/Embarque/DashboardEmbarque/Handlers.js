SuscribirEventoProyecto();

function SuscribirEventoProyecto() {
    $('#inputProyecto').kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        filter: "contains",
        index: 3
    });
    
}


function ActivarRefrescarGrid(idBoton) {
    $("#contenidoDashboard").css('display', 'block');
    $("#divStatusRequisiciones").css("display", "block");
    $("#pestanias").css("display", "block");
    $("#tabEstatus").html("");
    tabActivo(idBoton);
    AccionesListado(idBoton);
}

function suscribirEventoElementos() {

    $(document).on('click', '.EnlaceDetalleElementos', function (e) {
        e.preventDefault();
        var grid = $("#grid").data("kendoGrid");
        dataItem = grid.dataItem($(e.target).closest("tr"));
        LlenarGridPopUp(dataItem);

    });
}


function tabActivo(idButton) {
    $(".btn-tab").removeClass("active");
    
    var list = document.getElementById("divStatusRequisiciones").getElementsByTagName("button");

    for (var i = 0; i < list.length; i++) {
        if (list[i].id == idButton) {
            $("#" + idButton).addClass("active");
            break;
        }
    }
};

function AccionesListado(idButton) {
    
}