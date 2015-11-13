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
                      ObreroID: { type: "int", editable: true },
                      Soldador: { type: "string", editable: true },
                      Observacion: { type: "string", editable: true }
                  }
              }
          }, filter: {
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


          actuallongitudTrabajosAdicionales = data.length;
          options.model.TrabajosAdicionales = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + actuallongitudTrabajosAdicionales + _dictionary.CapturaSoldaduraMensajeCambioTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];
          if (ItemSeleccionadoAnidado.JuntaSoldaduraID != 0 && ItemSeleccionadoAnidado.JuntaSoldaduraID != undefined)
              ItemSeleccionadoAnidado.Accion = 2;

      },
      columns: [
        { field: "TrabajoAdicional", title: _dictionary.CapturaSoldaduraHeaderTrabajosAdicionalesAnidado[$("#language").data("kendoDropDownList").value()], filterable: true, width: "100px", editor: RenderComboBoxTrabajos },
        { field: "Soldador", title: _dictionary.CapturaSoldaduraHeaderSoldador[$("#language").data("kendoDropDownList").value()], filterable: true, width: "100px", editor: RenderComboBoxSoldadorTrabajos },
        { field: "Observacion", title: _dictionary.CapturaSoldaduraHeaderObservacion[$("#language").data("kendoDropDownList").value()], filterable: true, width: "100px" },

       {
           command: {
               name: "",
               title: "",
               text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
               click: function (e) {
                   e.preventDefault();
                   dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                   var dataSource = this.dataSource;
                   
                       if (confirm(_dictionary.CapturaSoldaduraPreguntaBorradoCapturaTrabajoAdicional[$("#language").data("kendoDropDownList").value()])) {
                           dataItem.Accion = 3;
                       }
                       var filters = dataSource.filter();
                       var allData = dataSource.data();
                       var query = new kendo.data.Query(allData);
                       var data = query.filter(filters).data;

                       actuallongitudTrabajosAdicionales = data.length;
                       options.model.TrabajosAdicionales = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + actuallongitudTrabajosAdicionales + _dictionary.CapturaSoldaduraMensajeCambioTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];
                       dataSource.sync();
                   
               }
           }, width: "100px"
       }],
      editable: true,
      navigatable: true,
      toolbar: [{ name: "create", }]
  });

};

function RenderGridRelleno(container, options) {

    if (ItemSeleccionado.PermiteTerminadoRelleno) {

        //container.editable(false);

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
                          JuntaSoldaduraSoldadoID: { type: "int", editable: true },
                          JuntaSoldaduraID: { type: "int", editable: true },
                          Accion: { type: "string", editable: true },
                          ObreroID: { type: "int", editable: true },
                          Soldador: { type: "string", editable: true },
                          WPS: { type: "string", editable: false },
                      }
                  }
              }, filter: {
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


              longitudSoldadoresRelleno = data.length;
              options.model.SoldadoresRelleno = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + longitudSoldadoresRelleno + _dictionary.CapturaSoldaduraMensajeCambioSoldadoresRelleno[$("#language").data("kendoDropDownList").value()];
              if (ItemSeleccionadoAnidado.JuntaSoldaduraID != 0)
                  ItemSeleccionadoAnidado.Accion = 2;

          },
          columns: [
            { field: "Soldador", title: _dictionary.CapturaSoldaduraHeaderSoldador[$("#language").data("kendoDropDownList").value()], filterable: true, width: "100px", editor: RenderComboBoxSoldadorRelleno },
           {
               command: {
                   name: "",
                   title: "",
                   text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                   click: function (e) {
                       e.preventDefault();
                       var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                       var dataSource = this.dataSource;
                       if (confirm(_dictionary.CapturaSoldaduraPreguntaBorradoCapturaProceso[$("#language").data("kendoDropDownList").value()])) {

                           dataItem.Accion = 3;

                           var filters = dataSource.filter();
                           var allData = dataSource.data();
                           var query = new kendo.data.Query(allData);
                           var data = query.filter(filters).data;

                           longitudSoldadoresRelleno = data.length;
                           options.model.SoldadoresRelleno = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + longitudSoldadoresRelleno + _dictionary.CapturaSoldaduraMensajeCambioSoldadoresRelleno[$("#language").data("kendoDropDownList").value()];
                       }
                       dataSource.sync();
                   }
               },
               width: "90px"
           }],

          editable: true,
          navigatable: true,
          toolbar: [{ name: "create", }]
      });
    }
    else
        displayMessage("CapturaSoldaduraMensajePermisoTerminadoRelleno", "", "1");

};

