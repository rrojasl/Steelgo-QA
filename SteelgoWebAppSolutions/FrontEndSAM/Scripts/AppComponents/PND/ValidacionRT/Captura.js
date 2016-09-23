var ItemSeleccionado;
var comboDefectos;

function changeLanguageCall() {
    var paramReq = getParameterByName('requisicion');

    SiguienteProceso(paramReq);
    CargarGrid();
    //CargarGridPopUp();
    document.title = _dictionary.ImpresionResultadosTitle[$("#language").data("kendoDropDownList").value()];
    $('#grid').data('kendoGrid').dataSource.read();
    //$('#gridPopUp').data('kendoGrid').dataSource.read();
    //AjaxCargarRequisicionesParaValidacion();
    setTimeout(function () { AjaxCargarCamposPredeterminados() }, 1000);
};

function getParameterByName(name, url) {

    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function SiguienteProceso(paramReq) {
    var url = "";
    if (paramReq == null) {
        url = "/PND/ImpresionPruebas?leng=" + $("#language").data("kendoDropDownList").value();
    } else {
        url = "/PND/ImpresionPruebas?leng=" + $("#language").data("kendoDropDownList").value()
            + "&requisicion=" + paramReq;
    }

    $("#ImpresionResultadosSup").attr("href", url);
    $("#ImpresionResultadosInf").attr("href", url);
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
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        NumeroControl: { type: "string", editable: false },
                        Etiqueta: { type: "string", editable: false },
                        ClasificacionPND: { type: "string", editable: false },
                        TipoPrueba: { type: "string", editable: false },
                        Observaciones: { type: "string", editable: false },
                        CodigoAsme: { type: "string", editable: false },
                        NumeroPlacas: { type: "number", editable: true },
                        Tamanomm: { type: "number", editable: true },
                        Densidad: { type: "number", editable: true },
                        Ubicacion: { type: "string", editable: false },
                        Resultado: { type: "string", editable: false },
                        Defectos: { type: "string", editable: false },
                        Conciliado: { type: "string", editable: true },
                        Comentario: { type: "string", editable: true },
                        RazonRechazo: { type: "string", editable: false },
                        Comentario: { type: "string", editable: true },
                        Limpiar: { type: "string", editable: false },
                        Firmado: { type: "string", editable: false },
                        InformacionResultados: { type: "string", editable: true },

                        ReporteRTID: { type: "number", editable: false },
                        RequisicionID: { type: "number", editable: false },
                        OrdenTrabajoID: { type: "number", editable: false },
                        SpoolID: { type: "number", editable: false },
                        JuntaSpoolID: { type: "number", editable: false },

                        //SpoolJunta: { type: "string", editable: false },
                        //Junta: { type: "string", editable: false },
                        //NumeroControl: { type: "string", editable: false },
                        //EtiquetaJunta: { type: "string", editable: false },
                        //ClasificacionPND: { type: "string", editable: false },
                        //TipoPrueba: { type: "string", editable: false },
                        //Observaciones: { type: "string", editable: false },
                        //CodigoAsme: { type: "string", editable: false },
                        //NumeroPlacas: { type: "number", editable: true },
                        //Tamano: { type: "number", editable: true },
                        //Densidad: { type: "number", editable: true },
                        //ResultadoConciliacion: { type: "string", editable: true },
                        //RazonNoConciliacion: { type: "string", editable: true },
                    }
                }
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        filterable: {
            extra: false
        },
        click: function (e) {
            ItemSeleccionado = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        },
        beforeEdit: function (e) {
            var columnIndex = this.cellIndex(e.container);
            var fieldName = this.thead.find("th").eq(columnIndex).data("field");
            if (!isEditable(fieldName, e.model)) {
                e.preventDefault();
            }
        },
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true,
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "NumeroControl", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            { field: "Etiqueta", title: _dictionary.columnJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "80px" },
            { field: "ClasificacionPND", title: _dictionary.columnClasificacion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "85px" },
            { field: "TipoPrueba", title: _dictionary.columnTipoPrueba[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "137px" },
            { field: "Observaciones", title: _dictionary.columnObservacion[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "140px" },
            { field: "CodigoAsme", title: _dictionary.columnCodigoAsme[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "145px" },
            { field: "NumeroPlacas", title: _dictionary.columnNumPlacas[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), editor: RenderNumeroPlacas, width: "125px" },
            { field: "Tamanomm", title: _dictionary.columnTamaño[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), editor: RenderTamano, format: "{0:n4}", width: "149px" },
            { field: "Densidad", title: _dictionary.columnDensidad[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), editor: RenderDensidad, format: "{0:n4}", width: "120px" },
            { field: "InformacionResultados", title: _dictionary.CapturaReporteGridColumnInformacionResultados[$("#language").data("kendoDropDownList").value()], filterable: false, width: "500px", editor: RenderGridDetalle, template: "Tiene:  Numero de placas" },
            { field: "Conciliado", title: _dictionary.columnConciliado[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "126px" },
            { field: "RazonRechazo", title: _dictionary.columnRazonRechazo[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "180px" },
            { field: "Comentario", title: _dictionary.columnComentario[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "160px" },
            { field: "Firmado", title: _dictionary.columnFirmado[$("#language").data("kendoDropDownList").value()], filterable: false, width: "112px" },
            { command: { text: _dictionary.botonLimpiar[$("#language").data("kendoDropDownList").value()], click: limpiarRenglon }, title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], width: "50px" }

            //{ field: "SpoolJunta", title: _dictionary.CapturaReporteGridColumnSpoolJunta[/*"es-MX"*/$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "130px" },
            //{ field: "Junta", title: _dictionary.CapturaReporteGridColumnJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "80px" },
            //{ field: "NumeroControl", title: _dictionary.CapturaReporteGridColumnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "85px" },
            //{ field: "EtiquetaJunta", title: _dictionary.CapturaReporteGridColumnEtiquetaJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "137px" },
            //{ field: "ClasificacionPND", title: _dictionary.CapturaReporteGridColumnClasificacionPND[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "140px" },
            //{ field: "TipoPrueba", title: _dictionary.CapturaReporteGridColumnTipoPrueba[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "145px" },
            //{ field: "Observaciones", title: _dictionary.CapturaReporteGridColumnObservaciones[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "125px" },
            //{ field: "CodigoAsme", title: _dictionary.CapturaReporteGridColumnCodigoAsme[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "149px" },
            //{ field: "NumeroPlacas", title: _dictionary.CapturaReporteGridColumnNumeroPlacas[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "120px", editor: RenderNumeroPlacas, attributes: { style: "text-align:right;" } },
            //{ field: "Tamano", title: _dictionary.CapturaReporteGridColumnTamano[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "122px", /*editor: RenderTamano,*/ format: "{0:n4}", attributes: { style: "text-align:right;" } },
            //{ field: "Densidad", title: _dictionary.CapturaReporteGridColumnDensidad[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "124px", /*editor: RenderDensidad,*/ format: "{0:n4}", attributes: { style: "text-align:right;" } },
            //{ field: "ResultadoConciliacion", title: _dictionary.CapturaReporteGridColumnRusult1[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "116px" },
            //{ field: "RazonNoConciliacion", title: _dictionary.CapturaReporteGridColumnRusult2[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "180px" },
            //{ field: "InformacionResultados", title: _dictionary.CapturaReporteGridColumnInformacionResultados[$("#language").data("kendoDropDownList").value()], filterable: false, width: "500px", editor: RenderGridDetalle, template: "Tiene:  Numero de placas" },

        ]
    });
    CustomisaGrid($("#grid"));
};

function isEditable(fieldName, model) {
    if (fieldName === "Enlace" || fieldName === "Nombre") {
        return model.Conciliado !== 1;
    }
    return true;
}

function limpiarRenglon(e) {
    e.preventDefault();
    if ($('#Guardar').text() == _dictionary.botonGuardar[$("#language").data("kendoDropDownList").value()]) {
        var itemToClean = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));
        //itemToClean.DocumentoRecibido = "";
        //itemToClean.DocumentoRecibidoID = 0;
        //itemToClean.DocumentoEstatus = "";
        //itemToClean.DocumentoEstatusID = 0;
        //itemToClean.DocumentoDefecto = "";
        //itemToClean.DocumentoDefectoID = 0;
        var dataSource = $("#grid").data("kendoGrid").dataSource;
        dataSource.sync();
    }
}

