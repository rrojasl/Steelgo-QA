var endRangeDate;
var endRangeDate2;

IniciarCapturaArmado();
function IniciarCapturaArmado() {
    AltaFecha();
}

function changeLanguageCall() {
    CargarGrid();
    AjaxCargarCamposPredeterminados();
    AjaxCargarCarrosCargados();
    AjaxCargarPintor();
    AjaxCargarShotBlastero();
};


function AltaFecha() {
    endRangeDate = $("#FechaShotBlast").kendoDatePicker({
        max: new Date()
    });
    endRangeDate2 = $("#Fechaprimario").kendoDatePicker({
        max: new Date()
    });
}

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [],
            schema: {
                model: {
                    fields: {
                        Spool: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Metros2: { type: "string", editable: false },
                        Peso: { type: "string", editable: false },
                        Color: { type: "string", editable: false },
                        pintor: { type: "string", editable: true },
                        Shotblastero: { type: "string", editable: true }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 }
                ]
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
            { field: "Spool", title: "Spool", filterable: true },
            { field: "SistemaPintura", title: "Sistema pintura", filterable: true },
            { field: "Color", title: "Color", filterable: true },
            { field: "Metros2", title: "M2", filterable: true },
            { field: "pintor", title: "Pintor", filterable: true, editor: RendercomboBoxPintor },
            { field: "Shotblastero", title: "ShotBlastero", filterable: true, editor: RendercomboBoxShotBlastero },
             { command: { text: "Descarga", click: eliminarCaptura }, title: "Descargar" }

        ]
    });
};


function eliminarCaptura() {

}