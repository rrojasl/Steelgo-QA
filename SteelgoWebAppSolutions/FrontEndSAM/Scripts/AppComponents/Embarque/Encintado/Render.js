function RenderComboBoxCuadrante(container, options) {
    var dataItem;
    var valores;
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
                    options.model.ModificadoPorUsuario = true;

                    $("#grid").data("kendoGrid").dataSource.sync();
                }
            },
            change: function (e) {
                e.preventDefault();
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.Cuadrante = dataItem.Nombre;
                    options.model.CuadranteID = dataItem.CuadranteID;
                    options.model.ModificadoPorUsuario = true;

                    $("#grid").data("kendoGrid").dataSource.sync();
                }
            }
        });
}

function RenderComboBoxColorCinta(container, options) {
    var dataItem;
    var valores;
    $('<input  data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaColoresCinta,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            select: function (e) {
                e.preventDefault();
                var dataItem = this.dataItem(e.item.index());
                if (dataItem != undefined) {
                    if(options.model.Encintado){                        
                        options.model.ColorCinta = dataItem.Nombre;
                        options.model.ColorCintaID = dataItem.ColorCintaID;
                        options.model.ModificadoPorUsuario = true;
                    } else {
                        options.model.ColorCinta = "";
                        options.model.ColorCintaID = 0;
                    }

                    $("#grid").data("kendoGrid").dataSource.sync();
                }
            },
            change: function (e) {
                e.preventDefault();
                var dataItem = this.dataItem(e.item.index());
                if (dataItem != undefined) {
                    if (options.model.Encintado) {
                        options.model.ColorCinta = dataItem.Nombre;
                        options.model.ColorCintaID = dataItem.ColorCintaID;
                        options.model.ModificadoPorUsuario = true;
                    } else {
                        options.model.ColorCinta = "";
                        options.model.ColorCintaID = 0;
                    }

                    $("#grid").data("kendoGrid").dataSource.sync();
                }
            }
        });
}