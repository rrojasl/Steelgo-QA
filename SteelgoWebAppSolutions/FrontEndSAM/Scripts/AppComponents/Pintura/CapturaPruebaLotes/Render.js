function RenderDatePicker(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input   data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoDatePicker({
            max: new Date(),
            change: function () {
                var value = this.value();
                //options.model.FechaArmado = value;
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
                options.model.Aprobado = value >= 1 && value <= 5 ? "Aprobado" : "Rechazado";
                $("#gridPopUp").data("kendoGrid").dataSource.sync();
            }
            //step: 0.01
        });
}