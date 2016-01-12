function changeLanguageCall() {
    CargarGrid();
}

IniciarCapturaPinturaDescarga();
function IniciarCapturaPinturaDescarga() {
    SuscribirEventos();
    setTimeout(function () { AjaxCargarCuadrante(0); }, 2400);
    setTimeout(function () { AjaxPinturaDescargaMedioTransporte(); }, 1100);
}
function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {

            schema: {
                model: {
                    fields: {
                        SpoolID: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Area: { type: "string", editable: false },
                        Cuadrante: { type: "string", editable: true }
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
            { field: "SpoolID", title: _dictionary.PinturaDescargaSpool[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Area", title: _dictionary.PinturaDescargaArea[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Cuadrante", title: _dictionary.PinturaDescargaCuadrante[$("#language").data("kendoDropDownList").value()], editor: RenderComboBoxCuadrante, filterable: true },
            { command: { text: _dictionary.PinturaDescargaDescarga[$("#language").data("kendoDropDownList").value()], click: eliminarCaptura }, title: "Descargar" }

        ]
    });
}


function eliminarCaptura(e) {
    e.preventDefault();
    var filterValue = $(e.currentTarget).val();
    var dataItem = $("#grid").data("kendoGrid").dataItem($(e.currentTarget).closest("tr"));

    var dataSource = $("#grid").data("kendoGrid").dataSource;
    dataItem.Accion = 3;
    dataSource.sync();

}