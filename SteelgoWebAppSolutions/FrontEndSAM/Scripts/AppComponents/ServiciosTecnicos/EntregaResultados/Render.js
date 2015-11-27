function RenderComboBoxCondicionFisica(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input required data-text-field="CondicionFisica" data-value-field="CondicionesFisicasID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListCondicionesFisicas,
            template: "<i class=\"fa fa-#=data.CondicionFisica.toLowerCase()#\"></i> #=data.CondicionFisica#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.CONDICIONESFISICASID = dataItem.CondicionesFisicasID;
                options.model.CONDICIONESFISICAS = dataItem.CondicionFisica;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.CONDICIONESFISICASID = dataItem.CondicionesFisicasID;
                options.model.CONDICIONESFISICAS = dataItem.CondicionFisica;
                if (options.model.CONDICIONESFISICASID == 1) {
                    options.model.ListDefectos = null;
                    options.model.DEFECTOSID = 0;
                    options.model.DEFECTOS = null;
                }
                else
                    options.model.ListDefectos = options.model.ListDefectosGeneral;
                $("#grid").data("kendoGrid").dataSource.sync();
            }
        }
      );

    
};

function RenderComboBoxDefectos(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input required data-text-field="Nombre" data-value-field="DefectoID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListDefectos,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.DEFECTOSID = dataItem.DefectoID;
                options.model.DEFECTOS = dataItem.Nombre;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.DEFECTOSID = dataItem.DefectoID;
                options.model.DEFECTOS = dataItem.Nombre;
            }
        }
      );
};