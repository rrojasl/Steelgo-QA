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
                      TrabajoAdicionalID: { type: "int", editable: false },
                      juntaSpoolID: { type: "int", editable: false },
                      TrabajoAdicional: { type: "string", editable: false },
                      ObreroID: {type: "int", editable: false},
                      Soldador: { type: "string", editable: false },
                      Observacion: { type: "string", editable: true }
                  }
              }
          }
      },
      edit: function (e) {
          var input = e.container.find(".k-input");
          var value = input.val();
          actuallongitudTrabajosAdicionales = options.model.DetalleAdicional.length;
          options.model.TemplateMensajeTrabajosAdicionales = " Ahora tienes " + actuallongitudTrabajosAdicionales + " trabajos adicionales"
      },
      columns: [
        { field: "Trabajo", title: 'Trabajo', filterable: true, width: "100px" , editor: RenderComboBoxTrabajos},
        { field: "Soldador", title: 'Soldador', filterable: true, width: "100px"},
        { field: "Observación", title: 'Observacion', filterable: true, width: "100px" },
        //{ field: "JuntaSpoolID", title: '', filterable: true, width: "100px", hidden: true },
       {
           command: [{
               name: "Eliminar",
               text: "-",
               click: function (e) {
                   e.preventDefault();
                   var dataItem = $("#" + options.model.SpoolID + '' + options.model.Junta).data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
                   if (confirm(_dictionary.CapturaArmadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()])) {
                       var dataSource = $("#" + options.model.SpoolID + '' + options.model.Junta).data("kendoGrid").dataSource;
                       dataSource.remove(dataItem);
                       actuallongitudTrabajosAdicionales = options.model.DetalleAdicional.length;
                       options.model.TemplateMensajeTrabajosAdicionales = " Ahora tienes " + actuallongitudTrabajosAdicionales + " trabajos adicionales"
                   }
               }
           }], width: "90px"
       }],
      editable: true,
      navigatable: true,
      toolbar: [{name: "create",}]
  });

    $("#" + options.model.SpoolID + '' + options.model.Junta).data("kendoGrid").dataSource.sync();
};

function RenderGridRelleno(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    $('<div id=' + options.model.SpoolID + 'Relleno' + options.model.Junta + '/>')
  .appendTo(container)
  .kendoGrid({
      dataSource: {
          // batch: true,
          data: options.model.Relleno,
          schema: {
              model: {
                  fields: {
                      ProcesoSoldaduraID: { type: "int", editable: false},
                      Proceso: { type: "string", editable: true },
                      ObreroID: { type: "int", editable: false },
                      Soldador: { type: "string", editable: true },
                      WPS: { type: "string", editable: false }
                  }
              }
          }
      },
      edit: function (e) {
          var input = e.container.find(".k-input");
          var value = input.val();
          options.model.TemplateMensajeTrabajosAdicionales = " Ahora tienes " + actuallongitudTrabajosAdicionales + " trabajos adicionales"
      },
      columns: [{ field: "Proceso", title: 'Trabajo', filterable: true, width: "100px", editor: RenderComboBoxSoldador },
        { field: "Soldador", title: 'Soldador', filterable: true, width: "100px" },
        { field: "WPS", title: 'Observacion', filterable: true, width: "100px" },
       {
           command: [{
               name: "Eliminar",
               text: "-",
               click: function (e) {
                   e.preventDefault();
                   var dataItem = $("#" + options.model.SpoolID + 'Relleno' + options.model.Junta).data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
                   if (confirm(_dictionary.CapturaArmadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()])) {
                       var dataSource = $("#" + options.model.SpoolID + 'Relleno' + options.model.Junta).data("kendoGrid").dataSource;
                       dataSource.remove(dataItem);
                       actuallongitudTrabajosAdicionales = options.model.DetalleAdicional.length;
                       options.model.TemplateMensajeTrabajosAdicionales = " Ahora tienes " + actuallongitudTrabajosAdicionales + " trabajos adicionales"
                   }
               }
           }], width: "60px"
       }],
      editable: true,
      toolbar: [{
          name: "create",
          text: "New Row"
      }]
  });
};

