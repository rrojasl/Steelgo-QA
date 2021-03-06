﻿var listaDefectosAuxiliar;
var infoGridTemp = null;
var llamadasATodos = 0;
var numeroPlacasAnteriorElemento;
var dataItem;

var dataItemTipoSalidaAterior;
function RenderTipoSalida(container, options) {
    
    dataItemTipoSalidaAterior = { TipoSalidaID: options.model.TipoSalidaID, TipoSalida: options.model.TipoSalida };
    //if (options.model.TipoSalidaID == 2) {
    $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="TipoSalidaID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.TipoSalidaLista,
            dataTextField: "Nombre",
            dataValueField: "TipoSalidaID",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined) {

                    if (dataItemTipoSalidaAterior.TipoSalidaID == 0) {


                        options.model.TipoSalidaID = dataItem.TipoSalidaID;
                        options.model.TipoSalida = dataItem.Nombre;

                        options.model.SpoolItemCodeID = 0;
                        options.model.SpoolItemCode = '';

                        if (options.model.ClaveSalida.match('^JC')) {
                            currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].TipoSalidaID = dataItem.TipoSalidaID;
                            currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].TipoSalida = dataItem.Nombre;

                            currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].SpoolItemCodeID = 0;
                            currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].SpoolItemCode = '';

                        }
                        else {
                            currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].TipoSalidaID = dataItem.TipoSalidaID;
                            currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].TipoSalida = dataItem.Nombre;

                            currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].SpoolItemCodeID = 0;
                            currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].SpoolItemCode = '';
                        }

                        $("#grid_" + currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].Posicion).data("kendoGrid").refresh();

                    }
                    else {
                        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                            iframe: true,
                            title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
                            visible: false,
                            width: "auto",
                            height: "auto",
                            modal: true,
                            animation: {
                                close: false,
                                open: false
                            }
                        }).data("kendoWindow");

                        ventanaConfirm.content("Los registros capturados no han sido guardados ¿Desea continuar?"/*_dictionary.ListadoCatalogos0011[$("#language").data("kendoDropDownList").value()]*/ +
                            "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'>No</button></center>");

                        ventanaConfirm.open().center();

                        $("#yesButton").click(function () {
                            options.model.TipoSalidaID = dataItem.TipoSalidaID;
                            options.model.TipoSalida = dataItem.Nombre;

                            options.model.SpoolItemCodeID = 0;
                            options.model.SpoolItemCode = '';

                            options.model.DetalleMaterialSpoolID = 0;
                            options.model.DetalleMaterialSpool = '';
                            options.model.DetalleJuntaSpoolID = 0;
                            options.model.DetalleJuntaSpool = '';
                            options.model.TipoJuntaID = 0;
                            options.model.TipoJunta = '';
                            options.model.Cedula = '';
                            options.model.FamiliaAceroMaterial1ID = 0;
                            options.model.FamiliaAceroMaterial1 = '';
                            options.model.FamiliaAceroMaterial2ID = 0;
                            options.model.FamiliaAceroMaterial2 = '';
                            options.model.Diametro = 0.0;
                            options.model.TipoCorte1ID = 0;
                            options.model.TipoCorte1 = '';
                            options.model.TipoCorte2ID = 0;
                            options.model.TipoCorte2 = '';
                            options.model.Cantidad = 0;

                            if (options.model.ClaveSalida.match('^JC')) {
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].TipoSalidaID = dataItem.TipoSalidaID;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].TipoSalida = dataItem.Nombre;

                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].SpoolItemCodeID = 0;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].SpoolItemCode = '';
                                
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].DetalleMaterialSpoolID = 0;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].DetalleMaterialSpool = '';
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].DetalleJuntaSpoolID = 0;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].DetalleJuntaSpool = '';
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].TipoJuntaID = 0;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].TipoJunta = '';
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].Cedula = '';
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].FamiliaAceroMaterial1ID = 0;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].FamiliaAceroMaterial1 = '';
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].FamiliaAceroMaterial2ID = 0;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].FamiliaAceroMaterial2 = '';
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].Diametro = 0.0;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].TipoCorte1ID = 0;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].TipoCorte1 = '';
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].TipoCorte2ID = 0;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].TipoCorte2 = '';
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].Cantidad = 0;
                            }
                            else {
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].TipoSalidaID = dataItem.TipoSalidaID;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].TipoSalida = dataItem.Nombre;

                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].SpoolItemCodeID = 0;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].SpoolItemCode = '';

                                currentSpoolMaster.detalleSalidas[currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].PosicionSalidaPadre].SalidasEstandar[currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].PosicionSalida].DetalleMaterialSpoolID = 0;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].DetalleMaterialSpool = '';
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].DetalleJuntaSpoolID = 0;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].DetalleJuntaSpool = '';
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].TipoJuntaID = 0;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].TipoJunta = '';
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].Cedula = '';
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].FamiliaAceroMaterial1ID = 0;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].FamiliaAceroMaterial1 = '';
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].FamiliaAceroMaterial2ID = 0;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].FamiliaAceroMaterial2 = '';
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].Diametro = 0.0;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].TipoCorte1ID = 0;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].TipoCorte1 = '';
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].TipoCorte2ID = 0;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].TipoCorte2 = '';
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].Cantidad = 0;
                            }

                            $("#grid_" + currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].Posicion).data("kendoGrid").refresh();

                            ventanaConfirm.close();
                        });
                        $("#noButton").click(function () {
                            options.model.TipoSalidaID = dataItemTipoSalidaAterior.TipoSalidaID;
                            options.model.TipoSalida = dataItemTipoSalidaAterior.TipoSalida;
                            $("#grid_" + currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].Posicion).data("kendoGrid").refresh();
                            
                            ventanaConfirm.close();
                        });
                    }
                }
                
                ////options.model.TipoSalidaID = dataItem.SalidaID;
                ////options.model.TipoSalida = dataItem.Titulo;


            }
        });

}

function RenderTipoCorte1(container, options) {

    $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="TipoCorteID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.TipoCorte1Lista,
            dataTextField: "Nombre",
            dataValueField: "TipoCorteID",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                options.model.TipoCorte1ID = dataItem.TipoCorteID;
                options.model.TipoCorte1 = dataItem.Nombre;

                if (options.model.ClaveSalida.match('^JC')) {
                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].TipoCorte1ID = dataItem.TipoCorteID;
                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].TipoCorte1 = dataItem.Nombre;
                }
                else {
                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].TipoCorte1ID = dataItem.TipoCorteID;
                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].TipoCorte1 = dataItem.Nombre;
                }
                //options.model.SalidaID = dataItem.SalidaID;
                //options.model.Titulo = dataItem.Titulo;


            }
        });

}

