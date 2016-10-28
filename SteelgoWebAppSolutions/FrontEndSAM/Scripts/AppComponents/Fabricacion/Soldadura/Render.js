
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
            dataSource: ItemSeleccionado.ListaTaller,
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
                    options.model.Taller = ObtenerDescCorrectaTaller(ItemSeleccionado.ListaTaller, options.model.TallerID);

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
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.ProcesoSoldaduraRaiz = dataItem.Codigo
                options.model.ProcesoSoldaduraRaizID = dataItem.ProcesoSoldaduraID
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined && dataItem.ProcesoSoldaduraID != 0) {
                    if (dataItem.Codigo == "N/A" && options.model.procesoSoldaduraRelleno == "N/A") {
                        $("#grid").data("kendoGrid").dataSource.sync();
                        options.model.procesoSoldaduraRelleno = "";
                        options.model.procesoSoldaduraRellenoID = 0;
                    }
                    options.model.procesoSoldaduraRaiz = dataItem.Codigo
                    options.model.procesoSoldaduraRaizID = dataItem.ProcesoSoldaduraID


                }
                else {
                    if (ItemSeleccionado.ListadoProcesoSoldadura != undefined)
                        options.model.procesoSoldaduraRaiz = ObtenerDescCorrectaSoldaduraRaiz(ItemSeleccionado.ListadoProcesoSoldadura, options.model.procesoSoldaduraRaizID);

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
    //if (ItemSeleccionado.PermiteTerminadoRelleno) {

    var dataItem;
    $('<input data-text-field="Codigo" id=' + options.model.uid + ' data-value-field="Codigo" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            delay: 10,
            filter: "contains",
            autoBind: false,
            dataSource: ItemSeleccionado.ListadoProcesoSoldaduraRelleno,
            template: "<i class=\"fa fa-#=data.Codigo#\"></i> #=data.Codigo#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined && dataItem.ProcesoSoldaduraID != 0) {
                    if (dataItem.Codigo == "N/A" && options.model.procesoSoldaduraRaiz == "N/A") {
                        options.model.procesoSoldaduraRaiz = "";
                        options.model.procesoSoldaduraRaizID = 0;
                    }

                    options.model.procesoSoldaduraRelleno = dataItem.Codigo;
                    options.model.procesoSoldaduraRellenoID = dataItem.ProcesoSoldaduraID;

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
    //}
    //else
    //    //displayNotify("CapturaSoldaduraMensajePermisoTerminadoRelleno", "", "1");
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