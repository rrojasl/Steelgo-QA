var modeloRenglon;

function changeLanguageCall() {
    CargarGrid();
    //CargarGridPopUpDetallePorPlaca();
    //CargarGridPopUpDetallePorPlacaPorDefectos();
    inicio();

    CargarGridPopUpDetallePorPlaca();
    //document.title = _dictionary.ServiciosTecnicosValidacionRTBreadcrumb[$("#language").data("kendoDropDownList").value()];
};

function inicio() {
    SuscribirEventos();
    //AjaxProyecto();
    //AjaxFuente();
    //AjaxTurno();
}

function validarReglasDeLlenado() {
    //return true;
    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
        if ($("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas.length > 0) {
            for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas.length; j++) {

                $('tr[data-uid="' + $("#grid").data("kendoGrid").dataSource._data[i].uid + '"] ').css("background-color", "#ffffff");
                //if ($("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].ResultadosID == (0)) {
                //    //alert("Tienes por lo menos un resultado sin evaluar en la junta: " + $("#grid").data("kendoGrid").dataSource._data[i].EtiquetaJunta)
                //    //displayNotify("MensajeGuardado", "", "0");
                //    $('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
                //    return false;
                //}
                //else if ($("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].Resultado == 0) {//Si esta evaluado pero hay que revisar si esta rechazado tiene que tenes defectos
                //    if (!($("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].DetalleResultados.length > 0)) {
                //        //alert("Si calificas como rechazado un defecto, tiene que tener por lo menos un resultado, en la junta: " + $("#grid").data("kendoGrid").dataSource._data[i].EtiquetaJunta)
                //        displayNotify("MensajeGuardadoExistoso", "", "0");
                //        $('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
                //        return false;
                //    }
                //}
                //for (var k = 0; k < $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].DetalleResultados.length; k++) {
                //    if ($("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].DetalleResultados[k].DefectoID == (-1)) {
                //        //alert("Tienes por lo menos un defecto sin evaluar en la junta: " + $("#grid").data("kendoGrid").dataSource._data[i].Etiqueta)
                //        displayNotify("MensajeGuardadoExistoso", "", "0");
                //        $('tr[data-uid="' + arregloCaptura[index].uid + '"] ').css("background-color", "#ffcccc");
                //        return false;
                //    }
                //}
            }
        }
        else {
            $('tr[data-uid="' + $("#grid").data("kendoGrid").dataSource._data[i].uid + '"] ').css("background-color", "#ffcccc");
        }
    }
    return true;
}


