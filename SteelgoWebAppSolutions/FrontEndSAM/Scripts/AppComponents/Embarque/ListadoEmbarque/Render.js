function RenderComboBoxDestino(container, options) {
    var valores;
    $('<input  data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.listaDestino,
            template: "<i class=\"fa fa-#=data.Destino.toLowerCase()#\"></i> #=data.Destino#",
            change: function (e) {
                e.preventDefault();
                var dataItem = this.dataItem(e.sender.selectedIndex);

                if (dataItem != undefined && dataItem.DesitinoID != 0) {
                    options.model.Destino = dataItem.Destino;
                    options.model.DesitinoID = dataItem.DestinoID;
                    options.model.ModificadoPorUsuario = true;
                    $("#grid").data("kendoGrid").dataSource.sync();
                }
                else {
                    options.model.Destino = "";
                    options.model.DesitinoID = 0;
                    options.model.ModificadoPorUsuario = true;
                }
            }
        });
}

function RenderComboBoxAprobacionAduana(container, options) {
    var valores;
    $('<input  data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.listaEstatus,
            template: "<i class=\"fa fa-#=data.Descripcion.toLowerCase()#\"></i> #=data.Descripcion#",
            change: function (e) {
                e.preventDefault();
                var dataItem = this.dataItem(e.sender.selectedIndex);

                if (dataItem != undefined && dataItem.OpcionValidacionID != 0) {
                    options.model.AprobadoAduanaDesc = dataItem.Descripcion;
                    options.model.AprobadoAduana = dataItem.OpcionValidacionID;
                    options.model.ModificadoPorUsuario = true;

                    if (SetValueEnviar(options.model))
                        options.model.Enviar = true;
                    else
                        options.model.Enviar = false;

                    $("#grid").data("kendoGrid").dataSource.sync();
                }
                else {
                    options.model.AprobadoAduanaDesc = "";
                    options.model.AprobadoAduana = 0;
                    options.model.ModificadoPorUsuario = true;
                }
            }
        });
}

function RenderComboBoxAprobacionCliente(container, options) {
    var valores;
    $('<input  data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="Nombre" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.listaEstatus,
            template: "<i class=\"fa fa-#=data.Descripcion.toLowerCase()#\"></i> #=data.Descripcion#",
            change: function (e) {
                e.preventDefault();
                var dataItem = this.dataItem(e.sender.selectedIndex);

                if (dataItem != undefined && dataItem.OpcionValidacionID != 0) {
                    options.model.AprobadoClienteDesc = dataItem.Descripcion;
                    options.model.AprobadoCliente = dataItem.OpcionValidacionID;
                    options.model.ModificadoPorUsuario = true;

                    if (SetValueEnviar(options.model))
                        options.model.Enviar = true;
                    else
                        options.model.Enviar = false;

                    $("#grid").data("kendoGrid").dataSource.sync();
                }
                else {
                    options.model.AprobadoClienteDesc = "";
                    options.model.AprobadoCliente = 0;
                    options.model.ModificadoPorUsuario = true;
                }
            }
        });
}

function RenderDatePicker(container, options) {
    var dataItem;
    $('<input   data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoDatePicker({
            max: new Date(),
            change: function (e) {
                var value = this.value();
                
                if (ValidarFecha(value))
                    options.model.FechaSolicitudPermiso = value;
                else
                    options.model.FechaSolicitudPermiso = "";
            }
        }
    );
}

function ValidarFecha(valor) {
    var fecha = kendo.toString(valor, String(_dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()].replace('{', '').replace('}', '').replace("0:", "")));
    if (fecha == null)
        return false;
    else
        return true;
}