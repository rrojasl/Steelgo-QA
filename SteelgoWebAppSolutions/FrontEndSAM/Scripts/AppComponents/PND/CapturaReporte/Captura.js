var modeloRenglon;

function changeLanguageCall() {
    CargarGrid();
    CargarGridPopUpDetallePorPlaca();
    CargarGridPopUpDetallePorPlacaPorDefectos();
    inicio();
};

function inicio() {
    SuscribirEventos();
    AjaxProyecto();
    AjaxFuente();
    AjaxTurno();
}

function CargarGrid() {
    
    $("#grid").kendoGrid({
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        OrdenTrabajoID: { type: "number", editable: false },
                        NumeroControl: { type: "string", editable: false },
                        SpoolID: { type: "number", editable: false },
                        JuntaSpoolID: { type: "number", editable: false },
                        Junta: { type: "string", editable: false },
                        ClasificacionPND: { type: "string", editable: false },
                        TipoPrueba: { type: "string", editable: false },
                        Observaciones: { type: "string", editable: false },
                        CodigoAsme: { type: "string", editable: false },
                        NumeroPlacas: { type: "number", editable: true },
                        Tamano: { type: "number", editable: true },
                        Densidad: { type: "number", editable: true },
                        ResultadoConciliacion: { type: "string", editable: false },
                        RazonNoConciliacion: { type: "string", editable: false },
                        TemplateDetalleElemento: { type: "string", editable: false }
                    }
                }
            },
        },
        edit: function (e) {
            
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
            { field: "NumeroControl", title: _dictionary.CapturaReporteGridColumnSpoolJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "Junta", title: _dictionary.CapturaReporteGridColumnJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "50px" }, 
            { field: "ClasificacionPND", title: _dictionary.CapturaReporteGridColumnClasificacionPND[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "60px" },
            { field: "TipoPrueba", title: _dictionary.CapturaReporteGridColumnTipoPrueba[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px" },
            { field: "Observaciones", title: _dictionary.CapturaReporteGridColumnObservaciones[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "CodigoAsme", title: _dictionary.CapturaReporteGridColumnCodigoAsme[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "120px" },
            { field: "NumeroPlacas", title: _dictionary.CapturaReporteGridColumnNumeroPlacas[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "90px", editor: RenderNumeroPlacas, attributes: { style: "text-align:right;" } },
            { field: "Tamano", title: _dictionary.CapturaReporteGridColumnTamano[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "90px", editor: RenderTamano, format: "{0:n4}", attributes: { style: "text-align:right;" } },
            { field: "Densidad", title: _dictionary.CapturaReporteGridColumnDensidad[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "90px", editor: RenderDensidad, format: "{0:n4}", attributes: { style: "text-align:right;" } },
            { field: "ResultadoConciliacion", title: _dictionary.CapturaReporteGridColumnRusult1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "170px" },
            { field: "RazonNoConciliacion", title: _dictionary.CapturaReporteGridColumnRusult2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "170px" },
            { field: "TemplateDetalleElemento", title: _dictionary.CapturaReporteGridColumnInformacionResultados[$("#language").data("kendoDropDownList").value()], filterable: false, width: "150px"/*, editor: RenderGridDetallePorPlaca*/, template: "<div class='EnlacePorPlaca' style='text-align:center;'><a href='\\#'  > <span>#=TemplateDetalleElemento#</span></a></div> " },

        ],

        editable: true,
        navigatable: true
    });
    CustomisaGrid($("#grid"));
};

function CargarGridPopUpDetallePorPlaca() {

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
        columns: [
          { field: "Ubicacion", title: _dictionary.ValidacionResultadosCabeceraUbicacion[$("#language").data("kendoDropDownList").value()], filterable: true, width: "90px" },
          { field: "Resultado", title: _dictionary.CapturaReportePruebasHeaderResultado[$("#language").data("kendoDropDownList").value()], filterable: true, editor: comboBoxResultadoDetallePlaca, width: "100px" },
          { field: "TemplateDetallePorPlaca", title: _dictionary.CapturaReportePruebasHeaderDetalleDefectos[$("#language").data("kendoDropDownList").value()], filterable: false, width: "200px", template: "<div class='EnlaceDefectoPorPlaca' style='text-align:center;'><a href='\\#'  > <span>#=TemplateDetallePorPlaca#</span></a></div> " }
        ],
        editable: true,
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
                        InicioMM: { type: "number", editable: true },
                        FinMM: { type: "number", editable: true }
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
        columns: [
                { field: "Defecto", title: _dictionary.CapturaReportePruebasHeaderDefecto[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), editor: comboBoxDefectos, width: "20px" },
                { field: "InicioMM", title: _dictionary.CapturaReportePruebasHeaderInicio[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "15px" },
                { field: "FinMM", title: _dictionary.CapturaReportePruebasHeaderFin[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "15px" }
            ,
            {
                command: {
                    name: "",
                    title: "",
                    text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                    click: function (e) {
                        e.preventDefault();
                        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                        var dataSource = this.dataSource;
                        if (confirm(_dictionary.CapturaReportePruebasMensajeEliminarDefecto[$("#language").data("kendoDropDownList").value()])) {
                            dataItem.Accion = 3;
                            //this.removeRow("tr:eq("+dataItem+")");
                        }
                        dataSource.sync();
                    }
                },
                width: "10px"
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

function LlenarGridPopUpDetalleDefectoPorPlaca(data) {
    modeloRenglon = data;
    $("#gridPopUpDefectos").data('kendoGrid').dataSource.data([]);
    var ds = $("#gridPopUpDefectos").data("kendoGrid").dataSource;
    var array = data.ListaDetalleDefectos;
    listaDefectosAuxiliar = data.ListaDefectos;
    for (var i = 0; i < array.length; i++) {
        ds.add(array[i]);
    }
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
        width: "95%",
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
        width: "95%",
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

function actualizaGridGeneralPorPlaca() {
    //currentPlaca
    try {
        for (var i = 0; i < $("#grid").data("kendoGrid").dataSource._data.length; i++) {
            if ((currentPlaca.SpoolID == $("#grid").data("kendoGrid").dataSource._data[i].SpoolID) && (currentPlaca.JuntaSpoolID == $("#grid").data("kendoGrid").dataSource._data[i].JuntaSpoolID) && (currentPlaca.OrdenTrabajoID == $("#grid").data("kendoGrid").dataSource._data[i].OrdenTrabajoID)) {
                for (var k = 0; k < $("#grid").data("kendoGrid").dataSource._data[i].NumeroPlacas; k++) {
                    //para iterar por ubicaciones/placas
                    $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].ResultadoID = $("#gridPopUp").data("kendoGrid").dataSource._data[k].ResultadoID;
                    $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].Resultado = $("#gridPopUp").data("kendoGrid").dataSource._data[k].Resultado;
                    $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].ListaDetalleDefectos = $("#gridPopUp").data("kendoGrid").dataSource._data[k].ListaDetalleDefectos;
                    break;
                    //$("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[k].TemplateDetallePorPlaca = $("#gridPopUp").data("kendoGrid").dataSource._data.length > 0 ? "Tienes " + $("#gridPopUp").data("kendoGrid").dataSource._data.length + "Defectos" : $("#grid").data("kendoGrid").dataSource._data[i].ListaDetallePorPlacas[j].TemplateDetallePorPlaca
                }
            }
        }
        return true;
    } catch (e) {
        return false;
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
