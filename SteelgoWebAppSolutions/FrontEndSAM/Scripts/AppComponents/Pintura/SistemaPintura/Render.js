


function comboBoxPruebas(container, options) {
    var dataItem;

    $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: ListaPruebas,
            dataTextField: "Nombre",
            dataValueField: "PruebaProcesoPinturaID",
            template: "<i class=\"fa fa-#=data.Nombre#\"></i> #=data.Nombre#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined && dataItem.PruebaProcesoPinturaID != undefined) {
                    options.model.PruebaProcesoPinturaID = dataItem.PruebaProcesoPinturaID;
                    options.model.ProyectoProcesoPrueba = dataItem.Nombre;
                }
                $("#gridPopUp").data("kendoGrid").dataSource.sync();
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


function comboBoxUnidadMedida(container, options) {
    var dataItem;

    $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: ListaUnidadMedida,
            dataTextField: "Nombre",
            dataValueField: "UnidadMedidaID",
            template: "<i class=\"fa fa-#=data.Nombre#\"></i> #=data.Nombre#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.UnidadMedidaID = dataItem.UnidadMedidaID;
                    options.model.UnidadMedida = dataItem.Nombre;
                }
                //$("#gridPopUp").data("kendoGrid").dataSource.sync();
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


function RenderUnidadMinima(container, options) {
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

        var dataItem;
        $('<input data-text-field="UnidadMinima" id=' + options.model.uid + ' data-value-field="UnidadMinima" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
            format: "#",
            min: 0,
            change: function (e) {
                //hayDatosCapturados = true;
            }
        });
    };
}

function RenderUnidadMaxima(container, options) {
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

        var dataItem;
        $('<input data-text-field="UnidadMaxima" id=' + options.model.uid + ' data-value-field="UnidadMaxima" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
            format: "#",
            min: 0,
            change: function (e) {
                //hayDatosCapturados = true;
            }
        });
    };
}



function RenderMetrosLote(container, options) {
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

        var dataItem;
        $('<input data-text-field="MetrosLote" id=' + options.model.uid + ' data-value-field="MetrosLote" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
            format: "#",
            min: 0,
            change: function (e) {
                //hayDatosCapturados = true;
            }
        });
    };
}

function RenderNumeroPruebas(container, options) {
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

        var dataItem;
        $('<input data-text-field="NumeroPruebas" id=' + options.model.uid + ' data-value-field="NumeroPruebas" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
            format: "#",
            min: 0,
            change: function (e) {
                //hayDatosCapturados = true;
            }
        });
    };
}






function tieneClase(item) {
    for (var i = 0; i < item.classList.length; i++) {
        if (item.classList[i] == "k-state-border-up" || item.classList[i] == "k-state-border-down") {
            return true;
        }
    }
    return false
}