function RenderTipoCorte2(container, options) {

    $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="TipoCorteID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.TipoCorte2Lista,
            dataTextField: "Nombre",
            dataValueField: "TipoCorteID",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                options.model.TipoCorte2ID = dataItem.TipoCorteID;
                options.model.TipoCorte2 = dataItem.Nombre;
                //options.model.SalidaID = dataItem.SalidaID;
                //options.model.Titulo = dataItem.Titulo;

                if (options.model.ClaveSalida.match('^JC')) {
                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].TipoCorte2ID = dataItem.TipoCorteID;
                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].TipoCorte2 = dataItem.Nombre;
                }
                else {
                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].TipoCorte2ID = dataItem.TipoCorteID;
                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].TipoCorte2 = dataItem.Nombre;
                }
            }
        });

}

function RenderJunta(container, options) {
    var dataItem;
    if (options.model.SpoolItemCodeID != 0) {
        $('<input required data-text-field="Etiqueta" id=' + options.model.uid + ' data-value-field="JuntaSpoolID" data-bind="value:' + options.field + '"/>')
            .appendTo(container)
            .kendoComboBox({
                autoBind: false,
                dataTextField: "Etiqueta",
                dataValueField: "JuntaSpoolID",
                dataSource: options.model.DetalleJuntaSpoolLista,
                //template: "<i class=\"fa fa-#=data.Junta#\"></i> #=data.Junta#",
                change: function (e) {
                    dataItem = this.dataItem(e.sender.selectedIndex);

                    options.model.DetalleJuntaSpoolID = dataItem.JuntaSpoolID;
                    options.model.DetalleJuntaSpool = dataItem.Etiqueta;

                    if (options.model.ClaveSalida.match('^JC')) {
                        currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].DetalleJuntaSpoolID = dataItem.JuntaSpoolID;
                        currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].DetalleJuntaSpool = dataItem.Etiqueta;
                    }
                    else {
                        currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].DetalleJuntaSpoolID = dataItem.JuntaSpoolID;
                        currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].DetalleJuntaSpool = dataItem.Etiqueta;
                    }

                    AjaxDetalleJunta(options.model.PosicionSalidaPadre, options.model.PosicionSalida, ((options.model.ClaveSalida.match('^JC')) ? (options.model.ClaveSalida.substring(0, 2)) : (options.model.ClaveSalida.substring(0, 1))), options.model.DetalleJuntaSpoolID);
                }
            }
            );
    }
}

