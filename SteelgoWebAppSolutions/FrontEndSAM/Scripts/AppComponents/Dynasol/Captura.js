var modeloRenglon;

function changeLanguageCall() {
    CargarGrid();
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
            data: [{
                Rev: "CS",
                Descripcion: "Codo 45º Radio Largo",
                MaterialNorma: "A 105",
                Diametro1: "0.5",
                Diametro2: "",
                Registro: "SCH STD",
                Rating: "#300",
                PreparacionExtremos: "SW",
                Neodata: "0.5 x  NPS SW Codo 45º Radio Largo  , #3000 A 105",
                Cant: 10,
                PrecioUnidad: "$3,78 ",
                Total: "$37,83 ",
                PackingList: "35777-1",
                TemplateDetalleElemento: "Detalle Partidas"
            },
            {
                Rev: "CS",
                Descripcion: "Codo 45º Radio Largo",
                MaterialNorma: "A 105",
                Diametro1: "1.5",
                Diametro2: "",
                Registro: "SCH STD",
                Rating: "#300",
                PreparacionExtremos: "SW",
                Neodata: "1.5 x  NPS SW Codo 45º Radio Largo  , #3000 A 105",
                Cant: 10,
                PrecioUnidad: "$9,67",
                Total: "$96,71",
                PackingList: "",
                TemplateDetalleElemento: "Detalle Partidas"
            },
            {
                Rev: "CS",
                Descripcion: "Codo 45º Radio Largo",
                MaterialNorma: "A 105",
                Diametro1: "4",
                Diametro2: "",
                Registro: "SCH STD",
                Rating: "#300",
                PreparacionExtremos: "BW",
                Neodata: "4 x  NPS BW Codo 45º Radio Largo SCH STD ,  A234 Gr.WPB seamless",
                Cant: 4,
                PrecioUnidad: "$8,37",
                Total: "$33,46",
                PackingList: "",
                TemplateDetalleElemento: "Detalle Partidas"
            }
            ],
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
            { field: "MaterialNorma", title: "Material/Norma", filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "Diametro1", title: "Diam 1", filterable: getGridFilterableCellMaftec(), width: "70px" },
            { field: "Diametro2", title: "Diam 2", filterable: getGridFilterableCellMaftec(), width: "70px" },
            { field: "Registro", title: "Registro", filterable: getGridFilterableCellMaftec(), width: "90px" },
            { field: "Rating", title: "Rating", filterable: getGridFilterableCellMaftec(), width: "80px" },
            { field: "PreparacionExtremos", title: "Prep. ext.", filterable: getGridFilterableCellMaftec(), width: "70px" },
            { field: "Neodata", title: "Neodata", filterable: getGridFilterableCellMaftec(), width: "90px" },
            { field: "Cant", title: "Cant", filterable: getGridFilterableCellMaftec(), width: "60px" },
            { field: "PrecioUnidad", title: "Precio U.", filterable: getGridFilterableCellMaftec(), width: "90px" },
            { field: "Total", title: "Total", filterable: getGridFilterableCellMaftec(), width: "70px" },
            { field: "PackingList", title: "Packing List", filterable: getGridFilterableCellMaftec(), width: "120px" },
            { field: "TemplateDetalleElemento", title: "Detalle", filterable: false, width: "105px", template: "<div class='EnlacePorPlaca' style='text-align:center;'><a href='\\#'  > <span>#=TemplateDetalleElemento#</span></a></div> " },


        ],

        editable: true,
        navigatable: true
    });
    CustomisaGrid($("#grid")); 5
};

function CargarGridPopUpDetallePartida() {

    $("#gridPopUp").kendoGrid({
        ////autoBind: true,
        dataSource: {
            data: [{
                Partida: "Partida 1",
                Comentario: "",
                ColadasDetalle: "Detalle Coladas",
            },
            {
                Partida: "Partida 2",
                Comentario: "asdhgfh",
                ColadasDetalle: "Detalle Coladas",
            },
            {
                Partida: "Partida 3",
                Comentario: "comen",
                ColadasDetalle: "Detalle Coladas",
            }
            ],
            schema: {
                model: {
                    fields: {
                        Partida: { type: "string", editable: false },
                        Comentario: { type: "string", editable: true },
                        ColadasDetalle: { type: "String", editable: false },
                    }
                }
            },
        },
        selectable: true,
        filterable: getGridFilterableMaftec(),
        columns: [
          { field: "Partida", title: "Partida", filterable: getGridFilterableCellMaftec(), width: "30px" },
          { field: "Comentario", title: "Comentario", filterable: getGridFilterableCellMaftec(), width: "50px" },
          { field: "ColadasDetalle", title: "Coladas", filterable: false, width: "15px", template: "<div class='EnlaceDefectoPorPlaca' style='text-align:center;'><a href='\\#'  > <span>#=ColadasDetalle#</span></a></div> " },

        ],
        editable: true,
        toolbar: [{ name: "create" }],
        navigatable: true,
        dataBound: function (a) {

        },


    });
    CustomisaGrid($("#gridPopUp"));

};

