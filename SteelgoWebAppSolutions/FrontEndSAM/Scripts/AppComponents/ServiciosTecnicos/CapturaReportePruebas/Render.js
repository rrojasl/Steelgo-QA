function RenderGridDetalle(container, options) {
    console.log(options.model.ListaDetalleTrabajoAdicional);
    $('<div name=' + options.model.SpoolID + '' + options.model.Junta + '/>')
  .appendTo(container)
  .kendoGrid({

      dataSource: {
          batch: true,
          data: JSON.parse(options.model.ListaDetalleTrabajoAdicional),
         
          schema: {
              model: {
                  fields: {
                      NumeroPlaca: { type: "string", editable: true },
                      NumeroPlacas: { type: "string", editable: true },
                      Tamano: { type: "string", editable: true },
                      Densidad: { type: "string", editable: true },
                      Ubicacion: { type: "string", editable: true },
                      Resultado: { type: "string", editable: true },
                      DetalleResultados: { type: "string", editable: true },
                      TemplateMensajeDetalles: { type: "string", editable: true },
                  }
              }
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
          options.model.TemplateMensajeTrabajosAdicionales = " Ahora tienes " + actuallongitudTrabajosAdicionales + " resultados";
          if (ItemSeleccionado.JuntaArmadoID != 0)
              ItemSeleccionado.Accion = 2;

      },
      //
      columns: [
      
        { field: "Ubicacion", title: 'Ubicación', filterable: true },
        { field: "Resultado", title: 'Resultado', filterable: true },
         { field: "DetalleResultados", title: "Detalle Defectos", filterable: false, width: "400px", editor: RenderGridDetalleDefectos, template: "#:TemplateMensajeDetalles#" },
          
      ], saveChanges: function (e) {
          if (!confirm("Are you sure you want to save all changes?")) {
              e.preventDefault();
          }
      },
      editable: "incell",
      navigatable: true,
  });

};

function MuestraColumna(TipoPrueba) {
    if (TipoPrueba === "RT")
        return false;
    else
        return true;

        
   
}
function RenderGridDetalleDefectos(container, options) {
  
    $('<div name=' + options.model.SpoolID + '' + options.model.Junta + '/>')
   
  .appendTo(container)
  .kendoGrid({

      dataSource: {
         
          data: [{
              NumeroPlaca: 1,
              Defecto: "P",
              Inicio: "5",
              Fin:"8",
          }, {
              NumeroPlaca: 2,
              Defecto: "FF",
              Inicio: "9",
              Fin: "9.5",
          }],
          schema: {
              model: {
                  fields: {
                
                      Defecto: { type: "string", editable: true },
                      Inicio: { type: "string", editable: true },
                      Fin: { type: "string", editable: true },
                  }
              }
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
          options.model.TemplateMensajeTrabajosAdicionales = " Ahora tienes " + actuallongitudTrabajosAdicionales + " resultados";
          if (ItemSeleccionado.JuntaArmadoID != 0)
              ItemSeleccionado.Accion = 2;

      },
      columns: [
      
        { field: "Defecto", title: 'Defecto', filterable: true },
        { field: "Inicio", title: 'Inicio', filterable: true },
        { field: "Fin", title: 'Fin', filterable: true }

      ], saveChanges: function (e) {
          if (!confirm("Are you sure you want to save all changes?")) {
              e.preventDefault();
          }
      },
      editable: "incell",
      navigatable: true,
  });
};