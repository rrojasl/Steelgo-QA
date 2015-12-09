function changeLanguageCall() {
    CargarGrid();
};
function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [{ SpoolID: "X001-01", Paso: "Dim", Cuadrante: "cc-1a", Traveler: "ver", Detalle: "Link Shop" },
                    { SpoolID: "X001-02", Paso: "Pin", Cuadrante: "cc-1a", Traveler: "ver", Detalle: "Link Shop" },
                    { SpoolID: "X001-03", Paso: "OK PND", Cuadrante: "cc-1a", Traveler: "ver", Detalle: "Link Shop" },
                    { SpoolID: "X001-04", Paso: "OK Carga", Cuadrante: "cc-1b", Traveler: "ver", Detalle: "Link Shop" },
                    { SpoolID: "X001-05", Paso: "OK Carga", Cuadrante: "cc-1b", Traveler: "ver", Detalle: "Link Shop" }],
            schema: {
                model: {
                    fields: {
                        SpoolID: { type: "string", editable: false },
                        Paso: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Traveler: { type: "int", editable: false },
                        Detalle: { type: "int", editable: false }
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
            { field: "SpoolID", title: "Spool ID", filterable: true },
            { field: "Paso", title: "Paso", filterable: true },
            { field: "Cuadrante", title: "Cuadrante", filterable: true },
            { field: "Traveler", title: "Traveler", filterable: true },
            { field: "Detalle", title: "Detalle", filterable: true }
            
        ]
    });
};