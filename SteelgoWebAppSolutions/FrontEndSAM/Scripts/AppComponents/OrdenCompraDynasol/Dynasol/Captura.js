var modeloRenglon;

function changeLanguageCall() {
    CargarGrid();
    CargarGridPopUpDetalleCecilia()
    CargarGridPopUpDetallePartida();
    CargarGridPopUpDetallePorPartidaColadas();
    CargarGridPopUpDetalleInspeccion();
    inicio();
};


function inicio() {
    SuscribirEventos();
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
            { field: "Rev", title: "Rev", filterable: getGridFilterableCellMaftec(), width: "50px" },
            { field: "Descripcion", title: "Descripción", filterable: getGridFilterableCellMaftec(), width: "120px" },
            { field: "MaterialNorma", title: "Material/ Norma", filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "Diametro1", title: "D1", filterable: getGridFilterableCellMaftec(), width: "40px" },
            { field: "Diametro2", title: "D2", filterable: getGridFilterableCellMaftec(), width: "40px" },
            { field: "Registro", title: "Schedule", filterable: getGridFilterableCellMaftec(), width: "90px" },
            { field: "Rating", title: "Rating", filterable: getGridFilterableCellMaftec(), width: "80px" },
            { field: "PreparacionExtremos", title: "Prep. ext.", filterable: getGridFilterableCellMaftec(), width: "70px" },
            //{ field: "Neodata", title: "Neodata", filterable: getGridFilterableCellMaftec(), width: "90px" },
            { field: "Cant", title: "Cant", filterable: getGridFilterableCellMaftec(), width: "60px" },
            { field: "PrecioUnidad", title: "Precio U.", filterable: getGridFilterableCellMaftec(), width: "80px" },
            { field: "Total", title: "Total", filterable: getGridFilterableCellMaftec(), width: "70px" },
            //{ field: "PackingList", title: "Packing List", filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "Partida", title: "Partida", filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "Coladas", title: " ", filterable: false, width: "50px", template: "<div class='EnlaceDefectoPorPlaca' style='text-align:center;'><a href='\\#'> <span><img src='/Content/images/SAMC_ComplementoIcon.png'></img></span></a></div> " },


        ],

        editable: true,
        navigatable: true
    });
    CustomisaGrid($("#grid")); 5
};