function CargarGrid() {
    
    kendo.ui.Grid.fn.editCell = (function (editCell) {
        return function (cell) {
            cell = $(cell);

            var that = this,
                column = that.columns[that.cellIndex(cell)],
                model = that._modelForContainer(cell),
                event = {
                    container: cell,
                    model: model,
                    preventDefault: function () {
                        this.isDefaultPrevented = true;
                    }
                };

            if (model && typeof this.options.beforeEdit === "function") {
                this.options.beforeEdit.call(this, event);
                if (event.isDefaultPrevented) return;
            }

            editCell.call(this, cell);
        };
    })(kendo.ui.Grid.fn.editCell);

    $("#grid").kendoGrid({
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        NumeroSalida: { type: "string", editable: false },
                        TipoSalida: { type: "number", editable: true },
                        Materiales: { type: "number", editable: true },
                        Spool_IC: { type: "number", editable: true },
                        Juntas: { type: "number", editable: true },
                        TipoJunta: { type: "string", editable: false },
                        Cedula: { type: "string", editable: false },
                        Acero1: { type: "string", editable: false },
                        Acero2: { type: "string", editable: false },
                        Diametro: { type: "string", editable: false }
                    }
                }
            },
        },
        edit: function (e) {
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
            { field: "NumeroSalida", title: 'Numero de Salida', filterable: getGridFilterableCellMaftec(), width: "70px", attributes: { style: "text-align:right;" }, template: "<div class='EnlacePorPlaca' style='text-align:center;' contextmenu='showMenuContext();'  onmouseover='numeroSalidaSelect = \"#=NumeroSalida#\";'><span>#=NumeroSalida#</span></div> " },
            { field: "TipoSalidaSelect", title: 'Tipo de Salida', filterable: getGridFilterableCellMaftec(), width: "130px", editor: RenderTipoSalida, attributes: { style: "text-align:right;" } },
            { field: "Materiales", title: 'Materiales', filterable: getGridFilterableCellMaftec(), filterable: false, width: "100px", attributes: { style: "text-align:right;" }, editor: RenderMateriales, template: "<div class='EnlacePorPlaca' style='text-align:center;'><a href='\\#'  > <span>#=Materiales#</span></a></div> " },
            { field: "Spool_ICSelect", title: 'Spool-IC', filterable: getGridFilterableCellMaftec(), width: "130px", editor: RenderSpool_IC, attributes: { style: "text-align:right;" } },
            { field: "JuntaSelect", title: 'Juntas', filterable: getGridFilterableCellMaftec(), width: "90px", editor: RenderJunta, attributes: { style: "text-align:right;" } },
            { field: "TipoJunta", title: 'TipoJunta', filterable: getGridFilterableCellMaftec(), width: "100px", attributes: { style: "text-align:right;" } },
            { field: "Cedula", title: 'Cedula', filterable: getGridFilterableCellMaftec(), width: "100px", attributes: { style: "text-align:right;" } },
            { field: "Acero1", title: 'Acero', filterable: getGridFilterableCellNumberMaftec(), width: "80px", attributes: { style: "text-align:right;" } },
            { field: "Acero2", title: 'Acero', filterable: getGridFilterableCellNumberMaftec(), width: "80px", attributes: { style: "text-align:right;" } },
            { field: "Diametro", title: 'Diametro', filterable: getGridFilterableCellNumberMaftec(), width: "100px", attributes: { style: "text-align:right;" } },
        ],
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            if (!isEditable(fieldName, e.model)) {
                e.preventDefault();
            }
        },

        editable: true,
        navigatable: true,
        dataBound: function (a) {
            var that = this;
            
            //$(that.tbody).on("contextmenu", "tr", function (e) {

            //    alert('xD');


            //});

        }
    });
    CustomisaGrid($("#grid"));


    ////////////////////////////////

    $("#grid2").kendoGrid({
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        NumeroSalida: { type: "string", editable: false },
                        TipoSalida: { type: "number", editable: true },
                        Materiales: { type: "number", editable: true },
                        Spool_IC: { type: "number", editable: true },
                        Juntas: { type: "number", editable: true },
                        TipoJunta: { type: "string", editable: false },
                        Cedula: { type: "string", editable: false },
                        Acero1: { type: "string", editable: false },
                        Acero2: { type: "string", editable: false },
                        Diametro: { type: "string", editable: false }
                    }
                }
            },
        },
        edit: function (e) {
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
            { field: "NumeroSalida", title: 'Numero de Salida', filterable: getGridFilterableCellMaftec(), width: "70px", attributes: { style: "text-align:right;" } },
            { field: "TipoSalidaSelect", title: 'Tipo de Salida', filterable: getGridFilterableCellMaftec(), width: "130px", editor: RenderTipoSalida, attributes: { style: "text-align:right;" } },
            { field: "Materiales", title: 'Materiales', filterable: getGridFilterableCellMaftec(), width: "100px", attributes: { style: "text-align:right;" } },
            { field: "Spool_ICSelect", title: 'Spool-IC', filterable: getGridFilterableCellMaftec(), width: "130px", editor: RenderSpool_IC2, attributes: { style: "text-align:right;" } },
            { field: "JuntaSelect", title: 'Juntas', filterable: getGridFilterableCellMaftec(), width: "90px", editor: RenderJunta2, attributes: { style: "text-align:right;" } },
            { field: "TipoJunta", title: 'TipoJunta', filterable: getGridFilterableCellMaftec(), width: "100px", attributes: { style: "text-align:right;" } },
            { field: "Cedula", title: 'Cedula', filterable: getGridFilterableCellMaftec(), width: "100px", attributes: { style: "text-align:right;" } },
            { field: "Acero1", title: 'Acero', filterable: getGridFilterableCellNumberMaftec(), width: "80px", attributes: { style: "text-align:right;" } },
            { field: "Acero2", title: 'Acero', filterable: getGridFilterableCellNumberMaftec(), width: "80px", attributes: { style: "text-align:right;" } },
            { field: "Diametro", title: 'Diametro', filterable: getGridFilterableCellNumberMaftec(), width: "100px", attributes: { style: "text-align:right;" } },
        ],
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            if (!isEditable(fieldName, e.model)) {
                e.preventDefault();
            }
        },

        editable: true,
        navigatable: true
    });
    CustomisaGrid($("#grid2"));


    ////////////////////////////////

    $("#grid3").kendoGrid({
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        NumeroSalida: { type: "string", editable: false },
                        TipoSalida: { type: "number", editable: true },
                        Materiales: { type: "number", editable: true },
                        Spool_IC: { type: "number", editable: true },
                        Juntas: { type: "number", editable: true },
                        TipoJunta: { type: "string", editable: false },
                        Cedula: { type: "string", editable: false },
                        Acero1: { type: "string", editable: false },
                        Acero2: { type: "string", editable: false },
                        Diametro: { type: "string", editable: false }
                    }
                }
            },
        },
        edit: function (e) {
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
            { field: "NumeroSalida", title: 'Numero de Salida', filterable: getGridFilterableCellMaftec(), width: "70px", attributes: { style: "text-align:right;" } },
            { field: "TipoSalidaSelect", title: 'Tipo de Salida', filterable: getGridFilterableCellMaftec(), width: "130px", editor: RenderTipoSalida, attributes: { style: "text-align:right;" } },
            { field: "Materiales", title: 'Materiales', filterable: getGridFilterableCellMaftec(), width: "100px", attributes: { style: "text-align:right;" } },
            { field: "Spool_ICSelect", title: 'Spool-IC', filterable: getGridFilterableCellMaftec(), width: "130px", editor: RenderSpool_IC, attributes: { style: "text-align:right;" } },
            { field: "JuntaSelect", title: 'Juntas', filterable: getGridFilterableCellMaftec(), width: "90px", editor: RenderJunta2, attributes: { style: "text-align:right;" } },
            { field: "TipoJunta", title: 'TipoJunta', filterable: getGridFilterableCellMaftec(), width: "100px", attributes: { style: "text-align:right;" } },
            { field: "Cedula", title: 'Cedula', filterable: getGridFilterableCellMaftec(), width: "100px", attributes: { style: "text-align:right;" } },
            { field: "Acero1", title: 'Acero', filterable: getGridFilterableCellNumberMaftec(), width: "80px", attributes: { style: "text-align:right;" } },
            { field: "Acero2", title: 'Acero', filterable: getGridFilterableCellNumberMaftec(), width: "80px", attributes: { style: "text-align:right;" } },
            { field: "Diametro", title: 'Diametro', filterable: getGridFilterableCellNumberMaftec(), width: "100px", attributes: { style: "text-align:right;" } },
        ],
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            if (!isEditable(fieldName, e.model)) {
                e.preventDefault();
            }
        },

        editable: true,
        navigatable: true
    });
    CustomisaGrid($("#grid3"));
};

