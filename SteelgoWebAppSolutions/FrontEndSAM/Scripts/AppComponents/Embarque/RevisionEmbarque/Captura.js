/// <reference path="Captura.js" />
function changeLanguageCall() {
    CargarGrid();
};
function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [{ SpoolID: "X001-01", Cuadrante: "cc-1a", Traveler: "ver", Etiquetado: false, ConCinta: false, ColorCinta: "" },
                    { SpoolID: "X001-02", Cuadrante: "cc-1a", Traveler: "ver", Etiquetado: true, ConCinta: true, ColorCinta: "Azul" },
                    { SpoolID: "X001-03", Paquete: "", llego: true, comentario: "" },
                    { SpoolID: "X001-04", Paquete: "28", llego: true, comentario: "" },
                    { SpoolID: "X001-05", Paquete: "28", llego: true, comentario: "Despintado" }],
            schema: {
                model: {
                    fields: {
                        SpoolID: { type: "string", editable: false },
                        Paquete: { type: "string", editable: false },
                        llego: { type: "bool", editable: false },
                        comentario: { type: "string", editable: false },
                       
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
            { field: "Paquete", title: "Paqueteadrante", filterable: true },
            { field: "llego", title: "¿llegó?", filterable: true, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' data-bind='checked: llego' #= llego ? checked='checked' : '' #/>" },
            { field: "comentario", title: "Comentario", filterable: true },
        ]
    });
};