var dataItemAterior;
var spoolIDSelectGridIC = 0;
//function RenderMateriales(container, options) {
//    idSelect = options.model.ClaveSalida;
//    spoolIDSelectMateriales = options.model.SpoolID;
function RenderSpool_IC(container, options) {
    
    var tipoSalidaARenderear = '';
    dataItemAterior = { SpoolItemCodeID: options.model.SpoolItemCodeID, SpoolItemCode: options.model.SpoolItemCode };
    if (options.model.TipoSalidaID == 2) {
        spoolIDSelectGridIC = options.model.SpoolID;
        idSelect = options.model.ClaveSalida;
        $('<div name=' + options.model.SpoolID + '' + options.model.Nombre + '/>')
        .appendTo(container)
        .kendoGrid({

        dataSource: {
          // batch: true,
          data: options.model.ItemCodeLista,
          schema: {
              model: {
                  fields: {

                      ItemCodeID: { type: "string", editable: false },
                      Diametro1: { type: "string", editable: false },
                      Diametro2: { type: "string", editable: false },
                      DescripcionMaterial: { type: "string", editable: false }
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
      scrollable: false,
      selectable: true,
      dataBinding: function (e) {

      },
      edit: function (e) {
      },
      change: function (e) {

          //ItemSeleccionadoAnidado = this.dataSource.view()[this.select().index()];

          //var dataSource = this.dataSource;
          //var filters = dataSource.filter();
          //var allData = dataSource.data();
          //var query = new kendo.data.Query(allData);
          //var data = query.filter(filters).data;


          //actuallongitudTrabajosAdicionales = data.length;;
          //options.model.TemplateMensajeTrabajosAdicionales = " Ahora tienes " + actuallongitudTrabajosAdicionales + " trabajos adicionales";
          

      },
      columns: [
      { field: "ItemCodeID", title: 'IC'/*, editor: RenderComboBoxTrabajoAdicional*/, filterable: false, width: "40px", template: "<div class='EnlacePorPlaca' style='text-align:center;' onmouseover='ICSelect = \"#=ItemCodeID#\";'><span>#=ItemCodeID#</span></div> " },
      { field: "Diametro1", title: 'D1', filterable: false, width: "30px", template: "<div class='EnlacePorPlaca' style='text-align:center;' onmouseover='ICSelect = \"#=ItemCodeID#\";'><span>#=Diametro1#</span></div> " },
      { field: "Diametro2", title: 'D2', filterable: false, width: "30px", template: "<div class='EnlacePorPlaca' style='text-align:center;' onmouseover='ICSelect = \"#=ItemCodeID#\";'><span>#=Diametro2#</span></div> " }
      ,
      //{ field: "DescipcionMaterial", title: 'Desc', filterable: false, width: "60px" }
      { field: "DescripcionMaterial", title: 'Desc', filterable: false, width: "80px", template: "<div class='EnlacePorPlaca' style='text-align:center;' onmouseover='ICSelect = \"#=ItemCodeID#\";'><span>#=DescripcionMaterial#</span></div> " }
      //,
      //{
      //    command: {
      //        name: "",
      //        title: "",
      //        text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
      //        click: function (e) {
      //            e.preventDefault();

      //            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

      //            //if (confirm(_dictionary.CapturaArmadoPreguntaBorradoCaptura[$("#language").data("kendoDropDownList").value()])) {
      //            //    var dataSource = this.dataSource;

      //            //    if (dataItem.JuntaArmadoID == "1" || dataItem.JuntaArmadoID == undefined)
      //            //        dataSource.remove(dataItem);

      //            //    dataItem.Accion = 3;



      //            //    var filters = dataSource.filter();
      //            //    var allData = dataSource.data();
      //            //    var query = new kendo.data.Query(allData);
      //            //    var data = query.filter(filters).data;

      //            //    actuallongitudTrabajosAdicionales = data.length;

      //            //    options.model.TemplateMensajeTrabajosAdicionales = " Ahora tienes " + actuallongitudTrabajosAdicionales + " trabajos adicionales"

      //            //    this.dataSource.sync();
      //            //}

      //            ///////////////////


      //            //////////////////




      //        }
      //    }, width: "99px"
      //}
      ], saveChanges: function (e) {
          if (!confirm("Are you sure you want to save all changes?")) {
              e.preventDefault();
          }
      },
      editable: true,
      navigatable: true,
            //toolbar: [{ name: "create" }]
      dataBound: function (a) {
          var that = this;
          $(that.tbody).on("dblclick", "tr", function (e) {
              //var rowData = that.dataItem(this);
              //var url = "@Url.Action("Index", "Home")/" + rowData.OrderID;

              //window.location.href = url;
              //alert('xD');

              for (var i = 0; i < currentSpoolMaster.detalleSalidas.length; i++) {
                  if (currentSpoolMaster.detalleSalidas[i].SpoolID == spoolIDSelectGridIC) {

                      for (var j = 0; j < currentSpoolMaster.detalleSalidas[i].SalidasEstandar.length; j++) {
                          if (currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].ClaveSalida == idSelect) {
                              currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].SpoolItemCodeID = ICSelect;
                              currentSpoolMaster.detalleSalidas[i].SalidasEstandar[j].SpoolItemCode = ICSelect;

                              $("#grid_" + currentSpoolMaster.detalleSalidas[i].Posicion).data("kendoGrid").dataSource._data[j].SpoolItemCodeID = ICSelect;//EtiquetaSelect;
                              $("#grid_" + currentSpoolMaster.detalleSalidas[i].Posicion).data("kendoGrid").dataSource._data[j].SpoolItemCode = ICSelect;//$("#gridPopUp").data("kendoGrid").dataSource._data.length;
                              $("#grid_" + currentSpoolMaster.detalleSalidas[i].Posicion).data("kendoGrid").refresh();
                              break;
                          }
                      }

                      for (var j = 0; j < currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas.length; j++) {
                          if (currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].ClaveSalida == idSelect) {

                              currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].SpoolItemCodeID = ICSelect;
                              currentSpoolMaster.detalleSalidas[i].SalidasJuntasCerradas[j].SpoolItemCode = ICSelect;

                              $("#grid_" + currentSpoolMaster.detalleSalidas[i].Posicion).data("kendoGrid").dataSource._data[j + currentSpoolMaster.detalleSalidas[i].SalidasEstandar.length].SpoolItemCodeID = ICSelect;//EtiquetaSelect;
                              $("#grid_" + currentSpoolMaster.detalleSalidas[i].Posicion).data("kendoGrid").dataSource._data[j + currentSpoolMaster.detalleSalidas[i].SalidasEstandar.length].SpoolItemCode = ICSelect;//$("#gridPopUp").data("kendoGrid").dataSource._data.length;
                              $("#grid_" + currentSpoolMaster.detalleSalidas[i].Posicion).data("kendoGrid").refresh();
                              break;
                          }
                      }
                  }
              }


              //var window = $("#windowGrid");

              //$("#windowGrid").data("kendoWindow").close();
          });

          //$(that.tbody).on("contextmenu", "tr", function (e) {

          //    alert('xD');


          //});

          //$(that.tbody).on("click", "th", function (e) {
          //    var rowData = that.dataItem(this);
          //    //var url = "@Url.Action("Index", "Home")/" + rowData.OrderID;

          //    //window.location.href = url;
          //});
      }
  });


    }
    else {
        $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="SpoolID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataTextField: "Nombre",
            dataValueField: "SpoolID",
            dataSource: ((options.model.TipoSalidaID == 1) ? (options.model.SpoolItemCodeLista) : (options.model.SpoolItemCodeListaSoporte)),
            //template: "<i class=\"fa fa-#=data.Nombre#\"></i> #=data.Nombre#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                if (dataItemAterior.SpoolItemCodeID == 0) {

                    options.model.SpoolItemCodeID = dataItem.SpoolID;
                    options.model.SpoolItemCode = dataItem.Nombre;

                    //currentSpoolMaster.detalleSalidas[i]
                    //((options.model.ClaveSalida.match('^JC')) ? (options.model.ClaveSalida.substring(0, 2)) : (options.model.ClaveSalida.substring(0, 1)))
                    var posicionSalida = options.model.PosicionSalida;
                    if (options.model.ClaveSalida.match('^JC')) {
                        currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].SpoolItemCodeID = dataItem.SpoolID;//posicionSalida += currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar.length;
                        currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].SpoolItemCode = dataItem.Nombre;
                    }
                    else {
                        currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].SpoolItemCodeID = dataItem.SpoolID;
                        currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].SpoolItemCode = dataItem.Nombre;
                    }

                    if ((dataItem.SpoolID != 0) && (dataItem.SpoolID != (-1))) {

                        //Busca si el spool existe
                        var spoolEncontrado = false;
                        for (var i = 0; i < currentSpoolMaster.detalleSalidas.length; i++) {
                            if (currentSpoolMaster.detalleSalidas[i].SpoolID == dataItem.SpoolID) {
                                spoolEncontrado = true;
                                currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre + 1].SalidasEstandar.length = (currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre + 1].SalidasEstandar.length + 1);
                            }
                        }

                        if (!spoolEncontrado)
                            addNewDetalleSalida(options.model.SpoolItemCodeID, options.model.SpoolItemCode);

                        reloadControls();
                    }
                    //else {
                    //    options.model.SpoolItemCodeID = dataItem.SpoolID;
                    //    options.model.SpoolItemCodeID = "Sin Definir"
                    //}
                }
                else {
                    var posicionSalida = options.model.PosicionSalida;
                    if (options.model.ClaveSalida.match('^JC')) {
                        currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].SpoolItemCodeID = dataItem.SpoolID;//posicionSalida += currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar.length;
                        currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].SpoolItemCode = dataItem.Nombre;
                    }
                    else {
                        currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].SpoolItemCodeID = dataItem.SpoolID;
                        currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].SpoolItemCode = dataItem.Nombre;
                    }

                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre + 1].SpoolID = dataItem.SpoolID;
                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre + 1].NombreSpool = dataItem.Nombre;


                    reloadControls();
                    //addNewDetalleSalida(options.model.SpoolItemCodeID, options.model.SpoolItemCode);

                    //reloadControls();
                }

                if ((options.model.SpoolItemCodeID == (-1)) && (options.model.TipoSalidaID == 4)) {
                    $("#grid_" + options.model.PosicionSalidaPadre).data("kendoGrid").showColumn(11);
                    $("#grid_" + options.model.PosicionSalidaPadre).data("kendoGrid").showColumn(12);
                    $("#grid_" + options.model.PosicionSalidaPadre).data("kendoGrid").showColumn(13);
                }

                //options.model.JuntaID = dataItem.JuntaID;
                //options.model.Junta = dataItem.Junta;

                //options.model.Detalle1 = "5%";
                //options.model.Detalle2 = "99";
                //options.model.Detalle3 = "100";
                //options.model.Detalle4 = "5.4";
                //$("#grid").data("kendoGrid").refresh();

                /*
                if (dataItem.ID == 1) {
                    $("#controls_content_2").show();
                    $("#grid_content_2").show();
                }

                if ((options.model.Spool_ICSelect == 'Tubo') && (options.model.TipoSalidaSelect == 'Item Code')) {
                    $("#grid").data("kendoGrid").showColumn(11);
                    $("#grid").data("kendoGrid").showColumn(12);
                    $("#grid").data("kendoGrid").showColumn(13);
                }*/
                //if (dataItem != undefined && dataItem.DefectoID != 0) {
                //    options.model.DefectoID = dataItem.DefectoID;
                //    options.model.Defecto = dataItem.Defecto;
                //    //OrdenTrabajoID+SpoolID+JuntaSpoolID+Ubicacion+Posicion
                //    var itemPlaca = $("#PlacaID").text().split("°")
                //    options.model.OrdenTrabajoID = itemPlaca[0];
                //    options.model.SpoolID = itemPlaca[1];
                //    options.model.JuntaSpoolID = itemPlaca[2];
                //    options.model.Ubicacion = itemPlaca[3];
                //    options.model.Posicion = itemPlaca[4];
                //}
            }
        }
        );
    }

}


