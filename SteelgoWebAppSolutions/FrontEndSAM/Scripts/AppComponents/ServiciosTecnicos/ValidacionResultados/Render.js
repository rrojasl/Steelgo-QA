function comboBoxDefectos(container, options) {
    var dataItem;
    $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            suggest: true,
            filter: "contains",
            dataSource: comboDefectos,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.DefectoID = dataItem.DefectoID;
                options.model.Nombre = dataItem.Nombre;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.DefectoID = dataItem.DefectoID;
                options.model.Nombre = dataItem.Nombre;
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

function comboBoxDefectosValidacionResultado(container, options) {
    var dataItem;
    $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            suggest: true,
            filter: "contains",
            dataSource: options.model.Defectos,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.DefectoID = dataItem.DefectoID;
                options.model.Nombre = dataItem.Nombre;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.DefectoID = dataItem.DefectoID;
                options.model.Nombre = dataItem.Nombre;
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

function comboBoxConciliacion(container, options) {
    var dataItem;

    $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            suggest: true,
            filter: "contains",
            dataSource: [
                    { Conciliado: 0, Nombre: _dictionary.ValidacionResultadosComboRechazado[$("#language").data("kendoDropDownList").value()] },
                    { Conciliado: 1, Nombre: _dictionary.ValidacionResultadosComboAceptado[$("#language").data("kendoDropDownList").value()] }
            ],
            dataTextField: "Nombre",
            dataValueField: "Conciliacion",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Conciliado = dataItem.Conciliado;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.Conciliado = dataItem.Conciliado;


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


function renderEnlaceEditar(container, options) {
    $('<a  id=' + options.model.uid + ' "><span >' + _dictionary.ValidacionResultadosEnlaceEditar[$("#language").data("kendoDropDownList").value()] + '</span></a>')
        .appendTo(container)
        .click(function () {
            AjaxObtenerRenglonEdicion(options.model.RequisicionID, options.model.Ubicacion)
        });

}


function gridRenglonEdicionDetalle(container, options) {
    $('<div id=' + options.model.DefectoID + '/>')
    .appendTo(container)
    .kendoGrid({
        dataSource: {
            data: options.model.ListadoDetalleDefectos,
            schema: {
                model: {
                    fields: {

                        Nombre: { type: "string", editable: true },
                        InicioDefecto: { type: "string", editable: true },
                        FinDefecto: { type: "string", editable: true },
                    }
                }
            },
            pageSize: 20,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        filterable: {
            extra: false
        },
        click: function (e) {
        },
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [

                { field: "Nombre", title: _dictionary.ValidacionResultadosCabeceraDefecto[$("#language").data("kendoDropDownList").value()], filterable: true, editor: comboBoxDefectos, width: "20px" },
                { field: "InicioDefecto", title: _dictionary.ValidacionResultadosCabeceraInicio[$("#language").data("kendoDropDownList").value()], filterable: true, width: "15px" },
                { field: "FinDefecto", title: _dictionary.ValidacionResultadosCabeceraFin[$("#language").data("kendoDropDownList").value()], filterable: true, width: "15px" },
        ],
        editable: "incell",
        toolbar: [{ name: "create" }]
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