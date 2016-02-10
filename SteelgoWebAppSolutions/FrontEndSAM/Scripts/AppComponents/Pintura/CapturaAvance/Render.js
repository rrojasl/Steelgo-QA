
function RendercomboBoxPintor(container, options) {
    var dataItem;
    var valores;
    $('<input  data-text-field="Codigo" id=' + options.model.uid + ' data-value-field="Codigo" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoMultiSelect({
            autoBind: false,
            dataSource: options.model.ListaPintores,
            template: "<i class=\"fa fa-#=data.Codigo.toLowerCase()#\"></i> #=data.Codigo#",
            select: function (e) {
                dataItem = e.item;
                this
            },
            change: function (e) {
                
                options.model.plantillaPintor = _dictionary.CapturaAvancePintoresPrimariosExistentes[$("#language").data("kendoDropDownList").value()] + options.model.ListaPintorGuargado.length;
                
            }
        }
        );
}
 
function RendercomboBoxShotBlastero(container, options) {
    var dataItem;
    $('<input  data-text-field="Codigo" id=' + options.model.uid + ' data-value-field="Codigo" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoMultiSelect({
            autoBind: false,
            dataTextField: "Codigo",
            dataValueField: "ObreroID",
            dataSource: options.model.ListaShotblasteros,
            template: "<i class=\"fa fa-#=data.Codigo.toLowerCase()#\"></i> #=data.Codigo#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());

            },
            change: function (e) { 
                options.model.plantillaShotblastero = _dictionary.CapturaAvancePintoresShotblastExistentes[$("#language").data("kendoDropDownList").value()] + options.model.ListaShotblasteroGuargado.length;
            }
        });
}
