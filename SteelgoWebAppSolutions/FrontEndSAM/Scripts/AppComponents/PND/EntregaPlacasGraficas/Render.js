function RenderComboBoxDocumentoRecibido(container, options) {
    var dataItem;
    var textAnterior;
    $('<input  data-text-field="Clave" data-value-field="NumeroUnicoID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaNumerosUnicos1,
            template: "<i class=\"fa fa-#=data.Clave#\"></i> #=data.Clave#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                //options.model.NumeroUnico1 = String(dataItem.Clave);
                //options.model.NumeroUnico1ID = dataItem.NumeroUnicoID;
                textAnterior = e.sender._prev;
            }
            ,
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined && dataItem.Etiqueta != "") {
                    //options.model.NumeroUnico1 = String(dataItem.Clave);
                    //options.model.NumeroUnico1ID = dataItem.NumeroUnicoID;
                    AplicarAsignacionAutomaticaNumeroUnico(options.model, textAnterior, dataItem, 0);
                    $("#grid").data("kendoGrid").dataSource.sync();
                }
                else {
                    options.model.NumeroUnico1 = "";
                    options.model.NumeroUnico1ID = null;
                    $("#grid").data("kendoGrid").dataSource.sync();
                }
            }
        });
    $(".k-combobox").parent().on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = $(this).find(".k-combobox")[0];
        if (item != undefined) {
            if (!tieneClase(item)) {
                $(container).trigger(e);
            }
        }
    });

}

function RenderComboBoxDocumentoEstatus(container, options) {

}

function RenderComboBoxDefectoDocumento(container, options) {

}