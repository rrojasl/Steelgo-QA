function changeLanguageCall() {
    CargarGrid();
};
function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [{ SpoolID: "X001-01", Cuadrante: "cc-1a", Traveler: "ver", Etiquetado: false, ConCinta: false, ColorCinta: "" },
                    { SpoolID: "X001-02", Cuadrante: "cc-1a", Traveler: "ver", Etiquetado: true, ConCinta: true, ColorCinta: "Azul" },
                    { SpoolID: "X001-03", Cuadrante: "cc-1a", Traveler: "ver", Etiquetado: false, ConCinta: false, ColorCinta: "" },
                    { SpoolID: "X001-04", Cuadrante: "cc-1b", Traveler: "ver", Etiquetado: true, ConCinta: true, ColorCinta: "Rojo" },
                    { SpoolID: "X001-05", Cuadrante: "cc-1b", Traveler: "ver", Etiquetado: true, ConCinta: false, ColorCinta: "" }],
            schema: {
                model: {
                    fields: {
                        SpoolID: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Traveler: { type: "int", editable: false },
                        Etiquetado: { type: "bool", editable: false },
                        ConCinta: { type: "bool", editable: false },
                        ColorCinta: { type: "string", editable: false }
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
            { field: "Cuadrante", title: "Cuadrante", filterable: true },
            { field: "Traveler", title: "Traveler", filterable: true },
            { field: "Etiquetado", title: "Etiquietado", filterable: true, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' data-bind='checked: Etiquetado' #= Etiquetado ? checked='checked' : '' #/>" },
            { field: "ConCinta", title: "Con Cinta", filterable: true, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' data-bind='checked: ConCinta' #= ConCinta ? checked='checked' : '' #/>"},
            { field: "ColorCinta", title: "Cinta", filterable: true }
        ]
    });
};