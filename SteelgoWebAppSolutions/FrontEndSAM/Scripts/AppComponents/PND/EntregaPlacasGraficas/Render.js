function RenderComboBoxDocumentoRecibido(container, options) {
    var dataItem;
    var textAnterior;
    $('<input  data-text-field="DocumentoRecibidoNombre" data-value-field="DocumentoRecibidoID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaRecibido,
            template: "<i class=\"fa fa-#=data.DocumentoRecibidoNombre#\"></i> #=data.DocumentoRecibidoNombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                textAnterior = e.sender._prev;
            }
            ,
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.DocumentoRecibido = dataItem.DocumentoRecibidoNombre;
                    options.model.DocumentoRecibidoID = dataItem.DocumentoRecibidoID;
                }
                else {
                    options.model.DocumentoRecibido = ObtenerDocumentoRecibidoCorrecto(options.model.ListaRecibido, options.model.DocumentoRecibidoID);                    
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
    var dataItem;
    var textAnterior;
    $('<input  data-text-field="DocumentoEstatusNombre" data-value-field="DocumentoEstatusID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaEstatusDocumento,
            template: "<i class=\"fa fa-#=data.DocumentoEstatusNombre#\"></i> #=data.DocumentoEstatusNombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                textAnterior = e.sender._prev;
            }
            ,
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.DocumentoEstatus = dataItem.DocumentoEstatusNombre;
                    options.model.DocumentoEstatusID = dataItem.DocumentoEstatusID;
                }
                else {
                    options.model.DocumentoEstatus = ObtenerDocumentoEstatusCorrecto(options.model.ListaEstatusDocumento, options.model.DocumentoEstatusID);
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

function RenderComboBoxDefectoDocumento(container, options) {

    var dataItem;
    var textAnterior;
    $('<input  data-text-field="DefectoDocumentoNombre" data-value-field="DefectoDocumentoID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaDefectoDocumento,
            template: "<i class=\"fa fa-#=data.DefectoDocumentoNombre#\"></i> #=data.DefectoDocumentoNombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                textAnterior = e.sender._prev;
            }
            ,
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    if(options.model.DocumentoEstatusID==2){                        
                        options.model.DefectoDocumento = dataItem.DefectoDocumentoNombre;
                        options.model.DefectoDocumentoID = dataItem.DefectoDocumentoID;
                    } else {
                        options.model.DefectoDocumento = "";
                        options.model.DefectoDocumentoID = 0;
                    }
                }
                else {
                    options.model.DefectoDocumento = ObtenerDocumentoDefectoCorrecto(options.model.ListaDefectoDocumento, options.model.DefectoDocumentoID);
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

function ObtenerDocumentoRecibidoCorrecto(lista, DocumentoRecibidoID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].DocumentoRecibidoID == DocumentoRecibidoID)
            return lista[i].DocumentoRecibidoNombre;
    }
    return "";
}

function ObtenerDocumentoEstatusCorrecto(lista, DocumentoEstatusID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].DocumentoEstatusID == DocumentoEstatusID)
            return lista[i].DocumentoEstatusNombre;
    }
    return "";
}

function ObtenerDocumentoDefectoCorrecto(lista, DefectoDocumentoID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].DefectoDocumentoID == DefectoDocumentoID)
            return lista[i].DefectoDocumentoNombre;
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