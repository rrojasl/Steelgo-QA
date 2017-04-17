﻿

function RendercomboBoxShotBlastero(container, options) {
   
    $('<input  data-text-field="Codigo" id=' + options.model.uid + ' data-value-field="ObreroID" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoMultiSelect({
                autoBind: false,
                dataTextField: "Codigo",
                dataValueField: "ObreroID",
                dataSource: options.model.ListaObreros,
                template: "<i class=\"fa fa-#=data.Codigo.toLowerCase()#\"></i> #=data.Codigo#",
                change: function (e) {
                    options.model.plantillaObrero = _dictionary.CapturaAvancePintoresShotblastExistentes[$("#language").data("kendoDropDownList").value()] + options.model.ListaObrerosSeleccionados.length;
                    this.dataSource.sync();
                },
                value: options.model.ListaObrerosSeleccionados
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

function renderComboboxComponenteDinamico(container, options) {
    AjaxGetLotesComponente(container, options);
}

function RendercomboReductor(container, options) {
    AjaxGetLotesReductor(container, options);
}

function RenderDatePicker(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input   data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoDatePicker({
            max: new Date(),
            change: function () {
                var value = this.value();
                options.model.FechaShotblast = value;

                $("#grid").data("kendoGrid").dataSource.sync();
            }
        }
        );

}