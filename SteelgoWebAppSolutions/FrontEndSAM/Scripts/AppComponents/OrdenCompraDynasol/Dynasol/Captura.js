var modeloRenglon;
var esNormal;

function changeLanguageCall() {
    CargarGrid();
    CargarGridPopUpDetalleCecilia()
    CargarGridPopUpDetalleGerez();
    CargarGridPopUpDetalleSteelgo();
    CargarGridPopUpDetalleInspeccion();
    inicio();
};


function inicio() {
    SuscribirEventos();
    AjaxObtenerOrdenesCompra();
}



function CargarGrid() {

    $("#grid").kendoGrid({
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {

                        Rev: { type: "string", editable: false },
                        Descripcion: { type: "string", editable: false },
                        MaterialNorma: { type: "string", editable: false },
                        Diametro1: { type: "string", editable: false },
                        Diametro2: { type: "string", editable: false },
                        Registro: { type: "string", editable: false },
                        Rating: { type: "string", editable: false },
                        PreparacionExtremos: { type: "string", editable: false },
                        Neodata: { type: "string", editable: false },
                        Cant: { type: "string", editable: false },
                        PrecioUnidad: { type: "string", editable: false },
                        Total: { type: "string", editable: false },
                        PackingList: { type: "string", editable: true },
                        Partida: { type: "string", editable: true },
                        Coladas: { type: "string", editable: false },
                        TemplateDetalleElemento: { type: "string", editable: false },

                    }
                }
            },
        },
        edit: function (e) {
            setTimeout(function () {
                var inputName = e.container.find('input');

                inputName.select();
            });
            if ($('#Guardar').text() == _dictionary.botonEditar[$("#language").data("kendoDropDownList").value()]) {
                this.closeCell();
            };

            if ($(".k-grid-content td").css("white-space") == "normal") {
                esNormal = true;
            }
            else {
                esNormal = false;
            }
        },
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "Rev", title: _dictionary.columnRev[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "50px" },
            { field: "Descripcion", title: _dictionary.columnDescripcion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px" },
            { field: "MaterialNorma", title: _dictionary.columnMaterialNorma[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "Diametro1", title: _dictionary.columnD1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "40px" },
            { field: "Diametro2", title: _dictionary.columnD2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "40px" },
            { field: "Schedule", title: _dictionary.columnSchedule[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "90px" },
            { field: "Rating", title: _dictionary.columnRating[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "80px" },
            { field: "PreparacionExtremos", title: _dictionary.columnPrepExt[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "70px" },
            //{ field: "Neodata", title: "Neodata", filterable: getGridFilterableCellMaftec(), width: "90px" },
            { field: "Cant", title: _dictionary.columnCant[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "60px" },
            { field: "PrecioUnidad", title: _dictionary.columnPrecioU[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "80px" },
            { field: "Total", title: _dictionary.columnTotal[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "70px" },
            //{ field: "PackingList", title: "Packing List", filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "Partida", title: _dictionary.columnPartida[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "Coladas", title: " ", filterable: false, width: "50px", template: "<div class='EnlaceDetalleColada' style='text-align:center;'><a href='\\#'> <span><img src='/Content/images/SAMC_ComplementoIcon.png'></img></span></a></div> " },
        ],
        dataBound: function () {
            var grid = $("#grid").data("kendoGrid");
            var gridData = grid.dataSource.view();

            for (var i = 0; i < gridData.length; i++) {
                var currentUid = gridData[i].uid;
                if (gridData[i].RowOk == false) {
                    grid.table.find("tr[data-uid='" + currentUid + "']").removeClass("k-alt");
                    grid.table.find("tr[data-uid='" + currentUid + "']").addClass("kRowError");
                }
                else if (gridData[i].RowOk) {
                    if (i % 2 == 0)
                        grid.table.find("tr[data-uid='" + currentUid + "']").removeClass("k-alt");

                    grid.table.find("tr[data-uid='" + currentUid + "']").removeClass("kRowError");
                }
            }

            if (esNormal)
                $(".k-grid-content td").css("white-space", "normal");
            else
                $(".k-grid-content td").css("white-space", "nowrap");

        },
        editable: true,
        navigatable: true
    });
    CustomisaGrid($("#grid"));
};

function CargarGridPopUpDetalleCecilia() {

    $("#gridPopUpCecilia").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [

            ],
            schema: {
                model: {
                    fields: {

                        Colada: { type: "string", editable: true },
                        Cant: { type: "number", editable: true },
                        InspeccionDetalle: { type: "string", editable: false },
                        Comentario: { type: "string", editable: false },


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
            },

        },
        navigatable: true,
        filterable: {
            extra: false
        },
        click: function (e) {
        },
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        filterable: getGridFilterableMaftec(),
        columns: [
          //Cecilia
          { field: "Colada", title: _dictionary.columnColada[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "90px" },
          { field: "Cant", title: _dictionary.columnCant[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "73px" },
          { field: "InspeccionDetalle", title: _dictionary.columnInsp[$("#language").data("kendoDropDownList").value()], filterable: false, width: "70px", template: "<div class='EnlaceInspeccion' style='text-align:center;'><a href='\\#'  > <span>#=InspeccionDetalle == '' ? 'Sin Inspeccion': InspeccionDetalle #</span></a></div> " },
          { field: "Comentario", title: _dictionary.columnComentarioDynasol[$("#language").data("kendoDropDownList").value()], filterable: false, width: "80px", },
          //Gerez


          {
              command: {
                  text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                  click: function (e) {
                      e.preventDefault();
                      var dataItem = $("#gridPopUpCecilia").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

                      if ((dataItem.Accion == 1) || (dataItem.Accion == 0)) {
                          $("#gridPopUpCecilia").data("kendoGrid").dataSource.remove(dataItem);
                      }
                      else {
                          dataItem.Accion = 3;
                      }

                      $("#gridPopUpCecilia").data("kendoGrid").dataSource.sync();
                  }
              },
              title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()],
              width: "50px", attributes: { style: "text-align:center;" }
          },

        ],
        editable: "incell",
        toolbar: [{ name: "create" }]

    });
    CustomisaGrid($("#gridPopUpCecilia"));

};

function CargarGridPopUpDetalleGerez() {

    $("#gridPopUpGerez").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [

            ],
            schema: {
                model: {
                    fields: {

                        Colada: { type: "string", editable: false },
                        Cant: { type: "number", editable: false },
                        InspeccionDetalle: { type: "string", editable: false },
                        Comentario: { type: "string", editable: false },

                        CantG: { type: "number", editable: true },
                        FechaRecibidoG: { type: "date", editable: true },
                        Camion: { type: "string", editable: true },
                        FacturaProveedor: { type: "string", editable: true },
                        Acuerdo: { type: "string", editable: true },
                        FechaEnvio: { type: "date", editable: true },
                        Pedimento: { type: "string", editable: true },
                        ShippingDate: { type: "date", editable: true },

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
            },

        },
        navigatable: true,
        filterable: {
            extra: false
        },
        click: function (e) {
        },
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        filterable: getGridFilterableMaftec(),
        columns: [
          //Cecilia
          { field: "Colada", title: _dictionary.columnColada[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "90px" },
          { field: "Cant", title: _dictionary.columnCant[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "73px" },
          { field: "InspeccionDetalle", title: _dictionary.columnInsp[$("#language").data("kendoDropDownList").value()], filterable: false, width: "70px", template: "<div class='EnlaceInspeccion' style='text-align:center;'><a href='\\#'  > <span>#=InspeccionDetalle#</span></a></div> " },
          { field: "Comentario", title: _dictionary.columnComentarioDynasol[$("#language").data("kendoDropDownList").value()], filterable: false, width: "80px", },
          //Gerez
          { field: "CantG", title: _dictionary.columnCant[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "73px" },
          { field: "FechaRecibidoG", title: _dictionary.columnFechaRecibido[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "82px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
          { field: "Camion", title: _dictionary.columnCamion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "90px" },
          { field: "FacturaProveedor", title: _dictionary.columnFacturaProveedor[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
          { field: "Acuerdo", title: _dictionary.columnAcuerdo[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
          { field: "FechaEnvio", title: _dictionary.columnFechaEnvio[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "82px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
          { field: "Pedimento", title: _dictionary.columnPedimento[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "73px" },
          { field: "ShippingDate", title: _dictionary.columnShippingDate[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },

          {
              command: {
                  text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                  click: function (e) {
                      e.preventDefault();
                      var dataItem = $("#gridPopUpGerez").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

                      if ((dataItem.Accion == 1) || (dataItem.Accion == 0)) {
                          $("#gridPopUpGerez").data("kendoGrid").dataSource.remove(dataItem);
                      }
                      else {
                          dataItem.Accion = 3;
                      }

                      $("#gridPopUpGerez").data("kendoGrid").dataSource.sync();
                  }
              },
              title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()],
              width: "50px", attributes: { style: "text-align:center;" }
          },

        ],
        editable: "incell",
        toolbar: [{ name: "create" }]

    });
    CustomisaGrid($("#gridPopUpGerez"));

};

function CargarGridPopUpDetalleSteelgo() {

    $("#gridPopUpSteelgo").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [

            ],
            schema: {
                model: {
                    fields: {

                        Colada: { type: "string", editable: false },
                        Cant: { type: "number", editable: false },
                        InspeccionDetalle: { type: "string", editable: false },
                        Comentario: { type: "string", editable: false },

                        CantG: { type: "number", editable: false },
                        FechaRecibidoG: { type: "date", editable: false },
                        Camion: { type: "string", editable: false },
                        FacturaProveedor: { type: "string", editable: false },
                        Acuerdo: { type: "string", editable: false },
                        FechaEnvio: { type: "date", editable: false },
                        Pedimento: { type: "string", editable: false },
                        ShippingDate: { type: "date", editable: false },

                        CantS: { type: "number", editable: true },
                        FechaFactura: { type: "date", editable: true },
                        InspeccionS: { type: "string", editable: true },
                        FechaRecibidoS: { type: "date", editable: true },
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
            },

        },
        navigatable: true,
        filterable: {
            extra: false
        },
        click: function (e) {
        },
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        filterable: getGridFilterableMaftec(),
        columns: [
          //Cecilia
          { field: "Colada", title: _dictionary.columnColada[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "90px" },
          { field: "Cant", title: _dictionary.columnCant[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "73px" },
          { field: "InspeccionDetalle", title: _dictionary.columnInsp[$("#language").data("kendoDropDownList").value()], filterable: false, width: "70px", template: "<div class='EnlaceInspeccion' style='text-align:center;'><a href='\\#'  > <span>#=InspeccionDetalle == '' ? 'Sin Inspeccion': InspeccionDetalle #</span></a></div> " },
          { field: "Comentario", title: _dictionary.columnComentarioDynasol[$("#language").data("kendoDropDownList").value()], filterable: false, width: "80px", },
          //Gerez
          { field: "CantG", title: _dictionary.columnCant[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "73px" },
          { field: "FechaRecibidoG", title: _dictionary.columnFechaRecibido[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "82px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
          { field: "Camion", title: _dictionary.columnCamion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "90px" },
          { field: "FacturaProveedor", title: _dictionary.columnFacturaProveedor[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
          { field: "Acuerdo", title: _dictionary.columnAcuerdo[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
          { field: "FechaEnvio", title: _dictionary.columnFechaEnvio[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "82px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
          { field: "Pedimento", title: _dictionary.columnPedimento[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "73px" },
          { field: "ShippingDate", title: _dictionary.columnShippingDate[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
          //Steelgo
          { field: "CantS", title: _dictionary.columnCant[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "73px" },
          { field: "FechaRecibidoS", title: _dictionary.columnFechaRecibido[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "82px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
          { field: "InspeccionS", title: _dictionary.columnInsp[$("#language").data("kendoDropDownList").value()], filterable: false, width: "50px" },
          { field: "FechaFactura", title: _dictionary.columnFechaFactura[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "82px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },

          {
              command: {
                  text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                  click: function (e) {
                      e.preventDefault();
                      var dataItem = $("#gridPopUpSteelgo").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

                      if ((dataItem.Accion == 1) || (dataItem.Accion == 0)) {
                          $("#gridPopUpSteelgo").data("kendoGrid").dataSource.remove(dataItem);
                      }
                      else {
                          dataItem.Accion = 3;
                      }

                      $("#gridPopUpSteelgo").data("kendoGrid").dataSource.sync();
                  }
              },
              title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()],
              width: "50px", attributes: { style: "text-align:center;" }
          },

        ],
        editable: "incell",
        toolbar: [{ name: "create" }]

    });
    CustomisaGrid($("#gridPopUpSteelgo"));


};

function CargarGridPopUpDetalleInspeccion() {

    $("#gridPopUpInspeccion").kendoGrid({
        ////autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        Inspeccion: { type: "string", editable: true },
                        Comentario: { type: "string", editable: true },
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 },
                    { field: "Accion", operator: "eq", value: 0 },
                    { field: "Accion", operator: "eq", value: undefined }
                ]
            },
        },
        selectable: true,
        filterable: getGridFilterableMaftec(),
        columns: [
          { field: "Inspeccion", title: "Inspección", filterable: getGridFilterableCellMaftec(), width: "100px", editor: RenderComboBoxInspeccion },
          { field: "Comentario", title: "Comentario", filterable: getGridFilterableCellMaftec(), width: "100px" },
          {
              command: {
                  text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                  click: function (e) {
                      e.preventDefault();
                      var dataItem = $("#gridPopUpInspeccion").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

                      if ((dataItem.Accion == 1) || (dataItem.Accion == 0)) {
                          $("#gridPopUpInspeccion").data("kendoGrid").dataSource.remove(dataItem);
                      }
                      else {
                          dataItem.Accion = 3;
                      }

                      $("#gridPopUpInspeccion").data("kendoGrid").dataSource.sync();
                  }
              },
              title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()],
              width: "50px", attributes: { style: "text-align:center;" }
          },

        ],
        editable: true,
        toolbar: [{ name: "create" }],
        navigatable: true,
        dataBound: function (a) {

        },


    });
    CustomisaGrid($("#gridPopUpInspeccion"));

};





function LlenarGridPopUpDetalleColadas(data) {
    modeloRenglon = data;

    //$("#gridPopUpSteelgo").data('kendoGrid').dataSource.data([]);

    //if ($("#gridPopUpSteelgo").data('kendoGrid').dataSource._filter == undefined) {
    //    //investigar porque al destruir una ventana se eliminan solo los filtros.
    //    $("#gridPopUpSteelgo").data('kendoGrid').dataSource._filter = {
    //        logic: "or",
    //        filters: [
    //          { field: "Accion", operator: "eq", value: 1 },
    //          { field: "Accion", operator: "eq", value: 2 },
    //            { field: "Accion", operator: "eq", value: 0 },
    //            { field: "Accion", operator: "eq", value: undefined }
    //        ]
    //    };
    //}


    if ($('input:radio[name=Muestra]:nth(0)').prop('checked')) {
        $("#gridPopUpCecilia").data('kendoGrid').dataSource.data([]);
        var ds = $("#gridPopUpCecilia").data("kendoGrid").dataSource;
        var array = data.ListaDetalleColadas;

        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
        $("#gridPopUpSteelgo").data('kendoGrid').dataSource.sync();
        VentanaModalDetalleCecilia();

    }
    else if ($('input:radio[name=Muestra]:nth(1)').prop('checked')) {
        $("#gridPopUpGerez").data('kendoGrid').dataSource.data([]);
        var ds = $("#gridPopUpGerez").data('kendoGrid').dataSource;
        var array = data.ListaDetalleColadas;
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
        VentanaModalDetalleGerez();
    }
    else if ($('input:radio[name=Muestra]:nth(2)').prop('checked')) {
        $("#gridPopUpSteelgo").data('kendoGrid').dataSource.data([]);

        var ds = $("#gridPopUpSteelgo").data("kendoGrid").dataSource;
        var array = data.ListaDetalleColadas;

        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }

        VentanaModalDetalleSteelgo();
    }




}

var coladaRow;
function LlenarGridPopUpDetalleInspeccion(data) {

    coladaRow = data;
    var ds;
    $("#gridPopUpInspeccion").data('kendoGrid').dataSource.data([]);
    ds = $("#gridPopUpInspeccion").data("kendoGrid").dataSource;


    var array = data.ListaDetalleInspeccion;

    if (array != undefined)
        for (var i = 0; i < array.length; i++) {
            ds.add(array[i]);
        }
    VentanaModalDetalleInspeccion();
}

function VentanaModalDetalleGerez() {

    var modalTitle = "";
    modalTitle = "Codo 45º Radio Largo 0.5 x, NeoData: NPS SW Codo 45º Radio Largo , #3000 A 105";
    var window = $("#windowGridGerez");
    var win = window.kendoWindow({
        modal: true,
        title: "",
        resizable: false,
        visible: true,
        width: "80%",
        minWidth: 30,
        position: {
            top: "10px",
            left: "10px"
        },
        animation: {
            close: false,
            open: false
        },

    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};

function VentanaModalDetalleCecilia() {

    var modalTitle = "";
    modalTitle = "Codo 45º Radio Largo 0.5 x, NeoData: NPS SW Codo 45º Radio Largo , #3000 A 105";
    var window = $("#windowGridCecilia");
    var win = window.kendoWindow({
        modal: true,
        title: "",
        resizable: false,
        visible: true,
        width: "40%",
        minWidth: 30,
        position: {
            top: "10px",
            left: "10px"
        },
        animation: {
            close: false,
            open: false
        },

    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};


function VentanaModalDetalleSteelgo() {

    var modalTitle = "";
    modalTitle = "Codo 45º Radio Largo 0.5 x, NeoData: NPS SW Codo 45º Radio Largo , #3000 A 105";
    var window = $("#windowGridSteelgo");

    var win = window.kendoWindow({
        modal: true,
        title: "",
        resizable: false,
        visible: true,
        width: "99%",//tipo == 1 ? "30%" : tipo == 2 ? "80%" : "99%",
        minWidth: 30,
        position: {
            top: "10px",
            left: "10px"
        },
        content: "texto texto texto y mas texto",
        animation: {
            close: false,
            open: false
        },
        actions: []
    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};


function VentanaModalDetalleInspeccion() {

    var modalTitle = "Inspeccion colada";
    modalTitle = "";
    var window = $("#windowGridInspeccion");
    var win = window.kendoWindow({
        modal: true,
        title: "DetalleDefectos",
        resizable: false,
        visible: true,
        width: "59%",
        minWidth: 30,
        position: {
            top: "10px",
            left: "10px"
        },
        content: "texto texto texto y mas texto",
        actions: [

        ],
        animation: {
            close: false,
            open: false
        },
    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};
