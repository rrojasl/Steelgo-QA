function RenderComboBoxTaller(container, options) {

    loadingStart();
    var dataItem;
    $('<input required data-text-field="Nombre" data-value-field="TallerID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaTaller,
            suggest: true,
            filter: "contains",
            template: "<i class=\"fa fa-#=data.Nombre#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Taller = dataItem.Nombre
                options.model.TallerID = dataItem.TallerID
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.Taller = dataItem.Nombre
                options.model.TallerID = dataItem.TallerID
            },
            open: function (e) {
            }
        }
        );
    loadingStop();
    $(".k-combobox").on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = this;
        if (!tieneClase(item)) {
            $(container).trigger(e);
        }     
    });

}

function tieneClase(item) {
    for (var i = 0; i < item.classList.length; i++) {
        if (item.classList[i] == "k-state-border-up" || item.classList[i] == "k-state-border-down") {
            return true;
        }
    }
    return false
}



function RenderComboBoxInspector(container, options) {
    loadingStart();
    var dataItem;

    $('<input required data-text-field="Codigo" data-value-field="ObreroID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaInspector,
            suggest: true,
            filter: "contains",
            template: "<i class=\"fa fa-#=data.Codigo#\"></i> #=data.Codigo#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Inspector = dataItem.Codigo;
                options.model.InspectorID = dataItem.ObreroID;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.Inspector = dataItem.Codigo;
                options.model.InspectorID = dataItem.ObreroID;
            }
        }
        );
    loadingStop();
    $(".k-combobox").on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = this;
        if (!tieneClase(item)) {
            $(container).trigger(e);
        }
    });
};

function RenderComboBoxDefectos(container, options) {
    loadingStart();
    var dataItem;

    $('<input required data-text-field="Nombre" data-value-field="DefectoID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaDefectos,
            suggest: true,
            filter: "contains",
            template: "<i class=\"fa fa-#=data.Nombre#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Defectos = dataItem.Nombre;
                options.model.DefectosID = dataItem.DefectoID;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.Defectos = dataItem.Nombre;
                options.model.DefectosID = dataItem.DefectoID;
            }
        }
        );
    loadingStop();
    $(".k-combobox").on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = this;
        if (!tieneClase(item)) {
            $(container).trigger(e);
        }
    });
};

function RenderComboBoxNumeroUnico1(container, options) {
    var dataItem;
    var textAnterior;
    $('<input required data-text-field="Clave" data-value-field="NumeroUnicoID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaNumerosUnicos1,
            suggest: true,
            filter: "contains",
            template: "<i class=\"fa fa-#=data.Clave#\"></i> #=data.Clave#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.NumeroUnico1 = String(dataItem.Clave);
                options.model.NumeroUnico1ID = dataItem.NumeroUnicoID;
                textAnterior = e.sender._prev;
            }
            ,
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.NumeroUnico1 = String(dataItem.Clave)

                AplicarAsignacionAutomaticaNumeroUnico(options.model, textAnterior, dataItem, 0);
                $("#grid").data("kendoGrid").dataSource.sync();
            }
        });
    $(".k-combobox").on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = this;
        if (!tieneClase(item)) {
            $(container).trigger(e);
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
             suggest: true,
             filter: "contains",
             template: "<i class=\"fa fa-#=data.Clave#\"></i> #=data.Clave#",
             select: function (e) {
                 dataItem = this.dataItem(e.item.index());
                 options.model.NumeroUnico2 = String(dataItem.Clave);
                 options.model.NumeroUnico2ID = dataItem.NumeroUnicoID;
                 textAnterior = e.sender._prev;
             },
             change: function (e) {
                 dataItem = this.dataItem(e.sender.selectedIndex);
                 options.model.NumeroUnico2 = String(dataItem.Clave)

                 AplicarAsignacionAutomaticaNumeroUnico(options.model, textAnterior, dataItem, 0);
                 $("#grid").data("kendoGrid").dataSource.sync();
             }
         });
    $(".k-combobox").on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = this;
        if (!tieneClase(item)) {
            $(container).trigger(e);
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
            suggest: true,
            filter: "contains",
            template: "<i class=\"fa fa-#=data._Resultado#\"></i> #=data._Resultado#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Resultado = dataItem._Resultado;
                options.model.ResultadoID = dataItem._ResultadoID;
                if (options.model.Resultado == "Aprobado") {
                    options.model.DefectosID = "";
                    options.model.Defectos = "";
                    $("#grid").data("kendoGrid").dataSource.sync();
                }
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.Resultado = dataItem._Resultado;
                options.model.ResultadoID = dataItem._ResultadoID;
                if (options.model.Resultado == "Aprobado") {
                    options.model.DefectosID = "";
                    options.model.Defectos = "";
                    $("#grid").data("kendoGrid").dataSource.sync();
                }

             
            }
        }
        );
    loadingStop();
    $(".k-combobox").on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = this;
        if (!tieneClase(item)) {
            $(container).trigger(e);
        }
    });
};