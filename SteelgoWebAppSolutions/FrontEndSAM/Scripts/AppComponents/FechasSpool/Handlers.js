function SuscribirEventos() {
    suscribirEventoJuntas();
    SuscribirEventoCerrarPopUp();
}
SuscribirEventos();

function suscribirEventoJuntas() {

    $(document).on('click', '.mostrar', function (e) {
        e.preventDefault();

        if ($('#botonGuardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {
            var grid = $("#grid").data("kendoGrid").dataSource._data;
            var data = new Array();
            var cont = 0;
            for (var i = 0; i < grid.length; i++) {
                if (grid[i].Modificado) {
                    data[cont] = grid[i];
                    cont++;
                }
            }

            LlenarGridPopUp(data);
        }
    });
}


function SuscribirEventoCerrarPopUp() {
    $("#CerrarDetalleJunta").click(function (e) {
        e.preventDefault();

        $("#windowGrid").data("kendoWindow").close();
    });
}