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
                if (dataItem != undefined) {
                    options.model.Taller = dataItem.Nombre
                    options.model.TallerID = dataItem.TallerID
                }
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.Taller = dataItem.Nombre
                    options.model.TallerID = dataItem.TallerID
                }
                else {
                    options.model.Taller = ObtenerDescCorrectaTaller(options.model.ListaTaller, options.model.TallerID);
                }
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
                if (dataItem != undefined) {
                    options.model.Inspector = dataItem.Codigo;
                    options.model.InspectorID = dataItem.ObreroID;
                }
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.Inspector = dataItem.Codigo;
                    options.model.InspectorID = dataItem.ObreroID;
                }
                else {
                    options.model.Inspector = ObtenerDescCorrectaInspector(options.model.ListaInspector, options.model.InspectorID);
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
                if (dataItem != undefined) {
                    options.model.Defectos = dataItem.Nombre;
                    options.model.DefectosID = dataItem.DefectoID;
                }
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.Defectos = dataItem.Nombre;
                    options.model.DefectosID = dataItem.DefectoID;
                }
                else {
                    options.model.Defectos = ObtenerDescCorrectaDefectos(options.model.ListaDefectos, options.model.DefectoID);
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
                if (dataItem != undefined) {
                    options.model.NumeroUnico1 = String(dataItem.Clave);
                    options.model.NumeroUnico1ID = dataItem.NumeroUnicoID;
                    textAnterior = e.sender._prev;
                }
            }
            ,
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.NumeroUnico1 = String(dataItem.Clave)

                    AplicarAsignacionAutomaticaNumeroUnico(options.model, textAnterior, dataItem, 0);
                    $("#grid").data("kendoGrid").dataSource.sync();
                }
                else {
                    options.model.NumeroUnico1 = ObtenerDescCorrectaNumeroUnico(options.model.ListaNumerosUnicos1, options.model.NumeroUnico1ID);
                }
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
                 if (dataItem != undefined) {
                     options.model.NumeroUnico2 = String(dataItem.Clave);
                     options.model.NumeroUnico2ID = dataItem.NumeroUnicoID;
                     textAnterior = e.sender._prev;
                 }
             },
             change: function (e) {
                 dataItem = this.dataItem(e.sender.selectedIndex);
                 if (dataItem != undefined) {
                     options.model.NumeroUnico2 = String(dataItem.Clave)

                     AplicarAsignacionAutomaticaNumeroUnico(options.model, textAnterior, dataItem, 0);
                     $("#grid").data("kendoGrid").dataSource.sync();
                 }
                 else {
                     options.model.NumeroUnico1 = ObtenerDescCorrectaNumeroUnico(options.model.ListaNumerosUnicos2, options.model.NumeroUnico2ID);
                 }
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
                if (dataItem != undefined) {
                    options.model.Resultado = dataItem._Resultado;
                    options.model.ResultadoID = dataItem._ResultadoID;
                    if (options.model.ResultadoID == "1") {
                        options.model.DefectosID = "";
                        options.model.Defectos = "";
                        $("#grid").data("kendoGrid").dataSource.sync();
                    }
                }
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.Resultado = dataItem._Resultado;
                    options.model.ResultadoID = dataItem._ResultadoID;
                    if (options.model.ResultadoID == "1") {
                        options.model.DefectosID = 0;
                        options.model.Defectos = "";
                        $("#grid").data("kendoGrid").dataSource.sync();
                    }
                }
                else {
                    options.model.Resultado = ObtenerDescCorrectaResultado(options.model.ListaResultados, options.model.ResultadoID);
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


function ObtenerDescCorrectaTaller(lista, TallerID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].TallerID == TallerID)
            return lista[i].Taller;
    }
    return "";
}
function ObtenerDescCorrectaResultado(lista, ResultadoID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].ResultadoID == ResultadoID)
            return lista[i].Resultado;
    }
    return "";
}


function ObtenerDescCorrectaDefectos(lista, DefectoID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].DefectoID == DefectoID)
            return lista[i].Nombre;
    }
    return "";
}

function ObtenerDescCorrectaInspector(lista, InspectorID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].ObreroID == InspectorID)
            return lista[i].Codigo;
    }
    return "";
}


function ObtenerDescCorrectaNumeroUnico(lista, NumeroUnicoID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].NumeroUnicoID == NumeroUnicoID)
            return String(lista[i].Clave);
    }
    return "";
}