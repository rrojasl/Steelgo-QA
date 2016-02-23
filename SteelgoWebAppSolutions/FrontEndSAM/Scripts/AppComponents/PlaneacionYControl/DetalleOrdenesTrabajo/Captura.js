function changeLanguageCall() {
    CargarGrid();
};

function CargarGrid() {
    $("#grid").kendoGrid({
        edit: function (e) {
         //   this.closeCell();
        },
        autoBind: true,
        dataSource: {
            data: [
                { Proyeccion: "Proyeccion 1", Proyecto: "X", OrdenTrabajo: "001" },
                { Proyeccion: "Proyeccion 2", Proyecto: "X", OrdenTrabajo: "002" }
            ],
            schema: {
                model: {
                    fields: {
                        Proyeccion: { type: "string", editable: false },
                        Proyecto: { type: "string", editable: false },
                        OrdenTrabajo: { type: "string", editable: true }, 
                    }
                }
            },
            //filter: {
            //    logic: "or",
            //    filters: [
            //      { field: "Accion", operator: "eq", value: 1 },
            //      { field: "Accion", operator: "eq", value: 2 }
            //    ]
            //},
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
        detailTemplate: kendo.template($("#templateGridDetalleOrdenTrabajo").html()),
        detailInit: RenderGridDetalleOrdenTrabajo,
        columns: [
            { field: "Proyeccion", title: "Proyeccion", filterable: true },
            { field: "Proyecto", title: "Proyecto", filterable: true },
            { field: "OrdenTrabajo", title: "Orden de Trabajo", filterable: true }
        ]
    });

    CustomisaGrid($("#grid"));
}

