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

function RenderMultiselectRelleno(container, options) { 
    if (ItemSeleccionado.PermiteTerminadoRelleno) { 
        var multiselect = $('<input  data-text-field="Soldador" id=' + options.model.uid + ' data-value-field="ObreroID" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoMultiSelect({
                autoBind: false,
                dataSource: options.model.ListadoRelleno,
                template: "<i class=\"fa fa-#=data.Soldador.toLowerCase()#\"></i> #=data.Soldador#",
                select: function (e) {

                    dataItem = this.dataSource.view()[e.item.index()];

                    if (dataItem != undefined) {
                        var existe = false;
                        for (var i = 0 ; i < ItemSeleccionado.Relleno.length ; i++) {
                            if (dataItem.ObreroID == ItemSeleccionado.Relleno[i].ObreroID) {
                                existe = true;
                                break;
                            }
                        }

                        if (options.model.RellenoDetalle == null) {
                            options.model.RellenoDetalle = [];
                        }
                     
                        if (!existe) {
                            var accion = options.model.JuntaSoldaduraSoldadoID == undefined ? 1 : options.model.Accion;
                            options.model.RellenoDetalle.push({
                                Accion: accion,
                                JuntaSoldaduraSoldadoID: options.model.JuntaSoldaduraSoldadoID,
                                JuntaSoldaduraID: options.model.JuntaSoldaduraID,
                                Soldador: dataItem.Soldador,
                                ObreroID: dataItem.ObreroID
                            });
                        }
                        else {
                            displayMessage("CapturaSoldaduraMensajeSoldadorExistente", "", '1');
                            options.model.Soldador = "";
                            options.model.ObreroID = "";
                        } 
                    }
                    else {
                        options.model.Soldador = ObtenerDescCorrectaSoldadorRelleno(ItemSeleccionado.ListadoRelleno, options.model.ObreroID);
                    }
                },
                change: function () { 
                    if (longitudSoldadoresRelleno > options.model.Relleno.length) {
                        ValidarExisteSoldadorEnTrabajosAdicionales(options.model,"relleno");

                    }
                    else {
                        var actuallongitudTrabajosAdicionales = 0;
                        for (var k = 0; k < options.model.DetalleAdicional.length; k++) {
                            if (options.model.DetalleAdicional[k].Accion != 3) {
                                actuallongitudTrabajosAdicionales++;
                            }
                        }
                    }
                    
                    longitudSoldadoresRelleno = multiselect._values.length;
                    options.model.SoldadoresRelleno = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + longitudSoldadoresRelleno + _dictionary.CapturaSoldaduraMensajeCambioSoldadoresRelleno[$("#language").data("kendoDropDownList").value()];
                },
                value: options.model.Relleno
            }).data("kendoMultiSelect");
    }
    else
        displayMessage("CapturaSoldaduraMensajePermisoTerminadoRelleno", "", "1");

};

