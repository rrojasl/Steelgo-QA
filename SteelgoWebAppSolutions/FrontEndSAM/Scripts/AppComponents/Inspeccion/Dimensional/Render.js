function RenderOptionResultado(container, options) {
    loadingStart();
    var dataItem;
    console.log(options);
    $('<input required data-text-field="_Resultado" data-value-field="DefectoID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            autoBind: false,
            dataSource: options.model.ListaResultados,
            template: "<i class=\"fa fa-#=data._Resultado.toLowerCase()#\"></i> #=data._Resultado#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Resultado = dataItem._Resultado;
                options.model.ResultadoID = dataItem._ResultadoID;
                if (options.model.Resultado == "Aprobado") {
                    options.model.DefectosID = 0;
                    options.model.Defectos = "";
                }
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.Resultado = dataItem._Resultado;
                options.model.ResultadoID = dataItem._ResultadoID;
                if (options.model.Resultado == "Aprobado") {
                    options.model.DefectosID = 0;
                    options.model.Defectos = "";
                    $("#grid").data("kendoGrid").dataSource.sync();
                }


            }
        }
        );
    loadingStop();
    $(".k-dropdown").on('mouseleave', function (send) {
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
        .kendoDropDownList({
            autoBind: false,
            dataSource: options.model.ListaDefectos,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
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
    $(".k-dropdown").on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = this;
        if (!tieneClase(item)) {
            $(container).trigger(e);
        }
    });
};

function RenderComboBoxInspector(container, options) {
    loadingStart();
    var dataItem;

    $('<input required data-text-field="Codigo" data-value-field="ObreroID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoDropDownList({
            autoBind: false,
            dataSource: options.model.ListaInspector,
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
    $(".k-dropdown").on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = this;
        if (!tieneClase(item)) {
            $(container).trigger(e);
        }
    });
};




function tieneClase(item) {
    for (var i = 0; i < item.classList.length; i++) {
        if (item.classList[i] == "k-state-border-up" || item.classList[i] == "k-state-border-down") {
            return true;
        }
    }
    return false
}