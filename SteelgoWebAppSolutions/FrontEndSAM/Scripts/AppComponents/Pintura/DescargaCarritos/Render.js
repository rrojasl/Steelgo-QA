function RenderComboBoxCuadrante(container, options) {
    var dataItem;
    if ($('#botonGuardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
       
        $('<input required data-text-field="Nombre" data-value-field="CuadranteID" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                dataSource: options.model.ListaCuandrantes,
                suggest: true,
                filter: "contains",
                template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",

                change: function (e) {
                    dataItem = this.dataItem(e.sender.selectedIndex);
                    if (dataItem != undefined) {
                        options.model.NombreCuadrante = dataItem.Nombre;
                        options.model.CuadranteID = dataItem.CuadranteID;

                    }
                    else {
                        options.model.NombreCuadrante = ObtenerDescCorrectaResultado(options.model.ListaCuandrantes, options.model.CuadranteID);
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
    }
}

function ObtenerDescCorrectaResultado(lista, CuadranteID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].CuadranteID == CuadranteID)
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