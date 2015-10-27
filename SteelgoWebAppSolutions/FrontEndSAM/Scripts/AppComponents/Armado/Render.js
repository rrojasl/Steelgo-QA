function RenderComboBoxTaller(container, options) {

    loadingStart();
    var dataItem;
    $('<input required data-text-field="Nombre" data-value-field="TallerID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaTaller,
            template: "<i class=\"fa fa-#=data.Nombre.toLowerCase()#\"></i> #=data.Nombre#",
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Taller = dataItem.Nombre
                options.model.TallerID = dataItem.TallerID
            },
            change: function (e) {
                options.model.Taller = dataItem.Nombre
                // alert(e);
                //e.select = true;
                //var value = this.value();
                //$("#InputID").val(e.)
                ////if (!value) {
                ////    Proveedor = {};
                ////};
                //alert('evento change ID con el status' + value);
                // $("#InputID").data("kendoComboBox").select(1)
            }
        }
        );
    loadingStop();

}

function RenderComboBoxTubero(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    loadingStart();
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
                options.model.Tubero = dataItem.Codigo;
                // alert(e);
                //e.select = true;
                //var value = this.value();
                //$("#InputID").val(e.)
                ////if (!value) {
                ////    Proveedor = {};
                ////};
                //alert('evento change ID con el status' + value);
                // $("#InputID").data("kendoComboBox").select(1)
            }
        }
        );


    loadingStop();
};

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
                options.model.NumeroUnico1 = String(dataItem.Clave)

                AplicarAsignacionAutomaticaNumeroUnico(options.model, textAnterior, dataItem, 0);
                $("#grid").data("kendoGrid").dataSource.sync();
                // alert(e);
                //e.select = true;
                //var value = this.value();
                //$("#InputID").val(e.)
                ////if (!value) {
                ////    Proveedor = {};
                ////};
                //alert('evento change ID con el status' + value);
                // $("#InputID").data("kendoComboBox").select(1)
            }
        });
};

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

                 options.model.NumeroUnico2 = String(dataItem.Clave)

                 AplicarAsignacionAutomaticaNumeroUnico(options.model, textAnterior, dataItem, 0);
                 $("#grid").data("kendoGrid").dataSource.sync();
                 //  alert(e);
                 //e.select = true;
                 //var value = this.value();
                 //$("#InputID").val(e.)
                 ////if (!value) {
                 ////    Proveedor = {};
                 ////};
                 //alert('evento change ID con el status' + value);
                 // $("#InputID").data("kendoComboBox").select(1)
             }
         });
};

function RenderGridDetalle(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    //alert("registros actuales" + options.model.DetalleAdicional.length);
   

    $('<div id=' + options.model.SpoolID + '' + options.model.Junta + '/>')
  .appendTo(container)
  .kendoGrid({

      dataSource: {
          // batch: true,
          data: options.model.ListaDetalleTrabajoAdicional,
          schema: {
              model: {
                  fields: {
                      IdTrabajoAdicional: { type: "int", editable: false },
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
          }
      },
      selectable: true,
      edit: function (e) {
          var input = e.container.find(".k-input");
          var value = input.val();
          actuallongitudTrabajosAdicionales = options.model.ListaDetalleTrabajoAdicional.length;
          options.model.TemplateMensajeTrabajosAdicionales = " Ahora tienes " + actuallongitudTrabajosAdicionales + " trabajos adicionales";

          input.blur(function (e) {
              //   alert("blur");
          });
          input.focus(function () {
              console.log(ItemSeleccionado.Accion);
              if (ItemSeleccionado.JuntaArmadoID != 0)
                ItemSeleccionado.Accion = 2;
              console.log(ItemSeleccionado.Accion);
          });
      },
      columns: [
        { field: "TrabajoAdicional", title: 'Trabajo', filterable: true, width: "100px" },
        { field: "Observacion", title: 'Observacion', filterable: true, width: "100px" },
       {
           command: [{
               name: "Eliminar",
               text: "-",
               click: function (e) {
                   e.preventDefault();
                   var dataItem = $("#" + options.model.SpoolID + '' + options.model.Junta).data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
                   if (confirm(_dictionary.CapturaArmadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()])) {

                       var dataSource = $("#" + options.model.SpoolID + '' + options.model.Junta).data("kendoGrid").dataSource;

                       if (dataItem.JuntaArmadoID == "1")
                           dataSource.remove(dataItem);

                       dataItem.Accion = 3;
                       
                       //var filter

                       //filter= {
                           
                       //    logic: "or",
                       //    filters: [
                       //      { field: "Accion", operator: "eq", value: 1 },
                       //      { field: "Accion", operator: "eq", value: 2 }
                       //    ]
                       //}

                       //dataSource.filter(filter);

                       actuallongitudTrabajosAdicionales = options.model.ListaDetalleTrabajoAdicional.length;

                       // if (anteriorlongitudTrabajosAdicionales < actuallongitudTrabajosAdicionales)
                       options.model.TemplateMensajeTrabajosAdicionales = " Ahora tienes " + actuallongitudTrabajosAdicionales + " trabajos adicionales"
                      // dataSource.sync();
                   }
               }
           }], width: "60px"
       }
      ],
      editable: true,
      navigatable: true,
      toolbar: [{name: "create"}]
  });

    $("#" + options.model.SpoolID + '' + options.model.Junta).data("kendoGrid").dataSource.sync();
};

function RenderComboBoxTrabajoAdicional(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta 

    $('<input required data-text-field="NombreCorto" id=' + options.model.uid + ' data-value-field="NombreCorto" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: ItemSeleccionado.listadoTrabajosAdicionalesXJunta,
            template: '<span class="#: data.SignoInformativo #">#: data.NombreCorto #</span>',
            select: function (e) {
                dataItem = this.dataItem(e.item.index());
                options.model.Accion = 1;
                options.model.TrabajoAdicional = dataItem.NombreCorto;
                options.model.TrabajoAdicionalID = dataItem.TrabajoAdicionalID;
                options.model.Observacion = dataItem.Observacion;
            },
            change: onChange
        });

};


function onChange(e) {
    var value = $("#color").val();
    $("#cap")
        .toggleClass("black-cap", value == 1)
        .toggleClass("orange-cap", value == 2)
        .toggleClass("grey-cap", value == 3);
};
//function RenderComboBoxTrabajoAdicional(container, options, data) {


//    var dataAsignado = data == undefined ? ItemSeleccionado.listadoTrabajosAdicionalesXJunta : data;
//    var input = $('<input/>')
//    input.appendTo(container)
//    input.kendoComboBox({
//        autoBind: true,
//        placeholder: "select...",
//        suggest: true,
//        dataTextField: "NombreCorto",
//        dataValueField: "TrabajoAdicionalID",
//        dataSource: dataAsignado,
//        change: function (e) {
//            var dataItem = this.dataItem();
//           // options.model[fieldName]['rego'] = dataItem.rego;
//           // options.model.set(fieldName + '.display', dataItem.display);
//        }
//    });
//}