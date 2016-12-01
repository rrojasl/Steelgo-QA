function RendercomboBoxPintor(container, options) {
    var dataItem;
    var valores;
    $('<input  data-text-field="Codigo1" id=' + options.model.uid + ' data-value-field="ObreroID1" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoMultiSelect({
            autoBind: false,
            dataTextField: "Codigo",
            dataValueField: "ObreroID",
            dataSource: options.model.ListaPintores,
            template: "<i class=\"fa fa-#=data.Codigo1.toLowerCase()#\"></i> #=data.Codigo1#",
            select: function (e) {
               
            },
            change: function (e) {
                options.model.plantillaPintor = _dictionary.CapturaAvancePintoresPrimariosExistentes[$("#language").data("kendoDropDownList").value()] + options.model.ListaPintorGuargado.length;
            },
            value: options.model.ListaPintorGuargado
        }
        );
}

function RendercomboBoxShotBlastero(container, options) {
    var dataItem;
    $('<input  data-text-field="Codigo" id=' + options.model.uid + ' data-value-field="ObreroID" data-bind="value:' + options.field + '"/>')
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
            },
            value: options.model.ListaShotblasteroGuargado
        });
}


function RendercomboBoxCuadrante(container, options) {
    $('<input  data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            dataTextField: "Nombre",
            dataValueField: "CuadranteID",
            dataSource: options.model.ListaCuandrantes,
            suggest: true,
            filter: "contains",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.Cuadrante = dataItem.Nombre;
                    options.model.CuadranteID = dataItem.CuadranteID;
                    options.model.Descarga = 1;
                }
                else {
                    options.model.Cuadrante = ObtenerDescCorrectaCuadrante(ItemSeleccionado.ListaCuandrantes, options.model.CuadranteID);

                }
            },

        });
    $(".k-combobox").on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = this;
        if (!tieneClase(item)) {
            $(container).trigger(e);
        }
    });
}


function ObtenerDescCorrectaCuadrante(lista, CuadranteID) {
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