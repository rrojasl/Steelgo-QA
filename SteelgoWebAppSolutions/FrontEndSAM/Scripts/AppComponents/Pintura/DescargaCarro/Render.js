function RenderComboBoxCuadrante(container, options) {
    var dataItem;
    debugger;
    $('<input required data-text-field="Nombre" data-value-field="CuadranteID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaCuandrantes,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Cuadrante = dataItem.Nombre;
                options.model.CuadranteID = dataItem.CuadranteID;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.Cuadrante = dataItem.Nombre;
                options.model.CuadranteID = dataItem.CuadranteID;
                options.model.Accion = 2;
            }
        }
        );
}