function RenderDatePicker(container, options) {
    var dataItem;

    $('<input   data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoDatePicker({
            max: new Date(),
            change: function () {
                var value = this.value();
                options.model.FechaProceso = value;
            }
        }
        );

}

function RenderAprobado(container, options) {
    var dataItem;
    $('<input   id=' + options.model.uid + '  data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
            format: "0",
            change: function () {
                var value = this.value();
                options.model.Aprobado = value >= options.model.MetrosLoteProcesoPinturaID && value <= options.model.MetrosLoteProcesoPinturaID ? "Aprobado" : "Rechazado";
                $("#gridPopUp").data("kendoGrid").dataSource.sync();
            }
        });
}