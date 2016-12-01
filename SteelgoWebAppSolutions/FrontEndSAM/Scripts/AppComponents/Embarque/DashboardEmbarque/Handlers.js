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
            loadingStart();
            setTimeout(function () {
                $("#grid").css("display", "none");
                $("#gridCarga").css("display", "block");
                loadingStop();
            }, 500);

            break;
        case 2:
            loadingStart();
            setTimeout(function () {
                $("#grid").css("display", "block");
                $("#gridCarga").css("display", "none");
                $("#grid").data("kendoGrid").dataSource.data([]);
                $("#grid").data("kendoGrid").dataSource.add({ Plana: "PL-345", Elementos: "3", M2: "2.73", KG: "135", URL: "/Embarque/EmbarqueCarro?EmbarqueID=2" });

                loadingStop();
            }, 500);
                
            

            break;
        case 3:
            loadingStart();
            setTimeout(function () {

                $("#grid").css("display", "block");
                $("#gridCarga").css("display", "none");
                $("#grid").data("kendoGrid").dataSource.data([]);
                $("#grid").data("kendoGrid").dataSource.add({ Plana: "Emb-001", Elementos: "4", M2: "7.27", KG: "535", URL: "/Embarque/ListadoEmbarque?EmbarqueID=3" });
                loadingStop();
            }, 500);

            break;
        case 4:
            loadingStart();
            setTimeout(function () {

                $("#grid").css("display", "block");
                $("#gridCarga").css("display", "none");
                $("#grid").data("kendoGrid").dataSource.data([]);
                $("#grid").data("kendoGrid").dataSource.add({ Plana: "Emb-020", Elementos: "6", M2: "12.23", KG: "435", URL: "/Embarque/RevisionEmbarque?EmbarqueID=4" });
                loadingStop();
            }, 500);
            break;

    }
}