function RenderMultiselectRaiz(container, options) {

    if (ItemSeleccionado.PermiteTerminadoRaiz) {   
        var multiselect = $('<input  data-text-field="Soldador" id=' + options.model.uid + ' data-value-field="ObreroID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoMultiSelect({
            autoBind: false,
            dataSource: options.model.ListadoRaiz,
            template: "<i class=\"fa fa-#=data.Soldador.toLowerCase()#\"></i> #=data.Soldador#", 
            select: function (e) {

                dataItem = this.dataSource.view()[e.item.index()];
               
                if (dataItem != undefined) { 
                    var existe = false;
                    for (var i = 0 ; i < ItemSeleccionado.Raiz.length ; i++) {
                        if (dataItem.ObreroID == ItemSeleccionado.Raiz[i].ObreroID) {
                            existe = true;
                            break;
                        }
                    }
                     
                    if (options.model.RaizDetalle == null) {
                        options.model.RaizDetalle = []; 
                    }

                    if (!existe) {
                        var accion = options.model.JuntaSoldaduraSoldadoID == undefined ? 1 : options.model.Accion;
                        options.model.RaizDetalle.push({
                            Accion: accion,
                            JuntaSoldaduraSoldadoID: options.model.JuntaSoldaduraSoldadoID,
                            JuntaSoldaduraID: options.model.JuntaSoldaduraID,
                            Soldador: dataItem.Soldador,
                            ObreroID: dataItem.ObreroID
                        }); 
                    }
                    else {
                        displayMessage("CapturaSoldaduraMensajeSoldadorExistente", "", '1');
                        options.model.Soldador = "";
                        options.model.ObreroID = "";
                    }
 
                    
                }
                else {
                    options.model.Soldador = ObtenerDescCorrectaSoldador(ItemSeleccionado.ListadoRaiz, options.model.ObreroID); 
                }
            },
            change: function (e) {
                
                if (longitudSoldadoresRaiz > options.model.Raiz.length) {
                    ValidarExisteSoldadorEnTrabajosAdicionales(options.model,"raiz");
                }
                else {
                    var actuallongitudTrabajosAdicionales = 0;
                    for (var k = 0; k < options.model.DetalleAdicional.length; k++) {
                        if (options.model.DetalleAdicional[k].Accion != 3) {
                            actuallongitudTrabajosAdicionales++;
                        }
                    }
                }
                options.model.TrabajosAdicionales = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + actuallongitudTrabajosAdicionales + _dictionary.CapturaSoldaduraMensajeCambioTrabajosAdicionales[$("#language").data("kendoDropDownList").value()];
 
                longitudSoldadoresRaiz = multiselect._values.length;
                options.model.SoldadoresRaiz = _dictionary.CapturaSoldaduraMensajeCambioLongitud[$("#language").data("kendoDropDownList").value()] + longitudSoldadoresRaiz + _dictionary.CapturaSoldaduraMensajeCambioSoldadoresRaiz[$("#language").data("kendoDropDownList").value()];
            },
            value: options.model.Raiz
        }).data("kendoMultiSelect");
         
    }
    else
        displayMessage("CapturaSoldaduraMensajePermisoTerminadoRaiz", "", "1");
};

function renderEnlaceEditar(container, options) {
    $('<a  id=' + options.model.uid + ' "><span >' + _dictionary.ValidacionResultadosEnlaceEditar[$("#language").data("kendoDropDownList").value()] + '</span></a>')
        .appendTo(container)
        .click(function () {
            LlenarGridPopUp(options.model)
        });

}
 
function ObtenerDescCorrectaSoldador(lista, ObreroID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].ObreroID == ObreroID)
            return lista[i].Soldador;
    }
    return "";
}
 
function ObtenerDescCorrectaSoldadorRelleno(lista, ObreroID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].ObreroID == ObreroID)
            return lista[i].Soldador;
    }
    return "";
}


function RenderComboBoxSoldadorTrabajos(container, options) {
    loadingStart();
    var dataItem;


    $('<input required data-text-field="Soldador" data-value-field="Soldador" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            filter: "contains",
            autoBind: false,
            dataSource: ItemSeleccionado.Raiz,
            template: '<span class="#: data.Soldador #">#: data.Soldador #</span> ',
            select: function (e) {
            },
            change: function (e) {

                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {
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
                else {
                    options.model.Soldador = ObtenerDescCorrectaSoldadorTrabajos(ItemSeleccionado.ListadoSoldadoresTrabajos, options.model.ObreroID);

                }

            }
        }
        );
    $(".k-combobox").on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = this;
        if (!tieneClase(item)) {
            $(container).trigger(e);
        }
    });
    loadingStop();
}

function ObtenerDescCorrectaSoldadorTrabajos(lista, ObreroID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].ObreroID == ObreroID)
            return lista[i].Soldador;
    }
    return "";
}
function RenderComboBoxTrabajos(container, options) {
    loadingStart();
    var dataItem;

    $('<input required data-text-field="TrabajoAdicional" data-value-field="TrabajoAdicional" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                suggest: true,
                filter: "contains",
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
                    if (dataItem != undefined) {
                        options.model.Accion = options.JuntaSoldaduraID == undefined ? 1 : options.model.Accion;
                        options.model.TrabajoAdicional = dataItem.TrabajoAdicional;
                        options.model.TrabajoAdicionalID = dataItem.TrabajoAdicionalID;
                        //options.model.Observacion = options.model.Observacion;
                        options.model.Soldador = options.model.Soldador;
                        options.model.ObreroID = options.model.ObreroID;
                    }
                    else {
                        options.model.Soldador = ObtenerDescCorrectaTrabajos(ItemSeleccionado.listaTrabajosAdicionalesSoldadura, options.model.ObreroID);

                    }
                }
            }
            );
    $(".k-combobox").on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = this;
        if (!tieneClase(item)) {
            $(container).trigger(e);
        }
    });
    loadingStop();
}

