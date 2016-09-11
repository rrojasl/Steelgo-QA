var ItemSeleccionado;
var comboDefectos;

function changeLanguageCall() {
    CargarGrid();
    //CargarGridPopUp();
    document.title = _dictionary.ImpresionResultadosTitle[$("#language").data("kendoDropDownList").value()];
    $('#grid').data('kendoGrid').dataSource.read();
    //$('#gridPopUp').data('kendoGrid').dataSource.read();
    //AjaxCargarRequisicionesParaValidacion();
    setTimeout(function () { AjaxCargarCamposPredeterminados() }, 1000);
};

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
                        EtiquetaJunta: { type: "string", editable: false },
                        ClasificacionPND: { type: "string", editable: false },
                        TipoPrueba: { type: "string", editable: false },
                        Observaciones: { type: "string", editable: false },
                        CodigoAsme: { type: "string", editable: false },
                        NumeroPlacas: { type: "string", editable: false },
                        Tamañomm: { type: "string", editable: false },
                        Densidad: { type: "string", editable: false },
                        Ubicacion: { type: "string", editable: false },
                        Resultado: { type: "string", editable: false },
                        Defectos: { type: "string", editable: false },
                        Conciliado: { type: "string", editable: true },
                        RazonRechazo: { type: "string", editable: false },
                        Limpiar: { type: "string", editable: false },
                        Firmado: { type: "string", editable: false }
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
        columns: [
            { field: "NumeroControl", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
            { field: "EtiquetaJunta", title: _dictionary.columnJunta[$("#language").data("kendoDropDownList").value()], filterable: true, width: "80px" },
            { field: "ClasificacionPND", title: _dictionary.columnClasificacion[$("#language").data("kendoDropDownList").value()], filterable: true, width: "85px" },
            { field: "TipoPrueba", title: _dictionary.columnTipoPrueba[$("#language").data("kendoDropDownList").value()], filterable: true, width: "137px" },
            { field: "Observaciones", title: _dictionary.columnObservacion[$("#language").data("kendoDropDownList").value()], filterable: true, width: "140px" },
            { field: "CodigoAsme", title: _dictionary.columnCodigoAsme[$("#language").data("kendoDropDownList").value()], filterable: true, width: "145px" },
            { field: "NumeroPlacas", title: _dictionary.columnNumPlacas[$("#language").data("kendoDropDownList").value()], filterable: true, width: "125px" },
            { field: "Tamañomm", title: _dictionary.columnTamaño[$("#language").data("kendoDropDownList").value()], filterable: true, width: "149px" },
            { field: "Densidad", title: _dictionary.columnDensidad[$("#language").data("kendoDropDownList").value()], filterable: true, width: "120px" },
            { field: "Ubicacion", title: _dictionary.columnUbicacion[$("#language").data("kendoDropDownList").value()], filterable: true, width: "122px" },
            { field: "Resultado", title: _dictionary.columnResultado[$("#language").data("kendoDropDownList").value()], filterable: true, width: "124px" },
            { field: "Defectos", title: _dictionary.columnDefectos[$("#language").data("kendoDropDownList").value()], filterable: true, width: "116px" },
            { field: "Conciliado", title: _dictionary.columnConciliado[$("#language").data("kendoDropDownList").value()], filterable: true, width: "126px" },
            { field: "RazonRechazo", title: _dictionary.columnRazonRechazo[$("#language").data("kendoDropDownList").value()], filterable: true, width: "180px" },
            { field: "Limpiar", title: _dictionary.columnLimpiar[$("#language").data("kendoDropDownList").value()], filterable: true, width: "90px" },
            { field: "Firmado", title: _dictionary.columnFirmado[$("#language").data("kendoDropDownList").value()], filterable: true, width: "112px" }
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