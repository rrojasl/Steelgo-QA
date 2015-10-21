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
      autoSync: true,
      dataSource: {
          // batch: true,
          data: options.model.ListaDetalleTrabajoAdicional,
          schema: {
              model: {
                  fields: {

                      ArmadoTrabajoAdicionalID: { type: "string", editable: true },
                      JuntaArmadoID: { type: "string", editable: true },
                      TrabajoAdicionalID: { type: "string", editable: true },
                      TrabajoAdicional: { type: "string", editable: true },
                      ObreroID: { type: "string", editable: true },
                      Tubero: { type: "string", editable: true },
                      Observacion: { type: "string", editable: true }
                  }
              }
          }
      },
      edit: function (e) {
          var input = e.container.find(".k-input");
          var value = input.val();
          // alert("entra grid adicional" + options.model.DetalleAdicional.length);
          actuallongitudTrabajosAdicionales = options.model.ListaDetalleTrabajoAdicional.length;

          // if(anteriorlongitudTrabajosAdicionales<actuallongitudTrabajosAdicionales)
          options.model.TemplateMensajeTrabajosAdicionales = " Ahora tienes " + actuallongitudTrabajosAdicionales + " trabajos adicionales"


          //input.keyup(function () {
          //    value = input.val();
          //});
          //input.blur(function () {
          //    //$("#log").html(input.attr('name') + " blurred : " + value);
          //    //var a = new Date();
          //    //a = value;
          //    //var day = a.getDay();
          //    //alert(day);
          //    // alert(value);
          //    alert("blur");
          //    alert("sale" + e.model.DetalleAdicional.length);
          //    actuallongitudTrabajosAdicionales = e.model.DetalleAdicional.length;
          //});


      },
      columns: [
          { field: "TrabajoAdicional", title: 'Trabajo', editor: RenderComboBoxTrabajoAdicional, filterable: true, width: "100px" },
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
                       dataSource.remove(dataItem);

                       actuallongitudTrabajosAdicionales = options.model.ListaDetalleTrabajoAdicional.length;

                       // if (anteriorlongitudTrabajosAdicionales < actuallongitudTrabajosAdicionales)
                       options.model.TemplateMensajeTrabajosAdicionales = " Ahora tienes " + actuallongitudTrabajosAdicionales + " trabajos adicionales"

                   }
               }
           }], width: "60px"
       }],
      editable: true,
      toolbar: ["create"]
  });

    $("#" + options.model.SpoolID + '' + options.model.Junta).data("kendoGrid").dataSource.sync();


};

function RenderComboBoxTrabajoAdicional(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
    var dataItem;
    var textAnterior;
    $('<input required data-text-field="TrabajoAdicional" data-value-field="ArmadoTrabajoAdicionalID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaOpcionesTrabajoAdicional,
            template: "<i class=\"fa fa-#=data.TrabajoAdicional#\"></i> #=data.TrabajoAdicional#",
            select: function (e) {
                //dataItem = this.dataItem(e.item.index());
                //options.model.NumeroUnico1 = String(dataItem.Clave);
                //textAnterior = e.sender._prev;
            }
            ,
            change: function (e) {
                //options.model.NumeroUnico1 = String(dataItem.Clave)

                //AplicarAsignacionAutomaticaNumeroUnico(options.model, textAnterior, dataItem, 0);
                //$("#grid").data("kendoGrid").dataSource.sync();
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