function RenderTipoJuta(container, options) {
    //if ((options.model.SpoolItemCode == 0) && (options.model.TipoSalidaID == 4)) {
    if ((options.model.DetalleJuntaSpoolID == -1) && (options.model.SpoolItemCodeID != 0)) {
        $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="TipoJuntaID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataTextField: "Nombre",
            dataValueField: "TipoJuntaID",
            dataSource: currentTipoJuntasArray,
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                //options.model.SpoolItemCodeID = dataItem.TipoJuntaID;
                options.model.TipoJunta = dataItem.Nombre;

                var posicionSalida = options.model.PosicionSalida;
                if (options.model.ClaveSalida.match('^JC')) {
                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].TipoJuntaID = 0;
                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].TipoJunta = dataItem.Nombre;
                }
                else {
                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].TipoJuntaID = 0;
                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].TipoJunta = dataItem.Nombre;
                }
            }
        });
    }

}

function RenderCedula(container, options) {
    //if ((options.model.SpoolItemCode == 0) && (options.model.TipoSalidaID == 4)) {
    if (options.model.DetalleJuntaSpoolID == -1) {
        $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="CedulaID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataTextField: "Nombre",
            dataValueField: "CedulaID",
            dataSource: currentCedulaArray,
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                //options.model.SpoolItemCodeID = dataItem.TipoJuntaID;
                options.model.Cedula = dataItem.Nombre;

                var posicionSalida = options.model.PosicionSalida;
                if (options.model.ClaveSalida.match('^JC')) {
                    //currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].TipoJuntaID = 0;
                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].Cedula = dataItem.Nombre;
                }
                else {
                    //currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].TipoJuntaID = 0;
                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].Cedula = dataItem.Nombre;
                }
            }
        });
    }

}

function RenderFamiliaAcero1(container, options) {
    //if ((options.model.SpoolItemCode == 0) && (options.model.TipoSalidaID == 4)) {
    if (options.model.DetalleJuntaSpoolID == -1) {
        $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="FamiliaAceroID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataTextField: "Nombre",
            dataValueField: "FamiliaAceroID",
            dataSource: currentAceroArray,
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                //options.model.SpoolItemCodeID = dataItem.TipoJuntaID;
                options.model.FamiliaAceroMaterial1 = dataItem.Nombre;

                var posicionSalida = options.model.PosicionSalida;
                if (options.model.ClaveSalida.match('^JC')) {
                    //currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].TipoJuntaID = 0;
                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].FamiliaAceroMaterial1 = dataItem.Nombre;
                }
                else {
                    //currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].TipoJuntaID = 0;
                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].FamiliaAceroMaterial1 = dataItem.Nombre;
                }
            }
        });
    }

}

function RenderFamiliaAcero2(container, options) {
    //if ((options.model.SpoolItemCode == 0) && (options.model.TipoSalidaID == 4)) {
    if (options.model.DetalleJuntaSpoolID == -1) {
        $('<input required data-text-field="Nombre" id=' + options.model.uid + ' data-value-field="FamiliaAceroID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataTextField: "Nombre",
            dataValueField: "FamiliaAceroID",
            dataSource: currentAceroArray,
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                //options.model.SpoolItemCodeID = dataItem.TipoJuntaID;
                options.model.FamiliaAceroMaterial2 = dataItem.Nombre;

                var posicionSalida = options.model.PosicionSalida;
                if (options.model.ClaveSalida.match('^JC')) {
                    //currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].TipoJuntaID = 0;
                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasJuntasCerradas[options.model.PosicionSalida].FamiliaAceroMaterial2 = dataItem.Nombre;
                }
                else {
                    //currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].TipoJuntaID = 0;
                    currentSpoolMaster.detalleSalidas[options.model.PosicionSalidaPadre].SalidasEstandar[options.model.PosicionSalida].FamiliaAceroMaterial2 = dataItem.Nombre;
                }
            }
        });
    }

}

function RenderGridRowsDynamic() {

    for (var posicion = 0; posicion < currentSpoolMaster.detalleSalidas.length; posicion++) {

        $("#grid_" + posicion).data('kendoGrid').dataSource.data([]);
        var ds = $("#grid_" + posicion).data("kendoGrid").dataSource;


        for (var i = 0; i < currentSpoolMaster.detalleSalidas[posicion].SalidasEstandar.length; i++) {
            try {
                if (!("undefined" === typeof currentSpoolMaster.detalleSalidas[posicion].SalidasEstandar[i].SpoolID))
                    ds.add(currentSpoolMaster.detalleSalidas[posicion].SalidasEstandar[i]);
            } catch (e) {
                break;
            }
            
        }

        for (var i = 0; i < currentSpoolMaster.detalleSalidas[posicion].SalidasJuntasCerradas.length; i++) {
            try {
                if (!("undefined" === typeof currentSpoolMaster.detalleSalidas[posicion].SalidasJuntasCerradas[i].SpoolID))
                    ds.add(currentSpoolMaster.detalleSalidas[posicion].SalidasJuntasCerradas[i]);
            } catch (e) {
                break;
            }
            
        }
    }
}

