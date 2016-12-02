function RenderValorUnidadMedida(container, options) {
    //$('<input required id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
    //    .kendoNumericTextBox({
    //        change: function (e) {
    //            dataItem = this.dataItem(e.sender.selectedIndex);
    //            if (dataItem != undefined) {
    //                options.model.SistemaPinturaID = dataItem.SistemaPinturaID;
    //                options.model.NoPintable = dataItem.NoPintable;
    //                options.model.SistemaPintura = dataItem.Nombre;
    //                options.model.EstatusCaptura = 1;

    //                options.model.ListaColorPintura = [];
    //                options.model.ColorPinturaID = 0;
    //                options.model.SistemaPinturaColorID = 0;
    //                options.model.Color = "";

    //                if (dataItem.SistemaPinturaID != 0 && !dataItem.NoPintable) {
    //                    AjaxCargarColorPinturaRender(dataItem.SistemaPinturaID, options);
    //                }

    //            } else {
    //                options.model.SistemaPintura = ObtenerSistemaPinturaCorrecto(options.model.ListaSistemPintura, options.model.SistemaPinturaID);
    //            }
    //            $("#grid").data("kendoGrid").dataSource.sync();
    //        }
    //    });
}

function RenderAprobado(container, options) {
    var dataItem;
    $('<input   id=' + options.model.uid + '  data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
            format: "0",
            change: function () {
                var value = this.value();
                options.model.Aprobado = value >= 1 && value <= 5 ? "Aprobado" : "Rechazado";
                $("#grid").data("kendoGrid").dataSource.sync();
            }
            //step: 0.01
        });
}