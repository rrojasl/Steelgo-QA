﻿function SuscribirEventos() {
    SuscribirEventoSistemaPintura();
    SuscribirEventoMostrarDetalle();
    SuscribirEventoEdicion();
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

    $(document).on('click', '.DetalleShotblast', function (e) {
        e.preventDefault();
        var grid = $("#grid").data("kendoGrid");
        dataItem = grid.dataItem($(e.target).closest("tr"));
        showModalDetail(dataItem.ListaPruebasSB);

    });
    $(document).on('click', '.DetallePrimario', function (e) {
        e.preventDefault();
        var grid = $("#grid").data("kendoGrid");
        dataItem = grid.dataItem($(e.target).closest("tr"));
        showModalDetail(dataItem.ListaPruebasP);

    });
    $(document).on('click', '.DetalleItermedio', function (e) {
        e.preventDefault();
        var grid = $("#grid").data("kendoGrid");
        dataItem = grid.dataItem($(e.target).closest("tr"));
        showModalDetail(dataItem.ListaPruebasI);

    });
    $(document).on('click', '.DetalleAcabado', function (e) {
        e.preventDefault();
        var grid = $("#grid").data("kendoGrid");
        dataItem = grid.dataItem($(e.target).closest("tr"));
        showModalDetail(dataItem.ListaPruebasA);

    });
    $("#btnCerrarPopup").click(function (e) {
        windowDetailTest.close();
    });
}

function SuscribirEventoEdicion() {
    $(document).on('click', '.EditSystemPaint', function (e) {
        e.preventDefault();
        var grid = $("#grid").data("kendoGrid");
        dataItem = grid.dataItem($(e.target).closest("tr"));
        editaSistemaPintura(dataItem);

    });
}