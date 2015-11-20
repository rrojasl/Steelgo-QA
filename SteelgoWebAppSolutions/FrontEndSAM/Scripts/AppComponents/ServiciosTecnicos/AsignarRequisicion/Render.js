function RenderComboBoxProveedor(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input required data-text-field="Nombre" data-value-field="ProveedorID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaProveedor,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.ProveedorID = dataItem.ProveedorID;
                options.model.Proveedor = dataItem.Nombre;

               
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.ProveedorID = dataItem.ProveedorID;
                options.model.Proveedor = dataItem.Nombre;
            }
        }
      );
};