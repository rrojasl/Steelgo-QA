IniciarCapturaPlacasGraficas();
function IniciarCapturaPlacasGraficas() {
    SuscribirEventos();
}

function changeLanguageCall() {
    cargarGrid();
    document.title = _dictionary.ServiciosTecnicosEntregaPGBreadcrumb[$("#language").data("kendoDropDownList").value()];
    loadingStop();
}

function cargarGrid() {
    $("#grid").kendoGrid({
        dataSource: {
            schema: {
                model: {
                    fields: {
                        Datos: { type: "string", editable: false },
                        NumeroControl: { type: "string", editable: false },
                        Junta: { type: "number", editable: false },
                        Recibido: { type: "string", editable: false },
                        CondicionesFisicas: { type: "string", editable: true },
                        Defectos: { type: "string", editable: true }
                    }
                }
            },
            filter: {
                logic: "or",
                filters: [
                  { field: "Accion", operator: "eq", value: 1 },
                  { field: "Accion", operator: "eq", value: 2 }
                ]
            },
            pageSize: 10,
            serverPaging: false,
            serverFiltering: false,
            serverSorting: false
        },
        navigatable: true,
        editable: true,
        autoHeight: true,
        sortable: true,
        scrollable: true,
        selectable: true,
        pageable: {
            refresh: false,
            pageSizes: [10, 25, 50, 100],
            info: false,
            input: false,
            numeric: true
        },
        filterable: getGridFilterableMaftec(),
        columns: [
            { field: "Datos", title: _dictionary.columnDatos[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "NumeroControl", title: _dictionary.columnNumeroControl[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "100px" },
            { field: "Junta", title: _dictionary.columnJunta[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellNumberMaftec(), width: "100px" },
            { field: "Recibido", title: _dictionary.columnRecibido[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "85px" },
            { field: "CondicionesFisicas", title: _dictionary.columnCondicionesFisicas[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "150px" },
            { field: "Defectos", title: _dictionary.columnDefectosRechazos[$("#language").data("kendoDropDownList").value()], filterable: getGridFilterableCellMaftec(), width: "125px" }
        ],
    });
}