//function RenderClaveSalida(container, options) {
//    var dataItem;
//    $('<input data-text-field="ClaveSalida" id=' + options.model.uid + ' data-value-field="ClaveSalida" data-bind="value:' + options.field + '"/>')
//    .appendTo(container);
//    //.kendoNumericTextBox({
//    //    format: "{0: }",
//    //    min: 0
//    //});

//}


function RenderSpool_IC2(container, options) {
    var dataItem;
    $('<input required data-text-field="Titulo" id=' + options.model.uid + ' data-value-field="ID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataTextField: "Titulo",
            dataValueField: "ID",
            dataSource: options.model.Spool_IC,
            template: "<i class=\"fa fa-#=data.Titulo#\"></i> #=data.Titulo#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                options.model.Spool_ICSelect = dataItem.Titulo;
                //options.model.JuntaID = dataItem.JuntaID;
                //options.model.Junta = dataItem.Junta;

                //options.model.Detalle1 = "5%";
                //options.model.Detalle2 = "99";
                //options.model.Detalle3 = "100";
                //options.model.Detalle4 = "5.4";
                //$("#grid").data("kendoGrid").refresh();

                if (dataItem.ID == 2) {
                    $("#controls_content_3").show();
                    $("#grid_content_3").show();
                }

                //if (dataItem != undefined && dataItem.DefectoID != 0) {
                //    options.model.DefectoID = dataItem.DefectoID;
                //    options.model.Defecto = dataItem.Defecto;
                //    //OrdenTrabajoID+SpoolID+JuntaSpoolID+Ubicacion+Posicion
                //    var itemPlaca = $("#PlacaID").text().split("°")
                //    options.model.OrdenTrabajoID = itemPlaca[0];
                //    options.model.SpoolID = itemPlaca[1];
                //    options.model.JuntaSpoolID = itemPlaca[2];
                //    options.model.Ubicacion = itemPlaca[3];
                //    options.model.Posicion = itemPlaca[4];
                //}
            }
        }
        );

}


function RenderJunta2(container, options) {
    var dataItem;
    $('<input required data-text-field="Junta" id=' + options.model.uid + ' data-value-field="JuntaID" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataTextField: "Junta",
            dataValueField: "JuntaID",
            dataSource: options.model.Juntas,
            template: "<i class=\"fa fa-#=data.Junta#\"></i> #=data.Junta#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                options.model.SpoolSelect = dataItem.Junta;
                //options.model.JuntaID = dataItem.JuntaID;
                //options.model.Junta = dataItem.Junta;

                if (dataItem.JuntaID == 1) {//FW17
                    options.model.TipoJunta = "BW";
                    options.model.Cedula = "STD";
                    options.model.Acero1 = "CS-g78";
                    options.model.Acero2 = "CS-g79";
                    options.model.Diametro = "16";
                }
                else if (dataItem.JuntaID == 2) {//FW18
                    options.model.TipoJunta = "TH";
                    options.model.Cedula = "80";
                    options.model.Acero1 = "CS-g70";
                    options.model.Acero2 = "CS-g70";
                    options.model.Diametro = "0.75";
                }

                $("#grid2").data("kendoGrid").refresh();

                if (dataItem.JuntaID == 1) {
                    $("#controls_content_3").show();
                    $("#grid_content_3").show();
                }

                //if (dataItem != undefined && dataItem.DefectoID != 0) {
                //    options.model.DefectoID = dataItem.DefectoID;
                //    options.model.Defecto = dataItem.Defecto;
                //    //OrdenTrabajoID+SpoolID+JuntaSpoolID+Ubicacion+Posicion
                //    var itemPlaca = $("#PlacaID").text().split("°")
                //    options.model.OrdenTrabajoID = itemPlaca[0];
                //    options.model.SpoolID = itemPlaca[1];
                //    options.model.JuntaSpoolID = itemPlaca[2];
                //    options.model.Ubicacion = itemPlaca[3];
                //    options.model.Posicion = itemPlaca[4];
                //}
            }
        }
        );

}

function RenderDiametro(container, options) {
    var dataItem;
    $('<input data-text-field="Diametro" id=' + options.model.uid + ' data-value-field="Diametro" data-bind="value:' + options.field + '"/>')
    .appendTo(container)
    .kendoNumericTextBox({
        format: "{0: }",
        min: 0
    });

}

