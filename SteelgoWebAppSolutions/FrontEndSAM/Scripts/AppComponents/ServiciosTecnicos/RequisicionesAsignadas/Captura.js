function changeLanguageCall() {
    CargarGrid();
    $('#grid').data('kendoGrid').dataSource.read();
};




function CargarGrid() {


    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [
                     { TipoPrueba: "XRT0327", Prioridad: "RT", Cuadrante: "10/10/2015", Proyecto: "Prueba sobre", Requisicion: "Pendiente", SpoolID: "", Junta: "", Agregar: "" },
                     { TipoPrueba: "XRT0334", Prioridad: "RT", Cuadrante: "10/10/2015", Proyecto: "", Requisicion: "En espera de validacion", SpoolID: "", Junta: "", Agregar: "" },
                     { TipoPrueba: "LMNa0954", Prioridad: "PMI", Cuadrante: "10/10/2015", Proyecto: "Prueba sobre", Requisicion: "Validada", SpoolID: "", Junta: "", Agregar: "" },
                     { TipoPrueba: "TRN2345", Prioridad: "UT", Cuadrante: "10/10/2015", Proyecto: "", Requisicion: "Rechazada", SpoolID: "", Junta: "", Agregar: "" },
                     { TipoPrueba: "XRT0327", Prioridad: "RT", Cuadrante: "10/10/2015", Proyecto: "Prueba sobre", Requisicion: "Pendiente", SpoolID: "", Junta: "", Agregar: "" }
            ],
            schema: {
                model: {
                    fields: {
                        TipoPrueba: { type: "string", editable: false },
                        Prioridad: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Proyecto: { type: "string", editable: false },
                        Requisicion: { type: "string", editable: false },
                        SpoolID: { type: "string", editable: false },
                        Junta: { type: "string", editable: false },
                        Agregar: { type: "bool", editable: true }
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
            { field: "TipoPrueba", title: "Folio", filterable: true },
            { field: "Prioridad", title: "Tipo Prueba", filterable: true },
            { field: "Cuadrante", title: "Fecha", filterable: true },
            { field: "Proyecto", title: "Observación", filterable: true },
           // { field: "Requisicion", title: "Estatus", filterable: true, },
            { field: "SpoolID", title: "ver detalle", filterable: true }
          


           // { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: _dictionary.ServiciosTecnicosEliminar[$("#language").data("kendoDropDownList").value()], width: "99px" }

        ]
    });
};

function AgregarCaptura() {
};

function eliminarCaptura() {
};
