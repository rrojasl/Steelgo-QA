var modificadoPorUsuario = false;
function RenderComboBoxCuadrante(container, options) {
    var dataItem;
    var valores;
    if ($('#botonGuardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
        $('<input  data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                dataSource: options.model.ListaCuadrantes,
                template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
                select: function (e) {
                    e.preventDefault();
                    dataItem = this.dataItem(e.item.index());
                    if (dataItem != undefined) {
                        options.model.Cuadrante = dataItem.Nombre;
                        options.model.CuadranteID = dataItem.CuadranteID;
                        modificadoPorUsuario = true;
                        $("#grid").data("kendoGrid").dataSource.sync();
                    }
                },
                change: function (e) {
                    e.preventDefault();
                    dataItem = this.dataItem(e.sender.selectedIndex);
                    if (dataItem != undefined) {
                        options.model.Cuadrante = dataItem.Nombre;
                        options.model.CuadranteID = dataItem.CuadranteID;
                        modificadoPorUsuario = true;
                        $("#grid").data("kendoGrid").dataSource.sync();
                    }
                }
            });
    };
    //$(".k-combobox").parent().on('mouseleave', function (send) {
    //    var e = $.Event("keydown", { keyCode: 27 });
    //    var item = $(this).find(".k-combobox")[0];
    //    if (item != undefined) {
    //        if (!tieneClase(item)) {
    //            $(container).trigger(e);
    //        }
    //    }
    //});
}