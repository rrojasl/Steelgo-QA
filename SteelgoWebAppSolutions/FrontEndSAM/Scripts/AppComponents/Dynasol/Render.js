function RenderComboBoxInspeccion(container, options) {
    var dataItem;
    var valores;

    $('<input  data-text-field="Inspeccion" id=' + options.model.uid + ' data-value-field="Inspeccion" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: [{ InspeccionID: 0, Inspeccion: "" }, { InspeccionID: 1, Inspeccion: "Ok" }, { InspeccionID: 2, Inspeccion: "No ok " }],
            template: "<i class=\"fa fa-#=data.Inspeccion.toLowerCase()#\"></i> #=data.Inspeccion#",
            change: function (e) {
                e.preventDefault();
                var dataItem = this.dataItem(e.sender.selectedIndex);

                if (dataItem != undefined) {
                    options.model.InspeccionID = dataItem.InspeccionID;
                    options.model.Inspeccion = dataItem.Inspeccion;
                    


                    $("#grid").data("kendoGrid").refresh();
                } else {
                    options.model.InspeccionID = 0;
                    options.model.Inspeccion = "";

                }
            }
        });

}