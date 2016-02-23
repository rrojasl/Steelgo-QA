var ItemSeleccionado;
var comboDefectos;
function changeLanguageCall() {
    CargarGrid();
    CargarGridPopUp();
    document.title = _dictionary.lblValidacionResultados[$("#language").data("kendoDropDownList").value()];
    $('#grid').data('kendoGrid').dataSource.read();
    $('#gridPopUp').data('kendoGrid').dataSource.read();
    AjaxCargarRequisicionesParaValidacion();
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
            data: [

            ],
            schema: {
                model: {
                    fields: {
                        DatosJunta: { type: "string", editable: false },
                        DatosDefecto: { type: "string", editable: false },
                        NombreConciliado: { type: "string", editable: true },
                        Nombre: { type: "string", editable: true },
                        Comentario: { type: "string", editable: true },
                        Enlace: { type: "string", editable: true },
                        Ubicacion: { type: "string", editable: false },
                    }
                }
            },
            pageSize: 20,
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
            pageSizes: [10, 15, 20],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "DatosJunta", title: _dictionary.ValidacionResultadosCabeceraDatosJunta[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
            { field: "DatosDefecto", title: _dictionary.ValidacionResultadosCabeceraDefectos[$("#language").data("kendoDropDownList").value()], filterable: true, width: "130px" },
            { field: "Ubicacion", title: _dictionary.ValidacionResultadosCabeceraUbicacion[$("#language").data("kendoDropDownList").value()], filterable: false, width: "130px" },
            { field: "NombreConciliado", title: _dictionary.ValidacionResultadosCabeceraConciliacion[$("#language").data("kendoDropDownList").value()], filterable: true, editor: comboBoxConciliacion, width: "150px" },
            { field: "Nombre", title: _dictionary.ValidacionResultadosCabeceraRazonesRechazo[$("#language").data("kendoDropDownList").value()], filterable: true, editor: comboBoxDefectosValidacionResultado, width: "130px" },
            { field: "Comentario", title: _dictionary.ValidacionResultadosCabeceraComentario[$("#language").data("kendoDropDownList").value()], filterable: true, width: "140px" },
            { field: "Enlace", title: _dictionary.ValidacionResultadosCabeceraAccion[$("#language").data("kendoDropDownList").value()], filterable: false, editor: renderEnlaceEditar, template: _dictionary.ValidacionResultadosVerOpciones[$("#language").data("kendoDropDownList").value()], width: "130px" },

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



function CargarGridPopUp() {

    $("#gridPopUp").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {

                        Nombre: { type: "string", editable: true },
                        InicioDefecto: { type: "string", editable: true },
                        FinDefecto: { type: "string", editable: true },
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
                { field: "Nombre", title: _dictionary.ValidacionResultadosCabeceraDefecto[$("#language").data("kendoDropDownList").value()], filterable: true, editor: comboBoxDefectos, width: "20px" },
                { field: "InicioDefecto", title: _dictionary.ValidacionResultadosCabeceraInicio[$("#language").data("kendoDropDownList").value()], filterable: true, width: "15px" },
                { field: "FinDefecto", title: _dictionary.ValidacionResultadosCabeceraFin[$("#language").data("kendoDropDownList").value()], filterable: true, width: "15px" },
            {
                command: {
                    name: "",
                    title: "",
                    text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()],
                    click: function (e) {
                        e.preventDefault();
                        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                        var dataSource = this.dataSource;
                        if (confirm(_dictionary.ValidacionResultadosMensajeEliminarDefecto[$("#language").data("kendoDropDownList").value()])) {
                            dataItem.Accion = 3;
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
    CustomisaGrid($("#gridPopUp"));
};


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