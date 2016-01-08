function changeLanguageCall() {
    CargarGrid();
}

IniciarCapturaPinturaCarga();
function IniciarCapturaPinturaCarga() {
    SuscribirEventos();
    setTimeout(function () { AjaxCargarCamposPredeterminados(); }, 1000);
    setTimeout(function () { AjaxPinturaCargaMedioTransporte(); }, 1100);
    
    
}
function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            data: [{ SpoolID: "X001-01", SistemaPintura: "18.1", Metros2: "2", Peso: "1.2" },
                    { SpoolID: "X001-02", SistemaPintura: "18.1", Metros2: "2", Peso: "1.2" },
                    { SpoolID: "X001-03", SistemaPintura: "18.1", Metros2: "2", Peso: "1.2" },
                    { SpoolID: "X001-04", SistemaPintura: "18.1", Metros2: "2", Peso: "1.2" }],
            schema: {
                model: {
                    fields: {
                        SpoolID: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Metros2: { type: "string", editable: false },
                        Peso:{ type: "string", editable: false }
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
            { field: "SpoolID", title: "Spool", filterable: true },
            { field: "SistemaPintura", title: "Sistema pintura", filterable: true },
            { field: "Metros2", title: "M2", filterable: true },
            { command: { text: _dictionary.botonCancelar[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: "", width: "99px" }
        
        ]
    });
}
function eliminarCaptura()
{ }