//function renderCantidad(container, options) {
//    $('<input name="' + options.field + '"/>')
//            .appendTo(container)
//            .kendoNumericTextBox({
//                decimals: 0,
//                step: 1,
//                min: 0,
//                format: "#"
//            });
//};


function renderComponente(container, options) {
    var dataItem;
    $('<input  data-text-field="Componente" data-value-field="ComponenteID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: true,
            dataSource: ListaCatalogoComponentes,
            template: "<i class=\"fa fa-#=data.Componente.toLowerCase()#\"></i> #=data.Componente#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined && dataItem.ComponenteID != 0) {
                    options.model.Componente = dataItem.Componente;
                    options.model.ComponenteID = dataItem.ComponenteID;
                    options.model.Unidad = dataItem.Unidad;
                    options.model.Accion = options.model.Accion == 0 ? 1 : options.model.Accion;
                }
                else {
                    options.model.Componente = "";
                    options.model.ComponenteID = 0;
                    options.model.Unidad = "";
                    options.model.Accion = options.model.Accion == 2 ? 2 : options.model.Accion;
                
                }
                $("#grid").data("kendoGrid").dataSource.sync();
            }
        }
        );
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

function Cantidad(container, options) {
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
        var dataItem;
        var Cantidad = $('<input data-text-field="Cantidad" id=' + options.model.uid + ' data-value-field="Cantidad" data-bind="value:' + options.field + '"/>')
         .appendTo(container)
         .kendoNumericTextBox({
             format: "#",
             min: 0
         });

        Cantidad.focus(function () {
            this.select();
        });
    };
}