var numeroSalidaSelect = '';
function showMenuContext() {
    $("#context-menu").kendoContextMenu().data("kendoContextMenu").open();
}

function isEditable(fieldName, model) {
   

    if (fieldName === "NumeroPlacas") {
        if (model.ResultadoConciliacionID < 1) {
            return false;
        }
    }
    else if (fieldName === "Tamano") {
        if (model.ResultadoConciliacionID < 1) {
            return false;
        }
    }
    else if (fieldName === "Densidad") {
        if (model.ResultadoConciliacionID < 1) {
            return false;
        }
    }
    return true; // default to editable
}

function CargarGridPopUpDetallePorPlacaXX() {

    $("#gridPopUp").kendoGrid({
        ////autoBind: true,
        dataSource: {
            data: [],//options.model.ListaDetallePorPlacas,
            schema: {
                model: {
                    fields: {
                        OrdenTrabajoID: { type: "number", editable: false },
                        SpoolID: { type: "number", editable: false },
                        JuntaSpoolID: { type: "number", editable: false },
                        Ubicacion: { type: "string", editable: false },
                        ResultadoID: { type: "number", editable: false },
                        Resultado: { type: "String", editable: true },
//                        ListaDetalleDefectos: { type: "object", editable: true },
                        TemplateDetallePorPlaca: { type: "String", editable: false },
                    }
                }
            },
        },
        selectable: true,
        filterable: getGridFilterableMaftec(),
        columns: [
          { field: "Ubicacion", title: _dictionary.ValidacionResultadosCabeceraUbicacion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "10px" },
          { field: "Resultado", title: _dictionary.CapturaReportePruebasHeaderResultado[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: comboBoxResultadoDetallePlaca, width: "10px" },
          { field: "TemplateDetallePorPlaca", title: _dictionary.CapturaReportePruebasHeaderDetalleDefectos[$("#language").data("kendoDropDownList").value()], filterable: false, width: "10px", template: "<div class='EnlaceDefectoPorPlaca' style='text-align:center;'><a href='\\#'  > <span>#=TemplateDetallePorPlaca#</span></a></div> " }
        ],
        editable: true,
        //toolbar: [{ name: "cancel" }],
        navigatable: true,
        dataBound: function (a) {
            //var that = this;
            //$(that.tbody).on("click", "tr", function (e) {
            //    var rowData = that.dataItem(this);
            //    //var url = "@Url.Action("Index", "Home")/" + rowData.OrderID;
 
            //    //window.location.href = url;
            //});
            //$(that.tbody).on("click", "th", function (e) {
            //    var rowData = that.dataItem(this);
            //    //var url = "@Url.Action("Index", "Home")/" + rowData.OrderID;

            //    //window.location.href = url;
            //});
        }
    });
    CustomisaGrid($("#gridPopUp"));

    //WindowModalGridDefectoDetalle(model);
};

function CargarGridPopUpDetallePorPlacaPorDefectos() {

    $("#gridPopUpDefectos").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        OrdenTrabajoID: { type: "number", editable: false },
                        SpoolID: { type: "number", editable: false },
                        JuntaSpoolID: { type: "number", editable: false },
                        DefectoID: { type: "number", editable: true },
                        Defecto: { type: "string", editable: true },
                        InicioMM: { type: "number", editable: true, min: 0 },
                        FinMM: { type: "number", editable: true },
                        Accion: { type: "number", editable: true }
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
                { field: "Defecto", title: _dictionary.CapturaReportePruebasHeaderDefecto[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: comboBoxDefectos, width: "20px" },
                { field: "InicioMM", title: _dictionary.CapturaReportePruebasHeaderInicio[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "15px", editor: RenderInicioMM, attributes: { style: "text-align:right;" } },
                { field: "FinMM", title: _dictionary.CapturaReportePruebasHeaderFin[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "15px", editor: RenderFinMM, attributes: { style: "text-align:right;" } }
            ,
          {
              command: {
                  //name: "",
                  //title: "",
                  text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                  click: function (e) {
                      e.preventDefault();
                      //var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
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
              width: "5px"
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
                width: "5px"
            }
        ],
        editable: "incell",
        toolbar: [{ name: "create" }]

    });
    CustomisaGrid($("#gridPopUpDefectos"));

    //WindowModalGridDefectoDetalle(model);
};

var currentPlaca = null;
function LlenarGridPopUpDetallePlaca(data) {
    modeloRenglon = data;
    currentPlaca = data;
    $("#gridPopUp").data('kendoGrid').dataSource.data([]);
    var ds = $("#gridPopUp").data("kendoGrid").dataSource;
    var array = data.ListaDetallePorPlacas;
    for (var i = 0; i < array.length; i++) {
        ds.add(array[i]);
    }
    VentanaModalDetallePlaca();
}

var currentDefectosPorPlaca = null;
function LlenarGridPopUpDetalleDefectoPorPlaca(data) {
    modeloRenglon = data;
    currentDefectosPorPlaca = data;
    $("#gridPopUpDefectos").data('kendoGrid').dataSource.data([]);

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


    var ds = $("#gridPopUpDefectos").data("kendoGrid").dataSource;
    var array = data.ListaDetalleDefectos;
    listaDefectosAuxiliar = data.ListaDefectos;
    for (var i = 0; i < array.length; i++) {
        ds.add(array[i]);
    }
    $("#gridPopUpDefectos").data('kendoGrid').dataSource.sync();
    VentanaModalDetalleDefectoPorPlaca();
}

function VentanaModalDetallePlaca() {

    var modalTitle = "";
    modalTitle = "DetallePlaca";
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
        actions: [
            "Close"
        ],
        close: function onClose(e) {
            var gridDataSource = $("#gridPopUp").data("kendoGrid").dataSource;
            gridDataSource.filter([]);
        }
    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};

function VentanaModalDetalleDefectoPorPlaca() {

    var modalTitle = "";
    modalTitle = "DetalleDefectos";
    var window = $("#windowGridDefectos");
    var win = window.kendoWindow({
        modal: true,
        title: "DetalleDefectos",
        resizable: false,
        visible: true,
        width: "60%",
        minWidth: 30,
        position: {
            top: "10px",
            left: "10px"
        },
        content:"texto texto texto y mas texto",
        actions: [
            "Close"
        ],
        close: function onClose(e) {
            var gridDataSource = $("#gridPopUpDefectos").data("kendoGrid").dataSource;
            gridDataSource.filter([]);
        }
    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};

var listaDetallePorPlaca = [];
function actualizaGridGeneralPorPlaca() {
    //currentPlaca
    var itera = 0;
    var datosCompletos = true;
    try {
        for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
            if ((currentPlaca.SpoolID == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (currentPlaca.JuntaSpoolID == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (currentPlaca.OrdenTrabajoID == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
                for (var k = 0; k < $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas; k++) {
                    if (($("#gridPopUp").data("kendoGrid").dataSource._data[k].ResultadoID != null) && ($("#gridPopUp").data("kendoGrid").dataSource._data[k].ResultadoID != 0)) {
                        //para iterar por ubicaciones/placas
                        //$("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].ResultadoID = $("#gridPopUp").data("kendoGrid").dataSource._data[k].ResultadoID;
                        //$("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].Resultado = $("#gridPopUp").data("kendoGrid").dataSource._data[k].Resultado;
                        //$("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].ListaDetalleDefectos = $("#gridPopUp").data("kendoGrid").dataSource._data[k].ListaDetalleDefectos;

                        //listaDetalleDefectos[itera] = { ResultadoID: 0, Resultado: "", ListaDetalleDefectos: [] };
                        //listaDetalleDefectos[itera].ResultadoID = $("#gridPopUp").data("kendoGrid").dataSource._data[k].ResultadoID;
                        //listaDetalleDefectos[itera].Resultado = $("#gridPopUp").data("kendoGrid").dataSource._data[k].Resultado;
                        //listaDetalleDefectos[itera].ListaDetalleDefectos = $("#gridPopUp").data("kendoGrid").dataSource._data[k].ListaDetalleDefectos;
                        //itera++;
                        $('tr[data-uid="' + $("#gridPopUp").data("kendoGrid").dataSource._data[k].uid + '"] ').css("background-color", "#ffffff");
                    }
                    else {
                        $('tr[data-uid="' + $("#gridPopUp").data("kendoGrid").dataSource._data[k].uid + '"] ').css("background-color", "#ffcccc");
                        datosCompletos = false;
                    }
                    //$("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].TemplateDetallePorPlaca = $("#gridPopUp").data("kendoGrid").dataSource._data.length > 0 ? "Tienes " + $("#gridPopUp").data("kendoGrid").dataSource._data.length + "Defectos" : $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].TemplateDetallePorPlaca
                }

                if (!datosCompletos) {
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

                    ventanaConfirm.content(_dictionary.CapturaReporteGuardadoPlacasIncompleto[$("#language").data("kendoDropDownList").value()] +
                                "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

                    ventanaConfirm.open().center();

                    $("#yesButton").click(function () {
                        for (var k = 0; k < $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas; k++) {
                            $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].ResultadoID = $("#gridPopUp").data("kendoGrid").dataSource._data[k].ResultadoID;
                            $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].Resultado = $("#gridPopUp").data("kendoGrid").dataSource._data[k].Resultado;
                            $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].ListaDetalleDefectos = $("#gridPopUp").data("kendoGrid").dataSource._data[k].ListaDetalleDefectos;
                        }
                        hayDatosCapturados = true;
                        ventanaConfirm.close();
                        $("#windowGrid").data("kendoWindow").close();
                    });
                    $("#noButton").click(function () {
                        ventanaConfirm.close();
                        //return false;
                    });
                }
                else {
                    for (var k = 0; k < $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas; k++) {
                        $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].ResultadoID = $("#gridPopUp").data("kendoGrid").dataSource._data[k].ResultadoID;
                        $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].Resultado = $("#gridPopUp").data("kendoGrid").dataSource._data[k].Resultado;
                        $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].ListaDetalleDefectos = $("#gridPopUp").data("kendoGrid").dataSource._data[k].ListaDetalleDefectos;
                    }
                    hayDatosCapturados = true;
                    $("#windowGrid").data("kendoWindow").close();
                }
                break;
            }
        }
        //return true;
    } catch (e) {
        //return false;
        return;
    }
   
    
    //for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
    //    if ((dataItem.SpoolID == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (dataItem.JuntaSpoolID == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (dataItem.OrdenTrabajoID == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
    //        for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas; j++) {

    //            //if (j != ($("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas - 1))
    //            //    ubicacionTemp = j + '-' + (j + 1);
    //            //else 
    //            //    ubicacionTemp = j + '-' + 0;
    //            if ($("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].Ubicacion == dataItem.Ubicacion) {
    //                $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].Resultado = nuevoValor.Resultado;
    //                $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].ResultadoID = nuevoValor.ResultadosID;
    //                $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].TemplateDetallePorPlaca = $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].ListaDetalleDefectos.length > 0 ? "Tienes " + $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].ListaDetalleDefectos.length + "Defectos" : $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].TemplateDetallePorPlaca
    //                break;
    //            }
    //        }
    //        break;
    //    }
    //}
}

var validacionCorrecta = false;
var listaDetalleDefectos = [];
function actualizaGridGeneralPorDefectos() {
    //currentDefectosPorPlaca
    listaDetalleDefectos = [];

    //filtra solo los registros diferentes a status 3 que es eliminar.
    var dataSourceDefectos = $("#gridPopUpDefectos").data("kendoGrid").dataSource;
    var filters = dataSourceDefectos.filter();
    var allData = dataSourceDefectos.data();
    var query = new kendo.data.Query(allData);
    var data = query.filter(filters).data;

    var itera = 0;
    try {
        validacionCorrecta = true;
        //buscar la manera de pasar un valor de una ventana modal a otra para saber de que placa se esta agregando el defecto.
        for (var i = 0; i < $("#gridPopUp").data("kendoGrid").dataSource._data.length; i++) {
            
            if ((currentDefectosPorPlaca.Ubicacion == $("#gridPopUp").data("kendoGrid").dataSource._data[i].Ubicacion) && (currentDefectosPorPlaca.SpoolID == $("#gridPopUp").data("kendoGrid").dataSource._data[i].SpoolID) && (currentDefectosPorPlaca.JuntaSpoolID == $("#gridPopUp").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (currentDefectosPorPlaca.OrdenTrabajoID == $("#gridPopUp").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {

                $("#gridPopUp").data("kendoGrid").dataSource._data[i].TemplateDetallePorPlaca = data.length == 0 ? _dictionary.ServiciosTecnicosCapturaReporteTemplatePlacasDefecto[$("#language").data("kendoDropDownList").value()] : _dictionary.ServiciosTecnicosCapturaReporteCantidadDefectos[$("#language").data("kendoDropDownList").value()].replace("?", data.length);


                ///////////////////////////////////////////////////////////////////////
                for (var j = 0; j < data.length; j++) {
                    if ((data[j].DefectoID != null) && (data[j].DefectoID != 0) && ($.isNumeric(data[j].InicioMM)) && ($.isNumeric(data[j].FinMM)) && (data[j].Accion != 3)) {
                        //if ($("#gridPopUp").data("kendoGrid").dataSource._data[i].OrdenTrabajoID == $("#gridPopUpDefectos").data("kendoGrid").dataSource._data[j].OrdenTrabajoID && $("#gridPopUp").data("kendoGrid").dataSource._data[i].SpoolID == $("#gridPopUpDefectos").data("kendoGrid").dataSource._data[j].SpoolID && $("#gridPopUp").data("kendoGrid").dataSource._data[i].JuntaSpoolID == $("#gridPopUpDefectos").data("kendoGrid").dataSource._data[j].JuntaSpoolID && $("#gridPopUp").data("kendoGrid").dataSource._data[i].Posicion == $("#gridPopUpDefectos").data("kendoGrid").dataSource._data[j].Posicion) {
                        listaDetalleDefectos[itera] = { OrdenTrabajoID: "", SpoolID: "", JuntaSpoolID: "", DefectoID: "", Defecto: "", InicioMM: "", FinMM: "", Accion: "", Posicion: "" };
                        listaDetalleDefectos[itera].OrdenTrabajoID = data[j].OrdenTrabajoID;
                        listaDetalleDefectos[itera].SpoolID = data[j].SpoolID;
                        listaDetalleDefectos[itera].JuntaSpoolID = data[j].JuntaSpoolID;
                        listaDetalleDefectos[itera].DefectoID = data[j].DefectoID;
                        listaDetalleDefectos[itera].Defecto = data[j].Defecto;
                        listaDetalleDefectos[itera].InicioMM = data[j].InicioMM;
                        listaDetalleDefectos[itera].FinMM = data[j].FinMM;
                        listaDetalleDefectos[itera].Accion = data[j].Accion == 0 ? 1 : data[j].Accion;
                        listaDetalleDefectos[itera].Posicion = data[j].Posicion;
                        
                        //}
                        itera++;

                        if((data[j].InicioMM > 0) && (data[j].FinMM > 0)){
                            if(data[j].InicioMM < data[j].FinMM)
                                $('tr[data-uid="' + data[j].uid + '"] ').css("background-color", "#ffffff");
                            else {
                                $('tr[data-uid="' + data[j].uid + '"] ').css("background-color", "#ffcccc");
                                //displayNotify("CapturaReporteValidacionErroneaDefecto", "", '2');
                                validacionCorrecta = false;
                                //return;
                            }
                        }
                        else{
                            $('tr[data-uid="' + data[j].uid + '"] ').css("background-color", "#ffcccc");
                            //displayNotify("CapturaReporteValidacionErroneaDefecto", "", '2');
                            validacionCorrecta = false;
                            //return;
                        }
                    }
                    else {
                        $('tr[data-uid="' + data[i].uid + '"] ').css("background-color", "#ffcccc");
                    }
                }
                
                $("#gridPopUp").data("kendoGrid").dataSource.sync();

                if (validacionCorrecta) {
                    if (listaDetalleDefectos.length != data.length) {
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

                        ventanaConfirm.content(_dictionary.CapturaReporteGuardadoDefectosIncompleto[$("#language").data("kendoDropDownList").value()] +
                                    "</br><center><button class='btn btn-blue' id='yesButton'>Si</button><button class='btn btn-blue' id='noButton'> No</button></center>");

                        ventanaConfirm.open().center();

                        $("#yesButton").click(function () {
                            $("#gridPopUp").data("kendoGrid").dataSource._data[i].ListaDetalleDefectos = listaDetalleDefectos;
                            hayDatosCapturados = true;
                            ventanaConfirm.close();
                            $("#windowGridDefectos").data("kendoWindow").close();
                        });
                        $("#noButton").click(function () {
                            ventanaConfirm.close();
                            //return false;
                        });
                    }
                    else if (listaDetalleDefectos.length != 0) {
                        $("#gridPopUp").data("kendoGrid").dataSource._data[i].ListaDetalleDefectos = listaDetalleDefectos;
                        hayDatosCapturados = true;
                        $("#windowGridDefectos").data("kendoWindow").close();
                    }
                    else {
                        $("#windowGridDefectos").data("kendoWindow").close();
                    }

                }
                else {
                    displayNotify("CapturaReporteValidacionErroneaDefecto", "", '2');
                }

                break;
            }
        }

        

        //return true;
    } catch (e) {
        return false;
    }




    //var dataItemsArrays = dataItemsStr.split("_");
    //if (dataItemsArrays.length == 4) {
    //    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
    //        if ((dataItemsArrays[0] == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (dataItemsArrays[1] == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (dataItemsArrays[2] == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
    //            for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas.length; j++) {

    //                if ($("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].Ubicacion == dataItemsArrays[3]) {
    //                    $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].DetalleResultados = new Array(defectosArray.length);
    //                    for (var k = 0; k < defectosArray.length; k++) {
    //                        $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].DetalleResultados[k] = { ResultadosDefectoID: 0, ReporteResultadosID: 0, OrdenTrabajoID: $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID, SpoolID: $("#grid").data("kendoGrid").dataSource._data[i].SpoolID, JuntaSpoolID: $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID, DefectoID: defectosArray[k].DefectoIDCombo, InicioMM: defectosArray[k].InicioMM, FinMM: defectosArray[k].FinMM, Accion: 1 };
    //                    }
    //                    //if ($("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].Ubicacion == dataItem.Ubicacion) {
    //                    //$("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].Resultado = nuevoValor.Resultado;
    //                    break;
    //                }
    //            }
    //            break;
    //        }
    //    }
    //}
}


function actualizaDefectos() {
    try {
        //buscar la manera de pasar un valor de una ventana modal a otra para saber de que placa se esta agregando el defecto.
        for (var i = 0; i < $("#gridPopUp").data("kendoGrid").dataSource._data.length; i++) {
            for (var j = 0; j < $("#gridPopUpDefectos").data("kendoGrid").dataSource._data.length; j++) {

            }
        }
        return true;
    } catch (e) {
        return false;
    }




    //var dataItemsArrays = dataItemsStr.split("_");
    //if (dataItemsArrays.length == 4) {
    //    for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
    //        if ((dataItemsArrays[0] == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (dataItemsArrays[1] == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (dataItemsArrays[2] == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
    //            for (var j = 0; j < $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas.length; j++) {

    //                if ($("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].Ubicacion == dataItemsArrays[3]) {
    //                    $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].DetalleResultados = new Array(defectosArray.length);
    //                    for (var k = 0; k < defectosArray.length; k++) {
    //                        $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].DetalleResultados[k] = { ResultadosDefectoID: 0, ReporteResultadosID: 0, OrdenTrabajoID: $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID, SpoolID: $("#grid").data("kendoGrid").dataSource._data[i].SpoolID, JuntaSpoolID: $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID, DefectoID: defectosArray[k].DefectoIDCombo, InicioMM: defectosArray[k].InicioMM, FinMM: defectosArray[k].FinMM, Accion: 1 };
    //                    }
    //                    //if ($("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].Ubicacion == dataItem.Ubicacion) {
    //                    //$("#grid").data("kendoGrid").dataSource._data[i].InformacionResultados[j].Resultado = nuevoValor.Resultado;
    //                    break;
    //                }
    //            }
    //            break;
    //        }
    //    }
    //}
}


function CargarGridPopUpDetallePorPlaca() {

    $("#gridPopUp").kendoGrid({
        ////autoBind: true,
        dataSource: {
            data: [],//options.model.ListaDetallePorPlacas,
            schema: {
                model: {
                    fields: {
                        ID: { type: "number", editable: false },
                        DIAM: { type: "number", editable: false },
                        IC: { type: "number", editable: false },
                        DESC: { type: "string", editable: false },
                        CANTIDAD: { type: "number", editable: false },
                        
                    }
                }
            },
        },
        selectable: true,
        filterable: getGridFilterableMaftec(),
        columns: [
          { field: "ID", title: 'ID ITEM', filterable: false, width: "20px", template: "<div class='EnlacePorPlaca' style='text-align:center;' onmouseover='ICSelect = \"#=IC#\";'><span>#=ID#</span></div> " },
          { field: "DIAM", title: 'DIAMETRO', filterable: false, /*editor: comboBoxResultadoDetallePlaca,*/ width: "30px", template: "<div class='EnlacePorPlaca' style='text-align:center;' onmouseover='ICSelect = \"#=IC#\";'><span>#=DIAM#</span></div> " },
          { field: "IC", title: 'ETIQUETA', filterable: false, width: "30px"/*, editor: RenderMaterialesPopup*/, template: "<div class='EnlacePorPlaca' style='text-align:center;' onmouseover='ICSelect = \"#=IC#\";'><span>#=IC#</span></div> " },
          { field: "DESC", title: 'DESCRIPCION', filterable: false, width: "90px", template: "<div class='EnlacePorPlaca' style='text-align:center;' onmouseover='ICSelect = \"#=IC#\";'><span>#=DESC#</span></div> " },
          { field: "CANTIDAD", title: 'CANTIDAD', filterable: false, width: "40px", template: "<div class='EnlacePorPlaca' style='text-align:center;' onmouseover='ICSelect = \"#=IC#\";'><span>#=CANTIDAD#</span></div> " }
        ],
        editable: true,
        //toolbar: [{ name: "cancel" }],
        navigatable: true,
        dataBound: function (a) {
            var that = this;
            $(that.tbody).on("dblclick", "tr", function (e) {
                //var rowData = that.dataItem(this);
                //var url = "@Url.Action("Index", "Home")/" + rowData.OrderID;
 
                //window.location.href = url;
                //alert('xD');

                for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
                    if ($("#grid").data("kendoGrid").dataSource._data[i].NumeroSalida == idSelect) {
                        $("#grid").data("kendoGrid").dataSource._data[i].Materiales = ICSelect;//$("#gridPopUp").data("kendoGrid").dataSource._data.length;
                        $("#grid").data("kendoGrid").refresh();
                        break;
                    }
                }


                var window = $("#windowGrid");

                $("#windowGrid").data("kendoWindow").close();
            });

            //$(that.tbody).on("contextmenu", "tr", function (e) {

            //    alert('xD');

                
            //});

            //$(that.tbody).on("click", "th", function (e) {
            //    var rowData = that.dataItem(this);
            //    //var url = "@Url.Action("Index", "Home")/" + rowData.OrderID;

            //    //window.location.href = url;
            //});
        }//, toolbar: [{ name: "create" }]
    });

    //$(".k-content").dblclick(function () { alert('dblclick'); });

    //$('.k-grid-content tr').dblclick(function () {
    //    alert('dblclick');
    //});

    //$(".k-list-container .k-item").addClass("k-font-small");

    CustomisaGrid($("#gridPopUp"));

    //WindowModalGridDefectoDetalle(model);
};

function VentanaModalDetallePlaca2() {

    var modalTitle = "";
    modalTitle = "RESUMEN DE MATERIALES";
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
        actions: [
            "Close"
        ], filter: {
            logic: "or",
            filters: [
              { field: "Accion", operator: "eq", value: 1 },
              { field: "Accion", operator: "eq", value: 2 },
                { field: "Accion", operator: "eq", value: 0 },
                { field: "Accion", operator: "eq", value: undefined }
            ]
        },
        close: function onClose(e) {
            var gridDataSource = $("#gridPopUp").data("kendoGrid").dataSource;
            gridDataSource.filter([]);
        }
    }).data("kendoWindow");
    window.data("kendoWindow").title(modalTitle);
    window.data("kendoWindow").center().open();

};