function RenderGridRaiz(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    $('<div id=' + options.model.SpoolID + 'Raiz' + options.model.Junta + 'Raiz/>')
  .appendTo(container)
  .kendoGrid({
      dataSource: {
          data: options.model.DetalleAdicional,
          schema: {
              model: {
                  fields: {
                      Proceso: { type: "string", editable: true },
                      Soldador: { type: "string", editable: true },
                      WPS: { type: "string", editable: true }
                  }
              }
          }
      },
      edit: function (e) {
          var input = e.container.find(".k-input");
          var value = input.val();
          actuallongitudTrabajosAdicionales = options.model.DetalleAdicional.length;
      },
      columns: [{ field: "Proceso", title: 'Proceso', filterable: true, width: "100px" },
        { field: "Soldador", title: 'Soldador', filterable: true, width: "100px", editor: RenderComboBoxSoldador  },
        { field: "WPS", title: 'WPS', filterable: true, width: "100px" },
       {
           command: [{
               name: "Eliminar",
               text: "-",
               click: function (e) {
                   e.preventDefault();
                   var dataItem = $("#" + options.model.SpoolID + 'Raiz' + options.model.Junta).data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
                   if (confirm(_dictionary.CapturaArmadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()])) {
                       var dataSource = $("#" + options.model.SpoolID + 'Raiz' + options.model.Junta).data("kendoGrid").dataSource;
                       dataSource.remove(dataItem);
                        dataSource.sync();
                       options.model.TemplateMensajeTrabajosAdicionales = " Ahora tienes " + actuallongitudTrabajosAdicionales + " trabajos adicionales"
                   }
               }
           }], width: "60px"
       }],
      editable: true,
      toolbar: [{
          name: "create",
          text: "New Row"
      }]
  });
};

function RenderComboBoxSoldador(container, options) {

    $CapturaSoldadura.Soldadura.read({ idProyecto: Cookies.get("Proyecto").split('°')[0], token: Cookies.get("token") }).done(function (data) {
        loadingStart();
        var dataItem;
        $('<input required data-text-field="Nombre" data-value-field="TallerID" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                dataSource: data,
                template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
                select: function (e) {
                    dataItem = this.dataItem(e.item.index());
                    options.model.Taller = dataItem.Nombre
                },
                change: function (e) {
                    options.model.Taller = dataItem.Nombre
                }
            }
            );
        loadingStop();
    });

}

function RenderComboBoxTrabajos(container, options) {
        loadingStart();
        var dataItem;
        $('<input required data-text-field="NombreCorto" data-value-field="TrabajoAdicionalID" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                dataSource: ItemSeleccionado.listaTrabajosAdicionalesSoldadura,
                template: '<span class="#: data.NombreCorto #">#: data.NombreCorto #</span> ',
                select: function (e) {
                    dataItem = this.dataItem(e.item.index());
                    options.model.TrabajoAdicional = dataItem.NombreCorto;
                    options.model.TrabajoAdicionalID = dataItem.TrabajoAdicionalID;
                },
                change: function (e) {
                    dataItem = this.dataItem(e.item.index());
                    options.model.TrabajoAdicional = dataItem.NombreCorto;
                    options.model.TrabajoAdicionalID = dataItem.TrabajoAdicionalID;
                }
            }
            );
        loadingStop();
}

function RenderComboBoxTaller(container, options) {
    $Taller.Taller.read({ idProyecto: Cookies.get("Proyecto").split('°')[0], token: Cookies.get("token") }).done(function (data) {
        loadingStart();
        var dataItem;
        $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="TallerID" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                dataSource: data,
                template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
                select: function (e)  {
                    dataItem = this.dataItem(e.item.index());
                    options.model.Taller = dataItem.Nombre
                    options.model.tallerID = dataItem.tallerID
                },
                change: function (e) {
                    options.model.Taller = dataItem.Nombre
                    options.model.tallerID = dataItem.tallerID
                }
            }
            );
        loadingStop();
    });
}