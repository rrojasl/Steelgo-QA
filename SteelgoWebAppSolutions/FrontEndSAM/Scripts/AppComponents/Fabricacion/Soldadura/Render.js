﻿
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
                    options.model.ProcesoSoldaduraRaizID = dataItem.ProcesoSoldaduraID

                }
                else {
                    options.model.procesoSoldaduraRaiz = "";
                    options.model.ProcesoSoldaduraRaizID = 0;
                }
                if (options.model.procesoSoldaduraRaiz != "" && options.model.procesoSoldaduraRelleno != "") {
                    options.model.WPSID = 0;
                    options.model.WPSNombre = "";
                    $("#grid").data("kendoGrid").dataSource.sync();
                    AjaxObtenerListadoWPS(options.model);
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
                    options.model.ProcesoSoldaduraRellenoID = dataItem.ProcesoSoldaduraID;
                }
                else {
                    options.model.procesoSoldaduraRelleno = "";
                    options.model.ProcesoSoldaduraRellenoID = 0;
                }
                if (options.model.procesoSoldaduraRaiz != "" && options.model.procesoSoldaduraRelleno != "") {
                    options.model.WPSID = 0;
                    options.model.WPSNombre = "";
                    $("#grid").data("kendoGrid").dataSource.sync();
                    AjaxObtenerListadoWPS(options.model);
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
            dataSource: listadoColada,
            template: "<i class=\"fa fa-#=data.Colada#\"></i> #=data.Colada#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.Colada = dataItem.Colada;
                    options.model.ColadaID = dataItem.ConsumibleID;
                }
                else {
                    options.model.Colada = "";
                    options.model.ColadaID = 0;
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



function RenderComboBoxSoldadorRaiz(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input  data-text-field="Soldador" data-value-field="ObreroID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: listadoSoldadoresParaRaiz,
            template: "<i class=\"fa fa-#=data.Soldador#\"></i> #=data.Soldador#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.Soldador = dataItem.Soldador;
                    options.model.ObreroID = dataItem.ObreroID;
                }
                else {
                    options.model.Soldador = "";
                    options.model.ObreroID = 0;
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


function RenderComboBoxSoldadorRelleno(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input  data-text-field="Soldador" data-value-field="ObreroID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: listadoSoldadoresParaRelleno,
            template: "<i class=\"fa fa-#=data.Soldador#\"></i> #=data.Soldador#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
                    options.model.Soldador = dataItem.Soldador;
                    options.model.ObreroID = dataItem.ObreroID;
                }
                else {
                    options.model.Soldador = "";
                    options.model.ObreroID = 0;
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


function RenderComboBoxTrabajos(container, options) {
    loadingStart();
    var dataItem;

    $('<input data-text-field="TrabajoAdicional" data-value-field="TrabajoAdicional" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                suggest: true,
                delay: 10,
                filter: "contains",
                autoBind: false,
                dataSource: ItemSeleccionado.listaTrabajosAdicionalesSoldadura,
                template: '<span class="#: data.SignoInformativo #">#: data.TrabajoAdicional #</span> ',
                select: function (e) {
                    dataItem = this.dataItem(e.item.index());
                    options.model.Accion = options.model.JuntaSoldaduraID == undefined ? 1 : options.model.Accion;
                    options.model.TrabajoAdicional = dataItem.TrabajoAdicional;
                    options.model.TrabajoAdicionalID = dataItem.TrabajoAdicionalID;
                    //options.model.Observacion = options.model.Observacion;
                    options.model.Soldador = options.model.Soldador;
                    options.model.ObreroID = options.model.ObreroID;
                },
                change: function (e) {
                    dataItem = this.dataItem(e.sender.selectedIndex);
                    if (dataItem != undefined) {
                        options.model.Accion = options.JuntaSoldaduraID == undefined ? 1 : options.model.Accion;
                        options.model.TrabajoAdicional = dataItem.TrabajoAdicional;
                        options.model.TrabajoAdicionalID = dataItem.TrabajoAdicionalID;
                        //options.model.Observacion = options.model.Observacion;
                        options.model.Soldador = options.model.Soldador;
                        options.model.ObreroID = options.model.ObreroID;
                    }
                    else {
                        options.model.TrabajoAdicional = "";
                        options.model.TrabajoAdicionalID = 0;
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