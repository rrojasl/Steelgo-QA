
function RenderComboBoxClasificacion(container, options) {
    loadingStart();
    var dataItem;
    $('<input required data-text-field="Clave" id=' + options.model.uid + ' data-value-field="PruebasClasificacionID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: ItemSeleccionado.listaClasificaciones,
            template: "<i class=\"fa fa-#=data.Clave.toLowerCase()#\"></i> #=data.Clave#",
            select: function (e) {

                dataItem = this.dataItem(e.item.index());
                options.model.Clave = dataItem.Clave;
                options.model.PruebasClasificacionID = dataItem.PruebasClasificacionID;
                options.model.TipoClave = dataItem.TipoClave;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.Clave = dataItem.Clave;
                options.model.PruebasClasificacionID = dataItem.PruebasClasificacionID;
                options.model.TipoClave = dataItem.TipoClave;
            }
        }
        );
    loadingStop();
}