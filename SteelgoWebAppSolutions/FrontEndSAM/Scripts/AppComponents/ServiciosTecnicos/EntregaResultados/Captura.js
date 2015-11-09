function changeLanguageCall() {
    CargarGrid();
    $('#grid').data('kendoGrid').dataSource.read();
};




function CargarGrid() {


    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [
                     { TipoPrueba: "XL2345", Prioridad: "", Cuadrante: "", Proyecto: "ETILENO XXI", Requisicion: "Requisicion 1", SpoolID: "Aprobada", Junta: "4", Agregar:true },
                     { TipoPrueba: "RT-67644", Prioridad: "Prueba RT con 5 placas", Cuadrante: "Placa sucia", Proyecto: "CROSSOVER PIPING", Requisicion: "Requisicion 2", SpoolID: "Rechazada", Junta: "5", Agregar: false },
                     { TipoPrueba: "RT-67645", Prioridad: "Prueba RT con 5 placas", Cuadrante: "placa rayada", Proyecto: "DUPONT ALTAMIRA2", Requisicion: "Requisicion 3", SpoolID: "Rechazada", Junta: "6", Agregar: false },
                     { TipoPrueba: "RT-67646", Prioridad: "Prueba RT con 5 placas", Cuadrante: "placa rota", Proyecto: "CB LITORAL", Requisicion: "Requisicion 4", SpoolID: "Rechazada", Junta: "7", Agregar: false }
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
                        CodigoAplicar: { type: "string", editable: false },
                        observacion: { type: "string", editable: false },
                        Agregar:{ type: "bool", editable: true }
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
            { field: "TipoPrueba", title: "Folio", filterable: true },
            { field: "Prioridad", title: "Descripcion", filterable: true },
            { field: "Agregar", title: "Recibido", filterable: true, template: '<input type="checkbox" #= Agregar ? "checked=checked" : "" # disabled="disabled" ></input>' },
            { field: "SpoolID", title: "Condiciones Fisicas", filterable: true },
             { field: "Cuadrante",title: "defectos", filterable: true}
             
             
            
            

        ]
    });
};

function AgregarCaptura() {
};

function eliminarCaptura() {
};
