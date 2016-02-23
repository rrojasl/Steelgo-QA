IniciarCapturaLotesCapturaReporte();
function IniciarCapturaLotesCapturaReporte() {
    SuscribirEventos();
    setTimeout(function () { AjaxCargarSistemaPintura(); }, 1000);
    setTimeout(function () { AjaxCargarLotes(); }, 1100);
}


function changeLanguageCall() {
    CargarGrid();
}

function CargarGrid() {
    $("#grid").kendoGrid({
        autoBind: true,
        dataSource: {

            schema: {
                model: {
                    fields: {
                        NombreSpool: { type: "string", editable: false },
                        SistemaPintura: { type: "string", editable: false },
                        Color: { type: "string", editable: false },
                        NombreCuadrante: { type: "string", editable: true }
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
            { field: "NombreSpool", title: _dictionary.PinturaLotesCapturaReporteNombreSpool[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "SistemaPintura", title: _dictionary.PinturaLotesCapturaReporteSistemaPintura[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "Color", title: _dictionary.PinturaLotesCapturaReporteColor[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "NombreCuadrante", title: _dictionary.PinturaLotesCapturaReporteNombreCuadrante[$("#language").data("kendoDropDownList").value()], filterable: true },
            { field: "CapturaPrueba", title: _dictionary.PinturaLotesCapturaReporteCapturaPrueba[$("#language").data("kendoDropDownList").value()], filterable: true, template: '<input type="checkbox" #= CapturaPrueba ? "checked=checked" : "" # class="chkbx"  ></input>  ' }
        ]
    });
    CustomisaGrid($("#grid"));
}