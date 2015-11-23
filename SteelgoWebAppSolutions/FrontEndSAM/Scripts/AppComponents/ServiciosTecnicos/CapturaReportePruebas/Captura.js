function changeLanguageCall() {
    CargarGrid();
    $('#grid').data('kendoGrid').dataSource.read();
};




function CargarGrid() {


    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [
                     { TipoPrueba: "RT", SpoolJunta: "X001-001", TemplateMensajeTrabajosAdicionales: "ver detalle", NumeroPlacas: 3, Tamano: "25mm", Densidad: "22mm", ListaDetalleTrabajoAdicional: '[{"TemplateMensajeDetalles":"ver detalle","Ubicacion":"0-1","Resultado":"Aprobado"},{"TemplateMensajeDetalles":"ver detalle","Ubicacion":"1-2","Resultado":"Rechazado"},{"TemplateMensajeDetalles":"ver detalle","Ubicacion":"2-3","Resultado":"Aprobado"}]' },
                     { TipoPrueba: "RT", SpoolJunta: "X001-002", TemplateMensajeTrabajosAdicionales: "ver detalle", NumeroPlacas: 10, Tamano: "10mm", Densidad: "10mm", ListaDetalleTrabajoAdicional: '[{"TemplateMensajeDetalles":"ver detalle","TipoPrueba": "RT","JuntaSpool":"X002-01","NumeroPlacas":"3","Tamano":"25","Densidad":"22mm","Resultado":"Rechazado"}]' },
                     { TipoPrueba: "RT", SpoolJunta: "X001-003", TemplateMensajeTrabajosAdicionales: "ver detalle", NumeroPlacas: 4, Tamano: "15mm", Densidad: "10mm", ListaDetalleTrabajoAdicional: '[{"TemplateMensajeDetalles":"ver detalle","TipoPrueba": "VD","JuntaSpool":"X003-01","NumeroPlacas":"0","Tamano":"0","Densidad":"0","Resultado":"Rechazado"}]' },
                     { TipoPrueba: "RT", SpoolJunta: "X001-004", TemplateMensajeTrabajosAdicionales: "ver detalle", NumeroPlacas: 1, Tamano: "25mm", Densidad: "10mm", ListaDetalleTrabajoAdicional: '[{"TemplateMensajeDetalles":"ver detalle","TipoPrueba": "VD","JuntaSpool":"X004-01","NumeroPlacas":"0","Tamano":"0","Densidad":"0","Resultado":"Aprobado"}]' }
            ],
            schema: {
                model: {
                    fields: {
                        TipoPrueba: { type: "string", editable: false },
                        SpoolJunta: { type: "string", editable: false },
                        NumeroPlacas: { type: "string", editable: false },
                        Densidad: { type: "string", editable: false },
                        NumeroPlacas: { type: "string", editable: false },
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
          
            { field: "SpoolJunta", title: "Spool - Junta", filterable: true, width: "100px" },
             { field: "NumeroPlacas", title: "Número Placas", filterable: true, width: "90px" },
             { field: "Tamano", title: "Tamaño", filterable: true, width: "90px" },
             { field: "Densidad", title: "Densidad", filterable: true, width: "100px" },
              
            { field: "InformacionResultados", title: "Detalle Pruebas", filterable: false, width: "500px", editor: RenderGridDetalle, template: "#:TemplateMensajeTrabajosAdicionales#" },

        ]
    });
};

function AgregarCaptura() {
};

function eliminarCaptura() {
};
