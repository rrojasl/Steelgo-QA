function RenderComboBoxInspeccion(container, options) {
    var dataItem;
    var valores;

    $('<input  data-text-field="Inspeccion" id=' + options.model.uid + ' data-value-field="Inspeccion" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: [{ InspeccionID: 0, Inspeccion: "" }, { InspeccionID: 1, Inspeccion: "RELEASED" }, { InspeccionID: 2, Inspeccion: "PARTIAL RELEASED " }, { InspeccionID: 3, Inspeccion: "REJECTED" }],
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


function RenderComboBoxColada(container, options) {
    var dataItem;
    var valores;

    $('<input  data-text-field="Colada" id=' + options.model.uid + ' data-value-field="Colada" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: [{ ColadaID: 0, Colada: "" }, { ColadaID: 1, Colada: "50015" }, { ColadaID: 2, Colada: "37LLLL" }, { ColadaID: 3, Colada: "41DDDDS2X" }],
            template: "<i class=\"fa fa-#=data.Colada.toLowerCase()#\"></i> #=data.Colada#",
            change: function (e) {
                e.preventDefault();
                var dataItem = this.dataItem(e.sender.selectedIndex);

                if (dataItem != undefined) {
                    options.model.ColadaID = dataItem.ColadaID;
                    options.model.Colada = dataItem.Colada;



                    $("#grid").data("kendoGrid").refresh();
                } else {
                    options.model.ColadaID = 0;
                    options.model.Colada = "";

                }
            }
        });

}