function RenderGridRaiz(container, options) {

    if (ItemSeleccionado.PermiteTerminadoRaiz) {


        //container  contiene las propiedades de la celda
        //options contiene el modelo del datasource ejemplo options.model.Junta
        $('<div id=' + options.model.SpoolID + 'Raiz' + options.model.Junta + '/>')
      .appendTo(container)
      .kendoGrid({
          dataSource: {
              data: options.model.Raiz,
              schema: {
                  model: {
                      fields: {
                          JuntaSoldaduraSoldadoID: { type: "int", editable: true },
                          Accion: { type: "string", editable: true },
                          ObreroID: { type: "int", editable: true },
                          Soldador: { type: "string", editable: true },
                          WPS: { type: "string", editable: false },
                      }
                  }
              }, filter: {
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


              longitudSoldadoresRaiz = data.length;;
              options.model.SoldadoresRaiz = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + longitudSoldadoresRaiz + _dictionary.CapturaSoldaduraMensajeCambioSoldadoresRaiz[$("#language").data("kendoDropDownList").value()];
              if (ItemSeleccionadoAnidado.JuntaSoldaduraID != 0)
                  ItemSeleccionadoAnidado.Accion = 2;

          },
          columns: [
            { field: "Soldador", title: _dictionary.CapturaSoldaduraHeaderSoldador[$("#language").data("kendoDropDownList").value()], filterable: true, width: "100px", editor: RenderComboBoxSoldador },
           {
               command: {
                   name: "",
                   title: "",
                   text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                   click: function (e) {
                       e.preventDefault();
                       var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                       var dataSource = this.dataSource;
                       if (confirm(_dictionary.CapturaSoldaduraPreguntaBorradoCapturaProceso[$("#language").data("kendoDropDownList").value()])) {

                           dataItem.Accion = 3;

                           var filters = dataSource.filter();
                           var allData = dataSource.data();
                           var query = new kendo.data.Query(allData);
                           var data = query.filter(filters).data;

                           longitudSoldadoresRaiz = data.length;
                           options.model.SoldadoresRaiz = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + longitudSoldadoresRaiz + _dictionary.CapturaSoldaduraMensajeCambioSoldadoresRaiz[$("#language").data("kendoDropDownList").value()];
                       }


                       dataSource.sync();
                   }
               }, width: "60px"
           }],
          beforeEdit: function (e) {

              if (ItemSeleccionado.PermiteTerminadoRaiz) {
                  e.preventDefault();
              }
          },
          editable: true,
          navigatable: true,
          toolbar: [{ name: "create", }]
      });
    }
    else
        displayMessage("CapturaSoldaduraMensajePermisoTerminadoRaiz", "", "1");
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
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                var existe = false;
                for (var i = 0 ; i < ItemSeleccionado.Raiz.length ; i++) {
                    if (dataItem.ObreroID == ItemSeleccionado.Raiz[i].ObreroID) {
                        existe = true;
                        break;
                    }
                }
                if (!existe) {
                    options.model.Accion = options.model.JuntaSoldaduraID == undefined ? 1 : options.model.Accion;
                    options.model.JuntaSoldaduraSoldadoID = options.model.JuntaSoldaduraSoldadoID;
                    options.model.JuntaSoldaduraID = options.model.JuntaSoldaduraID;
                    options.model.Soldador = dataItem.Soldador;
                    options.model.ObreroID = dataItem.ObreroID;
                }
                else {
                    displayMessage("CapturaSoldaduraMensajeSoldadorExistente", "", '1');
                    options.model.Soldador = "";
                    options.model.ObreroID = "";
                }
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

            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                var existe = false;
                for (var i = 0 ; i < ItemSeleccionado.Relleno.length ; i++) {
                    if (dataItem.ObreroID == ItemSeleccionado.Relleno[i].ObreroID) {
                        existe = true;
                        break;
                    }
                }
                if (!existe) {
                    options.model.Accion = options.model.JuntaSoldaduraID == undefined ? 1 : options.model.Accion;
                    options.model.JuntaSoldaduraSoldadoID = options.model.JuntaSoldaduraSoldadoID;
                    options.model.JuntaSoldaduraID = options.model.JuntaSoldaduraID;
                    options.model.Soldador = dataItem.Soldador;
                    options.model.ObreroID = dataItem.ObreroID;
                }
                else {
                    displayMessage("CapturaSoldaduraMensajeSoldadorExistente", "", '1');
                    options.model.Soldador = "";
                    options.model.ObreroID = "";
                }
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
            },
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                var existe = false;
                for (var i = 0 ; i < ItemSeleccionado.DetalleAdicional.length ; i++) {
                    if (dataItem.ObreroID == ItemSeleccionado.DetalleAdicional[i].ObreroID) {
                        existe = true;
                        break;
                    }
                }
                if (!existe) {
                    options.model.Accion = options.model.JuntaSoldaduraID == undefined ? 1 : options.model.Accion;
                    options.model.JuntaSoldaduraSoldadoID = options.model.JuntaSoldaduraSoldadoID;
                    options.model.Soldador = dataItem.Soldador;
                    options.model.ObreroID = dataItem.ObreroID;
                    //options.model.Observacion = options.model.Observacion;
                }
                else {
                    displayMessage("CapturaSoldaduraMensajeSoldadorExistente", "", '1');
                    options.model.Soldador = "";
                    options.model.ObreroID = "";
                }

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
                template: '<span class="#: data.SignoInformativo #">#: data.TrabajoAdicional #</span> ',
                select: function (e) {
                    dataItem = this.dataItem(e.item.index());
                    options.model.Accion = options.model.JuntaSoldaduraID == undefined ? 1 : options.model.Accion;
                    options.model.TrabajoAdicional = dataItem.TrabajoAdicional;
                    options.model.TrabajoAdicionalID = dataItem.TrabajoAdicionalID;
                    //options.model.Observacion = options.model.Observacion;
                    options.model.Soldador = options.model.Soldador;
                    options.model.ObreroID = options.model.ObreroID;
                },
                change: function (e) {
                    dataItem = this.dataItem(e.sender.selectedIndex);
                    options.model.Accion = options.JuntaSoldaduraID == undefined ? 1 : options.model.Accion;
                    options.model.TrabajoAdicional = dataItem.TrabajoAdicional;
                    options.model.TrabajoAdicionalID = dataItem.TrabajoAdicionalID;
                    //options.model.Observacion = options.model.Observacion;
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
            select: function (e) {

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
    if (ItemSeleccionado.PermiteTerminadoRaiz) {
        
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
                    AjaxActualizaSoldadoresRaiz(dataItem.ProcesoSoldaduraID, ItemSeleccionado.TipoJunta, ItemSeleccionado.Diametro, ItemSeleccionado.Espesor, ItemSeleccionado.Cedula);
                },

            }
            );
    }
    else
        displayMessage("CapturaSoldaduraMensajePermisoTerminadoRaiz", "", "1");
    loadingStop();
}


function RenderComboBoxProcesoSoldaduraRelleno(container, options) {
    loadingStart();
    if (ItemSeleccionado.PermiteTerminadoRelleno) {
        
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
                    AjaxActualizaSoldadoresRelleno(dataItem.ProcesoSoldaduraID, ItemSeleccionado.TipoJunta, ItemSeleccionado.Diametro, ItemSeleccionado.Espesor, ItemSeleccionado.Cedula);
                },
            }
            );
    }
    else
        displayMessage("CapturaSoldaduraMensajePermisoTerminadoRelleno", "", "1");
    loadingStop();
}