function RenderMultiselectPintores(container, options) {

    if (options.model.ListaPintoresSeleccionadosPorSpool == null) {
        options.model.ListaPintoresSeleccionadosPorSpool = [];

    }
    else if (options.model.ListaDetallePintoresPorSpool == null) {
        options.model.ListaDetallePintoresPorSpool = [];
    }

    var $multiselect = $('<input  data-text-field="Pintor" id=' + options.model.uid + ' data-value-field="ObreroID" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoMultiSelect({
                autoBind: false,
                dataSource: options.model.ListaPintores,
                template: "<i class=\"fa fa-#=data.Pintor.toLowerCase()#\"></i> #=data.Pintor#",
                select: function (e) {
                },
                change: function (e) {
                    options.model.TemplatePintoresPorSpool = $("#language").data("kendoDropDownList").value() == "es-MX" ? "Existen " + options.model.ListaDetallePintoresPorSpool.length + " pintores" : "There are " + options.model.ListaDetallePintoresPorSpool.length + " painters";
                    this.dataSource.sync();
                },
                value: options.model.ListaDetallePintoresPorSpool
            }).data("kendoMultiSelect");

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
        }
        );

}

function RenderGridDetalle(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta

    $('<div name=' + options.model.SpoolID + '/>')
  .appendTo(container)
  .kendoGrid({
      dataSource: {
          // batch: true,
          data: options.model.ListaPintores,
          schema: {
              model: {
                  fields: {
                      Pintor: { type: "string", editable: false },
                  }
              }
          }, filter: {
              logic: "or",
              filters: [
                    { field: "Accion", operator: "eq", value: 1 },
                    { field: "Accion", operator: "eq", value: 2 }
              ]
          }
      },
      selectable: true,
      dataBinding: function (e) {
          console.log("dataBinding");
      },
      change: function (e) {

      },
      columns: [
        { field: "Pintor", title: 'Pintor', filterable: true, width: "100px" },
        {
            command: {
                name: "",
                title: "",
                text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                click: function (e) {
                    e.preventDefault();

                    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                    //windowTemplate = kendo.template($("#windowTemplate").html());

                    if (confirm(_dictionary.CapturaAvanceIntAcabadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()])) {
                        var dataSource = this.dataSource;

                        if (dataItem.Accion == "1")
                            dataSource.remove(dataItem);
                        else
                            dataItem.Accion = 3;



                        var filters = dataSource.filter();
                        var allData = dataSource.data();
                        var query = new kendo.data.Query(allData);
                        var data = query.filter(filters).data;

                        //actuallongitudTrabajosAdicionales = data.length;

                        //options.model.TemplateMensajeTrabajosAdicionales = " Ahora tienes " + actuallongitudTrabajosAdicionales + " trabajos adicionales"

                        this.dataSource.sync();
                    }
                }
            }, width: "99px"
        }
      ], saveChanges: function (e) {
          if (!confirm("Are you sure you want to save all changes?")) {
              e.preventDefault();
          }
      },
      editable: "incell",
      navigatable: true,
      toolbar: [{ name: "create" }]
  });
}

function RenderComboBoxColor(container, options) {
    //loadingStart();

    var dataItem;
    $('<input  data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="ColorID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: ItemSeleccionado.ListaColor,
            suggest: true,
            filter: "contains",
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Nombre = dataItem.Nombre;
                options.model.ColorID = dataItem.ColorID;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.Nombre = dataItem.Nombre;
                options.model.ColorID = dataItem.ColorID;
            }
        }
        );
    //loadingStop();
}

function RenderComboboxSistemaPintura(container, options) {
    //loadingStart();
    var dataItem;

    $('<input  data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="SistemaPinturaID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            suggest: true,
            filter: "contains",
            dataSource: options.model.listaSistemaPintura,
            template: "<i class=\"fa fa-#=data.Nombre#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());

                options.model.SistemaPintura = dataItem.Nombre;
                options.model.SistemaPinturaID = dataItem.SistemaPinturaID;
                options.model.ListaPinturaComponenteCompEspecifica = [];


                options.model.Componente = "";
                options.model.ComponenteID = "";
                for (var i = 0; i < options.model.ListaPinturaComponenteCompGeneral.length; i++) {
                    if (options.model.ListaPinturaComponenteCompGeneral[i].SistemaPinturaID == dataItem.SistemaPinturaID) {

                        options.model.ListaPinturaComponenteCompEspecifica.push(options.model.ListaPinturaComponenteCompGeneral[i]);
                    }
                }
                $("#grid").data("kendoGrid").dataSource.sync();

            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);


                options.model.SistemaPintura = dataItem.Nombre;
                options.model.SistemaPinturaID = dataItem.SistemaPinturaID;
                options.model.ListaPinturaComponenteCompEspecifica = [];


                options.model.Componente = "";
                options.model.ComponenteID = "";
                for (var i = 0; i < options.model.ListaPinturaComponenteCompGeneral.length; i++) {
                    if (options.model.ListaPinturaComponenteCompGeneral[i].SistemaPinturaID == dataItem.SistemaPinturaID) {

                        options.model.ListaPinturaComponenteCompEspecifica.push(options.model.ListaPinturaComponenteCompGeneral[i]);
                    }
                }
                $("#grid").data("kendoGrid").dataSource.sync();

            }
        }
        );
    //loadingStop();
}

function RenderComboBoxPinturaComponenteComposicion(container, options) {
    //loadingStart();

    var dataItem;
    $('<input  data-text-field="Componente" id=' + options.model.uid + ' data-value-field="ComponenteID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            suggest: true,
            filter: "contains",
            dataSource: options.model.ListaPinturaComponenteCompEspecifica,
            template: "<i class=\"fa fa-#=data.Componente#\"></i> #=data.Componente#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Componente = dataItem.Componente;
                options.model.ComponenteID = dataItem.ComponenteID;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.Componente = dataItem.Componente;
                options.model.ComponenteID = dataItem.ComponenteID;
            }
        }
        );
    //loadingStop();
}

function RenderComboBoxColor(container, options) {
    //loadingStart();
    var dataItem;

    $('<input  data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="ColorID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            suggest: true,
            filter: "contains",
            dataSource: options.model.listaColores,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Color = dataItem.Nombre;
                options.model.ColorID = dataItem.ColorID;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.Color = dataItem.Nombre;
                options.model.ColorID = dataItem.ColorID;
            }
        }
        );
    //loadingStop();
}

function RenderComboBoxLote(container, options) {
    //loadingStart();
    var dataItem;

    $('<input  data-text-field="NumeroLote" id=' + options.model.uid + ' data-value-field="LotePinturaID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.listaLotes,
            template: "<i class=\"fa fa-#=data.NumeroLote#\"></i> #=data.NumeroLote#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Lote = dataItem.NumeroLote;
                options.model.LoteID = dataItem.LotePinturaID;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.Lote = dataItem.NumeroLote;
                options.model.LoteID = dataItem.LotePinturaID;
            }
        }
        );
    //loadingStop();
}