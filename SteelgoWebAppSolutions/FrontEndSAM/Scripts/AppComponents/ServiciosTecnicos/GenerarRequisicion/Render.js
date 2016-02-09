
function RenderComboBoxClasificacion(container, options) {
    
    var dataItem;
    $('<input required data-text-field="Clave" id=' + options.model.uid + ' data-value-field="Clave" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.listaClasificaciones,
            template: "<i class=\"fa fa-#=data.Clave.toLowerCase()#\"></i> #=data.Clave#",
           
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.Clasificacion = dataItem.Clave;
                    options.model.PruebasClasificacionID = dataItem.PruebasClasificacionID;
                    
                }
                else
                    options.model.Clasificacion = ObtenerDescCorrectaClasificacion(options.model.listaClasificaciones, options.model.PruebasClasificacionID);

               
            }
        }
        );
    
}


function ObtenerDescCorrectaClasificacion(lista, PruebasClasificacionID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].PruebasClasificacionID == PruebasClasificacionID)
            return lista[i].Clave;
    }
    return "";
}