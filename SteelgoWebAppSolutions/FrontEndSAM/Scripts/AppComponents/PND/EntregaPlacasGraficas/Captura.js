IniciarCapturaPlacasGraficas();
function IniciarCapturaPlacasGraficas() {
    SuscribirEventos();
}

function changeLanguageCall() {
    cargarGrid();
    document.title = _dictionary.ServiciosTecnicosEntregaPGBreadcrumb[$("#language").data("kendoDropDownList").value()];
    loadingStop();
}

function cargarGrid() {
    $("#grid").kendoGrid({
        dataSource: {
            schema: {
                model: {
                    fields: {
                        DatosJunta: { type: "string", editable: false },
                        Folio: { type: "string", editable: false },
                        Descripcion: { type: "string", editable: false },
                        Recibido: { type: "string", editable: false },
                        CondicionesFisicas: { type: "string", editable: true },
                        Defectos: { type: "string", editable: true }
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
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true
        },
        filterable: false,
        columns: [
            { field: "DatosJunta", title: "Datos", filterable: false, width: "100px" },
            { field: "Folio", title: "No. Control", filterable: false, width: "70px" },
            { field: "Descripcion", title: "Junta", filterable: false, width: "130px" },
            { field: "Recibido", title: "Recibido", filterable: false, width: "85px" },
            { field: "CondicionesFisicas", title: "Condiciones Físicas", filterable: false, width: "150px" },
            { field: "Defectos", title: "Defectos", filterable: false, width: "125px" }
        ],
    });
}