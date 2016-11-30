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
               // e.preventDefault();
                var dataItem = this.dataItem(e.item.index());
            },
            change: function (e) {
                //e.preventDefault();
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined && dataItem.ColorID != 0) {

                    options.model.NombreColor = dataItem.Nombre;
                    options.model.ColorID = dataItem.ColorID;
                    options.model.Encintado = true;
                    //options.model.ModificadoPorUsuario = true;
                    $("#grid").data("kendoGrid").dataSource.sync();
                }
                else {
                    options.model.Encintado = false;
                    $("#grid").data("kendoGrid").dataSource.sync();
                }
            }
        });
}