function CargarGridPopUpDetalleCecilia() {

    $("#gridPopUpCecilia").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [
                {

                    Colada: "50015",
                    InspeccionDetalle: "RELEASED",
                    Comentario: "",
                    Cant: 10,
                    CantG: 9,
                    FechaRecibido: "",
                    CambionRecibido: "",
                    FacturaProveedor: "",
                    FechaLanzamiento: "",
                    FechaEnvio: "",
                    FechaRecibido: "",
                    CantRecibida: 10,
                    LiberacionInspeccion: "",
                    FechaFactura: "",
                },
                {

                    Colada: "37LLLL",
                    InspeccionDetalle: "RELEASED",
                    Comentario: "",
                    Cant: 3,
                    CantG: 2,
                    FechaRecibido: "",
                    CambionRecibido: "",
                    FacturaProveedor: "",
                    FechaLanzamiento: "",
                    FechaEnvio: "",
                    FechaRecibidoS: "",
                    CantRecibida: 2,
                    LiberacionInspeccion: "",
                    FechaFactura: "",
                }
            ],
            schema: {
                model: {
                    fields: {

                        Colada: { type: "number", editable: true },
                        InspeccionDetalle: { type: "string", editable: false },
                        Comentario: { type: "string", editable: false },
                        Cant: { type: "number", editable: true },
                        FechaRecibido: { type: "date", editable: true },
                        CambionRecibido: { type: "string", editable: true },
                        FacturaProveedor: { type: "string", editable: true },
                        FechaLanzamiento: { type: "date", editable: true },
                        FechaEnvio: { type: "date", editable: true },
                        FechaRecibidoS: { type: "date", editable: true },
                        CantRecibida: { type: "number", editable: true },
                        LiberacionInspeccion: { type: "string", editable: true },
                        FechaFactura: { type: "date", editable: true },
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
          { field: "Colada", title: "Colada", filterable: getGridFilterableCellMaftec(), width: "90px", editor: RenderComboBoxColada },
          { field: "Cant", title: "Cant", filterable: getGridFilterableCellMaftec(), width: "73px" },
          { field: "InspeccionDetalle", title: "Insp", filterable: false, width: "70px", template: "<div class='EnlaceInspeccion' style='text-align:center;'><a href='\\#'  > <span>#=InspeccionDetalle#</span></a></div> " },
          { field: "Comentario", title: "Comen", filterable: false, width: "80px", },
          //Gerez
          

          {
              command: {
                  text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                  click: function (e) {
                      e.preventDefault();
                      var dataItem = $("#gridPopUpDefectos").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

                      if ((dataItem.Accion == 1) || (dataItem.Accion == 0)) {
                          $("#gridPopUpDefectos").data("kendoGrid").dataSource.remove(dataItem);
                      }
                      else {
                          dataItem.Accion = 3;
                      }

                      $("#gridPopUpDefectos").data("kendoGrid").dataSource.sync();
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


function CargarGridPopUpDetallePartida() {

    $("#gridPopUpGerez").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [
                {

                    Colada: "50015",
                    InspeccionDetalle: "RELEASED",
                    Comentario: "",
                    Cant: 10,
                    CantG: 9,
                    FechaRecibido: "",
                    CambionRecibido: "",
                    FacturaProveedor: "",
                    FechaLanzamiento: "",
                    FechaEnvio: "",
                    FechaRecibido: "",
                    CantRecibida: 10,
                    LiberacionInspeccion: "",
                    FechaFactura: "",
                },
                {

                    Colada: "37LLLL",
                    InspeccionDetalle: "RELEASED",
                    Comentario: "",
                    Cant: 3,
                    CantG: 2,
                    FechaRecibido: "",
                    CambionRecibido: "",
                    FacturaProveedor: "",
                    FechaLanzamiento: "",
                    FechaEnvio: "",
                    FechaRecibidoS: "",
                    CantRecibida: 2,
                    LiberacionInspeccion: "",
                    FechaFactura: "",
                }
            ],
            schema: {
                model: {
                    fields: {

                        Colada: { type: "number", editable: true },
                        InspeccionDetalle: { type: "string", editable: false },
                        Comentario: { type: "string", editable: false },
                        Cant: { type: "number", editable: true },
                        FechaRecibido: { type: "date", editable: true },
                        CambionRecibido: { type: "string", editable: true },
                        FacturaProveedor: { type: "string", editable: true },
                        FechaLanzamiento: { type: "date", editable: true },
                        FechaEnvio: { type: "date", editable: true },
                        FechaRecibidoS: { type: "date", editable: true },
                        CantRecibida: { type: "number", editable: true },
                        LiberacionInspeccion: { type: "string", editable: true },
                        FechaFactura: { type: "date", editable: true },
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
          { field: "Colada", title: "Colada", filterable: getGridFilterableCellMaftec(), width: "90px", editor: RenderComboBoxColada },
          { field: "Cant", title: "Cant", filterable: getGridFilterableCellMaftec(), width: "73px" },
          { field: "InspeccionDetalle", title: "Insp", filterable: false, width: "70px", template: "<div class='EnlaceInspeccion' style='text-align:center;'><a href='\\#'  > <span>#=InspeccionDetalle#</span></a></div> " },
          { field: "Comentario", title: "Comen", filterable: false, width: "80px", },
          //Gerez
          { field: "CantG", title: "Cant", filterable: getGridFilterableCellMaftec(), width: "73px" },
          { field: "FechaRecibido", title: "Fecha R.", filterable: getGridFilterableCellMaftec(), width: "82px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
          { field: "CambionRecibido", title: "Camión", filterable: getGridFilterableCellMaftec(), width: "90px" },
          { field: "FacturaProveedor", title: "Factura P.", filterable: getGridFilterableCellMaftec(), width: "100px" },
          { field: "LiberacionInspeccion", title: "Acuerdo R", filterable: getGridFilterableCellMaftec(), width: "100px" },
          { field: "FechaEnvio", title: "Fecha E.", filterable: getGridFilterableCellMaftec(), width: "82px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
          { field: "CantRecibidaS", title: "Ped", filterable: getGridFilterableCellMaftec(), width: "73px" },
          { field: "ShippingDate", title: "Shipping Date", filterable: getGridFilterableCellMaftec(), width: "100px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
          
          {
              command: {
                  text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                  click: function (e) {
                      e.preventDefault();
                      var dataItem = $("#gridPopUpDefectos").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

                      if ((dataItem.Accion == 1) || (dataItem.Accion == 0)) {
                          $("#gridPopUpDefectos").data("kendoGrid").dataSource.remove(dataItem);
                      }
                      else {
                          dataItem.Accion = 3;
                      }

                      $("#gridPopUpDefectos").data("kendoGrid").dataSource.sync();
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

function CargarGridPopUpDetallePorPartidaColadas() {

    $("#gridPopUpDefectos").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [
                {

                    Colada: "50015",
                    InspeccionDetalle: "RELEASED",
                    Comentario: "",
                    Cant: 10,
                    CantG: 9,
                    FechaRecibido: "27/04/2017",
                    CambionRecibido: "14",
                    FacturaProveedor: "208668",
                    FechaEnvio: "",
                    FechaRecibido: "",
                    CantRecibida: 10,
                    LiberacionInspeccion: "N/A",
                    FechaFactura: "24/04/2017",
                    ShippingDate: "27/04/2017"
                },
                {

                    Colada: "37LLLL",
                    InspeccionDetalle: "RELEASED",
                    Comentario: "",
                    Cant: 3,
                    CantG: 2,
                    FechaRecibido: "27/04/2017",
                    CambionRecibido: "14",
                    FacturaProveedor: "208668",
                    FechaEnvio: "",
                    FechaRecibidoS: "",
                    CantRecibida: 2,
                    LiberacionInspeccion: "N/A",
                    FechaFactura: "24/04/2017",
                    ShippingDate: "27/04/2017"
                }
            ],
            schema: {
                model: {
                    fields: {

                        Colada: { type: "number", editable: true },
                        InspeccionDetalle: { type: "string", editable: false },
                        Comentario: { type: "string", editable: false },
                        Cant: { type: "number", editable: false },
                        CantG: { type: "number", editable: false },
                        FechaRecibido: { type: "date", editable: true },
                        CambionRecibido: { type: "string", editable: false },
                        FacturaProveedor: { type: "string", editable: false },
                        FechaEnvio: { type: "date", editable: false },
                        FechaRecibidoS: { type: "date", editable: false },
                        CantRecibida: { type: "number", editable: false },

                        LiberacionInspeccion: { type: "string", editable: true },
                        FechaFactura: { type: "date", editable: true },
                        ShippingDate: { type: "date", editable: false },
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
          { field: "Colada", title: "Colada", filterable: getGridFilterableCellMaftec(), width: "90px", editor: RenderComboBoxColada },
          { field: "Cant", title: "Cant", filterable: getGridFilterableCellMaftec(), width: "73px" },
          { field: "InspeccionDetalle", title: "Insp", filterable: false, width: "70px", template: "<div class='EnlaceInspeccion' style='text-align:center;'><a href='\\#'  > <span>#=InspeccionDetalle#</span></a></div> " },
          { field: "Comentario", title: "Comen", filterable: false, width: "80px", },
          //Gerez
          { field: "CantG", title: "Cant", filterable: getGridFilterableCellMaftec(), width: "73px" },
          { field: "FechaRecibido", title: "Fecha R.", filterable: getGridFilterableCellMaftec(), width: "82px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
          { field: "CambionRecibido", title: "Camión", filterable: getGridFilterableCellMaftec(), width: "90px" },
          { field: "FacturaProveedor", title: "Factura P.", filterable: getGridFilterableCellMaftec(), width: "100px" },
          { field: "LiberacionInspeccion", title: "Acuerdo R", filterable: getGridFilterableCellMaftec(), width: "100px" },
          { field: "FechaEnvio", title: "Fecha E.", filterable: getGridFilterableCellMaftec(), width: "82px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
          { field: "CantRecibidaS", title: "Ped", filterable: getGridFilterableCellMaftec(), width: "73px" },
          { field: "ShippingDate", title: "Shipping Date", filterable: getGridFilterableCellMaftec(), width: "100px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
          //Steelgo
          { field: "CantS", title: "Cant", filterable: getGridFilterableCellMaftec(), width: "73px" },
          { field: "FechaRecibidoS", title: "Fecha R.", filterable: getGridFilterableCellMaftec(), width: "82px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
          { field: "InspeccionS", title: "Insp", filterable: false, width: "50px", editor: RenderComboBoxInspeccion },
          { field: "FechaFactura", title: "Fecha F.", filterable: getGridFilterableCellMaftec(), width: "82px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },

          {
              command: {
                  text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                  click: function (e) {
                      e.preventDefault();
                      var dataItem = $("#gridPopUpDefectos").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

                      if ((dataItem.Accion == 1) || (dataItem.Accion == 0)) {
                          $("#gridPopUpDefectos").data("kendoGrid").dataSource.remove(dataItem);
                      }
                      else {
                          dataItem.Accion = 3;
                      }

                      $("#gridPopUpDefectos").data("kendoGrid").dataSource.sync();
                  }
              },
              title: _dictionary.columnELM[$("#language").data("kendoDropDownList").value()],
              width: "50px", attributes: { style: "text-align:center;" }
          },

        ],
        editable: "incell",
        toolbar: [{ name: "create" }]

    });
    CustomisaGrid($("#gridPopUpDefectos"));

    //if ($('input:radio[name=Muestra]:nth(0)').prop('checked')) {
    //    //Gerez
    //    $("#gridPopUpDefectos").data("kendoGrid").hideColumn("CantG");
    //    $("#gridPopUpDefectos").data("kendoGrid").hideColumn("FechaRecibido");
    //    $("#gridPopUpDefectos").data("kendoGrid").hideColumn("CambionRecibido");
    //    $("#gridPopUpDefectos").data("kendoGrid").hideColumn("FacturaProveedor");
    //    $("#gridPopUpDefectos").data("kendoGrid").hideColumn("LiberacionInspeccion");
    //    $("#gridPopUpDefectos").data("kendoGrid").hideColumn("FechaEnvio");
    //    $("#gridPopUpDefectos").data("kendoGrid").hideColumn("CantRecibidaS");
    //    $("#gridPopUpDefectos").data("kendoGrid").hideColumn("ShippingDate");
    //    //Steelgo
    //    $("#gridPopUpDefectos").data("kendoGrid").hideColumn("CantS");
    //    $("#gridPopUpDefectos").data("kendoGrid").hideColumn("FechaRecibidoS");
    //    $("#gridPopUpDefectos").data("kendoGrid").hideColumn("InspeccionS");
    //    $("#gridPopUpDefectos").data("kendoGrid").hideColumn("FechaFactura");
    //////}

    //else if ($('input:radio[name=Muestra]:nth(1)').prop('checked')) {
    //    //Gerez
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("CantG");
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("FechaRecibido");
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("CambionRecibido");
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("FacturaProveedor");
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("LiberacionInspeccion");
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("FechaEnvio");
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("CantRecibidaS");
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("ShippingDate");
    //    //Steelgo
    //    $("#gridPopUpDefectos").data("kendoGrid").hideColumn("CantS");
    //    $("#gridPopUpDefectos").data("kendoGrid").hideColumn("FechaRecibidoS");
    //    $("#gridPopUpDefectos").data("kendoGrid").hideColumn("InspeccionS");
    //    $("#gridPopUpDefectos").data("kendoGrid").hideColumn("FechaFactura");
    //}


    //$('input:radio[name=Muestra]:nth(2)').change(function () {
    //    //Gerez
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("CantG");
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("FechaRecibido");
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("CambionRecibido");
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("FacturaProveedor");
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("LiberacionInspeccion");
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("FechaEnvio");
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("CantRecibidaS");
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("ShippingDate");
    //    //Steelgo
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("CantS");
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("FechaRecibidoS");
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("InspeccionS");
    //    $("#gridPopUpDefectos").data("kendoGrid").showColumn("FechaFactura");
    //});
};

function CargarGridPopUpDetalleInspeccion() {

    $("#gridPopUpInspeccion").kendoGrid({
        ////autoBind: true,
        dataSource: {
            data: [{
                Inspeccion: "REJECTED",
                Comentario: "mal elemento",
            }, {
                Inspeccion: "RELEASED",
                Comentario: "",
            }],//options.model.ListaDetallePorPlacas,
            schema: {
                model: {
                    fields: {
                        Inspeccion: { type: "string", editable: true },
                        Comentario: { type: "string", editable: true },
                    }
                }
            },
        },
        selectable: true,
        filterable: getGridFilterableMaftec(),
        columns: [
          { field: "Inspeccion", title: "Inspección", filterable: getGridFilterableCellMaftec(), width: "30px", editor: RenderComboBoxInspeccion },
          { field: "Comentario", title: "Comentario", filterable: getGridFilterableCellMaftec(), width: "50px" },


        ],
        editable: true,
        //toolbar: [{ name: "create" }],
        navigatable: true,
        dataBound: function (a) {

        },
        toolbar: [{ name: "create" }]

    });
    CustomisaGrid($("#gridPopUpInspeccion"));

};


var currentPlaca = null;
function LlenarGridPopUpDetallePartida(data) {
    modeloRenglon = data;
    currentPlaca = data;
    //$("#gridPopUp").data('kendoGrid').dataSource.data([]);

    var ds = $("#gridPopUpGerez").data("kendoGrid").dataSource;
    //var array = data.ListaDetallePorPlacas;
    //for (var i = 0; i < array.length; i++) {
    //    ds.add(array[i]);
    //}
    VentanaModalDetallePlaca();
}

var currentDefectosPorPlaca = null;
function LlenarGridPopUpDetalleDefectoPorPlaca(data) {
    modeloRenglon = data;
    currentDefectosPorPlaca = data;
    
    //$("#gridPopUpDefectos").data('kendoGrid').dataSource.data([]);

    if ($("#gridPopUpDefectos").data('kendoGrid').dataSource._filter == undefined) {
        //investigar porque al destruir una ventana se eliminan solo los filtros.
        $("#gridPopUpDefectos").data('kendoGrid').dataSource._filter = {
            logic: "or",
            filters: [
              { field: "Accion", operator: "eq", value: 1 },
              { field: "Accion", operator: "eq", value: 2 },
                { field: "Accion", operator: "eq", value: 0 },
                { field: "Accion", operator: "eq", value: undefined }
            ]
        };
    }


    //var ds = $("#gridPopUpDefectos").data("kendoGrid").dataSource;
    //var array = data.ListaDetalleDefectos;
    //listaDefectosAuxiliar = data.ListaDefectos;
    //for (var i = 0; i < array.length; i++) {
    //    ds.add(array[i]);
    //}
    //$("#gridPopUpDefectos").data('kendoGrid').dataSource.sync();
    VentanaModalDetalleDefectoPorPlaca();
}

var currentPlaca = null;
function LlenarGridPopUpDetalleInspeccion(data) {
    modeloRenglon = data;
    currentPlaca = data;
    
    //$("#gridPopUp").data('kendoGrid').dataSource.data([]);
    var ds = $("#gridPopUpDefectos").data("kendoGrid").dataSource;
    //var array = data.ListaDetallePorPlacas;
    //for (var i = 0; i < array.length; i++) {
    //    ds.add(array[i]);
    //}
    VentanaModalDetalleInspeccion();
}

function VentanaModalDetallePlaca() {

    var modalTitle = "";
    modalTitle = "Codo 45º Radio Largo 0.5 x, NeoData: NPS SW Codo 45º Radio Largo , #3000 A 105";
    var window = $("#windowGridGerez");
    var win = window.kendoWindow({
        modal: true,
        title: "Codo 45º Radio Largo 0.5 x, NeoData: NPS SW Codo 45º Radio Largo , #3000 A 105",
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
        title: "PackingList: 35777-1, Partida: Partida 1",
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


function VentanaModalDetalleDefectoPorPlaca() {
    var tipo = 0;

    if ($('input:radio[name=Muestra]:nth(0)').prop('checked')) {
        tipo = 1;
    }
    else if ($('input:radio[name=Muestra]:nth(1)').prop('checked')) {
        tipo = 2;
    }
    else if ($('input:radio[name=Muestra]:nth(2)').prop('checked')) {
        tipo = 3;
    }


    var modalTitle = "";
    modalTitle = "Codo 45º Radio Largo 0.5 x, NeoData: NPS SW Codo 45º Radio Largo , #3000 A 105";
    var window = $("#windowGridDefectos");
    

    var win = window.kendoWindow({
        modal: true,
        title: "Codo 45º Radio Largo 0.5 x, NeoData: NPS SW Codo 45º Radio Largo , #3000 A 105",
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