function RenderNumeroPlacas(container, options) {

    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {



        numeroPlacasAnteriorElemento = { NumeroPlacas: options.model.NumeroPlacas, OrdenTrabajoID: options.model.OrdenTrabajoID, SpoolID: options.model.SpoolID, JuntaSpoolID: options.model.JuntaSpoolID, ResultadoConciliacionID: options.model.ResultadoConciliacionID };
        $('<input data-text-field="NumeroPlacas" id=' + options.model.uid + ' data-value-field="NumeroPlacas" data-bind="value:' + options.field + '" />')
        .appendTo(container)
        .kendoNumericTextBox({
            format: "#",
            min: 0
            ,
            change: function (e) {
                var grid = $("#grid").data("kendoGrid");
                dataItem = grid.dataItem($(e.target).closest("tr"));
                hayDatosCapturados = true;

                var value = this.value();
                if (numeroPlacasAnteriorElemento.ResultadoConciliacionID > 1) {//La razon no es Aceptada y se va a evaluar
                    if (numeroPlacasAnteriorElemento.NumeroPlacas != null && numeroPlacasAnteriorElemento.NumeroPlacas > this.value()) {
                        //hayDatosCapturados = true;

                        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
                            iframe: true,
                            title: _dictionary.WarningTitle[$("#language").data("kendoDropDownList").value()],
                            visible: false, //the window will not appear before its .open method is called
                            width: "auto",
                            height: "auto",
                            modal: true,
                            animation: {
                                close: false,
                                open: false
                            }
                        }).data("kendoWindow");

                        ventanaConfirm.content(_dictionary.CapturaReporteModificarNoPlacas[$("#language").data("kendoDropDownList").value()] +
                                    "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

                        ventanaConfirm.open().center();

                        $("#yesButton").click(function () {
                            renderGenerarJsonNumeroPlacas(options.model.SpoolID, options.model.JuntaSpoolID, options.model.OrdenTrabajoID);

                            ventanaConfirm.close();
                        });
                        $("#noButton").click(function () {
                            //dataItem.NumeroPlacas = numeroPlacasAnteriorElemento;
                            for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
                                if ((numeroPlacasAnteriorElemento.SpoolID == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (numeroPlacasAnteriorElemento.JuntaSpoolID == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (numeroPlacasAnteriorElemento.OrdenTrabajoID == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
                                    $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas = numeroPlacasAnteriorElemento.NumeroPlacas;
                                    $("#grid").data("kendoGrid").refresh();
                                    break;
                                }
                            }

                            ventanaConfirm.close();
                        });
                    }
                    else if (numeroPlacasAnteriorElemento.NumeroPlacas == null) {
                        renderGenerarJsonNumeroPlacas(options.model.SpoolID, options.model.JuntaSpoolID, options.model.OrdenTrabajoID);
                    }
                    else {
                        for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
                            if ((numeroPlacasAnteriorElemento.SpoolID == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (numeroPlacasAnteriorElemento.JuntaSpoolID == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (numeroPlacasAnteriorElemento.OrdenTrabajoID == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
                                $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas = numeroPlacasAnteriorElemento.NumeroPlacas;
                                $("#grid").data("kendoGrid").refresh();
                                break;
                            }
                        }
                    }
                }
                else {
                    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
                        if ((numeroPlacasAnteriorElemento.SpoolID == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (numeroPlacasAnteriorElemento.JuntaSpoolID == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (numeroPlacasAnteriorElemento.OrdenTrabajoID == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
                            $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas = numeroPlacasAnteriorElemento.NumeroPlacas;
                            $("#grid").data("kendoGrid").refresh();
                            break;
                        }
                    }
                }
            }
        });
    };
}

var tamanoAnteriorElemento;
function RenderTamano(container, options) {
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

        var dataItem;
        tamanoAnteriorElemento = { NumeroPlacas: options.model.NumeroPlacas, OrdenTrabajoID: options.model.OrdenTrabajoID, SpoolID: options.model.SpoolID, JuntaSpoolID: options.model.JuntaSpoolID, ResultadoConciliacionID: options.model.ResultadoConciliacionID, Tamano: options.model.Tamano};
        $('<input data-text-field="Tamano" id=' + options.model.uid + ' data-value-field="Tamano" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
            format: "#.0000",
            min: 0,
            change: function (e) {
                
                if (tamanoAnteriorElemento.ResultadoConciliacionID > 1) {
                    hayDatosCapturados = true;
                }
                else {
                    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
                        if ((tamanoAnteriorElemento.SpoolID == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (tamanoAnteriorElemento.JuntaSpoolID == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (tamanoAnteriorElemento.OrdenTrabajoID == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
                            $("#grid").data("kendoGrid").dataSource._data[i].Tamano = tamanoAnteriorElemento.Tamano;
                            $("#grid").data("kendoGrid").refresh();
                            break;
                        }
                    }
                }
            }
        });
    };
}

var densidadAnteriorElemento;
function RenderDensidad(container, options) {
    if ($('#Guardar').text() == _dictionary.MensajeGuardar[$("#language").data("kendoDropDownList").value()]) {

        var dataItem;
        densidadAnteriorElemento = { NumeroPlacas: options.model.NumeroPlacas, OrdenTrabajoID: options.model.OrdenTrabajoID, SpoolID: options.model.SpoolID, JuntaSpoolID: options.model.JuntaSpoolID, ResultadoConciliacionID: options.model.ResultadoConciliacionID, Densidad: options.model.Densidad };
        $('<input data-text-field="Densidad" id=' + options.model.uid + ' data-value-field="Densidad" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoNumericTextBox({
            format: "#.0000",
            min: 0,
            change: function (e) {
                
                if (densidadAnteriorElemento.ResultadoConciliacionID > 1) {
                    hayDatosCapturados = true;
                }
                else {
                    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
                        if ((densidadAnteriorElemento.SpoolID == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (densidadAnteriorElemento.JuntaSpoolID == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (densidadAnteriorElemento.OrdenTrabajoID == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
                            $("#grid").data("kendoGrid").dataSource._data[i].Densidad = densidadAnteriorElemento.Densidad;
                            $("#grid").data("kendoGrid").refresh();
                            break;
                        }
                    }
                }
            }
        });
    }
}

function RenderInicioMM(container, options) {
    var dataItem;
    $('<input data-text-field="InicioMM" id=' + options.model.uid + ' data-value-field="InicioMM" data-bind="value:' + options.field + '"/>')
    .appendTo(container)
    .kendoNumericTextBox({
        format: "{0: }",
        min: 0
    });

}

function RenderFinMM(container, options) {
    var dataItem;
    $('<input data-text-field="FinMM" id=' + options.model.uid + ' data-value-field="FinMM" data-bind="value:' + options.field + '"/>')
    .appendTo(container)
    .kendoNumericTextBox({
        format: "{0: }",
        min: 0
    });

}

var idSelect = '';
var spoolIDSelectMateriales = 0;
function RenderMateriales(container, options) {
    idSelect = options.model.ClaveSalida;
    spoolIDSelectMateriales = options.model.SpoolID;

    $("#gridPopUp").data("kendoGrid").dataSource.data(options.model.DetalleMaterialSpoolLista);

    //if ($("#gridPopUp").data("kendoGrid").dataSource._data.length <= 0)
    //    AjaxDetalleMateriales(spoolIDSelectMateriales);
    //else
        VentanaModalDetallePlaca2();

    //$("#gridPopUp").data("kendoGrid").dataSource.data([
    //      { ETIQUETA: '1', DIAMETRO1: '18', DIAMETRO2: '1/2', IC: 'PAAAABBABB', DESC: 'TUBO, API-5L-B , S/C, CED. STD , BIS' }
    //    , { ETIQUETA: '2', DIAMETRO1: '18', DIAMETRO2: '1/4', IC: 'PAAAABBABB', DESC: 'TUBO, API-5L-B , S/C, CED. STD , BIS' }
    //    , { ETIQUETA: '3', DIAMETRO1: '18', DIAMETRO2: '3/4', IC: 'VOCCCBQAFA', DESC: 'THREDOLET, ASM-A105, 300#, BISROSC' }
    //    , { ETIQUETA: '4', DIAMETRO1: '18', DIAMETRO2: '1/2', IC: 'WAAAABBAA', DESC: 'CODO 90 RL, ASMT-V234-WPB, S/C CED STD, BIS' }
    //    ]);


    //VentanaModalDetallePlaca2();
}

var EtiquetaSelect = '';
var ICSelect = '';
function RenderMaterialesPopup(container, options) {

    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
        if ($("#grid").data("kendoGrid").dataSource._data[i].NumeroSalida == idSelect) {
            ICSelect = options.model.IC;
            EtiquetaSelect = options.model.ETIQUETA;
            //$("#grid").data("kendoGrid").dataSource._data[i].Materiales = options.model.IC;
            //$("#gridPopUp").data("kendoGrid").refresh();
            break;
        }
    }


    var window = $("#windowGrid");
    //window.data("kendoWindow").close();
    try {
        //$("#windowGrid").data("kendoWindow").close();
    } catch (e) {

    }
    
}


function renderGenerarJsonNumeroPlacas(spoolJunta, junta, numeroControl) {
    //alert(spoolJunta);
    //var infoResults = new Array($("#grid").data("kendoGrid").dataSource._data.NumeroPlacas);
    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
        if ((spoolJunta == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (junta == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (numeroControl == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
            $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas = new Array($("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas);
            for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas; j++) {
                if (j != ($("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas - 1))
                    $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j] = { OrdenTrabajoID: $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID, SpoolID: $("#grid").data("kendoGrid").dataSource._data[i].SpoolID, JuntaSpoolID: $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID, Ubicacion: j + '-' + (j + 1), ResultadoID: undefined, Resultado: '', ListaDetalleDefectos: [], Accion: $("#grid").data("kendoGrid").dataSource._data[i].Accion, ListaResultados: $("#grid").data("kendoGrid").dataSource._data[i].ListaResultados, ListaDefectos: $("#grid").data("kendoGrid").dataSource._data[i].ListaDefectos, TemplateDetallePorPlaca: _dictionary.ServiciosTecnicosCapturaReporteTemplatePlacasDefecto[$("#language").data("kendoDropDownList").value()], Posicion: j };
                else
                    $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j] = { OrdenTrabajoID: $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID, SpoolID: $("#grid").data("kendoGrid").dataSource._data[i].SpoolID, JuntaSpoolID: $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID, Ubicacion: j + '-' + 0, ResultadoID: undefined, Resultado: '', ListaDetalleDefectos: [], Accion: $("#grid").data("kendoGrid").dataSource._data[i].Accion, ListaResultados: $("#grid").data("kendoGrid").dataSource._data[i].ListaResultados, ListaDefectos: $("#grid").data("kendoGrid").dataSource._data[i].ListaDefectos, TemplateDetallePorPlaca: _dictionary.ServiciosTecnicosCapturaReporteTemplatePlacasDefecto[$("#language").data("kendoDropDownList").value()], Posicion: j };
            }
            break;
        }
    }
}

function renderDataSourceDetalleDefectos(spoolJunta, junta, numeroControl) {
    //alert(spoolJunta);
    //var infoResults = new Array($("#grid").data("kendoGrid").dataSource._data.NumeroPlacas);
    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
        if ((spoolJunta == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (junta == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (numeroControl == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
            $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas = new Array($("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas);
            for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas; j++) {
                if (j != ($("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas - 1))
                    $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j] = { ReporteRTResultadosID: 0, ReporteRTID: $("#grid").data("kendoGrid").dataSource._data[i].ReporteRTID, OrdenTrabajoID: $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID, SpoolID: $("#grid").data("kendoGrid").dataSource._data[i].SpoolID, JuntaSpoolID: $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID, NumeroControl: $("#grid").data("kendoGrid").dataSource._data[i].NumeroControl, Ubicacion: j + '-' + (j + 1), Resultado: '', ListaDetalleDefectos: [], Accion: 1, ListaResultados: $("#grid").data("kendoGrid").dataSource._data[i].ListaResultados, ListaDefectos: $("#grid").data("kendoGrid").dataSource._data[i].ListaDefectos };
                else
                    $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j] = { ReporteRTResultadosID: 0, ReporteRTID: $("#grid").data("kendoGrid").dataSource._data[i].ReporteRTID, OrdenTrabajoID: $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID, SpoolID: $("#grid").data("kendoGrid").dataSource._data[i].SpoolID, JuntaSpoolID: $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID, NumeroControl: $("#grid").data("kendoGrid").dataSource._data[i].NumeroControl, Ubicacion: j + '-' + 0, Resultado: '', ListaDetalleDefectos: [], Accion: 1, ListaResultados: $("#grid").data("kendoGrid").dataSource._data[i].ListaResultados, ListaDefectos: $("#grid").data("kendoGrid").dataSource._data[i].ListaDefectos };
            }
            break;
        }
    }
}

function VentanaModal(model) {
    //modeloRenglon = model;
    //$("#gridPopUp").data('kendoGrid').dataSource.data(model.ListaDetalleDefectos);
    CargarGridPopUp(model.ListaDetalleDefectos, model);
}

function comboBoxResultadoDetallePlaca(container, options) {
    var dataItem;

    $('<input required data-text-field="Resultado" id=' + options.model.uid + ' data-value-field="Resultado" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaResultados,
            dataTextField: "Resultado",
            dataValueField: "ResultadosID",
            template: "<i class=\"fa fa-#=data.Resultado#\"></i> #=data.Resultado#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                options.model.ResultadoID = dataItem.ResultadosID;
                options.model.Resultado = dataItem.Resultado;


            }
        }
    );
    $(".k-combobox").parent().on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = $(this).find(".k-combobox")[0];
        if (item != undefined) {
            if (!tieneClase(item)) {
                $(container).trigger(e);
            }
        }
    });
}

function comboBoxResultadoConciliacion(container, options) {
    var dataItem;

    $('<input required data-text-field="Descripcion" id=' + options.model.uid + ' data-value-field="Descripcion" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaResultadoConciliacion,
            dataTextField: "Descripcion",
            dataValueField: "ResultadoConciliacionID",
            template: "<i class=\"fa fa-#=data.Descripcion#\"></i> #=data.Descripcion#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                options.model.ResultadoConciliacionID = dataItem.ResultadoConciliacionID;
                options.model.Descripcion = dataItem.Descripcion;


            }
        }
    );
    $(".k-combobox").parent().on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = $(this).find(".k-combobox")[0];
        if (item != undefined) {
            if (!tieneClase(item)) {
                $(container).trigger(e);
            }
        }
    });
}

function comboBoxRazonNoConciliacion(container, options) {
    var dataItem;

    $('<input required data-text-field="Descripcion" id=' + options.model.uid + ' data-value-field="Descripcion" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataSource: options.model.ListaRazonNoConciliacion,
            dataTextField: "Descripcion",
            dataValueField: "RazonNoConciliacionID",
            template: "<i class=\"fa fa-#=data.Descripcion#\"></i> #=data.Descripcion#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);

                options.model.RazonNoConciliacionID = dataItem.RazonNoConciliacionID;
                options.model.Descripcion = dataItem.Descripcion;


            }
        }
    );
    $(".k-combobox").parent().on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = $(this).find(".k-combobox")[0];
        if (item != undefined) {
            if (!tieneClase(item)) {
                $(container).trigger(e);
            }
        }
    });
}



function WindowModalGridDefectoDetalle(model) {
    var modalTitle = model.SpoolID + "_" + model.JuntaSpoolID + "_" + model.OrdenTrabajoID + "_" + model.Ubicacion;
    //modalTitle = _dictionary.ValidacionResultadosRequisicion[$("#language").data("kendoDropDownList").value()];
    var window = $("#windowGrid");
    var win = window.kendoWindow({
        modal: true,
        title: modalTitle,
        resizable: false,
        visible: true,
        width: "50%",
        minWidth: 30,
        position: {
            top: "1%",
            left: "1%"
        },
        actions: [
            "Pin",
            "Minimize",
            "Maximize",
            "Close"
        ],
    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();
}

function comboBoxDefectos(container, options) {
    var dataItem;
    $('<input required data-text-field="Defecto" id=' + options.model.uid + ' data-value-field="Defecto" data-bind="value:' + options.field + '"/>')
        .appendTo(container)
        .kendoComboBox({
            autoBind: false,
            dataTextField: "Defecto",
            dataValueField: "DefectoID",
            dataSource: listaDefectosAuxiliar,
            //template: "<i class=\"fa fa-#=data.Defecto#\"></i> #=data.Defecto#",
            change: function (e) {
                dataItem = this.dataItem(e.sender.selectedIndex);
                if (dataItem != undefined && dataItem.DefectoID != 0) {
                    options.model.DefectoID = dataItem.DefectoID;
                    options.model.Defecto = dataItem.Defecto;
                    //OrdenTrabajoID+SpoolID+JuntaSpoolID+Ubicacion+Posicion
                    var itemPlaca = $("#PlacaID").text().split("°")
                    options.model.OrdenTrabajoID = itemPlaca[0];
                    options.model.SpoolID = itemPlaca[1];
                    options.model.JuntaSpoolID = itemPlaca[2];
                    options.model.Ubicacion = itemPlaca[3];
                    options.model.Posicion = itemPlaca[4];
                }
            }
        }
        );

    $(".k-combobox").parent().on('mouseleave', function (send) {
        var e = $.Event("keydown", { keyCode: 27 });
        var item = $(this).find(".k-combobox")[0];
        if (item != undefined) {
            if (!tieneClase(item)) {
                $(container).trigger(e);
            }
        }
    });
}

var hayDatosCapturados = false;
//function hayDatosCapturados() {
//    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
//        if ($("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas != 0) {
//            for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados.length; j++) {

//                if ($("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].DetalleResultados.length != 0) {
//                    return true;
//                    //for (var k = 0; k < defectosArray.length; k++) {
//                    //    $("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].DetalleResultados[k] = { Defectos: defectosArray[k].Defectos, InicioMM: defectosArray[k].InicioMM, FinMM: defectosArray[k].FinMM };
//                    //}
//                }
//            }
//        }
//    }

//    return false;
//}

function filtraDatosCapturados(tipoFiltro) {
    loadingStart();

    if (infoGridTemp == null)
        infoGridTemp = $("#grid").data("kendoGrid").dataSource._data;

    $("#grid").data('kendoGrid').dataSource.data([]);

    if (tipoFiltro == "SinCaptura") {
        for (var i = 0; i < infoGridTemp.length; i++) {
            if ((infoGridTemp[i].NumeroPlacas == 0) || (infoGridTemp[i].NumeroPlacas == null)) {
                $("#grid").data("kendoGrid").dataSource.add(infoGridTemp[i]);
            }
        }
        llamadasATodos = 0;
    }
    else if (tipoFiltro == "Todos") {
        for (var i = 0; i < infoGridTemp.length; i++) {
            //if (infoGridTemp[i].NumeroPlacas != 0) {
            $("#grid").data("kendoGrid").dataSource.add(infoGridTemp[i]);
            //}
        }
    }

    loadingStop();
}

function disableEnableView(disable) {
    if (disable) {

        $("#inputProyecto").data("kendoComboBox").enable(false);
        $("#inputProveedor").data("kendoComboBox").enable(false);
        $("#inputRequisicion").data("kendoComboBox").enable(false);
        $("#inputFuente").data("kendoComboBox").enable(false);
        $("#inputTurno").data("kendoComboBox").enable(false);
        $("#inputPrueba").data("kendoComboBox").enable(false);
        $("#inputUsuarioVR").data("kendoComboBox").enable(false);
        //$("input[name='Muestra']").attr("disabled", true);
        $("#btnAgregar").attr("disabled", true);


        $("#Guardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar1').text(_dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]);


    } else {
        $(".addedSectionInLine").find('*').attr("disabled", false);

        $("#inputProyecto").data("kendoComboBox").enable(true);
        $("#inputProveedor").data("kendoComboBox").enable(true);
        $("#inputRequisicion").data("kendoComboBox").enable(true);
        $("#inputFuente").data("kendoComboBox").enable(true);
        $("#inputTurno").data("kendoComboBox").enable(true);
        $("#inputPrueba").data("kendoComboBox").enable(true);
        $("#inputUsuarioVR").data("kendoComboBox").enable(true);

        $("#btnAgregar").attr("disabled", false);


        $("#Guardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#btnGuardar").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $("#Guardar1").text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);
        $('#btnGuardar1').text(_dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]);

    }
}

function cleanView() {
    //var paramReq = getParameterByName('requisicion');

    $("#inputProyecto").data("kendoComboBox").value("");
    $("#inputProveedor").data("kendoComboBox").value("");
    $("#inputRequisicion").data("kendoComboBox").value("");
    $("#inputFuente").data("kendoComboBox").value("");
    $("#inputTurno").data("kendoComboBox").value("");
    $("#inputPrueba").data("kendoComboBox").value("");
    $("#inputUsuarioVR").data("kendoComboBox").value("");

    $("#grid").data("kendoGrid").dataSource.data([]);
    //if (paramReq == null) {
    //    AjaxCargaListaProyectos();
    //} else {
    //    AjaxObtenerElementoRequisicion(paramReq);
    //}
    disableEnableView(false);
    //AjaxCargarCamposPredeterminados();
}

function tieneClase(item) {
    for (var i = 0; i < item.classList.length; i++) {
        if (item.classList[i] == "k-state-border-up" || item.classList[i] == "k-state-border-down") {
            return true;
        }
    }
    return false
}