function ObtenerDescCorrectaSoldadorTrabajos(lista, ObreroID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].ObreroID == ObreroID)
            return lista[i].Soldador;
    }
    return "";
}

function RenderComboBoxTaller(container, options) {
    loadingStart();
    var dataItem;
    $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="TallerID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            suggest: true,
            filter: "contains",
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
                if (dataItem != undefined) {
                    options.model.Taller = dataItem.Nombre;
                    options.model.TallerID = dataItem.TallerID;
                    
                }
                else {
                    options.model.Taller = ObtenerDescCorrectaTaller(ItemSeleccionado.ListaTaller, options.model.TallerID);

                }
            }
        }
        );
    $(".k-combobox").on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = this;
        if (!tieneClase(item)) {
            $(container).trigger(e);
        }
    });
    loadingStop();
}

function ObtenerDescCorrectaTaller(lista, TallerID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].TallerID == TallerID)
            return lista[i].Nombre;
    }
    return "";
}


function RenderComboBoxProcesoSoldaduraRaiz(container, options) {
    loadingStart();
    if (ItemSeleccionado.PermiteTerminadoRaiz) {

        var dataItem;
        $('<input required data-text-field="Codigo" id=' + options.model.uid + ' data-value-field="Codigo" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                suggest: true,
                filter: "contains",
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
                    if (dataItem != undefined) {
                        options.model.procesoSoldaduraRaiz = dataItem.Codigo
                        options.model.procesoSoldaduraRaizID = dataItem.ProcesoSoldaduraID
                        AjaxActualizaSoldadoresRaiz(dataItem.ProcesoSoldaduraID, ItemSeleccionado.TipoJunta, ItemSeleccionado.Diametro, ItemSeleccionado.Espesor, ItemSeleccionado.Cedula);
                    }
                    else {
                        options.model.procesoSoldaduraRaiz = ObtenerDescCorrectaSoldaduraRaiz(ItemSeleccionado.ListadoProcesoSoldadura, options.model.procesoSoldaduraRaizID);

                    }
                }

            }
            );
        $(".k-combobox").on('mouseleave', function (send) {
            var e = $.Event("keydown", { keyCode: 27 });
            var item = this;
            if (!tieneClase(item)) {
                $(container).trigger(e);
            }
        });
    }
    else
        displayMessage("CapturaSoldaduraMensajePermisoTerminadoRaiz", "", "1");
    loadingStop();
}

function ObtenerDescCorrectaSoldaduraRaiz(lista, procesoSoldaduraRaizID) {
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].ProcesoSoldaduraID == procesoSoldaduraRaizID)
            return lista[i].Codigo;
    }
    return "";
}


function RenderComboBoxProcesoSoldaduraRelleno(container, options) {
    loadingStart();
    if (ItemSeleccionado.PermiteTerminadoRelleno) {

        var dataItem;
        $('<input required data-text-field="Codigo" id=' + options.model.uid + ' data-value-field="Codigo" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                suggest: true,
                filter: "contains",
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
                    if (dataItem != undefined) {
                        options.model.procesoSoldaduraRelleno = dataItem.Codigo;
                        options.model.procesoSoldaduraRellenoID = dataItem.ProcesoSoldaduraID;
                        AjaxActualizaSoldadoresRelleno(dataItem.ProcesoSoldaduraID, ItemSeleccionado.TipoJunta, ItemSeleccionado.Diametro, ItemSeleccionado.Espesor, ItemSeleccionado.Cedula);
                    }
                }
            }
            );
        $(".k-combobox").on('mouseleave', function (send) {
            var e = $.Event("keydown", { keyCode: 27 });
            var item = this;
            if (!tieneClase(item)) {
                $(container).trigger(e);
            }
        });
    }
    else
        displayMessage("CapturaSoldaduraMensajePermisoTerminadoRelleno", "", "1");
    loadingStop();
}

function tieneClase(item) {
    for (var i = 0; i < item.classList.length; i++) {
        if (item.classList[i] == "k-state-border-up" || item.classList[i] == "k-state-border-down") {
            return true;
        }
    }
    return false
}