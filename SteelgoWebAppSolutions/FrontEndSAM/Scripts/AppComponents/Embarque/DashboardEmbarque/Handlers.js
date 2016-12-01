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
    switch (idButton) {
        case 1:
            $("#grid").data("kendoGrid").dataSource.data([]);
            $("#grid").data("kendoGrid").dataSource.add({ Plana: "Emb-1", M2: "3.23", KG: "235", URL: "#" });
            break;
        case 2:
            $("#grid").data("kendoGrid").dataSource.data([]);
            $("#grid").data("kendoGrid").dataSource.add({ Plana: "Emb-2", M2: "2.73", KG: "135", URL: "/Embarque/EmbarqueCarro?EmbarqueID=2" });
            break;
        case 3:
            $("#grid").data("kendoGrid").dataSource.data([]);
            $("#grid").data("kendoGrid").dataSource.add({ Plana: "Emb-3", M2: "7.27", KG: "535", URL: "/Embarque/ListadoEmbarque?EmbarqueID=3" });
            break;
        case 4:
            $("#grid").data("kendoGrid").dataSource.data([]);
            $("#grid").data("kendoGrid").dataSource.add({ Plana: "Emb-4", M2: "12.23", KG: "435", URL: "/Embarque/RevisionEmbarque?EmbarqueID=4" });
            break;
       
    }
}