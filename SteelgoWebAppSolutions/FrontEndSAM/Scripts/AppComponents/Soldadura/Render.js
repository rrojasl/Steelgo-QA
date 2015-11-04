function RenderGridDetalle(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    $('<div id=' + options.model.SpoolID + '' + options.model.Junta + '/>')
  .appendTo(container)
  .kendoGrid({
      dataSource: {
          // batch: true,
          data: options.model.DetalleAdicional,
          schema: {
              model: {
                  fields: {
                      TrabajoAdicionalID: { type: "int", editable: true },
                      juntaSpoolID: { type: "int", editable: true },
                      juntaSoldaduraID: { type: "int", editable: true },
                      TrabajoAdicional: { type: "string", editable: true },
                      ObreroID: {type: "int", editable: true},
                      Soldador: { type: "string", editable: true },
                      Observacion: { type: "string", editable: true }
                  }
              }
          }
      },
      columns: [
        { field: "TrabajoAdicional", title: 'Trabajo', filterable: true, width: "100px", editor: RenderComboBoxTrabajos },
        { field: "Soldador", title: 'Soldador', filterable: true, width: "100px", editor: RenderComboBoxSoldadorTrabajos },
        { field: "Observación", title: 'Observacion', filterable: true, width: "100px" },
        
       {
           command: [{
               name: "Eliminar",
               text: "-",
               click: function (e) {
                   e.preventDefault();
                   var dataItem = $("#" + options.model.SpoolID + '' + options.model.Junta).data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
                   if (confirm(_dictionary.CapturaArmadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()])) {
                       if (dataItem.JuntaSoldaduraID == 1)
                           dataSource.remove(dataItem);

                       dataItem.Accion = 3;
                   }
               }
           }], width: "100px"
       }],
      logic: "or",
      filters: [
        { field: "Accion", operator: "eq", value: 1 },
        { field: "Accion", operator: "eq", value: 2 }
      ],
      //change: function (e) {
      //    if (ItemSeleccionado.JuntaSoldaduraID != 0)
      //        ItemSeleccionado.Accion = 2;
      //},
      editable: true,
      navigatable: true,
      toolbar: [{name: "create",}]
  });
    $("#" + options.model.SpoolID + '' + options.model.Junta).data("kendoGrid").dataSource.sync();
};

function RenderGridRelleno(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    $('<div id=' + options.model.SpoolID + '' + options.model.Junta + '/>')
  .appendTo(container)
  .kendoGrid({
      dataSource: {
          // batch: true,
          data: options.model.Relleno,
          schema: {
              model: {
                  fields: {
                      JuntaSoldaduraSoldadoID: { type: "int", editable: true },
                      JuntaSoldaduraID: { type: "int", editable: true },
                      Accion: { type: "string", editable: true },
                      ObreroID: { type: "int", editable: true },
                      Soldador: { type: "string", editable: true },
                      WPS: { type: "string", editable: false },
                  }
              }
          }
      },
      columns: [
        { field: "Soldador", title: 'Soldador', filterable: true, width: "100px", editor: RenderComboBoxSoldadorRelleno },
        { field: "ObreroID", title: '', filterable: true, width: "100px", hidden: true },
        { field: "WPS", title: 'WPS', filterable: true, width: "100px" },
       {
           command: [{
               name: "Eliminar",
               text: "-",
               click: function (e) {
                   e.preventDefault();
                   var dataItem = $("#" + options.model.SpoolID + '' + options.model.Junta).data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
                   if (confirm(_dictionary.CapturaArmadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()])) {
                       if (dataItem.JuntaSoldaduraID == 1)
                           dataSource.remove(dataItem);
                       dataItem.Accion = 3;
                   }
               }
           }], width: "90px"
       }],
      logic: "or",
      filters: [
        { field: "Accion", operator: "eq", value: 1 },
        { field: "Accion", operator: "eq", value: 2 }
      ],
      //change: function (e) {
      //    if (ItemSeleccionado.JuntaSoldaduraID != 0)
      //        ItemSeleccionado.Accion = 2;
      //},
      editable: true,
      navigatable: true,
      toolbar: [{ name: "create", }]
  });

    $("#" + options.model.SpoolID + '' + options.model.Junta).data("kendoGrid").dataSource.sync();
};