//function CargarGridPopUp() {
//    $("#gridPopUp").kendoGrid({
//        autoBind: true,
//        dataSource: {
//            data: [],
//            schema: {
//                model: {
//                    fields: {
//                        Nombre: { type: "string", editable: true },
//                        InicioDefecto: { type: "string", editable: true },
//                        FinDefecto: { type: "string", editable: true },
//                    }
//                }
//            }, filter: {
//                logic: "or",
//                filters: [
//                  { field: "Accion", operator: "eq", value: 1 },
//                  { field: "Accion", operator: "eq", value: 2 },
//                    { field: "Accion", operator: "eq", value: 0 },
//                    { field: "Accion", operator: "eq", value: undefined }
//                ]
//            },
//        },
//        navigatable: true,
//        filterable: {
//            extra: false
//        },
//        click: function (e) {
//        },
//        editable: true,
//        autoHeight: true,
//        sortable: true,
//        scrollable: true,
//        columns: [
//                { field: "Nombre", title: _dictionary.ValidacionResultadosCabeceraDefecto[$("#language").data("kendoDropDownList").value()], filterable: true, editor: comboBoxDefectos, width: "20px" },
//                { field: "InicioDefecto", title: _dictionary.ValidacionResultadosCabeceraInicio[$("#language").data("kendoDropDownList").value()], filterable: true, width: "15px" },
//                { field: "FinDefecto", title: _dictionary.ValidacionResultadosCabeceraFin[$("#language").data("kendoDropDownList").value()], filterable: true, width: "15px" },
//            {
//                command: {
//                    name: "",
//                    title: "",
//                    text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
//                    click: function (e) {
//                        e.preventDefault();
//                        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
//                        var dataSource = this.dataSource;
//                        windowTemplate = kendo.template($("#windowTemplate").html());
//                        ventanaConfirm = $("#ventanaConfirm").kendoWindow({
//                            iframe: true,
//                            title: _dictionary.CapturaAvanceTitulo[$("#language").data("kendoDropDownList").value()],
//                            visible: false, //the window will not appear before its .open method is called
//                            width: "auto",
//                            height: "auto",
//                            modal: true,
//                            animation: {
//                                close: false,
//                                open: false
//                            }
//                        }).data("kendoWindow");
//                        ventanaConfirm.content(_dictionary.CapturaMensajeArmadoPlancharTodos[$("#language").data("kendoDropDownList").value()] +
//                                     "</br><center><button class='confirm_yes btn btn-blue' id='yesButton'>Si</button><button class='confirm_yes btn btn-blue' id='noButton'> No</button></center>");
//                        ventanaConfirm.open().center();
//                        $("#yesButton").click(function (handler) {
//                            dataItem.Accion = 3;
//                            ventanaConfirm.close();
//                        });
//                        $("#noButton").click(function (handler) {
//                            ventanaConfirm.close();
//                        });
//                        dataSource.sync();
//                    }
//                },
//                width: "10px"
//            }
//        ],
//        editable: "incell",
//        toolbar: [{ name: "create" }]
//    });
//    CustomisaGrid($("#gridPopUp"));
//};


function VentanaModal() {

    var modalTitle = "";
    modalTitle = _dictionary.ValidacionResultadosRequisicion[$("#language").data("kendoDropDownList").value()];
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

};