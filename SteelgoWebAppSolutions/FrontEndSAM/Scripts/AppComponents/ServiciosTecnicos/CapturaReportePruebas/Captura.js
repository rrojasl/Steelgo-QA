function changeLanguageCall() {
    CargarGrid();
    $('#grid').data('kendoGrid').dataSource.read();
};




function CargarGrid() {


    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [
                     { TipoPrueba: "RT", Requisicion: "RT-24", SpoolJunta: "X002-1"},
                     { TipoPrueba: "RT", Requisicion: "RT-25", SpoolJunta: "X002-1 1" },
                     { TipoPrueba: "VI", Requisicion: "VI-1234", SpoolJunta: "X002-1 2" },
                     { TipoPrueba: "VI", Requisicion: "VI-1234", SpoolJunta: "X002-1 3" }
            ],
            schema: {
                model: {
                    fields: {
                        Requisicion: { type: "string", editable: false },
                        TipoPrueba: { type: "string", editable: false },
                        SpoolJunta: { type: "string", editable: false },

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
        editable:true,
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
            { field: "Requisicion", title: "Requisición", filterable: true },
            { field: "TipoPrueba", title: "Tipo prueba", filterable: true },
            { field: "SpoolJunta", title: "Spool - Junta", filterable: true },
             
            
            

        ]
    });
};

function AgregarCaptura() {
};

function eliminarCaptura() {
};
