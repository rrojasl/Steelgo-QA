function RenderComboBoxTaller(container, options) {
    var dataItem;
    $('<input required data-text-field="Nombre" data-value-field="TallerID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaTaller,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Taller = dataItem.Nombre;
                options.model.TallerID = dataItem.TallerID;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.Taller = dataItem.Nombre;
                options.model.TallerID = dataItem.TallerID;
            }
        }
        );


}

function RenderComboBoxTubero(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;

    $('<input required data-text-field="Codigo" data-value-field="ObreroID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaTubero,
            template: "<i class=\"fa fa-#=data.Codigo.toLowerCase()#\"></i> #=data.Codigo#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Tubero = dataItem.Codigo;
                options.model.TuberoID = dataItem.ObreroID;
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.Tubero = dataItem.Codigo;
                options.model.TuberoID = dataItem.ObreroID;
            }
        }
        );
}

function RenderComboBoxNumeroUnico1(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;
    var textAnterior;
    $('<input required data-text-field="Clave" data-value-field="NumeroUnicoID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaNumerosUnicos1,
            template: "<i class=\"fa fa-#=data.Clave#\"></i> #=data.Clave#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.NumeroUnico1 = String(dataItem.Clave);
                options.model.NumeroUnico1ID = dataItem.NumeroUnicoID;
                textAnterior = e.sender._prev;
            }
            ,
            change: function (e) {
                options.model.NumeroUnico1 = String(dataItem.Clave);
                options.model.NumeroUnico1ID = dataItem.NumeroUnicoID;
                AplicarAsignacionAutomaticaNumeroUnico(options.model, textAnterior, dataItem, 0);
                $("#grid").data("kendoGrid").dataSource.sync();
            }
        });
}

function RenderComboBoxNumeroUnico2(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;
    var textAnterior;
    $('<input required data-text-field="Clave" data-value-field="NumeroUnicoID" data-bind="value:' + options.field + '"/>')
         .appendTo(container)
         .kendoComboBox({
             autoBind: false,
             dataSource: options.model.ListaNumerosUnicos2,
             template: "<i class=\"fa fa-#=data.Clave#\"></i> #=data.Clave#",
             select: function (e) {
                 dataItem = this.dataItem(e.item.index());
                 options.model.NumeroUnico2 = String(dataItem.Clave);
                 options.model.NumeroUnico2ID = dataItem.NumeroUnicoID;
                 textAnterior = e.sender._prev;
             },
             change: function (e) {
                 dataItem = this.dataItem(e.sender.selectedIndex);
                 options.model.NumeroUnico2 = String(dataItem.Clave);
                 options.model.NumeroUnico2ID = dataItem.NumeroUnicoID;
                 AplicarAsignacionAutomaticaNumeroUnico(options.model, textAnterior, dataItem, 0);
                 $("#grid").data("kendoGrid").dataSource.sync();

             }
         });
}

function grid_saveChanges(e) {
    if (!confirm("Are you sure you want to save all changes?")) {
        e.preventDefault();
    }
}

function RenderGridDetalle(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta

    console.log("modelo de la fila seleccionada");
    console.log(options.model.ListaDetalleTrabajoAdicional);


    $('<div name=' + options.model.SpoolID + '' + options.model.Junta + '/>')
  .appendTo(container)
  .kendoGrid({

      dataSource: {
          // batch: true,
          data: options.model.ListaDetalleTrabajoAdicional,
          schema: {
              model: {
                  fields: {

                      Accion: { type: "int", editable: false },
                      ArmadoTrabajoAdicionalID: { type: "string", editable: false },
                      JuntaArmadoID: { type: "int", editable: false },
                      TrabajoAdicionalID: { type: "int", editable: false },
                      TrabajoAdicional: { type: "string", editable: true },
                      ObreroID: { type: "int", editable: false },
                      Tubero: { type: "int", editable: false },
                      Observacion: { type: "string", editable: true }
                  }
              }
          }, filter:{
        logic: "or",
        filters: [
          { field: "Accion", operator: "eq", value: 1 },
          { field: "Accion", operator: "eq", value: 2 },
            { field: "Accion", operator: "eq", value: 0 },
            { field: "Accion", operator: "eq", value: undefined }
        ]
    }
          
         
      },
     
      selectable: true,
      dataBinding: function (e) {
          console.log("dataBinding");
      },
      change: function (e) {

          ItemSeleccionadoAnidado = this.dataSource.view()[this.select().index()];

          var dataSource = this.dataSource;
          var filters = dataSource.filter();
          var allData = dataSource.data();
          var query = new kendo.data.Query(allData);
          var data = query.filter(filters).data;

          
          actuallongitudTrabajosAdicionales = data.length;;
          options.model.TemplateMensajeTrabajosAdicionales = " Ahora tienes " + actuallongitudTrabajosAdicionales + " trabajos adicionales";
          if (ItemSeleccionado.JuntaArmadoID != 0)
              ItemSeleccionado.Accion = 2;

      },
      columns: [
        { field: "TrabajoAdicional", title: 'Trabajo', editor: RenderComboBoxTrabajoAdicional, filterable: true, width: "100px" },
        { field: "Observacion", title: 'Observacion', filterable: true, width: "100px" },
        {
            command: {
                name: "",
                title: "",
                text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                click: function (e) {
                    e.preventDefault();

                    var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                    if (confirm(_dictionary.CapturaArmadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()]))
                    {
                            var dataSource = this.dataSource;

                            if (dataItem.JuntaArmadoID == "1")
                                dataSource.remove(dataItem);

                            dataItem.Accion = 3;



                            var filters = dataSource.filter();
                            var allData = dataSource.data();
                            var query = new kendo.data.Query(allData);
                            var data = query.filter(filters).data;

                            actuallongitudTrabajosAdicionales = data.length;

                            options.model.TemplateMensajeTrabajosAdicionales = " Ahora tienes " + actuallongitudTrabajosAdicionales + " trabajos adicionales"

                            this.dataSource.sync();
                    }

                    ///////////////////


                    //////////////////



                  
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

function RenderComboBoxTrabajoAdicional(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta 
    
    console.log("RenderComboBoxTrabajoAdicional la propiedad accion tiene el valor de:");
    console.log(options.model.Accion);
    console.log(options.model);

    $('<input required data-text-field="NombreCorto" id=' + options.model.uid + ' data-value-field="NombreCorto" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: ItemSeleccionado.listadoTrabajosAdicionalesXJunta,
            template: '<span class="#: data.SignoInformativo #">#: data.NombreCorto #</span>',
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.TrabajoAdicionalID = dataItem.TrabajoAdicionalID;
                options.model.TrabajoAdicional = dataItem.NombreCorto;
            }
            ,
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                options.model.TrabajoAdicionalID = options.model.TrabajoAdicionalID;
                options.model.TrabajoAdicional = dataItem.NombreCorto;
               // options.model.Observacion = dataItem.Observacion;
            }
        });

}

function onChange(e) {

}