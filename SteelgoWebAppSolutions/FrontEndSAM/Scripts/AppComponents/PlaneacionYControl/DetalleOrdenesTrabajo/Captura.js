$(document).ready(function () {
     
    CargarGrid();

});


function CargarGrid() {
    $("#grid").kendoGrid({
        edit: function (e) {
            this.closeCell();
        },
        autoBind: true,
        dataSource: [
            { Proyeccion: "Proyeccion 1", OrdenTrabajo: "OT-001" },
            { Proyeccion: "Fabricable", OrdenTrabajo: "OT-002" },

        ],
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
            { field: "Proyeccion", title: "Proyeccion", filterable: true },
            { field: "OrdenTrabajo", title: "Orden de Trabajo", filterable: true }
            

        ]
    });
}