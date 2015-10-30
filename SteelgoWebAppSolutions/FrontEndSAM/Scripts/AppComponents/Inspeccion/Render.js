function RenderComboBoxTaller(container, options) {

    loadingStart();
    var dataItem;
    $('<input required data-text-field="Nombre" data-value-field="TallerID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaTaller,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Taller = dataItem.Nombre
            },
            change: function (e) {
                options.model.Taller = dataItem.Nombre
                options.model.TallerID = dataItem.TallerID
            }
        }
        );
    loadingStop();

}

function RenderComboBoxInspector(container, options) {
    loadingStart();
    var dataItem;

    $('<input required data-text-field="Codigo" data-value-field="ObreroID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaInspector,
            template: "<i class=\"fa fa-#=data.Codigo.toLowerCase()#\"></i> #=data.Codigo#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Inspector = dataItem.Codigo;
            },
            change: function (e) {
                options.model.Inspector = dataItem.Codigo;
                options.model.InspectorID = dataItem.Codigo;
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

function RenderComboBoxNumeroUnico1(container, options) {
    var dataItem;
    var textAnterior;
    $('<input required data-text-field="Clave" data-value-field="NumeroUnicoID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaNumerosUnicos1,
            template: "<i class=\"fa fa-#=data.Clave#\"></i> #=data.Clave#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.NumeroUnico1 = String(dataItem.Clave);
                options.model.NumeroUnico1ID = dataItem.NumeroUnicoID;
                textAnterior = e.sender._prev;
            }
            ,
            change: function (e) {
                options.model.NumeroUnico1 = String(dataItem.Clave)

                AplicarAsignacionAutomaticaNumeroUnico(options.model, textAnterior, dataItem, 0);
                $("#grid").data("kendoGrid").dataSource.sync();
            }
        });
};

function RenderComboBoxNumeroUnico2(container, options) {
    var dataItem;
    var textAnterior;
    $('<input required data-text-field="Clave" data-value-field="NumeroUnicoID" data-bind="value:' + options.field + '"/>')
         .appendTo(container)
         .kendoComboBox({
             autoBind: false,
             dataSource: options.model.ListaNumerosUnicos2,
             template: "<i class=\"fa fa-#=data.Clave#\"></i> #=data.Clave#",
             select: function (e) {
                 dataItem = this.dataItem(e.item.index());
                 options.model.NumeroUnico2 = String(dataItem.Clave);
                 options.model.NumeroUnico2ID = dataItem.NumeroUnicoID;
                 textAnterior = e.sender._prev;
             },
             change: function (e) {

                 options.model.NumeroUnico2 = String(dataItem.Clave)

                 AplicarAsignacionAutomaticaNumeroUnico(options.model, textAnterior, dataItem, 0);
                 $("#grid").data("kendoGrid").dataSource.sync();
             }
         });
};

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