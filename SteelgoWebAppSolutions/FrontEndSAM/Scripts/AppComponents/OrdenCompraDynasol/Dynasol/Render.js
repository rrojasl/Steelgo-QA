function RenderComboBoxInspeccion(container, options) {
    var dataItem;
    var valores;

    $('<input  data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: modeloRenglon.ListaInspeccion,// [{ InspeccionID: 0, Inspeccion: "" }, { InspeccionID: 1, Inspeccion: "Ok" }, { InspeccionID: 2, Inspeccion: "No ok " }],
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            change: function (e) {
                e.preventDefault();
                var dataItem = this.dataItem(e.sender.selectedIndex);

                if (dataItem != undefined) {
                    options.model.InspeccionID = dataItem.InspeccionID;
                    options.model.Inspeccion = dataItem.Nombre;


                    $("#grid").data("kendoGrid").refresh();
                } else {
                    options.model.InspeccionID = 0;
                    options.model.Inspeccion = "";

                }
            }
        });

}


function RenderCant(container, options) {
    var dataItem;
    $('<input data-text-field="Cant" id=' + options.model.uid + ' data-value-field="Cant" data-bind="value:' + options.field + '"/>')
    .appendTo(container)
    .kendoNumericTextBox({
        format: "#",
        decimals: 0,
        min: 0
    });
}

function RenderCantG(container, options) {
    var dataItem;
    $('<input data-text-field="CantS" id=' + options.model.uid + ' data-value-field="CantS" data-bind="value:' + options.field + '"/>')
    .appendTo(container)
    .kendoNumericTextBox({
        format: "#",
        decimals: 0,
        min: 0
    });
}

function RenderCantS(container, options) {
    var dataItem;
    $('<input data-text-field="CantS" id=' + options.model.uid + ' data-value-field="CantS" data-bind="value:' + options.field + '"/>')
    .appendTo(container)
    .kendoNumericTextBox({
        format: "#",
        decimals: 0,
        min: 0
    });
}
