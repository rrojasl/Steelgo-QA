
function RendercomboBoxPintor(container, options) {
    var dataItem;
    $('<input required data-text-field="Codigo" id=' + options.model.uid + ' data-value-field="Codigo" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaPintores,
            template: "<i class=\"fa fa-#=data.Codigo.toLowerCase()#\"></i> #=data.Codigo#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.pintorID = dataItem.ObreroID;
                options.model.pintor = dataItem.Codigo;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.pintorID = dataItem.ObreroID;
                options.model.pintor = dataItem.Codigo;
            }
        }
        );
}



function RendercomboBoxShotBlastero(container, options) {
    var dataItem;
    $('<input required data-text-field="Codigo" id=' + options.model.uid + ' data-value-field="Codigo" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaShotblasteros,
            template: "<i class=\"fa fa-#=data.Codigo.toLowerCase()#\"></i> #=data.Codigo#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.ShotblasteroID = dataItem.ObreroID;
                options.model.Shotblastero = dataItem.Codigo;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.ShotblasteroID = dataItem.ObreroID;
                options.model.Shotblastero = dataItem.Codigo;
            }
        }
        );
}
