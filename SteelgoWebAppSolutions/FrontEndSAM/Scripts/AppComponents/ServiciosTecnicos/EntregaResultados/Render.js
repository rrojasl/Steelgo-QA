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
                if (options.model.CONDICIONESFISICASID == 1) {
                    options.model.DEFECTOSID = 0;
                    options.model.DEFECTOS = "";
                    $("#grid").data("kendoGrid").dataSource.sync();
                }
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.CONDICIONESFISICASID = dataItem.CondicionesFisicasID;
                    options.model.CONDICIONESFISICAS = dataItem.CondicionFisica;
                    if (options.model.CONDICIONESFISICASID == 1) {
                        options.model.DEFECTOSID = 0;
                        options.model.DEFECTOS = "";
                        $("#grid").data("kendoGrid").dataSource.sync();
                    }
                }
                else {
                    options.model.CONDICIONESFISICAS = ObtenerDescCondicionesFisicas(options.model.ListCondicionesFisicas, options.model.CONDICIONESFISICASID)
                }

            }
        }
      );
    $(".k-combobox").on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = this;
        if (!tieneClase(item)) {
            $(container).trigger(e);
        }
    });

    
};


function ObtenerDescCondicionesFisicas(lista, CONDICIONESFISICASID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].CondicionesFisicasID == CONDICIONESFISICASID)
            return lista[i].Nombre;
    }
    return "";
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
                if (dataItem != undefined) {
                    options.model.DEFECTOSID = dataItem.DefectoID;
                    options.model.DEFECTOS = dataItem.Nombre;
                }
                else {
                    options.model.DEFECTOS =  ObtenerDescCorrectaDefecto(options.model.ListDefectos, options.model.DEFECTOSID);
                }
            }
        }
      );
    $(".k-combobox").on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = this;
        if (!tieneClase(item)) {
            $(container).trigger(e);
        }
    });


    

};


function ObtenerDescCorrectaDefecto(lista, DEFECTOSID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].DefectoID == DEFECTOSID)
            return lista[i].Nombre;
    }
    return "";
}

function tieneClase(item) {
    for (var i = 0; i < item.classList.length; i++) {
        if (item.classList[i] == "k-state-border-up" || item.classList[i] == "k-state-border-down") {
            return true;
        }
    }
    return false
}