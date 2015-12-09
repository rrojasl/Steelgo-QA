function changeLanguageCall() {
    CargarGrid();
};
function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [{ Consecutivo: "X2A", SpoolID: "X001-01", Paquete: "", PaqueteSelect: false, },
                    { Consecutivo: "X2B", SpoolID: "X001-02", Paquete: "", PaqueteSelect: false, }],
                    
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
            { field: "Consecutivo", title: "Plana", filterable: true },
             { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()] }, title: "", width: "99px" }
            
        ]
    });
};