function CargarGridPopUpDetallePorPartidaColadas() {

    $("#gridPopUpDefectos").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [
                {
                    Colada: "CA0305",
                    InspeccionDetalle: "Detalle Insp",
                    Cant: 10,
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
                    Colada: "JTXB",
                    InspeccionDetalle: "Detalle Insp",
                    Cant: 3,
                    FechaRecibido: "",
                    CambionRecibido: "",
                    FacturaProveedor: "",
                    FechaLanzamiento: "",
                    FechaEnvio: "",
                    FechaRecibido: "",
                    CantRecibida: 2,
                    LiberacionInspeccion: "",
                    FechaFactura: "",
                }
            ],
            schema: {
                model: {
                    fields: {
                        Colada: { type: "number", editable: false },
                        InspeccionDetalle: { type: "string", editable: false },
                        Cant: { type: "number", editable: false },
                        FechaRecibido: { type: "date", editable: true },
                        CambionRecibido: { type: "string", editable: true },
                        FacturaProveedor: { type: "string", editable: true },
                        FechaLanzamiento: { type: "date", editable: true },
                        FechaEnvio: { type: "date", editable: true },
                        FechaRecibido: { type: "date", editable: true },
                        CantRecibida: { type: "number", editable: true },
                        LiberacionInspeccion: { type: "string", editable: true },
                        FechaFactura: { type: "date", editable: true },
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
          { field: "Colada", title: "Colada", filterable: getGridFilterableCellMaftec(), width: "90px" },
          { field: "InspeccionDetalle", title: "Inspección", filterable: false, width: "90px", template: "<div class='EnlaceInspeccion' style='text-align:center;'><a href='\\#'  > <span>Detalle Inspección</span></a></div> " },
          { field: "Cant", title: "Cant", filterable: getGridFilterableCellMaftec(), width: "75px" },
          { field: "FechaRecibido", title: "Fecha R.", filterable: getGridFilterableCellMaftec(), width: "100px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
          { field: "CambionRecibido", title: "Camión R.", filterable: getGridFilterableCellMaftec(), width: "100px" },
          { field: "FacturaProveedor", title: "Factura Prov.", filterable: getGridFilterableCellMaftec(), width: "95px" },
          { field: "FechaLanzamiento", title: "Fecha L.", filterable: getGridFilterableCellMaftec(), width: "90px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
          { field: "FechaEnvio", title: "Fecha E.", filterable: getGridFilterableCellMaftec(), width: "90px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
          { field: "FechaRecibido", title: "Fecha R.", filterable: getGridFilterableCellMaftec(), width: "90px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
          { field: "CantRecibida", title: "Cant R.", filterable: getGridFilterableCellMaftec(), width: "100px" },
          { field: "LiberacionInspeccion", title: "Lib. Inspeccion", filterable: getGridFilterableCellMaftec(), width: "110px" },
          { field: "FechaFactura", title: "Fecha F.", filterable: getGridFilterableCellMaftec(), width: "90px", format: _dictionary.FormatoFecha[$("#language").data("kendoDropDownList").value()] },
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
            {
                command: {
                    text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()],
                    click: function (e) {
                        e.preventDefault();
                        if ($('#Guardar').text() == _dictionary.lblGuardar[$("#language").data("kendoDropDownList").value()]) {

                            var itemToClean = $("#gridPopUpDefectos").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

                            if (itemToClean.Accion == 2)
                                itemToClean.Accion = 4;


                            if (itemToClean.DefectoID != "") {
                                itemToClean.DefectoID = 0;
                            }

                            itemToClean.Defecto = "";
                            itemToClean.InicioMM = "";
                            itemToClean.FinMM = "";

                            var dataSource = $("#gridPopUpDefectos").data("kendoGrid").dataSource;
                            dataSource.sync();
                            //alert(itemToClean);
                        }
                    }
                },
                title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()],
                width: "50px", attributes: { style: "text-align:center;" }
            }
        ],
        editable: "incell",
        toolbar: [{ name: "create" }]

    });
    CustomisaGrid($("#gridPopUpDefectos"));

    //WindowModalGridDefectoDetalle(model);
};

function CargarGridPopUpDetalleInspeccion() {

    $("#gridPopUpInspeccion").kendoGrid({
        ////autoBind: true,
        dataSource: {
            data: [{
                Inspeccion: "No ok",
                Comentario: "mal elemento",
            }, {
                Inspeccion: "ok",
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


    });
    CustomisaGrid($("#gridPopUpInspeccion"));

};


var currentPlaca = null;
function LlenarGridPopUpDetallePartida(data) {
    modeloRenglon = data;
    currentPlaca = data;
    //$("#gridPopUp").data('kendoGrid').dataSource.data([]);
    var ds = $("#gridPopUp").data("kendoGrid").dataSource;
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
    modalTitle = "Partidas";
    var window = $("#windowGrid");
    var win = window.kendoWindow({
        modal: true,
        title: "DetallePlaca",
        resizable: false,
        visible: true,
        width: "60%",
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

    var modalTitle = "Coladas";
    modalTitle = "";
    var window = $("#windowGridDefectos");
    var win = window.kendoWindow({
        modal: true,
        title: "DetalleDefectos",
        resizable: false,
        visible: true,
        width: "95%",
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
