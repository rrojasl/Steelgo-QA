function comboBoxSistemaPintura(container, options) {
    var dataItem;

    $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaSistema,
            dataTextField: "SistemaPintura",
            dataValueField: "SistemaPinturaID",
            template: "<i class=\"fa fa-#=data.SistemaPintura#\"></i> #=data.SistemaPintura#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined && dataItem.SistemaPinturaID != undefined) {
                    options.model.SistemaPinturaID = dataItem.SistemaPinturaID;
                    options.model.SistemaPintura = dataItem.SistemaPintura;
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

function comboBoxColor(container, options) {
    var dataItem;

    $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaColor,
            dataTextField: "Color",
            dataValueField: "ColorID",
            template: "<i class=\"fa fa-#=data.Color#\"></i> #=data.Color#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined && dataItem.ColorID != undefined) {
                    options.model.ColorID = dataItem.ColorID;
                    options.model.Color = dataItem.Color;
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

function tieneClase(item) {
    for (var i = 0; i < item.classList.length; i++) {
        if (item.classList[i] == "k-state-border-up" || item.classList[i] == "k-state-border-down") {
            return true;
        }
    }
    return false
}