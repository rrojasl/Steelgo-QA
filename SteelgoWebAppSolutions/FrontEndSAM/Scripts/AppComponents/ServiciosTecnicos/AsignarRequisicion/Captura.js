function changeLanguageCall() {
    CargarGrid();
    $('#grid').data('kendoGrid').dataSource.read();
};




function CargarGrid() {


    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [
                     { TipoPrueba: "RT", Prioridad: "1", Cuadrante: "Cuadrante 1", Proyecto: "ETILENO XXI", Requisicion: "Requisicion 1", SpoolID: "10/10/2015", Junta: "4", Agregar: true, CodigoAplicar:"10" },
                     { TipoPrueba: "RT", Prioridad: "Prioridad 2", Cuadrante: "Cuadrante 2", Proyecto: "CROSSOVER PIPING", Requisicion: "Requisicion 2", SpoolID: "10/10/2015", Junta: "5", Agregar: false, CodigoAplicar: "15" },
                     { TipoPrueba: "VI", Prioridad: "Prioridad 3", Cuadrante: "Cuadrante 3", Proyecto: "DUPONT ALTAMIRA2", Requisicion: "Requisicion 3", SpoolID: "10/10/2015", Junta: "6", Agregar: false, CodigoAplicar: "2" },
                     { TipoPrueba: "Neumática", Prioridad: "Prioridad 4", Cuadrante: "Cuadrante 4", Proyecto: "CB LITORAL", Requisicion: "Requisicion 4", SpoolID: "10/10/2015", Junta: "7", Agregar: false, CodigoAplicar: "32" }
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
            { field: "TipoPrueba", title: _dictionary.ServiciosTecnicosTipoPrueba[$("#language").data("kendoDropDownList").value()], filterable: true},
            { field: "Requisicion", title: _dictionary.ServiciosTecnicosRequisicion[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "SpoolID", title: "Fecha", filterable: true },
             { field: "CodigoAplicar",title: "Cantidad de Juntas", filterable: true},
             { field: "observacion", title: "proveedor", filterable: true }
            
            

        ]
    });
};

function AgregarCaptura() {
};

function eliminarCaptura() {
};
