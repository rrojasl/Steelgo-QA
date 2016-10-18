function SuscribirEventos() {
    SuscribirEventoProyecto();
    suscribirEventoElementosAsignados();
    SuscribirEventoCerrarPopUpJuntas();
    suscribirEventoDescarGaCSV();
    SuscribirEventoCargarCSV();
}

function SuscribirEventoProyecto() {
    $("#inputProyecto").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "ProyectoID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {
                if (dataItem.ProyectoID != 0) {

                }
            } else {
                $("#inputProyecto").data("kendoComboBox").value("");
            }
        }
    });
}

function suscribirEventoElementosAsignados() {

    $(document).on('click', '.EnlaceDetalleJunta', function (e) {
        e.preventDefault();

        if ($('#BotonGuardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

            var grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem($(e.target).closest("tr"));

            LlenarGridPopUp();
        }
    });
}

function SuscribirEventoCerrarPopUpJuntas() {
    $("#CerrarDetalleJunta").click(function (e) {
        e.preventDefault();

        $("#windowGrid").data("kendoWindow").close();
    });
}

function SuscribirEventoCargarCSV() {
    $('#btnCargaCsv, btnCargaCsv1').click(function (e) {
        //var proyectoID = $("#inputProyecto").data("kendoComboBox").value();
        //if (proyectoID != 0 && proyectoID != undefined && proyectoID != "") {
            $("#files").val("");
            $("#files").click();
        //}
        //else {
        //    displayNotify("SPAProyectoCargaMasiva", "", '1');
        //}
    })
}

function suscribirEventoDescarGaCSV() {
    $("#btnDescargaCsv, #btnDescargaCsv1").click(function (e) {
        window.location.href = "/PlantillaOkPintura.csv";
    });
}