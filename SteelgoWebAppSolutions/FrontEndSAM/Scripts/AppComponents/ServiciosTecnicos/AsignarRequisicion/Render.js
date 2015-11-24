function RenderComboBoxProveedor(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input required data-text-field="Nombre" data-value-field="ProveedorID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaProveedor,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.ProveedorID = dataItem.ProveedorID;
                options.model.Proveedor = dataItem.Nombre;
                options.model.ListaHerramientaPrueba = null;
                options.model.ListaHerramientaPrueba = dataItem.ListaHerramientaPrueba;
                options.model.ListaTurnoLaboral = null;
                options.model.ListaTurnoLaboral = dataItem.ListaTurnoLaboral;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.ProveedorID = dataItem.ProveedorID;
                options.model.Proveedor = dataItem.Nombre;
                options.model.ListaHerramientaPrueba = null;
                options.model.ListaHerramientaPrueba = dataItem.ListaHerramientaPrueba;
                options.model.ListaTurnoLaboral = null;
                options.model.ListaTurnoLaboral = dataItem.ListaTurnoLaboral;

                options.model.HerramientadePruebaID = "";
                options.model.HerramientadePrueba = "";

                options.model.TurnoLaboralID ="";
                options.model.TurnoLaboral = "";
                $("#grid").data("kendoGrid").dataSource.sync();
            },
                dataBound: function () {
                    $(this.items()).each(function (index, item) {
                        var model =options.model.ListaProveedor[index];
                        $(item).attr("title", "" + replaceAll(model.Capacidad, '°', '\n') + "");
                    });
                }
        }
      );
};

function RenderComboBoxHerramientaPrueba(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input required data-text-field="HerramientadePrueba" data-value-field="HerramientadePruebaID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaHerramientaPrueba,
            template: "<i class=\"fa fa-#=data.HerramientadePrueba.toLowerCase()#\"></i> #=data.HerramientadePrueba#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.HerramientadePruebaID = dataItem.HerramientadePruebaID;
                options.model.HerramientadePrueba = dataItem.HerramientadePrueba;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.HerramientadePruebaID = dataItem.HerramientadePruebaID;
                options.model.HerramientadePrueba = dataItem.HerramientadePrueba;
            },
            dataBound: function () {
                $(this.items()).each(function (index, item) {
                    var model = options.model.ListaHerramientaPrueba[index];
                    $(item).attr("title", "" + model.DescHerramientaPrueba +' '+ model.Modelo + "");

                });
            }
        }
      );
};

function RenderComboBoxTurnoLaboral(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input required data-text-field="Turno" data-value-field="TurnoLaboralID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaTurnoLaboral,
            template: "<i class=\"fa fa-#=data.Turno.toLowerCase()#\"></i> #=data.Turno#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.TurnoLaboralID = dataItem.TurnoLaboralID;
                options.model.TurnoLaboral = dataItem.Turno;


            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.TurnoLaboralID = dataItem.TurnoLaboralID;
                options.model.TurnoLaboral = dataItem.Turno;
            }
        }
      );
};