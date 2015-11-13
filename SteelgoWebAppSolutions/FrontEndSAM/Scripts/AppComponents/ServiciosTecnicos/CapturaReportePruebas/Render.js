function RenderGridDetalle(container, options) {
    //container  contiene las propiedades de la celda
    //options contiene el modelo del datasource ejemplo options.model.Junta
 
    //console.log("modelo de la fila seleccionada");
    //console.log(options.model.ListaDetalleTrabajoAdicional);
    //console.log(JSON.parse(JSON.stringify("{NumeroPlacas: '3', Tamano: '25', Densidad: 'X002-1'}")));
    //console.log({ NumeroPlacas: "3", Tamano: "25", Densidad: "X002-1" }, { NumeroPlacas: "1", Tamano: "1", Densidad: "X002-1" });
    //console.log(JSON.stringify("{NumeroPlacas: '3', Tamano: '25', Densidad: 'X002-1'}"));
    //console.log(JSON.parse('{"NumeroPlacas":"3","Tamano":"25","Densidad":"22mm"}'));
    //console.log(JSON.parse(options.model.ListaDetalleTrabajoAdicional));


    $('<div name=' + options.model.SpoolID + '' + options.model.Junta + '/>')
  .appendTo(container)
  .kendoGrid({

      dataSource: {
          batch: true,
          data: JSON.parse(options.model.ListaDetalleTrabajoAdicional),
         
          schema: {
              model: {
                  fields: {

                      NumeroPlacas: { type: "string", editable: true },
                      Tamano: { type: "string", editable: true },
                      Densidad: { type: "string", editable: true },
                      Ubicacion: { type: "string", editable: true },
                      Resultado: { type: "string", editable: true },
                     
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
        { field: "NumeroPlacas", title: 'Placas', filterable: true, hidden: MuestraColumna(options.model.TipoPrueba) },
        { field: "Tamano", title: 'Tamaño', filterable: true, hidden: MuestraColumna(options.model.TipoPrueba) },
        { field: "Densidad", title: 'Densidad', filterable: true, hidden: MuestraColumna(options.model.TipoPrueba) },
        { field: "Ubicacion", title: 'Ubicación', filterable: true, hidden: MuestraColumna(options.model.TipoPrueba) },
        { field: "Resultado", title: 'Resultado', filterable: true },
       
      ], saveChanges: function (e) {
          if (!confirm("Are you sure you want to save all changes?")) {
              e.preventDefault();
          }
      },
      editable: "incell",
      navigatable: true,
      //toolbar: [{ name: "create" }]
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
          // batch: true,
          data: JSON.parse(options.model.ListaDetalleTrabajoAdicional),
          schema: {
              model: {
                  fields: {

                      NumeroPlacas: { type: "int", editable: false },
                      Tamano: { type: "string", editable: false },
                      Densidad: { type: "string", editable: false },
                      Ubicacion: { type: "string", editable: false },
                      Resultado: { type: "string", editable: true },

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
        { field: "NumeroPlacas", title: 'Placas', filterable: true },
        { Tamano: "Tamano", title: 'Tamaño', filterable: true },
        { Tamano: "Densidad", title: 'Tamaño', filterable: true },
        { Tamano: "Ubicacion", title: 'Tamaño', filterable: true },
        { Tamano: "Resultado", title: 'Tamaño', filterable: true },

      ], saveChanges: function (e) {
          if (!confirm("Are you sure you want to save all changes?")) {
              e.preventDefault();
          }
      },
      editable: "incell",
      navigatable: true,
      //toolbar: [{ name: "create" }]
  });




};