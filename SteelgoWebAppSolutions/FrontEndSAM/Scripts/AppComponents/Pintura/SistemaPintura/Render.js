function RenderMultiselectColor(container, options) {
    var dataItem;
    var valores;
    $('<input  data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="ColorID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoMultiSelect({
            autoBind: false,
            dataSource: options.model.ListaColor,
            template: "<i class=\"fa fa-#=data.Nombre#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = e.item;
                this
            },
            change: function (e) {
                dataItem = e.sender;
                var textoPlantilla = "";
                for (var i = 0; i < dataItem._dataItems.length; i++) {
                    textoPlantilla += dataItem._dataItems[i].Nombre 
                    if(i != dataItem._dataItems.length-1){
                        textoPlantilla += ", ";
                    }
                }
                options.model.plantillaColor = textoPlantilla;

            }
        }
        );
}


function comboBoxPruebas(container, options) {
    var dataItem;

    $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaPruebas,
            dataTextField: "Resultado",
            dataValueField: "ResultadosID",
            template: "<i class=\"fa fa-#=data.Nombre#\"></i> #=data.Nombre#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined && dataItem.ResultadosID != undefined) {
                    options.model.PruebaID = dataItem.PruebaID;
                    options.model.Prueba = dataItem.Nombre;
                }
                //$("#gridPopUp").data("kendoGrid").dataSource.sync();
            }
        }
    );
}
