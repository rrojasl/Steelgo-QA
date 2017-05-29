var modeloRenglon;

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
            { field: "Coladas", title: " ", filterable: false, width: "50px", template: "<div class='EnlaceDetalleColada' style='text-align:center;'><a href='\\#'> <span><img src='/Content/images/SAMC_ComplementoIcon.png'></img></span></a></div> " },


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
        },
        selectable: true,
        filterable: getGridFilterableMaftec(),
        columns: [
          { field: "Inspeccion", title: "Inspección", filterable: getGridFilterableCellMaftec(), width: "30px", editor: RenderComboBoxInspeccion },
          { field: "Comentario", title: "Comentario", filterable: getGridFilterableCellMaftec(), width: "50px" },


        ],
        editable: true,
        toolbar: [{ name: "create" }]
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
