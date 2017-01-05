
function RenderComboBoxTaller(container, options) {

    loadingStart();
    var dataItem;
    $('<input data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="TallerID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaTaller,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            select: function (e) {

                dataItem = this.dataItem(e.item.index());
                options.model.Taller = dataItem.Nombre;
                options.model.TallerID = dataItem.TallerID;
                options.model.tallerID = dataItem.TallerID;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.Taller = dataItem.Nombre;
                    options.model.TallerID = dataItem.TallerID;

                }
                else {
                    options.model.Taller = "";
                    options.model.TallerID = 0;

                }
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
    loadingStop();
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
                options.model.FechaArmado = value;
            }
        });
}


function RenderComboBoxProcesoSoldaduraRaiz(container, options) {
    loadingStart();
    var dataItem;
    $('<input data-text-field="Codigo" id=' + options.model.uid + ' data-value-field="Codigo" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListadoProcesoSoldaduraRaiz,
            template: "<i class=\"fa fa-#=data.Codigo#\"></i> #=data.Codigo#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined && dataItem.ProcesoSoldaduraID != 0) {
                    options.model.procesoSoldaduraRaiz = dataItem.Codigo
                    options.model.procesoSoldaduraRaizID = dataItem.ProcesoSoldaduraID

                }
                else {
                    options.model.procesoSoldaduraRaiz = "";
                    options.model.procesoSoldaduraRaizID = 0;
                }
                if (options.model.procesoSoldaduraRaiz != "" && options.model.procesoSoldaduraRelleno != "")
                    AjaxObtenerListadoWPS(options.model);
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
    loadingStop();
}


function RenderComboBoxProcesoSoldaduraRelleno(container, options) {
    loadingStart();


    var dataItem;
    $('<input data-text-field="Codigo" id=' + options.model.uid + ' data-value-field="Codigo" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListadoProcesoSoldaduraRelleno,
            template: "<i class=\"fa fa-#=data.Codigo#\"></i> #=data.Codigo#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined && dataItem.ProcesoSoldaduraID != 0) {
                    options.model.procesoSoldaduraRelleno = dataItem.Codigo;
                    options.model.procesoSoldaduraRellenoID = dataItem.ProcesoSoldaduraID;
                }
                else {
                    options.model.procesoSoldaduraRelleno = "";
                    options.model.procesoSoldaduraRellenoID = 0;
                }
                if (options.model.procesoSoldaduraRaiz != "" && options.model.procesoSoldaduraRelleno != "")
                    AjaxObtenerListadoWPS(options.model);
                
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
    loadingStop();
}


function RenderComboBoxWPS(container, options) {
    loadingStart();
    var dataItem;
    $('<input data-text-field="WPSNombre" id=' + options.model.uid + ' data-value-field="WPSID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaWPS,
            template: "<i class=\"fa fa-#=data.WPSNombre#\"></i> #=data.WPSNombre#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.WPSNombre = dataItem.WPSNombre;
                    options.model.WPSID = dataItem.WPSID;
                }
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
    loadingStop();
}


function RenderComboBoxColada(container, options) {
    loadingStart();
    var dataItem;
    $('<input data-text-field="Colada" id=' + options.model.uid + ' data-value-field="Colada" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaColada,
            template: "<i class=\"fa fa-#=data.Colada#\"></i> #=data.Colada#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.Colada = dataItem.Colada;
                    options.model.ColadaID = dataItem.ColadaID;
                }
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
    loadingStop();
}



function RenderComboBoxSoldador(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input  data-text-field="Codigo" data-value-field="ObreroID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: options.model.ListaSoldador,
            template: "<i class=\"fa fa-#=data.Codigo.toLowerCase()#\"></i> #=data.Codigo#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.Soldador = dataItem.Codigo;
                    options.model.SoldadorID = dataItem.ObreroID;
                }
                else {
                    options.model.Soldador = "";
                    options.model.SoldadorID = 0;
                }
                
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