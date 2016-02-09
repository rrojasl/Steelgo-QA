function RenderComboBoxProveedor(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input required data-text-field="Nombre" data-value-field="ProveedorID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaProveedor,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                
                if (dataItem != undefined) {
                    options.model.ProveedorID = dataItem.ProveedorID;
                    options.model.Proveedor = dataItem.Nombre;
                    options.model.ListaHerramientaPrueba = null;
                    options.model.ListaHerramientaPrueba = dataItem.ListaHerramientaPrueba;
                    options.model.ListaTurnoLaboral = null;
                    options.model.ListaTurnoLaboral = dataItem.ListaTurnoLaboral;

                    options.model.HerramientadePruebaID = "";
                    options.model.HerramientadePrueba = "";

                    options.model.TurnoLaboralID = "";
                    options.model.TurnoLaboral = "";
                    $("#grid").data("kendoGrid").dataSource.sync();
                }
                else
                    options.model.Proveedor = ObtenerDescCorrectaProveedor(options.model.ListaProveedor, options.model.ProveedorID);

            },
                dataBound: function () {
                    $(this.items()).each(function (index, item) {
                        var model =options.model.ListaProveedor[index];
                        $(item).attr("title", "" + replaceAll(model.Capacidad, '°', '\n') + "");
                    });
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
};


function ObtenerDescCorrectaProveedor(lista, ProveedorID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].ProveedorID == ProveedorID)
            return lista[i].Nombre;
    }
    return "";
}


function RenderComboBoxHerramientaPrueba(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input required data-text-field="HerramientadePrueba" data-value-field="HerramientadePruebaID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaHerramientaPrueba,
            template: "<i class=\"fa fa-#=data.HerramientadePrueba.toLowerCase()#\"></i> #=data.HerramientadePrueba#",
           
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                
                if (dataItem != undefined) {
                    options.model.HerramientadePruebaID = dataItem.HerramientadePruebaID;
                    options.model.HerramientadePrueba = dataItem.HerramientadePrueba;
                }
                else
                    options.model.HerramientadePrueba = ObtenerDescCorrectaHerramienta(options.model.ListaHerramientaPrueba, options.model.HerramientadePruebaID);

            },
            dataBound: function () {
                $(this.items()).each(function (index, item) {
                    var model = options.model.ListaHerramientaPrueba[index];
                    $(item).attr("title", "" + model.DescHerramientaPrueba +' '+ model.Modelo + "");

                });
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
};

function ObtenerDescCorrectaHerramienta(lista, HerramientadePruebaID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].HerramientadePruebaID == HerramientadePruebaID)
            return lista[i].HerramientadePrueba;
    }
    return "";
}


function RenderComboBoxTurnoLaboral(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input required data-text-field="Turno" data-value-field="TurnoLaboralID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaTurnoLaboral,
            template: "<i class=\"fa fa-#=data.Turno.toLowerCase()#\"></i> #=data.Turno#",
            
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                
                if (dataItem != undefined) {
                    options.model.TurnoLaboralID = dataItem.TurnoLaboralID;
                    options.model.TurnoLaboral = dataItem.Turno;
                }
                else
                    options.model.TurnoLaboral = ObtenerDescCorrectaTurnoLaboral(options.model.ListaTurnoLaboral, options.model.TurnoLaboralID);

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
};

function ObtenerDescCorrectaTurnoLaboral(lista, TurnoLaboralID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].TurnoLaboralID == TurnoLaboralID)
            return lista[i].Turno;
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