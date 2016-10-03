function SuscribirEventos() {
    SuscribirEventoSistemaPintura();
    SuscribirEventoMostrarDetalle();
}

function SuscribirEventoSistemaPintura() {
    $("#inputSistemaPintura").kendoComboBox({
        dataTextField: "Nombre",
        dataValueField: "SistemaPinturaID",
        suggest: true,
        delay: 10,
        filter: "contains",
        index: 3,
        change: function (e) {
            var dataItem = this.dataItem(e.sender.selectedIndex);

            if (dataItem != undefined) {

            } else {
                $("#inputSistemaPintura").data("kendoComboBox").value("");
            }
        }
    });
}

function SuscribirEventoMostrarDetalle() {

    $(document).on('click', '.EnlacePorPlaca', function (e) {
        e.preventDefault();
        var grid = $("#grid").data("kendoGrid");
        dataItem = grid.dataItem($(e.target).closest("tr"));
        showModalDetail(dataItem);

    });

    $("#btnCerrarPopup").click(function (e) {
        windowDetailTest.close();
    });
}