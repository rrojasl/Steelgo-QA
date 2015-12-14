function changeLanguageCall() {
    CargarGrid();
};
function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [{  Consecutivo:1, SpoolID: "X001-01", Paquete: "", PaqueteSelect: false },
                    { Consecutivo: 2, SpoolID: "X001-02", Paquete: "", PaqueteSelect: false, },
                    { Consecutivo: 3, SpoolID: "X001-03", Paquete: "", PaqueteSelect: false, },
                    { Consecutivo: 4, SpoolID: "X001-04", Paquete: "28", PaqueteSelect: true, },
                    { Consecutivo: 5, SpoolID: "X001-05", Paquete: "28", PaqueteSelect: true, }],
            schema: {
                model: {
                    fields: {
                        Consecutivo: { type: "string", editable: false },
                        SpoolID: { type: "string", editable: false },
                        Paquete: { type: "int", editable: false },
                        PaqueteSelect: { type: "int", editable: false }
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
            { field: "Consecutivo", title: "Consecutivo", filterable: true },
            { field: "SpoolID", title: "Spool ID", filterable: true },
            { field: "Paquete", title: "Paquete", filterable: true },
            { field: "PaqueteSelect", title: " ", filterable: true, template: "<input name='fullyPaid' class='ob-paid' type='checkbox' data-bind='checked: PaqueteSelect' #= PaqueteSelect ? checked='checked' : '' #/>" },
        ]
    });
};