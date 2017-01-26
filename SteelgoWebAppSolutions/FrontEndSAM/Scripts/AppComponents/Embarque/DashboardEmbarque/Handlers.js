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
                $("#grid th[data-field=Plana]").html("Plana");
                $("#grid").data("kendoGrid").hideColumn("NombrePlana");
                $("#grid").css("display", "block");
                $("#gridCarga").css("display", "none");
                $("#grid").data("kendoGrid").dataSource.data([]);
                $("#grid").data("kendoGrid").dataSource.add({ Plana: "PL-345", Elementos: "2", M2: "2.73", KG: "135", URL: "/Embarque/EmbarqueCarro?EmbarqueID=2" });

                loadingStop();
            }, 500);



            break;
        case 3:
            loadingStart();
            setTimeout(function () {
                $("#grid th[data-field=Plana]").html("Embarque");
                $("#grid").data("kendoGrid").showColumn("NombrePlana");
                $("#grid").css("display", "block");
                $("#gridCarga").css("display", "none");
                $("#grid").data("kendoGrid").dataSource.data([]);
                $("#grid").data("kendoGrid").dataSource.add({ Plana: "Emb-3", NombrePlana: "PLN12", Elementos: "4", M2: "7.27", KG: "535", URL: "/Embarque/ListadoEmbarque?EmbarqueID=3" });
                loadingStop();
            }, 500);

            break;
        case 4:
            loadingStart();
            setTimeout(function () {
                $("#grid th[data-field=Plana]").html("Embarque");
                $("#grid").data("kendoGrid").showColumn("NombrePlana");
                $("#grid").css("display", "block");
                $("#gridCarga").css("display", "none");
                $("#grid").data("kendoGrid").dataSource.data([]);
                $("#grid").data("kendoGrid").dataSource.add({ Plana: "Emb-4", NombrePlana: "PLX-02", Elementos: "2", M2: "12.23", KG: "435", URL: "/Embarque/RevisionEmbarque?EmbarqueID=4" });
                loadingStop();
            }, 500);
            break;

    }
}

changeLabelNumElementos();
function changeLabelNumElementos() {
    $('input:radio[name=Muestra]:nth(0)').change(function () {
        $('#PorCarcar').text('2');
        $('#PorEmbarcar').text('2');
        $('#PorEnviar').text('1');
        $('#PorValidar').text('1');

        $('.elementoPorCargar').text('2');
        $('.elementoPorEmbarcar').text('2');
        $('.elementoPorEnviar').text('1');
        $('.elementoPorValidar').text('1');
    });
    $('input:radio[name=Muestra]:nth(1)').change(function () {
        $('#PorCarcar').text('6.89');
        $('#PorEmbarcar').text('2.73');
        $('#PorEnviar').text('7.27');
        $('#PorValidar').text('12.23');

        $('.elementoPorCargar').text('6.89');
        $('.elementoPorEmbarcar').text('2.73');
        $('.elementoPorEnviar').text('7.27');
        $('.elementoPorValidar').text('12.23');
    });
    $('input:radio[name=Muestra]:nth(2)').change(function () {
        $('#PorCarcar').text('0.5147');
        $('#PorEmbarcar').text('0.135');
        $('#PorEnviar').text('0.535');
        $('#PorValidar').text('0.435');

        $('.elementoPorCargar').text('0.5147');
        $('.elementoPorEmbarcar').text('0.135');
        $('.elementoPorEnviar').text('0.535');
        $('.elementoPorValidar').text('0.435');
    });
}