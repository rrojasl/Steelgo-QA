function suscribirEventos() {

};


function eliminarCaptura(e) {
    e.preventDefault();
    if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {

        var filterValue = $(e.currentTarget).val();
        var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        var dataSource = $("#grid").data("kendoGrid").dataSource;

        if (dataItem.Accion == 0 || dataItem.Accion == undefined)
            dataSource.remove(dataItem);
        else
            dataItem.Accion = 3;
        dataSource.sync();
    }
};

function limpiarCaptura(e) {
    e.preventDefault();

    if ($('#botonGuardar').text() == _dictionary.DetalleAvisoLlegada0017[$("#language").data("kendoDropDownList").value()]) {
        var itemToClean = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        itemToClean.Componente = "";
        itemToClean.Lote = "";
        itemToClean.Cantidad = 0;
        itemToClean.Unidad = 0;
        if (itemToClean.Accion == 2)
            itemToClean.Accion = 4;

        var dataSource = $("#grid").data("kendoGrid").dataSource;
        dataSource.sync();
    }
};