function changeLanguageCall() {
    CargarGrid();
};
function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [{ OrdenImportancia: 1, SpoolID: "X001-01", SistemaPintura: "18.1", Metros2: "2", Peso: "1.2", Color: "Azul", Cuadrante: "A1", Proyecto: "Ramones", Seleccionado: false },
                    { OrdenImportancia: 2, SpoolID: "X001-02", SistemaPintura: "18.1", Metros2: "2", Peso: "1.2", Color: "Azul", Cuadrante: "A1", Proyecto: "Ramones", Seleccionado: false },
                    { OrdenImportancia: 3, SpoolID: "X001-03", SistemaPintura: "18.1", Metros2: "2", Peso: "1.2", Color: "Verde", Cuadrante: "A1", Proyecto: "Ramones", Seleccionado: false },
                    { OrdenImportancia: 4, SpoolID: "X001-04", SistemaPintura: "18.1", Metros2: "2", Peso: "1.2", Color: "Verde", Cuadrante: "A1", Proyecto: "Ramones", Seleccionado: false }],
            schema: {
                model: {
                    fields: {
                        OrdenImportancia: { type: "int", editable: false },
                        SpoolID: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Color: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: false },
                        Proyecto: { type: "string", editable: false },
                        Metros2: { type: "string", editable: false },
                        Peso: { type: "string", editable: false },
                        Seleccionado: { type: "bool", editable: false }
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
            { field: "OrdenImportancia", title: "Orden Importancia", filterable: true },
            { field: "SpoolID", title: "Spool", filterable: true },
            { field: "SistemaPintura", title: "Sistema pintura", filterable: true },
            { field: "Color", title: "Color", filterable: true },
            { field: "Cuadrante", title: "Cuadrante", filterable: true },
            { field: "Metros2", title: "M2", filterable: true },
            { field: "Peso", title: "Peso", filterable: true },
            { field: "Proyecto", title: "Proyecto", filterable: true },
           { field: "Seleccionado", title: "Seleccionar", filterable: false, template: '<input type="checkbox" #= Seleccionado ? "checked=checked" : "" # class="chkbx"  ></input>  ' },

        ]
    });
};
function eliminarCaptura()
{ }