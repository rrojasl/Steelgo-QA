IniciarDashboardPND();
function IniciarDashboardPND() {
    SuscribirEventos();
    
}

function changeLanguageCall() {
    AjaxCargarHeaderDashboard();
    CargarGrid();
    document.title = _dictionary.menuServiciosTecnicosDashboardPND[$("#language").data("kendoDropDownList").value()];
    
}



function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {
            schema: {
                model: {
                    fields: {
                        TipoPrueba: { type: "string", editable: false },
                        Requisicion: { type: "string", editable: false },
                        FechaAsignacion: { type: "date", editable: false },
                        ElementosRequisicion: { type: "string", editable: false },
                        Proveedor: { type: "string", editable: false },
                        Equipo: { type: "string", editable: false },
                        Turno: { type: "string", editable: false },
                    }
                }
            },
            pageSize: 10,
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
            pageSizes: [10, 25, 50,100],
            info: false,
            input: false,
            numeric: true,
        },
        columns: [
            { field: "TipoPrueba", title: _dictionary.columnTipoPrueba[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Requisicion", title: _dictionary.columnRequisicion[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Fecha", title: _dictionary.lblFechaRequisicion[$("#language").data("kendoDropDownList").value()], filterable: true, format: _dictionary.FormatoFecha2[$("#language").data("kendoDropDownList").value()] },
            { field: "ElementosRequisicion", title: _dictionary.columnJuntas[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Proveedor", title: _dictionary.columnProveedor[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Equipo", title: _dictionary.columnEquipo[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Turno", title: _dictionary.columnTurnoLaboral[$("#language").data("kendoDropDownList").value()], filterable: true },
            
        ]
    });
    CustomisaGrid($("#grid"));
};
