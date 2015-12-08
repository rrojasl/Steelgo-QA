function RenderGridDetalle(container, options) {
    console.log(options.model.DetallePruebas);
    ListaDetalles = [];
    for (var index = 0; index < options.model.NumeroPlacas; index++) {
        ListaDetalles[index] = { idDetallePrueba: "", Ubicacion: "", Resultado: "", DetalleDefectos: "" };
        ListaDetalles[index].idDetallePrueba = "0"+""+index;
        ListaDetalles[index].Ubicacion = index + "-" + (index+1);
        //ListaDetalles[index].Resultado = "Resultado";
    }

    options.model.DetallePruebas = ListaDetalles;
    console.log(options.model.DetallePruebas);

    $('<div name=' + options.model.SpoolJunta + options.model.idDetallePrueba + '/>')
  .appendTo(container)
  .kendoGrid({

      dataSource: {
          batch: true,
          data: options.model.DetallePruebas,
          schema: {
              model: {
                  fields: {
                      Ubicacion: { type: "string", editable: false },
                      Resultado: { type: "string", editable: true },
                  }
              }
          }
      },

      selectable: true,

      columns: [

        { field: "Ubicacion", title: _dictionary.lblUbicacionCapturaDeReportePruebas[$("#language").data("kendoDropDownList").value()], filterable: true },
        { field: "Resultado", title: _dictionary.lblResultadoCapturaDeReportePruebas[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderComboResultadoPruebas },
         { field: "DetalleResultados", title: _dictionary.lblDetalleDefectosCapturaDeReportePruebas[$("#language").data("kendoDropDownList").value()], filterable: false, width: "400px", editor: RenderGridDetalleDefectos, template: "Ver detalle" },

      ], 
      editable: "incell",
      navigatable: true,
  });

 
};


function RenderGridDetalleDefectos(container, options) {
  
    ListaDefectos = [];
   
    ListaDefectos[0] = { idDetalleDefecto: "", Defecto: "", Inicio: "", Fin: "" };
    ListaDefectos[0].idDetallePrueba = "";
    //ListaDefectos[0].Defecto = "";
    ListaDefectos[0].Inicio = "";
    ListaDefectos[0].Fin = "";

    options.model.DetalleDefectos = ListaDefectos;
    console.log(options.model.DetalleDefectos);



    $('<div name=' + options.model.SpoolJunta + options.model.idDetalleDefecto + '/>')
   
  .appendTo(container)
  .kendoGrid({

      dataSource: {
          batch: true,
          data: options.model.DetalleDefectos,
          schema: {
              model: {
                  fields: {
                      idDetalleDefecto :{type: "string", editable:false},
                      Defecto: { type: "string", editable: true },
                      Inicio: { type: "string", editable: true },
                      Fin: { type: "string", editable: true },
                  }
              }
          }
      },

      selectable: true,
      columns: [
      { field: "idDetalleDefecto", title: _dictionary.lblDefectoCapturaDeReportePruebas[$("#language").data("kendoDropDownList").value()], filterable: true, hidden:true },
        { field: "Defecto", title: _dictionary.lblDefectoCapturaDeReportePruebas[$("#language").data("kendoDropDownList").value()], filterable: true, editor: RenderComboDefectos },
        { field: "Inicio", title: _dictionary.lblInicioCapturaDeReportePruebas[$("#language").data("kendoDropDownList").value()], filterable: true },
        { field: "Fin", title: _dictionary.lblFinCapturaDeReportePruebas[$("#language").data("kendoDropDownList").value()], filterable: true }

      ],
     
      editable: "incell",
      navigatable: true,
  });
};



function RenderComboResultadoPruebas(container, options) {
    $('<input required data-text-field="text" data-value-field="text" data-bind="value:' + options.field + '"/>')
   .appendTo(container)
   .kendoComboBox({
       dataTextField: "text",
       dataValueField: "value",
       dataSource: [
           { text: "Aprobada", value: "1" },
           { text: "Rechazada", value: "2" }
       ],
       template: "<i class=\"fa fa-#=data.text.toLowerCase()#\"></i> #=data.text#",
       change: function (e) {
           $("#grid").data("kendoGrid").dataSource.sync();
       }
   })
   
};



function RenderComboDefectos(container, options) {
    var dataItem;
    $('<input required data-text-field="text" data-value-field="text" data-bind="value:' + options.field + '"/>')
   .appendTo(container)
   .kendoComboBox({
       autoBind: false,
       dataSource: options.model.CatalogoDefectos,
       template: "<i class=\"fa fa-#=data.text.toLowerCase()#\"></i> #=data.text#",
       select: function (e) {
           dataItem = this.dataItem(e.item.index());
           options.model.Nombre = dataItem.Nombre;
           options.model.DefectoID = dataItem.DefectoID;
       },
       change: function (e) {
           dataItem = this.dataItem(e.sender.selectedIndex);
           options.model.Nombre = dataItem.Nombre;
           options.model.DefectoID = dataItem.DefectoID;
       }
   })

};


function MuestraColumna(TipoPrueba) {
    if (TipoPrueba === "RT")
        return false;
    else
        return true;



}