function RenderGridRaiz(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    $('<div id=' + options.model.SpoolID + '' + options.model.Junta + '/>')
  .appendTo(container)
  .kendoGrid({
      dataSource: {
          data: options.model.Raiz,
          schema: {
              model: {
                  fields: {
                      JuntaSoldaduraSoldadoID: { type: "int", editable: true },
                      Accion: { type: "string", editable: true },
                      ObreroID: {type: "int", editable: true},
                      Soldador: { type: "string", editable: true },
                      WPS: { type: "string", editable: false },
                  }
              }
          }
      },
      columns: [
        { field: "Soldador", title: 'Soldador', filterable: true, width: "100px", editor: RenderComboBoxSoldador },
        { field: "ObreroID", title: '', filterable: true, width: "100px" , hidden: true},
        { field: "WPS", title: 'WPS', filterable: true, width: "100px" },
       {
           command: [{
               name: "Eliminar",
               text: "-",
               click: function (e) {
                   e.preventDefault();
                   var dataItem = $("#" + options.model.SpoolID + 'Raiz' + options.model.Junta).data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
                   if (confirm(_dictionary.CapturaArmadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()])) {
                       if (dataItem.JuntaSoldaduraID == 1)
                           dataSource.remove(dataItem);
                       dataItem.Accion = 3;
                       //options.model.TemplateMensajeTrabajosAdicionales = " Ahora tienes " + actuallongitudTrabajosAdicionales + " trabajos adicionales"
                   }
               }
           }], width: "60px"
       }],
      logic: "or",
      filters: [
        { field: "Accion", operator: "eq", value: 1 },
        { field: "Accion", operator: "eq", value: 2 }
      ],
      //change: function (e) {
      //    if (ItemSeleccionado.JuntaSoldaduraID != 0)
      //        ItemSeleccionado.Accion = 2;
      //},
      editable: true,
      navigatable: true,
      toolbar: [{ name: "create", }]
  });
    $("#" + options.model.SpoolID + '' + options.model.Junta).data("kendoGrid").dataSource.sync();
};

function RenderComboBoxSoldador(container, options) {
    loadingStart();
    var dataItem;
    $('<input required data-text-field="Soldador" data-value-field="Soldador" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: ItemSeleccionado.ListadoRaiz,
            template: '<span class="#: data.Soldador #">#: data.Soldador #</span> ',
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Accion = options.model.JuntaSoldaduraID == undefined ? 1 : options.model.Accion;
                options.model.JuntaSoldaduraSoldadoID = options.model.JuntaSoldaduraSoldadoID;
                options.model.JuntaSoldaduraID = options.model.JuntaSoldaduraID;
                options.model.Soldador = dataItem.Soldador;
                options.model.ObreroID = dataItem.ObreroID;
                options.model.WPS = options.model.WPS;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.Accion = options.model.JuntaSoldaduraID == undefined ? 1 : options.model.Accion;
                options.model.JuntaSoldaduraSoldadoID = options.model.JuntaSoldaduraSoldadoID;
                options.model.JuntaSoldaduraID = options.model.JuntaSoldaduraID;
                options.model.Soldador = dataItem.Soldador;
                options.model.ObreroID = dataItem.ObreroID;
                options.model.WPS = options.model.WPS;
            }
        }
        );
    loadingStop();
};


function RenderComboBoxSoldadorRelleno(container, options) {
    loadingStart();
    var dataItem;
    $('<input required data-text-field="Soldador" data-value-field="Soldador" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: ItemSeleccionado.ListadoRelleno,
            template: '<span class="#: data.Soldador #">#: data.Soldador #</span> ',
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Accion = options.model.JuntaSoldaduraID == undefined ? 1 : options.model.Accion;
                options.model.JuntaSoldaduraSoldadoID = options.model.JuntaSoldaduraSoldadoID;
                options.model.JuntaSoldaduraID = options.model.JuntaSoldaduraID;
                options.model.Soldador = dataItem.Soldador;
                options.model.ObreroID = dataItem.ObreroID;
                options.model.WPS = options.model.WPS;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.Accion = options.model.JuntaSoldaduraID == undefined ? 1 : options.model.Accion;
                options.model.JuntaSoldaduraSoldadoID = options.model.JuntaSoldaduraSoldadoID;
                options.model.JuntaSoldaduraID = options.model.JuntaSoldaduraID;
                options.model.Soldador = dataItem.Soldador;
                options.model.ObreroID = dataItem.ObreroID;
                options.model.WPS = options.model.WPS;
            }
        }
        );
    loadingStop();
};

