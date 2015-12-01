function changeLanguageCall() {
    CargarGrid();
    $('#grid').data('kendoGrid').dataSource.read();
};




function CargarGrid() {


    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [
                     { DatosJunta: "Junta R1,Tipo BW, Cedua STD", Conciliado: "Aprobada", RazonesParaRechazo: "", Comentario: "", Accion: "" },
                     { DatosJunta: "Junta 2,Tipo BW, Cedua STD", Conciliado: "Aprobada", RazonesParaRechazo: "", Comentario: "", Accion: "" },
                     { DatosJunta: "Junta 2,Tipo BW, Cedua STD", Conciliado: "Rechazada", RazonesParaRechazo: "Placa mal analizada", Comentario: "Angulo mal tomado", Accion: "Regresar al proveedor - Editar" }
            ],
            schema: {
                model: {
                    fields: {
                        DatosJunta: { type: "string", editable: false},
                        Conciliado: { type: "string", editable: true },
                        RazonesParaRechazo: { type: "string", editable: true },
                        Comentario: { type: "string", editable: true },
                        Accion: { type: "string", editable: true },
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
            { field: "DatosJunta", title: "Datos de junta", filterable: true },
            { field: "Conciliado", title: "Conciliación", filterable: true},
            { field: "RazonesParaRechazo", title: "Razones de rechazo", filterable: true },
             { field: "Comentario", title: "Comentario", filterable: true },
             { field: "Accion", title: "Accion", filterable: false },
        { field: "Ubicacion", title: "Ubicacion", filterable: false }
        ]
    });
};

function AgregarCaptura() {
};

function eliminarCaptura() {
};
