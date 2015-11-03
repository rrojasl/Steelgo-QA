function RenderOptionResultado(container, options) {
    loadingStart();
    var dataItem;
    console.log(options);
    $('<input required data-text-field="_Resultado" data-value-field="DefectoID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaResultados,
            template: "<i class=\"fa fa-#=data._Resultado.toLowerCase()#\"></i> #=data._Resultado#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Resultado = dataItem._Resultado;
            },
            change: function (e) {
                options.model.Resultado = dataItem._Resultado;
                options.model.ResultadoID = dataItem._ResultadoID;


            }
        }
        );
    loadingStop();
};

function RenderComboBoxDefectos(container, options) {
    loadingStart();
    var dataItem;

    $('<input required data-text-field="Nombre" data-value-field="DefectoID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaDefectos,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Defectos = dataItem.Nombre;
            },
            change: function (e) {
                options.model.Defectos = dataItem.Nombre;
                options.model.DefectosID = dataItem.DefectoID;
            }
        }
        );


    loadingStop();
};

function RenderComboBoxInspector(container, options) {
    loadingStart();
    var dataItem;

    $('<input required data-text-field="Codigo" data-value-field="ObreroID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaInspector,
            template: "<i class=\"fa fa-#=data.Codigo#\"></i> #=data.Codigo#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Inspector = dataItem.Codigo;
                options.model.InspectorID = dataItem.ObreroID;
            },
            change: function (e) {
                options.model.Inspector = dataItem.Codigo;
                options.model.InspectorID = dataItem.ObreroID;
            }
        }
        );
    loadingStop();
};