function RenderComboBoxSoldadorTrabajos(container, options) {
    loadingStart();
    var dataItem;
    $('<input required data-text-field="Soldador" data-value-field="Soldador" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: ItemSeleccionado.ListadoSoldadoresTrabajos,
            template: '<span class="#: data.Soldador #">#: data.Soldador #</span> ',
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Accion = options.model.JuntaSoldaduraID == undefined ? 1 : options.model.Accion;
                options.model.JuntaSoldaduraSoldadoID = options.model.JuntaSoldaduraSoldadoID;
                options.model.JuntaSoldaduraID = options.model.JuntaSoldaduraID;
                options.model.Soldador = dataItem.Soldador;
                options.model.ObreroID = dataItem.ObreroID;
                options.model.Observacion = options.model.Observacion;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.Accion = options.model.JuntaSoldaduraID == undefined ? 1 : options.model.Accion;
                options.model.JuntaSoldaduraSoldadoID = options.model.JuntaSoldaduraSoldadoID;
                options.model.JuntaSoldaduraID = options.model.JuntaSoldaduraID;
                options.model.Soldador = options.model.Soldador;
                options.model.ObreroID = options.model.ObreroID;
                options.model.Observacion = options.model.Observacion;
            }
        }
        );
    loadingStop();
}

function RenderComboBoxTrabajos(container, options) {
        loadingStart();
        var dataItem;
    $('<input required data-text-field="TrabajoAdicional" data-value-field="TrabajoAdicional" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                dataSource: ItemSeleccionado.listaTrabajosAdicionalesSoldadura,
                template: '<span class="#: data.TrabajoAdicional #">#: data.TrabajoAdicional #</span> ',
                select: function (e) {
                    dataItem = this.dataItem(e.item.index());
                    options.model.Accion = options.model.JuntaSoldaduraID == undefined ? 1 : options.model.Accion;
                    options.model.TrabajoAdicional = dataItem.TrabajoAdicional;
                    options.model.TrabajoAdicionalID = dataItem.TrabajoAdicionalID;
                    options.model.Observacion = options.model.Observacion;
                    options.model.Soldador = options.model.Soldador;
                    options.model.ObreroID = options.model.ObreroID;
                },
                change: function (e) {
                    dataItem = this.dataItem(e.sender.selectedIndex);
                    options.model.Accion = options.JuntaSoldaduraID == undefined ? 1 : options.model.Accion;
                    options.model.TrabajoAdicional = dataItem.TrabajoAdicional;
                    options.model.TrabajoAdicionalID = dataItem.TrabajoAdicionalID;
                    options.model.Observacion = options.model.Observacion;
                    options.model.Soldador = options.model.Soldador;
                    options.model.ObreroID = options.model.ObreroID;
                }
            }
            );
        loadingStop();
}

function RenderComboBoxTaller(container, options) {
        loadingStart();
        var dataItem;
        $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="TallerID" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                dataSource: ItemSeleccionado.ListaTaller,
                template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
                select: function (e)  {
                    
                    dataItem = this.dataItem(e.item.index());
                    options.model.Taller = dataItem.Nombre;
                    options.model.TallerID = dataItem.TallerID;
                    options.model.tallerID = dataItem.TallerID;
                },
                change: function (e) {
                    dataItem = this.dataItem(e.sender.selectedIndex);
                    options.model.Taller = dataItem.Nombre;
                    options.model.TallerID = dataItem.TallerID;
                    options.model.tallerID = dataItem.TallerID;
                }
            }
            );
        loadingStop();
}


function RenderComboBoxProcesoSoldaduraRaiz(container, options) {
    loadingStart();
    var dataItem;
    $('<input required data-text-field="Codigo" id=' + options.model.uid + ' data-value-field="Codigo" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: ItemSeleccionado.ListadoProcesoSoldadura,
            template: "<i class=\"fa fa-#=data.Codigo#\"></i> #=data.Codigo#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.procesoSoldaduraRaiz = dataItem.Codigo
                options.model.procesoSoldaduraRaizID = dataItem.ProcesoSoldaduraID
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.procesoSoldaduraRaiz = dataItem.Codigo
                options.model.procesoSoldaduraRaizID = dataItem.ProcesoSoldaduraID
            }
        }
        );
    loadingStop();
}


function RenderComboBoxProcesoSoldaduraRelleno(container, options) {
    loadingStart();
    var dataItem;
    $('<input required data-text-field="Codigo" id=' + options.model.uid + ' data-value-field="Codigo" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: ItemSeleccionado.ListadoProcesoSoldadura,
            template: "<i class=\"fa fa-#=data.Codigo#\"></i> #=data.Codigo#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.procesoSoldaduraRelleno = dataItem.Codigo;
                options.model.procesoSoldaduraRellenoID = dataItem.ProcesoSoldaduraID;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.procesoSoldaduraRelleno = dataItem.Codigo;
                options.model.procesoSoldaduraRellenoID = dataItem.ProcesoSoldaduraID;
            }
        }
        );
    loadingStop();
}