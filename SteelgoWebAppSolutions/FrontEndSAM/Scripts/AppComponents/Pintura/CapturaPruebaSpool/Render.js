
function RenderMedida(container, options) {

    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

        var dataItem;
        var numeroComponentesNumeric = $('<input data-text-field="UnidadMedida" id=' + options.model.uid + ' data-value-field="UnidadMedida" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
            format: "#",
            min: 0,
            change: function (e) {
                var value = this.value();
                options.model.ResultadoEvaluacion = value >= options.model.UnidadMinima && value <= options.model.UnidadMaxima ? "Si" : "No";
                $("#grid").data("kendoGrid").dataSource.sync();
            }
        });

        numeroComponentesNumeric.focus(function () {
            this.select();
        });
    };
}

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

