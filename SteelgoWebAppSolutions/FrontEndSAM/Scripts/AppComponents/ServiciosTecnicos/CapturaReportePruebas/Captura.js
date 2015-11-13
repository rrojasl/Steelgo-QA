function changeLanguageCall() {
    CargarGrid();
    $('#grid').data('kendoGrid').dataSource.read();
};




function CargarGrid() {


    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [
                     { TipoPrueba: "RT", Requisicion: "RT-24", TemplateMensajeTrabajosAdicionales: "ver detalle", ListaDetalleTrabajoAdicional: '[{"TipoPrueba": "RT","JuntaSpool":"X002-01","NumeroPlacas":"3","Tamano":"25","Densidad":"22mm","Resultado":"Aprobado"}]' },
                     { TipoPrueba: "RT", Requisicion: "RT-25", TemplateMensajeTrabajosAdicionales: "ver detalle", ListaDetalleTrabajoAdicional: '[{"TipoPrueba": "RT","JuntaSpool":"X002-01","NumeroPlacas":"3","Tamano":"25","Densidad":"22mm","Resultado":"Rechazado"}]' },
                     { TipoPrueba: "VD", Requisicion: "VD-124", TemplateMensajeTrabajosAdicionales: "ver detalle", ListaDetalleTrabajoAdicional: '[{"TipoPrueba": "VD","JuntaSpool":"X003-01","NumeroPlacas":"0","Tamano":"0","Densidad":"0","Resultado":"Rechazado"}]' },
                     { TipoPrueba: "VD", Requisicion: "VD-134", TemplateMensajeTrabajosAdicionales: "ver detalle", ListaDetalleTrabajoAdicional: '[{"TipoPrueba": "VD","JuntaSpool":"X004-01","NumeroPlacas":"0","Tamano":"0","Densidad":"0","Resultado":"Aprobado"}]' }
            ],
            schema: {
                model: {
                    fields: {
                        Requisicion: { type: "string", editable: false },
                        TipoPrueba: { type: "string", editable: false },
                        SpoolJunta: { type: "string", editable: false },
                        InformacionResultados: { type: "string", editable: true },
                        TemplateMensajeTrabajosAdicionales: { type: "string", editable: true },

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
            { field: "Requisicion", title: "Requisición", filterable: true },
            { field: "TipoPrueba", title: "Tipo prueba", filterable: true },
            { field: "SpoolJunta", title: "Spool - Junta", filterable: true },
            { field: "InformacionResultados", title: "Detalle Pruebas", filterable: false, width: "700px", editor: RenderGridDetalle, template: "#:TemplateMensajeTrabajosAdicionales#" },



        ]
    });
};

function AgregarCaptura() {
};

function eliminarCaptura() {
};
