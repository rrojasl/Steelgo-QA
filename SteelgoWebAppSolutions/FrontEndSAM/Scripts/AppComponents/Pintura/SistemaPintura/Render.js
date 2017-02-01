var numeroPlacasComponentesElemento;

function RenderNumeroComponentes(container, options) {
    numeroPlacasComponentesElemento = { NumeroComponentes: options.model.NumeroComponentes };

    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

        var dataItem;
        var numeroComponentesNumeric = $('<input data-text-field="NumeroComponentes" id=' + options.model.uid + ' data-value-field="NumeroComponentes" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
            format: "#",
            min: 0,
            change: function (e) {
                if (this.value() <= options.model.ListadoComponentes.length-1) {
                    if (numeroPlacasComponentesElemento.NumeroComponentes != null && numeroPlacasComponentesElemento.NumeroComponentes != this.value()) {
                        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                            iframe: true,
                            title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
                            visible: false, //the window will not appear before its .open method is called
                            width: "auto",
                            height: "auto",
                            modal: true,
                            animation: {
                                close: false,
                                open: false
                            }
                        }).data("kendoWindow");

                        ventanaConfirm.content(_dictionary.SistemaPinturaModificaNumeroComponentes[$("#language").data("kendoDropDownList").value()] +
                                    "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

                        ventanaConfirm.open().center();

                        $("#yesButton").click(function () {
                            if (options.model.ListaDetalleComponentesAgregados != undefined) {
                                for (var i = 0; i < options.model.ListaDetalleComponentesAgregados.length; i++) {
                                    options.model.ListaDetalleComponentesAgregados[i].Accion = 3;
                                }
                            }

                            var arrayModelComponentesAgregados = [];
                            options.model.ListaDetalleComponentesAgregados = options.model.ListaDetalleComponentesAgregados == null ? [] : options.model.ListaDetalleComponentesAgregados;
                            for (var i = 0; i < options.model.NumeroComponentes; i++) {
                                arrayModelComponentesAgregados[i] = { ComponenteAgregadoID: "", ComponenteID: "", Nombre: "", Accion: 1, ListadoComponentes: "", RowOk: "", ProcesoPinturaID: "" };
                                arrayModelComponentesAgregados[i].ComponenteAgregadoID = i + 1;
                                arrayModelComponentesAgregados[i].Nombre = "";
                                arrayModelComponentesAgregados[i].ListadoComponentes = options.model.ListadoComponentes;
                                arrayModelComponentesAgregados[i].RowOk = true;
                                options.model.ListaDetalleComponentesAgregados.push(arrayModelComponentesAgregados[i]);
                            }
                            //options.model.ListaDetalleComponentesAgregados = arrayModelComponentesAgregados;

                            $("#grid").data("kendoGrid").refresh();
                            ventanaConfirm.close();
                        });
                        $("#noButton").click(function () {
                            //dataItem.NumeroPlacas = numeroPlacasAnteriorElemento;
                            options.model.NumeroComponentes = numeroPlacasComponentesElemento.NumeroComponentes;
                            $("#grid").data("kendoGrid").refresh();
                            ventanaConfirm.close();
                        });
                    }
                }
                else {
                    displayNotify("", _dictionary.NumeroComponentesMenorListado[$("#language").data("kendoDropDownList").value()].replace("?1", options.model.ListadoComponentes.length -1 ), '2');
                    options.model.NumeroComponentes = numeroPlacasComponentesElemento.NumeroComponentes;
                }
            }
        });

        numeroComponentesNumeric.focus(function () {
            this.select();
        });
    };
}


function renderComboboxNombreComponente(container, options) {
    $('<input required data-text-field="Componente" id=' + options.model.uid + ' data-value-field="ComponenteID" data-bind="value:' + options.field + '"/>')
           .appendTo(container)
           .kendoComboBox({
               autoBind: false,
               dataSource: options.model.ListadoComponentes,
               dataTextField: "Componente",
               dataValueField: "ComponenteID",
               template: "<i class=\"fa fa-#=data.Componente#\"></i> #=data.Componente#",
               change: function (e) {
                   dataItem = this.dataItem(e.sender.selectedIndex);
                   if (dataItem != undefined && dataItem.ComponenteID != 0) {
                       options.model.Nombre = dataItem.Componente;
                       options.model.ComponenteID = dataItem.ComponenteID;
                       for (var i = 0; i < $("#gridPopUpComponentesAgregados").data("kendoGrid").dataSource._data.length; i++) {
                           if (options.model.ComponenteAgregadoID != $("#gridPopUpComponentesAgregados").data("kendoGrid").dataSource._data[i].ComponenteAgregadoID && options.model.Nombre == $("#gridPopUpComponentesAgregados").data("kendoGrid").dataSource._data[i].Nombre)
                               $("#gridPopUpComponentesAgregados").data("kendoGrid").dataSource._data[i].Nombre = "";
                       }
                   }
                   else {
                       options.model.Nombre = "";
                       options.model.ComponenteID = 0;
                   }
                   $("#gridPopUpComponentesAgregados").data("kendoGrid").dataSource.sync();
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

function RenderReductores(container, options) {
    $('<input required data-text-field="Reductor" id=' + options.model.uid + ' data-value-field="ReductorID" data-bind="value:' + options.field + '"/>')
           .appendTo(container)
           .kendoComboBox({
               autoBind: false,
               dataSource: options.model.ListadoReductores,
               dataTextField: "Reductor",
               dataValueField: "ReductorID",
               template: "<i class=\"fa fa-#=data.Reductor#\"></i> #=data.Reductor#",
               change: function (e) {
                   dataItem = this.dataItem(e.sender.selectedIndex);
                   if (dataItem != undefined && dataItem.ReductorID != 0) {
                       options.model.Reductor = dataItem.Reductor;
                       options.model.ReductorID = dataItem.ReductorID;
                   }
                   else {
                       options.model.Reductor = "";
                       options.model.ReductorID = 0;
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
                    options.model.UnidadMedidaID = dataItem.UnidadMedidaID;
                    options.model.UnidadMedida = dataItem.UnidadMedida;
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
        var unidadMinimaNumeric = $('<input data-text-field="UnidadMinima" id=' + options.model.uid + ' data-value-field="UnidadMinima" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
            format: "#",
            min: 0,
            change: function (e) {
                //hayDatosCapturados = true;
            }
        });

        unidadMinimaNumeric.focus(function () {
            this.select();
        });
    };
}

function RenderUnidadMaxima(container, options) {
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

        var dataItem;
        var unidadMaximaNumeric = $('<input data-text-field="UnidadMaxima" id=' + options.model.uid + ' data-value-field="UnidadMaxima" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
            format: "#",
            min: 0,
            change: function (e) {
                //hayDatosCapturados = true;
            }
        });

        unidadMaximaNumeric.focus(function () {
            this.select();
        });
    };
}


function RenderMetrosLote(container, options) {
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

        var dataItem;
        var metrosLoteNumerico = $('<input data-text-field="MetrosLote" id=' + options.model.uid + ' data-value-field="MetrosLote" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
            format: "#",
            min: 0
        });

        metrosLoteNumerico.focus(function () {
            this.select();
        });

    };
}

function RenderNumeroPruebas(container, options) {
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {
        var dataItem;
        var numeroPruebasNumerico = $('<input data-text-field="NumeroPruebas" id=' + options.model.uid + ' data-value-field="NumeroPruebas" data-bind="value:' + options.field + '"/>')
         .appendTo(container)
         .kendoNumericTextBox({
             format: "#",
             min: 0
         });

        numeroPruebasNumerico.focus(function () {
            this.select();
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